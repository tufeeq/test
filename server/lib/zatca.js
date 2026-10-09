// OWNER: B2. ZATCA e-invoicing helpers (Phase-1 QR + Phase-2-ready primitives). Pure functions, no DB.
// Frozen contract (others call these — keep signatures):
//   buildQrTlv({ sellerName, vatNumber, timestamp: Date|string, total: number, vatAmount: number }) → base64 string
//   calcTotals(lines: [{qty, unit_price, vat_rate?}]) → { subtotal, vat_amount, total, lines: [...with line_total, vat_amount] }
// Additional exports: decodeQrTlv, isValidVatNumber, canonicalJson, invoiceHash, INITIAL_PIH, buildUblXml, VAT_RATE.
import crypto from 'node:crypto';

export const VAT_RATE = 0.15;

// ───────────────────────── money (integer halalas, half-up away from zero) ─────────────────────────
const toCents = (n) => {
  const v = Number(n || 0);
  return Math.sign(v) * Math.round(Math.abs(v) * 100 + 1e-7);
};
const fromCents = (c) => (c === 0 ? 0 : c / 100);
// integer division with half-up rounding, symmetric for negatives (credit notes negate exactly)
const divRound = (num, den) => Math.sign(num) * Math.floor((Math.abs(num) + den / 2) / den);
const rateBp = (r) => Math.round(Number(r) * 10000); // 0.15 → 1500 basis points

/**
 * Line and document totals.
 * - line_total = qty × unit_price rounded to 2dp (exact integer arithmetic; qty & price are 2dp).
 * - line vat_amount = line_total × rate rounded to 2dp (shown per line).
 * - Document VAT is computed per VAT rate on the summed taxable amount and rounded once
 *   (ZATCA/EN16931 rule BR-CO-17: category tax = Σ taxable × rate). This can differ from Σ line VAT
 *   by ±0.01 on many-line invoices; the document figure is the legally relevant one.
 * - total = subtotal + vat_amount.
 */
export function calcTotals(lines = []) {
  const byRate = new Map();
  const out = lines.map((l) => {
    const vat_rate = l.vat_rate === undefined || l.vat_rate === null ? VAT_RATE : Number(l.vat_rate);
    const qtyC = toCents(l.qty ?? 1);
    const priceC = toCents(l.unit_price);
    const lineC = divRound(qtyC * priceC, 100);
    const bp = rateBp(vat_rate);
    const lineVatC = divRound(lineC * bp, 10000);
    byRate.set(bp, (byRate.get(bp) || 0) + lineC);
    return { ...l, qty: fromCents(qtyC), unit_price: fromCents(priceC), vat_rate, line_total: fromCents(lineC), vat_amount: fromCents(lineVatC) };
  });
  let subC = 0;
  let vatC = 0;
  const breakdown = [];
  for (const [bp, taxableC] of byRate) {
    const v = divRound(taxableC * bp, 10000);
    subC += taxableC;
    vatC += v;
    breakdown.push({ vat_rate: bp / 10000, taxable: fromCents(taxableC), vat_amount: fromCents(v) });
  }
  return { subtotal: fromCents(subC), vat_amount: fromCents(vatC), total: fromCents(subC + vatC), lines: out, breakdown };
}

// ───────────────────────── VAT number ─────────────────────────
/** Saudi VAT registration number: 15 digits, starts and ends with 3. */
export const isValidVatNumber = (v) => typeof v === 'string' && /^3\d{13}3$/.test(v.trim());

// ───────────────────────── Phase-1 QR (TLV → base64) ─────────────────────────
/** Truncate a UTF-8 string to ≤ max bytes without cutting a multi-byte character. */
function utf8Field(value, max = 255) {
  let buf = Buffer.from(String(value ?? ''), 'utf8');
  if (buf.length <= max) return buf;
  let end = max;
  while (end > 0 && (buf[end] & 0xc0) === 0x80) end--; // back off continuation bytes
  return buf.subarray(0, end);
}

export function isoSeconds(ts) {
  return new Date(ts || Date.now()).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/**
 * ZATCA Phase-1 QR payload. Each field: 1 byte tag, 1 byte length (UTF-8 BYTE length), UTF-8 bytes.
 * Tags: 1 seller name · 2 VAT number · 3 timestamp ISO8601 · 4 total incl. VAT · 5 VAT amount.
 * Amounts are absolute values with 2 decimals (credit notes are flagged by document type, not sign).
 */
export function buildQrTlv({ sellerName, vatNumber, timestamp, total, vatAmount }) {
  const fields = [
    sellerName || '',
    vatNumber || '',
    isoSeconds(timestamp),
    (Math.abs(toCents(total)) / 100).toFixed(2),
    (Math.abs(toCents(vatAmount)) / 100).toFixed(2),
  ];
  const parts = fields.map((v, i) => {
    const val = utf8Field(v);
    return Buffer.concat([Buffer.from([i + 1, val.length]), val]);
  });
  return Buffer.concat(parts).toString('base64');
}

/** Inverse of buildQrTlv → { 1: 'seller', 2: 'vat', ... } plus named keys. */
export function decodeQrTlv(b64) {
  const buf = Buffer.from(b64, 'base64');
  const out = {};
  let i = 0;
  while (i + 2 <= buf.length) {
    const tag = buf[i];
    const len = buf[i + 1];
    out[tag] = buf.subarray(i + 2, i + 2 + len).toString('utf8');
    i += 2 + len;
  }
  return { ...out, sellerName: out[1], vatNumber: out[2], timestamp: out[3], total: out[4], vatAmount: out[5] };
}

// ───────────────────────── Phase-2 readiness: canonical JSON + hash chain ─────────────────────────
/** Initial previous-invoice-hash defined by ZATCA for the first document: base64(hex(SHA-256("0"))). */
export const INITIAL_PIH = Buffer.from(crypto.createHash('sha256').update('0').digest('hex')).toString('base64');

/** Deterministic JSON: object keys sorted recursively, no whitespace. */
export function canonicalJson(value) {
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (typeof value === 'object') {
    return `{${Object.keys(value).sort().filter((k) => value[k] !== undefined)
      .map((k) => `${JSON.stringify(k)}:${canonicalJson(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

const m2 = (n) => (toCents(n) / 100).toFixed(2);

/** The fields covered by the hash. Amounts are fixed 2dp strings so numeric formatting can't change the hash. */
export function hashPayload(inv) {
  return {
    uuid: inv.uuid,
    number: inv.number,
    kind: inv.kind,
    issue_date: isoSeconds(inv.issue_date),
    currency: 'SAR',
    seller: { name: inv.seller?.name_ar || inv.seller?.name || '', vat_number: inv.seller?.vat_number || '' },
    buyer: { name: inv.buyer?.name || '', vat_number: inv.buyer?.vat_number || null },
    original_invoice_id: inv.original_invoice_id || null,
    lines: (inv.lines || []).map((l) => ({
      description: l.description, qty: m2(l.qty), unit_price: m2(l.unit_price),
      vat_rate: Number(l.vat_rate).toFixed(4), line_total: m2(l.line_total),
    })),
    subtotal: m2(inv.subtotal),
    vat_amount: m2(inv.vat_amount),
    total: m2(inv.total),
  };
}

/** hash = base64(SHA-256(canonicalJson(invoice) + previous_hash)). */
export function invoiceHash(inv, previousHash) {
  return crypto.createHash('sha256').update(canonicalJson(hashPayload(inv)) + (previousHash || INITIAL_PIH)).digest('base64');
}

// ───────────────────────── UBL 2.1 (ZATCA profile) — Phase-2 stub ─────────────────────────
const x = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const PAYMENT_MEANS = { cash: '10', card: '48', mada: '48', online: '48', moyasar: '48', transfer: '42' };

/**
 * buildUblXml(invoice) → UBL 2.1 XML string following the ZATCA data dictionary (KSA-x / BT-x fields).
 * `invoice` is the API Invoice shape (with seller, buyer, lines). Not signed: Phase-2 integration must add
 * <ext:UBLExtensions> (XAdES signature), cac:Signature and the cryptographic stamp, then call the Fatoora
 * reporting (simplified) or clearance (standard) API. ICV = invoice number, PIH = previous_hash.
 */
export function buildUblXml(inv) {
  const isCredit = inv.kind === 'credit_note';
  const simplified = inv.kind === 'simplified' || (isCredit && inv.original_kind !== 'standard');
  const issued = new Date(inv.issue_date || Date.now());
  const riyadh = new Date(issued.getTime() + 3 * 3600 * 1000).toISOString(); // KSA local time (UTC+3)
  const date = riyadh.slice(0, 10);
  const time = riyadh.slice(11, 19);
  const abs = (n) => (Math.abs(toCents(n)) / 100).toFixed(2);
  const s = inv.seller || {};
  const b = inv.buyer || {};
  const lines = inv.lines || [];
  const byRate = new Map();
  for (const l of lines) {
    const k = Number(l.vat_rate);
    const cur = byRate.get(k) || { taxable: 0, vat: 0 };
    cur.taxable += Math.abs(toCents(l.line_total));
    byRate.set(k, cur);
  }
  const subtotals = [...byRate.entries()].map(([rate, v]) => {
    const vat = divRound(v.taxable * rateBp(rate), 10000);
    const cat = rate > 0 ? 'S' : 'O';
    return `
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="SAR">${(v.taxable / 100).toFixed(2)}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="SAR">${(vat / 100).toFixed(2)}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID schemeID="UN/ECE 5305" schemeAgencyID="6">${cat}</cbc:ID>
        <cbc:Percent>${(rate * 100).toFixed(2)}</cbc:Percent>${cat === 'O' ? `
        <cbc:TaxExemptionReasonCode>VATEX-SA-OOS</cbc:TaxExemptionReasonCode>
        <cbc:TaxExemptionReason>Not subject to VAT</cbc:TaxExemptionReason>` : ''}
        <cac:TaxScheme><cbc:ID schemeID="UN/ECE 5153" schemeAgencyID="6">VAT</cbc:ID></cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>`;
  }).join('');

  const party = (p, isSeller) => `
      <cac:Party>${isSeller && p.cr_number ? `
        <cac:PartyIdentification><cbc:ID schemeID="CRN">${x(p.cr_number)}</cbc:ID></cac:PartyIdentification>` : ''}
        <cac:PostalAddress>
          <cbc:StreetName>${x(p.address || '')}</cbc:StreetName>
          <cbc:CityName>${x(p.city || '')}</cbc:CityName>
          <cac:Country><cbc:IdentificationCode>SA</cbc:IdentificationCode></cac:Country>
        </cac:PostalAddress>${p.vat_number ? `
        <cac:PartyTaxScheme>
          <cbc:CompanyID>${x(p.vat_number)}</cbc:CompanyID>
          <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
        </cac:PartyTaxScheme>` : ''}
        <cac:PartyLegalEntity><cbc:RegistrationName>${x(isSeller ? (p.name_ar || p.name) : p.name)}</cbc:RegistrationName></cac:PartyLegalEntity>
      </cac:Party>`;

  const invLines = lines.map((l, i) => {
    const lt = abs(l.line_total);
    const lv = abs(l.vat_amount ?? divRound(toCents(l.line_total) * rateBp(l.vat_rate), 10000) / 100);
    return `
  <cac:InvoiceLine>
    <cbc:ID>${i + 1}</cbc:ID>
    <cbc:InvoicedQuantity unitCode="PCE">${abs(l.qty)}</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="SAR">${lt}</cbc:LineExtensionAmount>
    <cac:TaxTotal>
      <cbc:TaxAmount currencyID="SAR">${lv}</cbc:TaxAmount>
      <cbc:RoundingAmount currencyID="SAR">${((Math.abs(toCents(l.line_total)) + Math.abs(toCents(lv))) / 100).toFixed(2)}</cbc:RoundingAmount>
    </cac:TaxTotal>
    <cac:Item>
      <cbc:Name>${x(l.description)}</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>${Number(l.vat_rate) > 0 ? 'S' : 'O'}</cbc:ID>
        <cbc:Percent>${(Number(l.vat_rate) * 100).toFixed(2)}</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price><cbc:PriceAmount currencyID="SAR">${abs(l.unit_price)}</cbc:PriceAmount></cac:Price>
  </cac:InvoiceLine>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Dawra UBL 2.1 export (ZATCA profile). UNSIGNED — Phase-2 stub: add UBLExtensions/XAdES signature before reporting/clearance. -->
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
         xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2">
  <cbc:ProfileID>reporting:1.0</cbc:ProfileID>
  <cbc:ID>${x(inv.number ?? '')}</cbc:ID>
  <cbc:UUID>${x(inv.uuid)}</cbc:UUID>
  <cbc:IssueDate>${date}</cbc:IssueDate>
  <cbc:IssueTime>${time}</cbc:IssueTime>
  <cbc:InvoiceTypeCode name="${simplified ? '0200000' : '0100000'}">${isCredit ? '381' : '388'}</cbc:InvoiceTypeCode>${inv.notes ? `
  <cbc:Note languageID="ar">${x(inv.notes)}</cbc:Note>` : ''}
  <cbc:DocumentCurrencyCode>SAR</cbc:DocumentCurrencyCode>
  <cbc:TaxCurrencyCode>SAR</cbc:TaxCurrencyCode>${isCredit && inv.original_invoice ? `
  <cac:BillingReference>
    <cac:InvoiceDocumentReference><cbc:ID>${x(inv.original_invoice.number)}</cbc:ID></cac:InvoiceDocumentReference>
  </cac:BillingReference>` : ''}
  <cac:AdditionalDocumentReference>
    <cbc:ID>ICV</cbc:ID>
    <cbc:UUID>${x(inv.number ?? '')}</cbc:UUID>
  </cac:AdditionalDocumentReference>
  <cac:AdditionalDocumentReference>
    <cbc:ID>PIH</cbc:ID>
    <cac:Attachment><cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">${x(inv.previous_hash || INITIAL_PIH)}</cbc:EmbeddedDocumentBinaryObject></cac:Attachment>
  </cac:AdditionalDocumentReference>${inv.qr_tlv ? `
  <cac:AdditionalDocumentReference>
    <cbc:ID>QR</cbc:ID>
    <cac:Attachment><cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">${x(inv.qr_tlv)}</cbc:EmbeddedDocumentBinaryObject></cac:Attachment>
  </cac:AdditionalDocumentReference>` : ''}
  <cac:AccountingSupplierParty>${party(s, true)}
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>${party(b, false)}
  </cac:AccountingCustomerParty>
  <cac:Delivery><cbc:ActualDeliveryDate>${date}</cbc:ActualDeliveryDate></cac:Delivery>
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>${PAYMENT_MEANS[inv.payment_method] || '10'}</cbc:PaymentMeansCode>${isCredit ? `
    <cbc:InstructionNote>${x(inv.credit_reason || 'Correction')}</cbc:InstructionNote>` : ''}
  </cac:PaymentMeans>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="SAR">${abs(inv.vat_amount)}</cbc:TaxAmount>
  </cac:TaxTotal>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="SAR">${abs(inv.vat_amount)}</cbc:TaxAmount>${subtotals}
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="SAR">${abs(inv.subtotal)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="SAR">${abs(inv.subtotal)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="SAR">${abs(inv.total)}</cbc:TaxInclusiveAmount>
    <cbc:PrepaidAmount currencyID="SAR">${inv.status === 'paid' ? abs(inv.total) : '0.00'}</cbc:PrepaidAmount>
    <cbc:PayableAmount currencyID="SAR">${inv.status === 'paid' ? '0.00' : abs(inv.total)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>${invLines}
</Invoice>
`;
}
