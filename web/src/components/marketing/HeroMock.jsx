// Hero illustration (B5): a pure CSS/SVG dispatch board + WhatsApp thread.
// One orchestrated sequence on load: the leak request in the queue gets assigned to Ahmed's lane,
// then the customer's WhatsApp thread fills in (confirmed → on the way → done → invoice paid).
// Each animated element's resting state IS its final state, so reduced-motion users see the finished scene.
import { useI18n } from '../../i18n/index.jsx';
import { STATUS_COLORS } from '../../components/ui/index.js';
import { useM } from './useMarketing.js';
import { IconPin, IconSpark, IconCheck } from './icons.jsx';

const CSS = `
@keyframes dm-out { 0%,100% { opacity: 1 } }
@keyframes dm-leave { 0% { opacity: 1; transform: none } 100% { opacity: 0; transform: translateY(-6px) scale(.96) } }
@keyframes dm-in { 0% { opacity: 0; transform: scale(.85) } 100% { opacity: 1; transform: none } }
@keyframes dm-bubble { 0% { opacity: 0; transform: translateY(8px) } 100% { opacity: 1; transform: none } }
@keyframes dm-ping { 0% { box-shadow: 0 0 0 0 rgba(240,172,28,.55) } 100% { box-shadow: 0 0 0 10px rgba(240,172,28,0) } }
.dm-queue-card { animation: dm-leave .45s ease-in 1.6s both; }
.dm-assigned { animation: dm-in .4s cubic-bezier(.2,.8,.2,1) 2.0s both, dm-ping 1.2s ease-out 2.4s 2; }
.dm-b { animation: dm-bubble .35s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .dm-queue-card { animation: none; opacity: 0; display: none; }
  .dm-assigned, .dm-b { animation: none; }
}
`;

const START = 8, END = 15, HOURS = [8, 10, 12, 14];
const pct = (h) => `${((h - START) / (END - START)) * 100}%`;
const span = (start, end) => ({ insetInlineStart: pct(start), width: `${((end - start) / (END - START)) * 100}%` });

function Block({ start, end, status, label, className = '', style }) {
  return (
    <div className={`absolute top-1.5 bottom-1.5 rounded-lg px-2 flex items-center gap-1.5 text-[11px] leading-tight font-medium text-ink bg-white border overflow-hidden ${className}`}
      style={{ ...span(start, end), borderColor: `${STATUS_COLORS[status]}55`, ...style }}>
      <span className="h-full w-1 rounded-full shrink-0 -ms-1" style={{ background: STATUS_COLORS[status] }} />
      <span className="truncate">{label}</span>
    </div>
  );
}

export default function HeroMock() {
  const m = useM();
  const { locale } = useI18n();
  const mk = m.mock;
  const lanes = [
    { name: mk.techs[0], color: '#2563EB', jobs: [{ s: 8, e: 9.8, st: 'completed', l: mk.other[0] }] },
    { name: mk.techs[1], color: '#16A34A', jobs: [{ s: 8.5, e: 11, st: 'in_progress', l: mk.other[1] }, { s: 12.5, e: 14.5, st: 'scheduled', l: mk.other[2] }] },
    { name: mk.techs[2], color: '#DB2777', jobs: [{ s: 8, e: 10, st: 'on_the_way', l: mk.other[3] }, { s: 11.5, e: 15, st: 'scheduled', l: mk.other[4] }] },
  ];
  const t0 = 2.5; // WhatsApp thread starts after the assignment lands
  const delay = (i) => ({ animationDelay: `${t0 + i * 0.6}s` });

  return (
    <div className="relative flex flex-col text-ink" aria-hidden="true">
      <style>{CSS}</style>

      {/* Dispatch board */}
      <div className="rounded-2xl bg-sand-50 text-ink shadow-lift ring-1 ring-black/5 overflow-hidden">
        <div className="flex items-center justify-between px-4 h-11 border-b border-sand-200 bg-white">
          <div className="flex items-center gap-2 text-sm font-semibold text-petrol-700">
            <span className="h-2 w-2 rounded-full bg-petrol-500" />{mk.board}
          </div>
          <span className="text-xs text-sand-600">{mk.today} · <span className="ltr-nums">12/10</span></span>
        </div>

        <div className="grid grid-cols-[1fr] sm:grid-cols-[minmax(0,1fr)_auto]">
          {/* lanes */}
          <div className="p-3 sm:p-4 sm:pb-24">
            <div className="flex gap-2 h-5 mb-1">
              <span className="w-14 shrink-0" />
              <div className="relative flex-1">
                {HOURS.map((h) => (
                  <span key={h} className="absolute top-0 text-[10px] text-sand-500 tabular-nums ltr-nums" style={{ insetInlineStart: pct(h) }}>{h}:00</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {lanes.map((lane, i) => (
                <div key={lane.name} className="flex items-stretch gap-2">
                  <div className="w-14 shrink-0 flex items-center gap-1.5 text-xs font-medium">
                    <span className="h-6 w-6 rounded-full grid place-items-center text-[10px] text-white shrink-0" style={{ background: lane.color }}>{lane.name[0]}</span>
                    <span className="truncate">{lane.name}</span>
                  </div>
                  <div className="relative flex-1 h-11 rounded-xl bg-white border border-sand-200/80"
                    style={{ backgroundImage: 'linear-gradient(to right, rgba(220,203,171,.35) 1px, transparent 1px)', backgroundSize: `${100 / (END - START) * 2}% 100%` }}>
                    {lane.jobs.map((j) => <Block key={j.l} start={j.s} end={j.e} status={j.st} label={j.l} />)}
                    {i === 0 && (
                      <Block start={10} end={12.4} status="scheduled" label={mk.jobTitle}
                        className="dm-assigned ring-2 ring-saffron-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* unassigned queue */}
          <div className="hidden sm:block border-s border-sand-200 bg-sand-100/70 p-3 w-[8.5rem]">
            <div className="text-[11px] font-semibold text-sand-700 mb-2">{mk.queue}</div>
            <div className="dm-queue-card rounded-xl bg-white border-2 border-saffron-300 p-2.5 shadow-card">
              <div className="text-xs font-semibold leading-snug">{mk.jobTitle}</div>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-sand-600"><IconPin size={11} />{mk.jobPlace}</div>
              <div className="mt-2 rounded-md bg-petrol-50 text-petrol-700 text-[10px] leading-snug px-1.5 py-1 flex gap-1">
                <IconSpark size={11} className="shrink-0 mt-px" /><span>{mk.ai}</span>
              </div>
            </div>
            <div className="mt-2 rounded-xl border border-dashed border-sand-300 h-12" />
          </div>
        </div>
      </div>

      {/* WhatsApp thread on a phone */}
      <div className="relative mt-4 mx-auto w-[17.5rem] sm:mx-0 sm:self-start sm:-mt-20 sm:ms-16 rounded-[2rem] bg-ink p-2 shadow-lift">
        <div className="rounded-[1.6rem] overflow-hidden bg-[#ECE5DD]">
          <div className="bg-petrol-700 text-sand-50 px-3 py-2.5 flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-sand-50 grid place-items-center">
              <svg viewBox="0 0 48 48" width="20" height="20"><circle cx="24" cy="24" r="17" fill="#0F5C5C" /><path d="M38.2 15.5 A17 17 0 1 0 41 26" fill="none" stroke="#F0AC1C" strokeWidth="4.2" strokeLinecap="round" /></svg>
            </span>
            <div className="leading-tight">
              <div className="text-xs font-semibold">{mk.chatName}</div>
              <div className="text-[10px] text-petrol-200">{mk.chatStatus}</div>
            </div>
          </div>
          <div className="px-2.5 py-3 flex flex-col gap-1.5 text-[11.5px] leading-snug min-h-[19rem]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <Bubble side="in" style={delay(0)}>{mk.msgs[0]}</Bubble>
            <Bubble side="out" style={delay(1)}>{mk.msgs[1]}</Bubble>
            <Bubble side="out" style={delay(2)}>
              {mk.msgs[2]}
              <span className="mt-1 block rounded-md bg-white/70 px-2 py-1 text-petrol-700 font-medium">{mk.track}</span>
            </Bubble>
            <Bubble side="out" style={delay(3)}>
              {mk.msgs[3]} <span className="text-saffron-500 tracking-tight">★★★★★</span>
            </Bubble>
            <Bubble side="out" style={delay(4)}>
              {mk.msgs[4]}
              <span className="mt-1 flex items-center justify-between gap-2 rounded-md bg-white/70 px-2 py-1">
                <span className="text-petrol-700 font-medium">{mk.pay}</span>
                <span className="inline-flex items-center gap-0.5 text-success-600 font-semibold"><IconCheck size={12} />{mk.paid}</span>
              </span>
            </Bubble>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customer's phone: the customer's own message is green at the end side; the company's replies are white at the start.
function Bubble({ side, style, children }) {
  const own = side === 'in';
  return (
    <div className={`dm-b max-w-[88%] rounded-xl px-2.5 py-1.5 shadow-[0_1px_0_rgba(0,0,0,.08)] ${own ? 'self-end bg-[#DCF8C6]' : 'self-start bg-white'}`} style={style}>
      {children}
      <span className="block text-end text-[9px] text-sand-500 mt-0.5 ltr-nums">{own ? '9:58 ✓✓' : '10:02'}</span>
    </div>
  );
}
