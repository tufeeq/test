// Inline SVG icon set for the owner/dispatcher app. <Icon name="jobs" size={18} />
// Stroke icons on a 24 grid, currentColor. Directional icons (chevron, arrow) carry `flip` so they mirror in RTL.
import { cx } from '../../lib/cx.js';

const P = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  schedule: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /><path d="M7 13.5h4M7 17h7" /></>,
  jobs: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.6 17.4a1.4 1.4 0 0 0 2 2l5.7-5.7a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-.5-.5-2z" /></>,
  inbox: <><path d="M3 13l3-8h12l3 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M3 13h5l1.5 2.5h5L16 13h5" /></>,
  customers: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.4 3.4-5.5 6.5-5.5s5.7 2.1 6.5 5.5" /><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.8 3 2.6 3.5 5.2" /></>,
  contracts: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9.5 15.5a3 3 0 1 0 1-2.2M9.5 12v1.8h1.8" /></>,
  invoices: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  services: <><path d="M3 7l4-4h6l8 8-10 10-8-8z" /><circle cx="8.5" cy="8.5" r="1.5" /></>,
  team: <><circle cx="12" cy="7.5" r="3.5" /><path d="M5 20.5c.9-3.8 3.7-6 7-6s6.1 2.2 7 6" /></>,
  messages: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4L5.3 5.3" /></>,
  billing: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 9.5h19M6 15h4" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="M6 6l12 12M18 6L6 18" /></>,
  chevron: <><path d="M9 6l6 6-6 6" /></>,
  chevronDown: <><path d="M6 9l6 6 6-6" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  phone: <><path d="M5 3.5h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 4.8 4.8L14 12l4.5 1.5V17a2 2 0 0 1-2 2A13.5 13.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" /></>,
  whatsapp: <><path d="M4 20l1.2-3.8A8 8 0 1 1 8 19z" /><path d="M9 8.5c0 3 2.5 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.4-2.6-2-3-3l1-1-1-2z" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></>,
  check: <><path d="M5 12.5l4.5 4.5L19 7.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  alert: <><path d="M12 3.5l9.5 16.5h-19z" /><path d="M12 10v4.5M12 17.2v.3" /></>,
  sparkle: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" /></>,
  download: <><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4.4 4.2-7 8-7s7 2.6 8 7" /></>,
  logout: <><path d="M15 4h4v16h-4" /><path d="M10 8l-4 4 4 4M6 12h10" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.5 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.5-3.5-8.5s1-5.9 3.5-8.5z" /></>,
  camera: <><path d="M4 8h3l2-2.5h6L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>,
  cycle: <><path d="M19 8a8 8 0 1 0 1 6" /><path d="M20 3v5h-5" /></>,
  filter: <><path d="M4 5h16l-6 7.5V19l-4-2v-4.5z" /></>,
  qr: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" /></>,
  snow: <><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /><path d="M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5" /></>,
  money: <><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6.5 9.5v.01M17.5 14.5v.01" /></>,
  star: <><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z" /></>,
  send: <><path d="M4 12l16-8-6 16-2.5-6.5z" /><path d="M11.5 13.5L20 4" /></>,
  calendar: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /></>,
  grip: <><circle cx="9" cy="6" r="1" /><circle cx="15" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
};

const FLIP = new Set(['chevron', 'arrow', 'send', 'logout']);

export default function Icon({ name, size = 18, className, strokeWidth = 1.8, title }) {
  const body = P[name];
  if (!body) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : 'true'} role={title ? 'img' : undefined}
      className={cx('shrink-0', FLIP.has(name) && 'rtl:-scale-x-100', className)}>
      {title && <title>{title}</title>}
      {body}
    </svg>
  );
}
