// Landing page sections (B5). Copy lives in i18n/ns/marketing.{ar,en}.json.
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/index.jsx';
import { cx } from '../../lib/cx.js';
import { useM, daysUntil } from './useMarketing.js';
import {
  IconBoard, IconPhone, IconChat, IconQr, IconCycle, IconSpark, IconCard, IconLink, IconCheck, IconX, IconMinus, IconPlus,
} from './icons.jsx';

export const ZATCA_WAVE25 = '2027-02-01';

export function SectionHead({ id, title, sub, tone = 'light', className }) {
  return (
    <div className={cx('max-w-2xl', className)}>
      <h2 id={id} className={cx('text-3xl sm:text-4xl font-bold leading-tight', tone === 'dark' ? 'text-sand-50' : 'text-ink')}>{title}</h2>
      {sub && <p className={cx('mt-3 text-lg', tone === 'dark' ? 'text-petrol-100' : 'text-sand-700')}>{sub}</p>}
    </div>
  );
}

/* ───────────── Pain → fix ───────────── */
export function Leaks() {
  const m = useM();
  const { locale } = useI18n();
  const days = daysUntil(ZATCA_WAVE25);
  const icons = [IconCycle, IconCard, IconQr, IconChat];
  return (
    <section aria-labelledby="leaks-h" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <SectionHead id="leaks-h" title={m.leaks.title} sub={m.leaks.sub} />
        <div className="mt-12 hidden md:grid grid-cols-[3rem_1fr_1fr] gap-x-8 text-sm font-semibold pb-3 border-b border-sand-200">
          <span />
          <span className="text-danger-600">{m.leaks.before}</span>
          <span className="text-petrol-600">{m.leaks.after}</span>
        </div>
        <ol className="mt-6 md:mt-0">
          {m.leaks.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <li key={i} className="grid md:grid-cols-[3rem_1fr_1fr] gap-x-8 gap-y-3 py-7 border-b border-sand-200 last:border-0">
                <span className="h-11 w-11 rounded-xl bg-petrol-50 text-petrol-600 grid place-items-center"><Icon size={22} /></span>
                <div>
                  <span className="md:hidden text-xs font-semibold text-danger-600">{m.leaks.before}</span>
                  <p className="text-lg leading-8 text-sand-800">{it.pain}</p>
                  {i === 2 && days > 0 && (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-danger-50 text-danger-700 px-3 py-1 text-sm font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-danger-500" />
                      {locale === 'en' ? <>{days} days to the Wave 25 deadline</> : <>باقي <span className="ltr-nums tabular-nums">{days}</span> يوماً على موعد الموجة 25</>}
                    </p>
                  )}
                </div>
                <div>
                  <span className="md:hidden text-xs font-semibold text-petrol-600">{m.leaks.after}</span>
                  <p className="text-lg leading-8 text-ink font-medium">{it.fix}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ───────────── Features bento ───────────── */
function Tile({ icon: Icon, title, body, className, children, tone = 'white' }) {
  return (
    <article className={cx('min-w-0 rounded-2xl p-6 flex flex-col', tone === 'petrol' ? 'bg-petrol-700 text-sand-50' : 'bg-white border border-sand-200/80', className)}>
      <span className={cx('h-10 w-10 rounded-xl grid place-items-center', tone === 'petrol' ? 'bg-petrol-600 text-saffron-300' : 'bg-petrol-50 text-petrol-600')}><Icon size={21} /></span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className={cx('mt-1.5 leading-7', tone === 'petrol' ? 'text-petrol-100' : 'text-sand-700')}>{body}</p>
      {children}
    </article>
  );
}

/** The 4-visit contract ring: the logo's cycle motif, used for what it means (recurring visits). */
function ContractRing({ label }) {
  const { locale } = useI18n();
  const en = locale === 'en';
  const visits = en
    ? [['Visit 1', 'April', 'completed', 'Done'], ['Visit 2', 'July', 'completed', 'Done'], ['Visit 3', 'October', 'scheduled', 'Auto-created · reminder sent'], ['Visit 4', 'January', 'new', 'Upcoming']]
    : [['الزيارة 1', 'أبريل', 'completed', 'مكتملة'], ['الزيارة 2', 'يوليو', 'completed', 'مكتملة'], ['الزيارة 3', 'أكتوبر', 'scheduled', 'أُنشئت تلقائياً · وصل التذكير'], ['الزيارة 4', 'يناير', 'new', 'قادمة']];
  const C = { completed: '#2E8B57', scheduled: '#3F6FB5', new: '#9C8660' };
  // positions clockwise from top (screen space, independent of text direction)
  const pts = [[80, 16], [144, 80], [80, 144], [16, 80]];
  return (
    <figure className="mt-6 flex-1 flex flex-col sm:flex-row items-center gap-6">
      <svg viewBox="0 0 160 160" className="w-40 h-40 shrink-0" aria-hidden="true">
        <circle cx="80" cy="80" r="64" fill="none" stroke="#EADFCB" strokeWidth="6" />
        <path d="M80 16 A64 64 0 0 1 80 144" fill="none" stroke="#0F5C5C" strokeWidth="6" strokeLinecap="round" />
        <path d="M80 144 A64 64 0 0 1 16 80" fill="none" stroke="#0F5C5C" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 10" />
        <path d="M74 136 L84 144 L74 152" fill="none" stroke="#0F5C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="10" fill={i === 2 ? '#F0AC1C' : i < 2 ? '#0F5C5C' : '#FBF9F5'} stroke="#0F5C5C" strokeWidth="3" />
        ))}
        <text x="80" y="76" textAnchor="middle" fontSize="26" fontWeight="700" fill="#0B4A4B">4</text>
        <text x="80" y="98" textAnchor="middle" fontSize="11" fill="#7A6849">{en ? 'visits / yr' : 'زيارات/سنة'}</text>
      </svg>
      <figcaption className="w-full min-w-0">
        <span className="block text-sm font-medium text-sand-700 mb-3">{label}</span>
        <ol className="space-y-2">
          {visits.map(([n, mo, st, note], i) => (
            <li key={n} className={cx('flex items-center gap-3 rounded-xl px-3 py-2 text-sm', i === 2 ? 'bg-saffron-50 ring-1 ring-saffron-200' : 'bg-sand-50')}>
              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: C[st] }} />
              <span className="font-medium w-16 sm:w-20 shrink-0">{n}</span>
              <span className="text-sand-600 w-14 sm:w-16 shrink-0">{mo}</span>
              <span className={cx('truncate', i === 2 ? 'text-saffron-800 font-medium' : 'text-sand-600')}>{note}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

function TriageDemo() {
  const { locale } = useI18n();
  const ar = locale !== 'en';
  return (
    <div className="mt-5 rounded-xl bg-petrol-800/70 p-3 text-sm">
      <p className="rounded-lg bg-white/95 text-ink px-3 py-2 leading-6">{ar ? '«المكيف يطلع ماء ويطفي لحاله»' : '“The AC is leaking water and switching off”'}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(ar ? ['مكيفات', 'تسريب تصريف', 'تسليك تصريف المكيف', '100–250 ر.س'] : ['AC', 'Drain leak', 'Drain unclogging', 'SAR 100–250']).map((c, i) => (
          <span key={c} className={cx('rounded-full px-2.5 py-1 text-xs font-medium', i === 3 ? 'bg-saffron-300 text-petrol-900' : 'bg-petrol-600 text-sand-50')}>
            <span className={i === 3 ? 'ltr-nums' : undefined}>{c}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Features() {
  const m = useM();
  const f = m.features;
  return (
    <section id="features" aria-labelledby="features-h" className="py-20 sm:py-24 bg-sand-100 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <SectionHead id="features-h" title={f.title} sub={f.sub} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <Tile icon={IconCycle} {...f.contracts} className="lg:col-span-3 lg:row-span-2">
            <ContractRing label={f.contracts.ring} />
          </Tile>
          <Tile icon={IconBoard} {...f.board} className="lg:col-span-3" />
          <Tile icon={IconSpark} {...f.ai} tone="petrol" className="lg:col-span-3">
            <TriageDemo />
          </Tile>
          <Tile icon={IconChat} {...f.whatsapp} className="lg:col-span-2" />
          <Tile icon={IconQr} {...f.zatca} className="lg:col-span-2" />
          <Tile icon={IconPhone} {...f.tech} className="lg:col-span-2" />
          <Tile icon={IconCard} {...f.pay} className="lg:col-span-3" />
          <Tile icon={IconLink} {...f.booking} className="lg:col-span-3" />
        </div>
      </div>
    </section>
  );
}

/* ───────────── How it works ───────────── */
export function HowItWorks() {
  const m = useM();
  return (
    <section id="how" aria-labelledby="how-h" className="py-20 sm:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <SectionHead id="how-h" title={m.how.title} />
        <ol className="mt-12 grid gap-8 md:grid-cols-3 relative">
          <span aria-hidden="true" className="hidden md:block absolute top-6 inset-x-[16%] h-0.5 bg-petrol-200" />
          {m.how.steps.map((s, i) => (
            <li key={i} className="relative">
              <span className="relative z-10 h-12 w-12 rounded-full bg-petrol-600 text-sand-50 grid place-items-center text-xl font-bold ring-8 ring-sand-50 tabular-nums">{i + 1}</span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sand-700 leading-7">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────── Comparison ───────────── */
function Mark({ v, m }) {
  if (v === 'yes') return <span className="relative inline-flex items-center gap-1.5 text-success-600"><IconCheck size={18} /><span className="sr-only">{m.compare.yes}</span></span>;
  if (v === 'partial') return <span className="inline-flex items-center gap-1.5 text-sand-500 text-sm"><IconMinus size={18} />{m.compare.partial}</span>;
  return <span className="relative inline-flex items-center gap-1.5 text-danger-500"><IconX size={18} /><span className="sr-only">{m.compare.no}</span></span>;
}

export function Compare() {
  const m = useM();
  const c = m.compare;
  return (
    <section aria-labelledby="compare-h" className="py-20 sm:py-24 bg-white border-y border-sand-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <SectionHead id="compare-h" title={c.title} sub={c.sub} />
        <div className="relative mt-10 -mx-4 px-4 overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[40rem] text-start border-separate border-spacing-0">
            <thead>
              <tr className="text-sm">
                <th scope="col" className="text-start font-medium text-sand-600 pb-3 pe-4 w-[40%]"><span className="sr-only">—</span></th>
                <th scope="col" className="pb-3 px-4 text-center font-bold text-petrol-700 bg-petrol-50 rounded-t-2xl pt-4">{c.colDawra}</th>
                <th scope="col" className="pb-3 px-4 text-center font-medium text-sand-700">{c.colExcel}</th>
                <th scope="col" className="pb-3 px-4 text-center font-medium text-sand-700">{c.colGlobal}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r, i) => (
                <tr key={r.label}>
                  <th scope="row" className="text-start font-medium py-3.5 pe-4 border-t border-sand-200">{r.label}</th>
                  <td className={cx('text-center py-3.5 px-4 border-t border-petrol-100 bg-petrol-50', i === c.rows.length - 1 && 'rounded-b-2xl')}><Mark v={r.dawra} m={m} /></td>
                  <td className="text-center py-3.5 px-4 border-t border-sand-200"><Mark v={r.excel} m={m} /></td>
                  <td className="text-center py-3.5 px-4 border-t border-sand-200"><Mark v={r.global} m={m} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-sand-600 max-w-2xl">{c.note}</p>
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */
export function Faq() {
  const m = useM();
  return (
    <section id="faq" aria-labelledby="faq-h" className="py-20 sm:py-24 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        <SectionHead id="faq-h" title={m.faq.title} />
        <div className="mt-10 divide-y divide-sand-200 border-y border-sand-200">
          {m.faq.items.map((it) => (
            <details key={it.q} className="group py-1">
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {it.q}
                <span className="h-8 w-8 shrink-0 rounded-full bg-sand-100 text-petrol-700 grid place-items-center transition-transform group-open:rotate-45"><IconPlus size={18} /></span>
              </summary>
              <p className="pb-5 text-sand-800 leading-8 max-w-[68ch]">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Final CTA ───────────── */
export function FinalCta({ demo }) {
  const m = useM();
  return (
    <section aria-labelledby="final-h" className="bg-petrol-700 text-sand-50 relative overflow-hidden">
      <svg aria-hidden="true" viewBox="0 0 200 200" className="hidden md:block absolute end-10 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[.18]">
        <path d="M170 64 A80 80 0 1 0 180 110" fill="none" stroke="#F0AC1C" strokeWidth="14" strokeLinecap="round" />
        <path d="M152 40 L186 52 L168 84 Z" fill="#F0AC1C" />
      </svg>
      <div className="relative max-w-6xl mx-auto px-4 lg:px-6 py-20 sm:py-24">
        <h2 id="final-h" className="text-3xl sm:text-5xl font-bold leading-tight max-w-2xl">{m.final.title}</h2>
        <p className="mt-4 text-lg text-petrol-100 max-w-xl">{m.final.sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/signup" className="h-12 px-6 inline-flex items-center rounded-xl bg-saffron-400 text-petrol-900 text-lg font-semibold hover:bg-saffron-300 focus-visible:outline-none focus-visible:shadow-ring">{m.final.cta}</Link>
          {demo}
        </div>
      </div>
    </section>
  );
}
