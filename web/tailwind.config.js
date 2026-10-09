import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));

/** Dawra design tokens — see docs/DESIGN.md. Do not add ad-hoc hex colors in components. */
export default {
  content: [path.join(root, 'index.html'), path.join(root, 'src/**/*.{js,jsx}')],
  theme: {
    extend: {
      colors: {
        // Petrol — primary brand, nav, primary buttons, links
        petrol: {
          50: '#EEF6F5', 100: '#D3E8E6', 200: '#A7D0CC', 300: '#72B1AC', 400: '#3F8C87',
          500: '#1E716D', 600: '#0F5C5C', 700: '#0B4A4B', 800: '#093A3B', 900: '#062A2B', 950: '#031B1C',
        },
        // Sand — warm neutrals for surfaces, borders, muted text
        sand: {
          50: '#FBF9F5', 100: '#F5F0E6', 200: '#EADFCB', 300: '#DCCBAB', 400: '#BFA97F',
          500: '#9C8660', 600: '#7A6849', 700: '#5B4E39', 800: '#3D352A', 900: '#26211B',
        },
        // Saffron — the ONE call-to-action accent (primary CTA per screen, "new" badges)
        saffron: {
          50: '#FFF8E6', 100: '#FDEBB8', 200: '#FBD97A', 300: '#F7C344', 400: '#F0AC1C',
          500: '#E0950B', 600: '#B87406', 700: '#8C5709', 800: '#5E3B0A', 900: '#3A2507',
        },
        ink: '#1B2323', // body text: petrol-tinted near-black
        // Job status colors (lifecycle)
        status: {
          new: '#9C8660', scheduled: '#3F6FB5', on_the_way: '#8A5CC2',
          in_progress: '#E0950B', completed: '#2E8B57', cancelled: '#B04A3F',
        },
        danger: { 50: '#FCEFEC', 500: '#C2410C', 600: '#A8380B', 700: '#86300C' },
        success: { 50: '#ECF7F0', 500: '#2E8B57', 600: '#24704A' },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Modular scale 1.2 on 15px body
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
        sm: ['0.8125rem', { lineHeight: '1.3rem' }],
        base: ['0.9375rem', { lineHeight: '1.6rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.35rem', { lineHeight: '1.9rem' }],
        '2xl': ['1.62rem', { lineHeight: '2.2rem' }],
        '3xl': ['1.94rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.33rem', { lineHeight: '2.9rem' }],
        '5xl': ['2.8rem', { lineHeight: '3.3rem' }],
        '6xl': ['3.6rem', { lineHeight: '4.1rem' }],
      },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem', '3xl': '1.75rem' },
      boxShadow: {
        card: '0 1px 0 rgba(38,33,27,0.04), 0 1px 2px rgba(38,33,27,0.06)',
        lift: '0 8px 24px -8px rgba(9,58,59,0.18)',
        ring: '0 0 0 3px rgba(240,172,28,0.45)',
      },
      keyframes: {
        'spin-cycle': { to: { transform: 'rotate(360deg)' } },
        'toast-in': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        'spin-cycle': 'spin-cycle 1.1s linear infinite',
        'toast-in': 'toast-in .18s ease-out',
      },
    },
  },
  plugins: [],
};
