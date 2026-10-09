# Dawra design system

## Point of view

Dawra is the operations room of a small Riyadh AC contractor. The owner is in a pickup between jobs, the dispatcher has a phone in each hand, and the technician stands on a rooftop at 46°C. The UI should feel **cool, calm and sure of itself**, like walking into an air-conditioned room. We avoid the generic blue SaaS look and the cream-and-serif "editorial" look.

- **Petrol** (deep teal) is the brand and the "cool air" colour: navigation, primary actions, data.
- **Sand** neutrals replace grey everywhere. Surfaces are warm, never `#F4F1EA` paper-cream, and never pure white for the page background.
- **Saffron** is the single hot accent, the thing to do now. Use it for **at most one CTA per screen**, plus the logo arc. Never use it for decoration.
- **The cycle motif.** The logo is a 300° arc with an arrowhead (دورة = cycle, round, a maintenance visit). The spinner reuses the arc. Contract visits and recurring work may reuse the motif. Don't add other decorative shapes.

## Tokens (`web/tailwind.config.js`)

| Token | Hex | Use |
|---|---|---|
| `petrol-600` | `#0F5C5C` | Brand, primary button, active nav, links |
| `petrol-700` | `#0B4A4B` | Sidebar, tech header, petrol cards |
| `petrol-50` | `#EEF6F5` | Hover rows, selected state |
| `sand-50` | `#FBF9F5` | Page background |
| `sand-100` / `200` | `#F5F0E6` / `#EADFCB` | Muted surfaces / borders |
| `sand-600` | `#7A6849` | Secondary text |
| `ink` | `#1B2323` | Body text (petrol-tinted near-black) |
| `saffron-400` | `#F0AC1C` | CTA background (text `petrol-900`), focus ring |
| `danger-500` | `#C2410C` | Destructive, errors |
| `success-500` | `#2E8B57` | Paid, completed |

**Job status colours** (`STATUS_COLORS` in `Badge.jsx`; also `bg-status-*` in Tailwind). Always render status with `<StatusBadge status>`; never hand-roll it.

| Status | Hex | Description |
|---|---|---|
| `new` | `#9C8660` | Sand |
| `scheduled` | `#3F6FB5` | Slate blue |
| `on_the_way` | `#8A5CC2` | Violet |
| `in_progress` | `#E0950B` | Saffron |
| `completed` | `#2E8B57` | Green |
| `cancelled` | `#B04A3F` | Brick |

Technicians each have a `users.color`. Use it for their lane and avatar on the schedule board.

## Type

- **IBM Plex Sans Arabic** (Google Fonts, weights 300–700) for both scripts. It covers Latin as well, so the brand voice stays the same in English.
- The scale is 1.2 on a 15px body: `text-xs 12`, `sm 13`, `base 15`, `lg 18`, `xl 21.6`, `2xl 26`, `3xl 31`, `4xl 37`, `5xl 45`, `6xl 58`.
- Page titles are `text-2xl sm:text-3xl font-bold`. Card titles are `text-lg font-semibold`. Labels are `text-sm font-medium text-sand-800`.
- No all-caps labels, no letter-spaced eyebrows, and don't colour a single word inside a headline.
- Numbers are always `tabular-nums` and Latin digits (the `Intl` formatter uses `-u-nu-latn`). Money is `fmtMoney(150)`, which gives `150.00 ر.س`.

## Shape and depth

| Element | Radius |
|---|---|
| Cards and tables | `rounded-2xl` (20px) |
| Inputs and buttons | `rounded-xl` (14px) |
| Small buttons | `rounded-lg` |
| Badges | pill |
| Bottom-sheet modal on mobile | `rounded-t-3xl` |

- `shadow-card` is a barely-there resting shadow.
- `shadow-lift` is for things that float: modals, toasts, a dragged job card.
- Don't put shadows on everything. Nested surfaces use `bg-sand-100`, not another shadow.

## Spacing and layout

- **App:**
  - Desktop: sidebar `w-64` in `petrol-700`, content `max-w-7xl` with `px-4 lg:px-8 py-6`.
  - Section gaps: `gap-6`. Inside cards: `p-5`.
- **Tech PWA:**
  - Single column, petrol top bar and a white bottom tab bar.
  - Minimum touch target 44px (`size="lg"` buttons).
  - The primary status action is a full-width saffron `Button variant="cta" size="lg" block`, pinned above the tab bar.
- **Public pages:** a centred column (`max-w-lg`) with the company's identity first (logo, name) and Dawra small in the footer. These pages belong to the contractor's brand.
- **Marketing:** may be bolder (large Arabic display type, petrol full-bleed sections), but uses the same tokens.

## RTL rules

- The default is Arabic, `dir="rtl"` on `<html>`, toggled by `useI18n().setLocale`.
- Use only logical utilities: `ms/me/ps/pe/start/end/text-start/text-end/border-s/border-e`.
- Directional icons (chevrons, back arrows) get `rtl:rotate-180`. Clocks, checkmarks and the logo do not flip.
- Phones, emails, VAT numbers and invoice numbers go in `dir="ltr"` inputs or `.ltr-nums` spans.

## Components (`web/src/components/ui`)

| Component | API |
|---|---|
| `Button` | `variant: primary \| cta \| secondary \| ghost \| danger`, `size: sm \| md \| lg`, `loading`, `icon`, `block`, `as={Link}` |
| `Input` / `Select` / `Textarea` | `label`, `hint`, `error`, `required` (built on `Field`) |
| `Card` | `title`, `subtitle`, `actions`, `tone: white \| sand \| petrol`, `padded` |
| `Badge` | `tone`, `dot` |
| `StatusBadge` | `status` |
| `PriorityBadge` | `priority` (renders nothing for `normal`) |
| `Modal` | `open`, `onClose`, `title`, `footer`, `size`; a bottom sheet on mobile |
| `Table` | `columns[{ key, header, render, align }]`, `rows`, `onRowClick`, `loading`, `empty` |
| `EmptyState` | `title`, `body`, `action`. Write it as an invitation to act ("أضف أول عميل"), not as an apology. |
| `Stat` | `label`, `value`, `delta`, `trend`, `hint` |
| `PageHeader` | `title`, `subtitle`, `back`, `actions` |
| `Tabs` | `items[{ value, label, count }]`, `value`, `onChange` |
| `Spinner` / `FullPageSpinner` | — |
| `ToastProvider` / `useToast()` | `.success(msg)`, `.error(errOrMsg)` (maps ApiError codes to i18n `errors.*`), `.info()` |
| `Logo` / `LogoMark` | `mark`, `size`, `tone="light"` on petrol backgrounds |
| `LangToggle` | — |

## Motion

- Keep motion to almost nothing: the toast slides in, and the spinner rotates.
- No staggered fade-ins on page load and no hover lifts on cards.
- Everything respects `prefers-reduced-motion` (`index.css`).

## Copy voice

Arabic first: Saudi-friendly Modern Standard Arabic, short and direct, using the words the trade uses (غسيل مكيف, فريون, كباستور, عقد صيانة, فني). Buttons say exactly what happens: «إسناد للفني», «إصدار الفاتورة», «في الطريق». Errors state what happened and how to fix it. The English mirrors the Arabic; it isn't a separate voice.
