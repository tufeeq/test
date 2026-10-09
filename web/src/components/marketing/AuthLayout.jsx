// Two-column auth layout (B5): form on a sand surface, petrol brand panel beside it (hidden on mobile).
import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/index.js';
import { LangButton } from './Shell.jsx';
import { useM } from './useMarketing.js';
import { IconCheck } from './icons.jsx';

export default function AuthLayout({ children }) {
  const m = useM();
  return (
    <div className="min-h-dvh grid lg:grid-cols-[1fr_minmax(0,32rem)] bg-sand-50">
      <div className="flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label={m.auth.back}><Logo /></Link>
          <LangButton tone="light" />
        </div>
        <div className="flex-1 grid place-items-center py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
      <aside className="hidden lg:flex flex-col justify-between bg-petrol-800 text-sand-50 p-12 relative overflow-hidden">
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -bottom-28 -start-28 w-[30rem] h-[30rem] opacity-[.12]">
          <path d="M170 64 A80 80 0 1 0 180 110" fill="none" stroke="#F0AC1C" strokeWidth="14" strokeLinecap="round" />
          <path d="M152 40 L186 52 L168 84 Z" fill="#F0AC1C" />
        </svg>
        <Logo tone="light" size={34} />
        <div className="relative">
          <p className="text-3xl font-bold leading-snug max-w-sm">{m.auth.asideTitle}</p>
          <ul className="mt-8 space-y-3 text-petrol-100">
            {m.auth.asidePoints.map((p) => (
              <li key={p} className="flex gap-3"><IconCheck size={20} className="text-saffron-300 shrink-0" />{p}</li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-petrol-300">{m.footer.made}</p>
      </aside>
    </div>
  );
}
