# Dawra / دورة: product spec (MVP)

## Problem

Saudi and GCC maintenance contractors with 3–30 technicians run on WhatsApp groups, paper job cards and Excel.

- Jobs get lost.
- Customers call to ask "وين الفني؟" (where's the technician?).
- Maintenance contract visits are forgotten.
- Invoices are late and not ZATCA-compliant.

International field-service management tools (Jobber, ServiceTitan) are English-only, priced in USD, and know nothing about VAT QR codes, Hijri/Gregorian habits or WhatsApp-first customers.

## Positioning

Dawra is an Arabic-first field-service management system built for Saudi trades: AC/HVAC first, then cleaning, pest control, plumbing and electrical. Every job goes from the first call or WhatsApp message to a paid, ZATCA-compliant invoice, and maintenance contracts schedule themselves.

## Personas

| Persona | Context | Primary surface | Jobs-to-be-done |
|---|---|---|---|
| **أبو فهد, the owner** | Runs a 6-technician AC company in Riyadh; often in the field; checks the business from his phone | `/app` dashboard | See today at a glance, cash collected vs. unpaid, which contracts are due, team performance |
| **منيرة, the dispatcher** | Answers calls and WhatsApp all day | `/app/schedule`, `/app/jobs`, `/app/requests` | Turn a request into a scheduled job in under 30 seconds, assign the right tech, reschedule by drag, message the customer |
| **أحمد, the technician** | South Asian or Arab technician, Arabic or English, cheap Android phone, poor signal on rooftops | `/tech` PWA | See today's route, call or navigate to the customer, change status, take before/after photos, add parts and services, get a signature, collect payment |
| **The customer** | Homeowner or facility manager | `/b/:slug`, `/t/:token`, `/i/:token` | Book without calling, know when the tech arrives, pay the invoice online, rate the service |

## MVP features

1. **Company onboarding.** Sign up, then a 14-day trial (Pro limits). Set up company profile, VAT number and CR number, the team (owner, dispatcher, technicians with skills and colours), and the price list.
2. **Customers, sites and assets.** A customer has many sites, and each site has AC units with brand, BTU and install date. Search by phone.
3. **Jobs.**
   - Lifecycle: new → scheduled → on the way → in progress → completed (or cancelled).
   - Each job has priority, category, checklist, line items from the price list, before/after photos, signature, an activity timeline, and a public tracking link.
4. **Schedule board.** A day/week view by technician lane, plus an unassigned queue; assign and reschedule.
5. **Technician PWA.**
   - Today's jobs.
   - One-tap call, Google Maps navigation and WhatsApp.
   - Status buttons, checklist, photos (compressed client-side), adding services, signature pad.
   - Installable through the web app manifest.
6. **Maintenance contracts (عقود الصيانة).** Visits per year and the next visit date. The hourly scheduler auto-creates contract visit jobs 7 days ahead.
7. **Invoices.**
   - Simplified (B2C) and standard (B2B) tax invoices with 15% VAT and a ZATCA Phase-1 TLV QR code.
   - PDF, payment status, and a Moyasar payment link (simulated when there's no key).
   - Public invoice page.
8. **Public booking page** (`/b/:slug`). Customer form, then AI triage (Arabic) that suggests category, priority and services, then the request lands in the dispatcher's queue; one click converts it to a job.
9. **Customer notifications.** WhatsApp Cloud API templates for: job scheduled, technician on the way (with tracking link), job completed, and invoice issued (with payment link). Every message is logged; simulated without keys.
10. **Dashboard.** Today's jobs by status, revenue this month vs. last month, unpaid total, upcoming contract visits, pending booking requests, average rating, and live technician status.
11. **Bilingual.** Arabic RTL by default, English toggle; per-user locale.

### Out of scope for MVP

Inventory and stock, payroll and commissions, ZATCA Phase-2 (Fatoora API integration), native apps, offline sync beyond PWA caching, multi-branch, customer accounts and logins.

## Pricing (SAR / month, VAT-exclusive)

| Plan | Price | Technicians | Highlights |
|---|---|---|---|
| **Trial** | 0 for 14 days | up to 10 | Everything in Pro |
| **Starter** | **149** | ≤ 3 | Jobs, schedule, tech app, invoices with QR, booking page |
| **Pro** | **449** | ≤ 10 | Everything in Starter, plus maintenance contracts and auto-scheduling, WhatsApp notifications, AI triage, online payments |
| **Business** | **999** | ≤ 25 | Everything in Pro, plus priority support, custom checklist templates, and data export |

- Annual billing: 2 months free (shown on the pricing page; MVP checkout is monthly).
- Limits are enforced when adding active technicians (HTTP 402 `plan_limit`).
- When the trial ends with no payment, `subscription_status='expired'` and the app becomes read-only (later phase; MVP shows a banner).

## Success metrics (pilot)

- Time from booking request to scheduled job: under 2 minutes.
- Over 80% of completed jobs have photos and a signature.
- Over 60% of invoices are issued the same day as job completion.
- 10 paying companies in the first 60 days.
