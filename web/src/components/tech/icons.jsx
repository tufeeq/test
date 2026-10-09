// OWNER: B4. Stroke icons for the tech PWA (24px grid, currentColor). Directional ones flip in RTL via className.
const P = ({ size = 22, className, children, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{children}</svg>
);

export const IconList = (p) => <P {...p}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></P>;
export const IconUser = (p) => <P {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></P>;
export const IconPhone = (p) => <P {...p}><path d="M5 3h3.5l1.8 4.6-2.3 1.5a12 12 0 0 0 6 6l1.5-2.3L20 14.5V18a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" /></P>;
export const IconMap = (p) => <P {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></P>;
export const IconWhatsApp = (p) => (
  <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" aria-hidden="true" className={p.className} fill="currentColor">
    <path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 5-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.8 2.3 1 2.5.1.1 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3Z" />
  </svg>
);
export const IconClock = (p) => <P {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></P>;
export const IconChevron = ({ className = '', ...p }) => <P {...p} className={`rtl:rotate-180 ${className}`}><path d="m9 6 6 6-6 6" /></P>;
export const IconBack = ({ className = '', ...p }) => <P {...p} className={`rtl:rotate-180 ${className}`}><path d="M15 6l-6 6 6 6" /></P>;
export const IconCamera = (p) => <P {...p}><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></P>;
export const IconCheck = (p) => <P {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></P>;
export const IconPlus = (p) => <P {...p}><path d="M12 5v14M5 12h14" /></P>;
export const IconMinus = (p) => <P {...p}><path d="M5 12h14" /></P>;
export const IconTrash = (p) => <P {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></P>;
export const IconRefresh = (p) => <P {...p}><path d="M20 8a8 8 0 1 0 1 6" /><path d="M20 3v5h-5" /></P>;
export const IconCloudOff = (p) => <P {...p}><path d="M3 3l18 18M8 7.5A5 5 0 0 1 16.6 9 4 4 0 0 1 20 16M17 18H7a4 4 0 0 1-1.2-7.8" /></P>;
export const IconCash = (p) => <P {...p}><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 9v.01M18 15v.01" /></P>;
export const IconLink = (p) => <P {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></P>;
export const IconPen = (p) => <P {...p}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></P>;
export const IconNote = (p) => <P {...p}><path d="M5 4h14v16H5z" /><path d="M9 9h6M9 13h6M9 17h3" /></P>;
export const IconGlobe = (p) => <P {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></P>;
export const IconLogout = ({ className = '', ...p }) => <P {...p} className={`rtl:rotate-180 ${className}`}><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10" /></P>;
export const IconDownload = (p) => <P {...p}><path d="M12 4v11m-5-5 5 5 5-5M5 20h14" /></P>;
