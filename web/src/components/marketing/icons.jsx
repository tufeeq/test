// Small inline icons for marketing pages (B5). 24px grid, currentColor stroke.
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const I = ({ children, size = 20, className }) => <svg {...base} width={size} height={size} className={className}>{children}</svg>;

export const IconBoard = (p) => <I {...p}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M9 9v11" /><path d="M12 13h5M12 16.5h3" /></I>;
export const IconPhone = (p) => <I {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></I>;
export const IconChat = (p) => <I {...p}><path d="M4 19.5l1.3-3.6A8 8 0 1 1 8.4 19z" /><path d="M9 11h6M9 14h4" /></I>;
export const IconQr = (p) => <I {...p}><rect x="3.5" y="3.5" width="6" height="6" rx="1" /><rect x="14.5" y="3.5" width="6" height="6" rx="1" /><rect x="3.5" y="14.5" width="6" height="6" rx="1" /><path d="M14.5 14.5h2v2M20.5 14.5v6h-6M17.5 18v2.5" /></I>;
export const IconCycle = (p) => <I {...p}><path d="M19.5 9A8 8 0 1 0 20 13" /><path d="M20 4.5V9h-4.5" /></I>;
export const IconSpark = (p) => <I {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" /></I>;
export const IconCard = (p) => <I {...p}><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 10h19M6.5 15h4" /></I>;
export const IconLink = (p) => <I {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></I>;
export const IconCheck = (p) => <I {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></I>;
export const IconX = (p) => <I {...p}><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" /></I>;
export const IconMinus = (p) => <I {...p}><path d="M6 12h12" /></I>;
export const IconPlus = (p) => <I {...p}><path d="M12 5v14M5 12h14" /></I>;
export const IconPin = (p) => <I {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></I>;
export const IconMenu = (p) => <I {...p}><path d="M4 7h16M4 12h16M4 17h16" /></I>;
export const IconPlay = (p) => <I {...p}><path d="M8 5.5v13l10.5-6.5z" /></I>;
export const IconArrow = (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>;
