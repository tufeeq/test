// Page sweep in a real browser: no console errors, no uncaught page errors, no horizontal overflow, at 390 and 1280 px,
// light and dark, for the landing page (ar/en), the app routes (guest and signed in), the legal pages, 404 and the admin.
// Playwright is NOT an app dependency: it is required from PLAYWRIGHT_DIR (a folder whose node_modules has playwright),
// and Chromium from PW_CHROMIUM (default /opt/pw-browsers/chromium). Without them the suite is skipped (exit code 3).
"use strict";
const path = require("path");
const { signup, admin, ok, section, done, uid, BASE } = require("./lib");

let chromium;
try {
  const dir = process.env.PLAYWRIGHT_DIR;
  if (!dir) throw new Error("PLAYWRIGHT_DIR is not set");
  ({ chromium } = require(require.resolve("playwright", { paths: [dir, path.join(dir, "node_modules")] })));
} catch (e) { console.log(`  skip: Playwright not available (${e.message}). Set PLAYWRIGHT_DIR to a folder with node_modules/playwright.`); process.exit(3); }

// failures we cannot fix from here: web fonts are external and blocked offline; the browser's own favicon probe
const IGNORE = /fonts\.(googleapis|gstatic)\.com|ERR_TUNNEL_CONNECTION_FAILED|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED|net::ERR_FAILED.*fonts/;

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || "/opt/pw-browsers/chromium" });
  const student = await signup(`smoke_${uid()}@t.com`, "password123", "سارة <img src=x onerror=alert(1)> ‮RTL " + "😀".repeat(6));
  const A = await admin();
  const cookieOf = c => { const [k, v] = c.ck().split("="); return [{ name: k, value: v, url: BASE }]; };
  const pages = [
    ["/", null], ["/?lang=en", null], ["/privacy", null], ["/terms", null], ["/privacy?lang=en", null], ["/terms?lang=en", null], ["/nope-404", null],
    ...["today", "plan", "learn", "practice", "progress", "guide", "upgrade"].map(r => [`/app#${r}`, null]),
    ...["today", "learn", "progress", "upgrade"].map(r => [`/app?lang=en#${r}`, student]),
    ["/admin.html", null], ["/admin.html", A]
  ];
  let n = 0;
  for (const [w, h] of [[390, 844], [1280, 900]]) for (const scheme of ["light", "dark"]) {
    section(`${w}px ${scheme}`);
    for (const [url, who] of pages) {
      if (scheme === "dark" && w === 390 && /privacy|terms/.test(url) && /lang=en/.test(url)) continue; // covered by the Arabic run
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, locale: "ar-SA" });
      if (who) await ctx.addCookies(cookieOf(who));
      const page = await ctx.newPage(), errs = [];
      page.on("console", m => { if (m.type() === "error" && !IGNORE.test(m.text() + (m.location().url || "")) && !(url === "/nope-404" && /status of 404/.test(m.text()))) errs.push(m.text().slice(0, 160)); });
      page.on("pageerror", e => errs.push("pageerror: " + String(e.message).slice(0, 160)));
      page.on("dialog", d => { errs.push("dialog: " + d.message()); d.dismiss(); });
      page.on("requestfailed", r => { if (r.method() === "HEAD" && /ERR_ABORTED/.test((r.failure() || {}).errorText)) return; // Chromium reports a HEAD fetch whose (empty) body is never read as aborted
      if (!IGNORE.test(r.url() + " " + (r.failure() || {}).errorText)) errs.push("requestfailed: " + r.url()); });
      page.on("response", r => { if (r.status() >= 500) errs.push(`HTTP ${r.status()} ${r.url()}`); });
      const resp = await page.goto(BASE + url, { waitUntil: "load" }).catch(e => ({ status: () => 0, e }));
      await page.waitForTimeout(/admin/.test(url) && who ? 1500 : 700);
      const st = resp.status();
      const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, h1: document.querySelectorAll("h1").length, title: document.title, lang: document.documentElement.lang,
        wide: [...document.querySelectorAll("body *")].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(e).position !== "fixed" && !e.closest("[hidden],.lp-cmp-scroll,.tbl,pre,code"); }).slice(0, 3).map(e => e.tagName + "." + String(e.className).slice(0, 30)) }));
      const label = `${url}${who ? (who === A ? " (admin)" : " (student)") : ""}`;
      ok(st === 200 || (url === "/nope-404" && st === 404), `${label}: HTTP ${st}`);
      ok(!errs.length, `${label}: no console/page errors`, errs);
      ok(m.sw <= m.iw + 1, `${label}: no horizontal overflow (${m.sw} <= ${m.iw})`, m.wide);
      ok(m.title && m.title.length > 3, `${label}: has a title`, m.title);
      n++;
      await ctx.close();
    }
  }
  section("student name with HTML / RTL override / emoji in the admin");
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } }); await ctx.addCookies(cookieOf(A));
  const page = await ctx.newPage(); let alerted = false; page.on("dialog", d => { alerted = true; d.dismiss(); });
  await page.goto(BASE + "/admin.html#students", { waitUntil: "load" }); await page.waitForTimeout(1200);
  await page.fill("#st-q", "RTL"); await page.waitForTimeout(1200);
  const shown = await page.evaluate(() => [...document.querySelectorAll("[data-open]")].map(b => b.textContent).find(t => /RTL/.test(t)) || null);
  if (shown) { await page.click("[data-open]"); await page.waitForTimeout(1000); await page.screenshot({ path: process.env.SHOT_DIR ? path.join(process.env.SHOT_DIR, "admin-weird-name.png") : "/dev/null" }).catch(() => {}); }
  const drawer = await page.evaluate(() => { const t = document.querySelector("#dr-t"); return t ? { text: t.textContent, w: t.scrollWidth, cw: t.clientWidth } : null; });
  ok(drawer && drawer.text === shown, "student drawer shows the same cleaned name", drawer);
  ok(!alerted, "no script ran from a student's name");
  ok(shown && !/[<>‮]/.test(shown), "name shown as text with <> and RTL-override removed at sign-up", shown);
  const imgs = await page.evaluate(() => document.querySelectorAll("img[src='x']").length); ok(imgs === 0, "no <img> injected");
  await ctx.close();
  section("first visit: the diagnostic runs without an account, then the result is saved by signing up");
  {
    const fwd = `10.253.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, extraHTTPHeaders: { "X-Forwarded-For": fwd } });
    const pg = await c.newPage(), errs = []; pg.on("pageerror", e => errs.push(String(e.message).slice(0, 160)));
    await pg.goto(BASE + "/app", { waitUntil: "load" }); await pg.waitForTimeout(1200);
    const first = await pg.evaluate(() => ({ starts: document.querySelectorAll("#main [data-start]").length, steps: document.querySelectorAll(".first-steps li").length, locks: document.querySelectorAll("#main [data-lock]").length }));
    ok(first.starts === 1 && first.steps === 3 && first.locks === 0, "a new student sees one action and three steps, no locks", first);
    await pg.click('[data-start="diag"]'); await pg.waitForTimeout(500);
    ok(await pg.evaluate(() => document.querySelector("#acct").hidden) && !!(await pg.$(".opt")), "the first question shows with no sign-up form");
    for (let i = 0; i < 40; i++) {
      const o = await pg.$(".opt:not([disabled])"); if (!o) break; await o.click();
      const nx = await pg.$("#ex-next"); if (nx) { await nx.click(); continue; }
      await pg.click("#ex-end"); await pg.waitForTimeout(300);
      await pg.evaluate(() => { const b = [...document.querySelectorAll("#exam button")].find(x => x.id !== "ex-end" && /^(إنهاء|Finish)/.test(x.innerText.trim())); if (b) b.click(); });
      await pg.waitForTimeout(700); break;
    }
    const res = await pg.evaluate(() => ({ kpis: document.querySelectorAll(".rs-kpis > div").length, lock: !!document.querySelector(".rs-kpis .kpi-lock"), save: !!document.querySelector("#rs-save"), note: !!document.querySelector(".rs-note") }));
    ok(res.kpis === 5 && !res.lock && res.note, "the diagnostic result shows the estimated score unlocked", res);
    ok(res.save, "a guest is offered to save the result");
    await pg.click("#rs-save"); await pg.waitForTimeout(300);
    const em = `guest_${uid()}@t.com`;
    await pg.fill("#ac-name", "Guest Journey"); await pg.fill("#ac-phone", "0512345678"); await pg.fill("#ac-email", em); await pg.fill("#ac-pass", "password123"); await pg.check("#ac-ok");
    await pg.click("#ac-form button[type=submit]"); await pg.waitForTimeout(2500);
    const aft = await pg.evaluate(() => ({ dialog: !document.querySelector("#acct").hidden, save: !!document.querySelector("#rs-save"), result: !!document.querySelector(".rs-head") }));
    ok(!aft.dialog && !aft.save && aft.result, "after sign-up the result stays and the save card is gone", aft);
    await pg.waitForTimeout(3500);
    const srv = await pg.evaluate(async () => { const r = await fetch("/api/progress", { headers: { "X-Masar": "1" } }); const j = await r.json(); const st = JSON.parse(j.p || "{}"); return { kinds: (st.attempts || []).map(x => x.kind), diag: !!st.diag }; });
    ok(srv.diag && srv.kinds.join() === "diag", "the guest's diagnostic is stored in the new account", srv);
    await pg.click("#rs-close"); await pg.goto(BASE + "/app#practice"); await pg.waitForTimeout(900);
    const pr = await pg.evaluate(() => { const f = document.querySelector('.pro-fold[data-fold="practice"]'); return { fold: !!f, open: f && f.open, free: document.querySelectorAll("#main > .pgrid .pcard").length, inFold: f ? f.querySelectorAll(".mbox").length : 0 }; });
    ok(pr.fold && !pr.open && pr.free === 2 && pr.inFold === 30, "practice: free cards first, locked items folded behind one line", pr);
    ok(!errs.length, "no page errors on the journey", errs);
    await c.close();
  }
  await browser.close();
  console.log(`  .    ${n} page loads`);
  await done();
})().catch(e => { console.error("suite crashed:", e); process.exit(1); });
