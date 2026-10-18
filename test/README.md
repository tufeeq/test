# Tests

`npm test` runs every `test/*.test.js` against a real server and a real Postgres, then exits non-zero if any suite failed.

## What you need
- **Postgres** reachable at `TEST_DATABASE_URL` (default `postgres://pg@localhost:5433/t4`). Use a throw-away database: the suites create accounts, payments and coupons in it (the server creates the tables itself on start).
- **Node 22** (see `engines` in package.json).
- Nothing else. The runner starts:
  - the **Moyasar mock** (`test/mock-moyasar.js`), on a free port;
  - the **server** (`server.js`), on a free port, with `test/mock-oauth.cjs` preloaded, so Google and Facebook sign-in can be tested without the real providers.

  The server runs with these settings: `ADMIN_EMAILS=admin@test.com`, `MOYASAR_SECRET_KEY=sk_test_mock`, `MOYASAR_WEBHOOK_SECRET=whsec_test` and fake OAuth app keys.
- **Optional: Playwright**, for `smoke.test.js` only. It is not a dependency of the app. Point `PLAYWRIGHT_DIR` at a folder whose `node_modules` contains `playwright`. Chromium comes from `PW_CHROMIUM` (default `/opt/pw-browsers/chromium`). Without Playwright the smoke suite is reported as SKIP, not as a failure.

```sh
TEST_DATABASE_URL=postgres://pg@localhost:5433/t4 \
PLAYWRIGHT_DIR=/path/to/folder-with-playwright \
npm test
```

## Other environment variables
| Variable | Effect |
|---|---|
| `SUITES=fuzz,api` | Run only these suites (file names without `.test.js`). |
| `TEST_SERVER=http://localhost:5114` | Test a server that is already running instead of starting one. Its `ADMIN_EMAILS` must include `admin@test.com`. The OAuth callback checks are skipped. |
| `SERVER_LOG=1` | Stream the server's log while the tests run. Either way, the runner prints any error lines the server logged during each suite. |
| `SHOT_DIR=/tmp/shots` | `smoke.test.js` saves a screenshot of the admin student drawer here. |

The admin account `admin@test.com` / `adminpass1` is created on first use.

## Suites
| File | What it checks |
|---|---|
| `api.test.js` | Every `/api/admin` route returns 401 or 403 without an admin session. The CSRF header is required on every mutation. Settings, coupons, users, CSV formula injection, overview/KPI consistency, gateway errors. Every admin mutation is in the audit log. |
| `billing.test.js` | Quotes and rounding. Checkout → pay → return/callback/recheck, and settling happens exactly once. Renewals stack. Coupon races. Expired/failed/canceled invoices and amount mismatches. Partial and full refunds, revoke behaviour, and that a refunded payment never re-activates. |
| `data.test.js` | Concurrent progress saves. Optimistic concurrency (`base` → 409 `conflict`). The 2 MiB limit, exactly at it and 1 byte over. Pool exhaustion with 100 concurrent requests. Concurrent grants. |
| `fuzz.test.js` | About 2,000 malformed requests: wrong types, huge strings, odd Unicode, NUL bytes, invalid or duplicate-key JSON, odd headers, query strings and paths, Range headers, cookies. Expects a clean 4xx with an `error` code, never a 5xx or a stack trace. Checks that stored data stays clean. |
| `sessions.test.js` | Cookie flags. Session lifetime and sliding renewal. Logout and `logout-all`. A password change signs out the other devices. A deleted account's live sessions can do nothing. Login/sign-up/password/progress rate limits, and that an attacker cannot lock a student out. Open redirects on `/auth/*`. OAuth state: forged, tampered, expired, replayed. |
| `smoke.test.js` | Browser sweep at 390 and 1280 px, light and dark: landing (ar/en), app routes (guest and signed in), legal pages, 404, admin. Checks for console errors, page errors and horizontal overflow. A student name containing HTML, an RTL override and emoji must render as plain text in the admin. |

Exit codes: 0 = pass, 1 = fail, 3 = skipped.

## Load test (not part of `npm test`)
```sh
BASE=http://localhost:5114 SERVER_PID=<pid> node test/load.js 50 300   # 50 users for 300 s
```
Each simulated user signs in, saves progress, reads the config and makes audio Range requests. The script prints p50/p95/p99 latency for each step and the server's memory use (RSS) before and after.
