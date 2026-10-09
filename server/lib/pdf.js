// OWNER: B2. Bilingual (AR/EN) A4 invoice PDF with pdfkit.
// Contract: renderInvoicePdf({ invoice, lines, company, customer }) → Promise<Buffer>
//   invoice = API Invoice shape (seller/buyer snapshots preferred), lines = invoice.lines, company = seller block,
//   customer = { name, phone, vat_number, address?, city? }.
// Arabic: glyph shaping comes from fontkit + the bundled IBM Plex Sans Arabic TTF; RTL ordering from ./arabic-shape.js.
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { draw, measure, wrap } from './arabic-shape.js';

const FONT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'fonts');
const FONTS = {
  regular: path.join(FONT_DIR, 'IBMPlexSansArabic-Regular.ttf'),
  semibold: path.join(FONT_DIR, 'IBMPlexSansArabic-SemiBold.ttf'),
  bold: path.join(FONT_DIR, 'IBMPlexSansArabic-Bold.ttf'),
};

const C = {
  petrol: '#0F5C5C', petrol700: '#0B4A4B', petrol50: '#EEF6F5',
  sand100: '#F5F0E6', sand200: '#EADFCB', sand600: '#7A6849',
  ink: '#1B2323', saffron: '#F0AC1C', success: '#2E8B57', danger: '#C2410C',
};

const TITLES = {
  simplified: ['فاتورة ضريبية مبسطة', 'Simplified Tax Invoice'],
  standard: ['فاتورة ضريبية', 'Tax Invoice'],
  credit_note: ['إشعار دائن', 'Credit Note'],
};
const STATUS = {
  paid: ['مدفوعة', 'PAID', C.success], unpaid: ['غير مدفوعة', 'UNPAID', C.saffron],
  void: ['ملغاة', 'VOID', C.danger], draft: ['مسودة', 'DRAFT', C.sand600], issued: ['صادر', 'ISSUED', C.petrol],
};
const METHODS = { cash: 'نقداً · Cash', mada: 'مدى · mada', card: 'بطاقة · Card', transfer: 'تحويل بنكي · Transfer', online: 'دفع إلكتروني · Online', moyasar: 'دفع إلكتروني · Online' };

const fmt = (n) => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtQty = (n) => (Number.isInteger(Number(n)) ? String(Number(n)) : Number(n).toFixed(2));
function fmtDate(ts) {
  if (!ts) return '—';
  const d = new Date(new Date(ts).getTime() + 3 * 3600 * 1000); // Asia/Riyadh
  return `${d.toISOString().slice(0, 10)} ${d.toISOString().slice(11, 16)}`;
}

function dataUrlImage(url) {
  const m = /^data:image\/(png|jpe?g);base64,(.+)$/i.exec(url || '');
  return m ? Buffer.from(m[2], 'base64') : null;
}

export async function renderInvoicePdf({ invoice, lines, company, customer } = {}) {
  const inv = invoice || {};
  const items = lines || inv.lines || [];
  const seller = inv.seller || company || {};
  const buyer = inv.buyer || customer || inv.customer || {};
  const kind = inv.kind || 'simplified';
  const isCredit = kind === 'credit_note';

  const qrPng = inv.qr_tlv
    ? await QRCode.toBuffer(inv.qr_tlv, { type: 'png', errorCorrectionLevel: 'M', margin: 1, width: 360, color: { dark: '#1B2323', light: '#FFFFFF' } })
    : null;

  const doc = new PDFDocument({
    size: 'A4', margin: 0,
    info: { Title: `${TITLES[kind][1]} ${inv.number ?? ''}`, Author: seller.name || 'Dawra', Creator: 'Dawra · دورة' },
  });
  const chunks = [];
  doc.on('data', (c) => chunks.push(c));
  const done = new Promise((resolve, reject) => { doc.on('end', () => resolve(Buffer.concat(chunks))); doc.on('error', reject); });

  const hasFonts = fs.existsSync(FONTS.regular);
  if (hasFonts) {
    doc.registerFont('R', FONTS.regular);
    doc.registerFont('S', fs.existsSync(FONTS.semibold) ? FONTS.semibold : FONTS.regular);
    doc.registerFont('B', fs.existsSync(FONTS.bold) ? FONTS.bold : FONTS.regular);
  } else {
    doc.registerFont('R', 'Helvetica'); doc.registerFont('S', 'Helvetica-Bold'); doc.registerFont('B', 'Helvetica-Bold');
  }

  const W = 595.28; const H = 841.89; const M = 40; const CW = W - 2 * M;
  const t = (font, size, color = C.ink) => doc.font(font).fontSize(size).fillColor(color);

  // ── header band ─────────────────────────────
  doc.rect(0, 0, W, 112).fill(C.petrol700);
  doc.rect(0, 112, W, 4).fill(C.saffron);
  const logo = dataUrlImage(seller.logo_url);
  let leftX = M;
  if (logo) {
    try { doc.roundedRect(M, 26, 60, 60, 8).fill('#FFFFFF'); doc.image(logo, M + 4, 30, { fit: [52, 52], align: 'center', valign: 'center' }); leftX = M + 72; } catch { /* bad image */ }
  }
  // seller AR (right) / EN (left)
  t('B', 18, '#FFFFFF'); draw(doc, seller.name_ar || seller.name || '', M, 26, { width: CW, align: 'right' });
  t('R', 9.5, '#CFE3E1');
  draw(doc, [seller.address, seller.city].filter(Boolean).join('، ') || '', M, 54, { width: CW, align: 'right' });
  draw(doc, `الرقم الضريبي: ${seller.vat_number || '—'}${seller.cr_number ? `   ·   السجل التجاري: ${seller.cr_number}` : ''}`, M, 70, { width: CW, align: 'right' });
  if (seller.phone) draw(doc, `هاتف: ${seller.phone}`, M, 86, { width: CW, align: 'right' });
  t('B', 14, '#FFFFFF'); draw(doc, seller.name && seller.name !== seller.name_ar ? seller.name : '', leftX, 28, { dir: 'ltr' });
  t('R', 9.5, '#CFE3E1');
  draw(doc, `VAT No. ${seller.vat_number || '—'}`, leftX, 54, { dir: 'ltr' });
  if (seller.cr_number) draw(doc, `CR No. ${seller.cr_number}`, leftX, 70, { dir: 'ltr' });

  // ── title block ─────────────────────────────
  let y = 136;
  const [titleAr, titleEn] = TITLES[kind] || TITLES.simplified;
  t('B', 20, C.petrol); draw(doc, titleAr, M, y - 4, { width: CW, align: 'right' });
  t('S', 14, C.petrol); draw(doc, titleEn, M, y, { dir: 'ltr' });
  const st = STATUS[inv.status] || STATUS.unpaid;
  t('B', 9);
  const pill = `${st[0]}  ·  ${st[1]}`;
  const pw = measure(doc, pill) + 20;
  doc.roundedRect(W / 2 - pw / 2, y + 2, pw, 20, 10).fill(st[2]);
  t('B', 9, '#FFFFFF'); draw(doc, pill, W / 2 - pw / 2, y + 6, { width: pw, align: 'center' });

  // ── meta grid ──────────────────────────────
  y = 178;
  const meta = [
    ['رقم الفاتورة', 'Invoice No.', inv.number ?? '—'],
    ['تاريخ الإصدار', 'Issue date', fmtDate(inv.issue_date)],
    ['حالة الدفع', 'Payment', inv.status === 'paid' ? (METHODS[inv.payment_method] || inv.payment_method || '—') : st[1]],
  ];
  if (isCredit && inv.original_invoice) meta.push(['الفاتورة الأصلية', 'Original invoice', inv.original_invoice.number]);
  const cellW = CW / meta.length;
  doc.roundedRect(M, y, CW, 50, 6).fill(C.sand100);
  meta.forEach(([ar, en, val], i) => {
    const cx = M + CW - (i + 1) * cellW; // first cell on the right (RTL)
    t('R', 8, C.sand600); draw(doc, `${ar} · ${en}`, cx, y + 9, { width: cellW, align: 'center' });
    t('B', 11, C.ink); draw(doc, String(val), cx, y + 25, { width: cellW, align: 'center', dir: 'ltr' });
    if (i > 0) doc.moveTo(cx + cellW, y + 10).lineTo(cx + cellW, y + 40).lineWidth(0.5).strokeColor(C.sand200).stroke();
  });

  // ── buyer ──────────────────────────────────
  y = 242;
  const boxH = 70;
  doc.roundedRect(M, y, CW, boxH, 6).lineWidth(0.8).strokeColor(C.sand200).stroke();
  doc.rect(M + CW - 4, y, 4, boxH).fill(C.petrol);
  t('S', 9, C.sand600); draw(doc, 'بيانات المشتري · Buyer', M + 12, y + 8, { width: CW - 28, align: 'right' });
  t('B', 13, C.ink); draw(doc, buyer.name || '—', M + 12, y + 22, { width: CW - 28, align: 'right' });
  t('R', 9, C.ink);
  const addr = [buyer.address, buyer.city].filter(Boolean).join('، ');
  if (addr) draw(doc, addr, M + 12, y + 42, { width: CW - 28, align: 'right' });
  const left = [];
  if (buyer.vat_number) left.push(`VAT No. ${buyer.vat_number}`);
  if (buyer.phone) left.push(`Tel ${buyer.phone}`);
  left.forEach((s, i) => { t(i === 0 && buyer.vat_number ? 'S' : 'R', 9.5, C.ink); draw(doc, s, M + 12, y + 22 + i * 16, { dir: 'ltr' }); });

  // ── lines table ─────────────────────────────
  y = 328;
  // RTL columns from the right: # | description | qty | unit price | VAT % | VAT | total
  const cols = [
    { k: 'n', ar: '#', en: '', w: 24 },
    { k: 'desc', ar: 'الوصف', en: 'Description', w: 0 },
    { k: 'qty', ar: 'الكمية', en: 'Qty', w: 44 },
    { k: 'price', ar: 'سعر الوحدة', en: 'Unit price', w: 70 },
    { k: 'rate', ar: 'الضريبة', en: 'VAT %', w: 44 },
    { k: 'vat', ar: 'مبلغ الضريبة', en: 'VAT', w: 62 },
    { k: 'total', ar: 'الإجمالي', en: 'Total', w: 76 },
  ];
  cols[1].w = CW - cols.reduce((s, c) => s + c.w, 0);
  let xr = M + CW;
  for (const c of cols) { c.x = xr - c.w; xr -= c.w; }
  const headH = 32;
  doc.rect(M, y, CW, headH).fill(C.petrol);
  for (const c of cols) {
    t('S', 8.5, '#FFFFFF'); draw(doc, c.ar, c.x + 4, y + 5, { width: c.w - 8, align: c.k === 'desc' ? 'right' : 'center' });
    if (c.en) { t('R', 7.5, '#CFE3E1'); draw(doc, c.en, c.x + 4, y + 18, { width: c.w - 8, align: c.k === 'desc' ? 'right' : 'center', dir: 'ltr' }); }
  }
  y += headH;
  const bottomLimit = H - 250;
  items.forEach((l, i) => {
    t('R', 9.5);
    const descLines = wrap(doc, l.description || '', cols[1].w - 12);
    const rowH = Math.max(24, 10 + descLines.length * 13);
    if (y + rowH > bottomLimit) {
      doc.addPage({ size: 'A4', margin: 0 });
      y = M;
    }
    if (i % 2 === 1) doc.rect(M, y, CW, rowH).fill(C.petrol50);
    const vat = l.vat_amount ?? Math.round(Number(l.line_total) * Number(l.vat_rate) * 100) / 100;
    const vals = { n: String(i + 1), qty: fmtQty(l.qty), price: fmt(l.unit_price), rate: `${Math.round(Number(l.vat_rate) * 100)}%`, vat: fmt(vat), total: fmt(l.line_total) };
    for (const c of cols) {
      if (c.k === 'desc') {
        t('R', 9.5, C.ink);
        descLines.forEach((dl, j) => draw(doc, dl, c.x + 6, y + 6 + j * 13, { width: c.w - 12, align: 'right' }));
      } else {
        t(c.k === 'total' ? 'S' : 'R', 9.5, C.ink); draw(doc, vals[c.k], c.x + 4, y + (rowH - 12) / 2, { width: c.w - 8, align: 'center', dir: 'ltr' });
      }
    }
    y += rowH;
    doc.moveTo(M, y).lineTo(M + CW, y).lineWidth(0.4).strokeColor(C.sand200).stroke();
  });

  // ── totals + QR ─────────────────────────────
  y += 16;
  if (y > H - 230) { doc.addPage({ size: 'A4', margin: 0 }); y = M; }
  const totW = 250;
  const totX = M + CW - totW;
  const rows = [
    ['الإجمالي غير شامل الضريبة', 'Subtotal (excl. VAT)', inv.subtotal],
    ['ضريبة القيمة المضافة 15%', 'VAT 15%', inv.vat_amount],
  ];
  rows.forEach(([ar, en, v], i) => {
    const ry = y + i * 30;
    t('R', 9.5, C.ink); draw(doc, ar, totX, ry, { width: totW, align: 'right' });
    t('R', 7.5, C.sand600); draw(doc, en, totX, ry + 13, { width: totW, align: 'right', dir: 'ltr' });
    t('S', 11, C.ink); draw(doc, `${fmt(v)} SAR`, totX, ry + 4, { dir: 'ltr' });
    doc.moveTo(totX, ry + 26).lineTo(totX + totW, ry + 26).lineWidth(0.4).strokeColor(C.sand200).stroke();
  });
  const ty = y + 66;
  doc.roundedRect(totX, ty, totW, 46, 6).fill(C.petrol700);
  t('B', 11, '#FFFFFF'); draw(doc, 'الإجمالي شامل الضريبة', totX + 10, ty + 8, { width: totW - 20, align: 'right' });
  t('R', 7.5, '#CFE3E1'); draw(doc, 'Total incl. VAT', totX + 10, ty + 26, { width: totW - 20, align: 'right', dir: 'ltr' });
  t('B', 15, '#FFFFFF'); draw(doc, `${fmt(inv.total)} SAR`, totX + 10, ty + 13, { dir: 'ltr' });

  if (qrPng) {
    const qs = 116;
    doc.roundedRect(M, y - 4, qs + 8, qs + 8, 6).lineWidth(0.8).strokeColor(C.sand200).stroke();
    doc.image(qrPng, M + 4, y, { width: qs, height: qs });
    const capX = M + qs + 16; const capW = totX - capX - 14;
    let cy = y + 24;
    t('S', 8, C.ink);
    for (const ln of wrap(doc, 'رمز الاستجابة السريعة لهيئة الزكاة والضريبة والجمارك', capW)) { draw(doc, ln, capX, cy, { width: capW, align: 'right' }); cy += 12; }
    t('R', 7.5, C.sand600); cy += 2;
    for (const ln of wrap(doc, 'ZATCA QR code. Scan to verify seller, VAT number, date and amounts.', capW)) { draw(doc, ln, capX, cy, { width: capW, align: 'right', dir: 'ltr' }); cy += 11; }
  }

  let ny = ty + 64;
  if (isCredit && inv.credit_reason) {
    t('S', 9, C.ink); draw(doc, `سبب الإشعار · Reason: ${inv.credit_reason}`, M, ny, { width: CW, align: 'right' });
    ny += 18;
  }
  if (inv.notes) {
    t('R', 9, C.sand600);
    for (const nl of wrap(doc, `ملاحظات: ${inv.notes}`, CW).slice(0, 4)) { draw(doc, nl, M, ny, { width: CW, align: 'right' }); ny += 14; }
  }

  // ── footer ─────────────────────────────────
  const fy = H - 56;
  doc.rect(0, fy, W, 56).fill(C.sand100);
  doc.rect(0, fy, W, 2).fill(C.petrol);
  t('R', 8, C.sand600);
  draw(doc, 'شكراً لتعاملكم معنا. هذه فاتورة إلكترونية صادرة وفق متطلبات هيئة الزكاة والضريبة والجمارك.', M, fy + 12, { width: CW, align: 'right' });
  draw(doc, `UUID ${inv.uuid || '—'}`, M, fy + 12, { dir: 'ltr' });
  draw(doc, 'Thank you for your business. Electronic invoice issued per ZATCA requirements.', M, fy + 28, { dir: 'ltr' });
  t('S', 8, C.petrol); draw(doc, 'دورة · Dawra', M, fy + 28, { width: CW, align: 'right' });

  doc.end();
  return done;
}
