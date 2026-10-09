// OWNER: B4. AC checklist model.
// The API stores checklist as [{ label, done }] (extra keys are stripped by the server schema), so readings are
// encoded into the label: "ضغط الفريون — 125 psi". Labels are stored in Arabic (the office's language);
// known items are shown translated in the technician's language.
export const AC_DEFAULTS = [
  { key: 'gas_pressure', ar: 'ضغط الفريون', unit: 'psi', input: true, aliases: ['فحص ضغط الفريون'] },
  { key: 'filter', ar: 'تنظيف الفلاتر', aliases: [] },
  { key: 'drain', ar: 'فحص خط التصريف', aliases: ['فحص التصريف'] },
  { key: 'amps', ar: 'قراءة الأمبير', unit: 'A', input: true, aliases: [] },
  { key: 'thermostat', ar: 'اختبار الثرموستات', aliases: [] },
  { key: 'supply_temp', ar: 'حرارة الهواء الخارج', unit: '°C', input: true, aliases: ['قياس درجة حرارة الهواء الخارج'], optional: true },
];

const SEP = ' — ';

/** Is this an AC job? (AC-first product; seed price-list categories are repair/cleaning/installation/…) */
export function isAcJob(job) {
  const c = job?.category;
  if (['pest', 'plumbing', 'electrical'].includes(c)) return false;
  if (['ac', 'repair', 'cleaning', 'maintenance', 'installation', 'inspection'].includes(c)) return true;
  return /مكيف|تكييف|فريون|split|ac\b/i.test(`${job?.title || ''} ${job?.description || ''}`) || !c;
}

/** Stored [{label,done}] → UI rows [{ key?, label, base, value, unit, input, done }] */
export function parseChecklist(stored, job) {
  const rows = (Array.isArray(stored) ? stored : []).map((it) => {
    const label = String(it.label || '');
    const [head, ...rest] = label.split(SEP);
    const def = AC_DEFAULTS.find((d) => d.ar === head.trim() || d.aliases.includes(head.trim()));
    if (!def) return { key: null, label, base: label, value: '', done: Boolean(it.done) };
    const raw = rest.join(SEP).trim();
    const value = def.input ? raw.replace(new RegExp(`\\s*${def.unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '').trim() : '';
    return { key: def.key, label, base: def.ar, value, unit: def.unit, input: def.input, done: Boolean(it.done) };
  });
  if (isAcJob(job)) {
    for (const d of AC_DEFAULTS) {
      if (d.optional) continue;
      if (!rows.some((r) => r.key === d.key)) rows.push({ key: d.key, label: d.ar, base: d.ar, value: '', unit: d.unit, input: d.input, done: false });
    }
  }
  return rows;
}

/** UI rows → API payload */
export function serializeChecklist(rows) {
  return rows.map((r) => ({
    label: (r.key && r.input && String(r.value || '').trim() ? `${r.base}${SEP}${String(r.value).trim()} ${r.unit}` : r.base || r.label).slice(0, 300),
    done: Boolean(r.done),
  }));
}
