// OWNER: B4. Trade icons for the booking tiles (24px grid, currentColor, 1.75 stroke).
const S = ({ children, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const ICONS = {
  // split unit with airflow
  ac: (
    <>
      <rect x="2.5" y="4" width="19" height="8" rx="2" />
      <path d="M5.5 9.5h13" />
      <path d="M7 15c0 1.5-1 2-1 3.5M12 15c0 1.5-1 2-1 3.5M17 15c0 1.5-1 2-1 3.5" />
    </>
  ),
  // spray bottle + sparkle
  cleaning: (
    <>
      <path d="M9 8h5l1 3v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z" />
      <path d="M10 8V5h4l2 1.5M14 5V3.5" />
      <path d="M19 9.5v3M17.5 11h3" />
    </>
  ),
  // bug with shield
  pest: (
    <>
      <path d="M12 7.5a3.5 3.5 0 0 1 3.5 3.5v3.5a3.5 3.5 0 0 1-7 0V11A3.5 3.5 0 0 1 12 7.5Z" />
      <path d="M12 7.5V18M10 6l-1.5-2M14 6l1.5-2M8.5 11.5H5.5M15.5 11.5h3M8.5 15h-3M15.5 15h3" />
    </>
  ),
  // pipe + drop
  plumbing: (
    <>
      <path d="M3 7h8a3 3 0 0 1 3 3v2" />
      <path d="M3 4.5v5M14 12h3v3h-6v-3" />
      <path d="M14 18.5c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.2 2-3.5 2-3.5s2 2.3 2 3.5Z" />
    </>
  ),
  // bolt
  electrical: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6z" />,
  other: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.4 1.4 0 0 0 2 2l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.4 2.4-2-.6-.6-2z" />
    </>
  ),
};

export default function CategoryIcon({ category, size }) {
  return <S size={size}>{ICONS[category] || ICONS.other}</S>;
}
