// Explainers in a real browser: every scene and beat of all 66 explainers renders from the bundles the server builds
// (guest: the free bundle only; subscriber: free + premium), and the player's final challenge works end to end at
// phone and desktop width (in-flow challenge, scene-only controls disabled, end card, completion hook, keyboard close).
// Needs Playwright like smoke.test.js (PLAYWRIGHT_DIR, PW_CHROMIUM); skipped (exit 3) without it.
"use strict";
const path = require("path");
const { signup, admin, ok, section, done, uid, BASE } = require("./lib");

let chromium;
try {
  const dir = process.env.PLAYWRIGHT_DIR;
  if (!dir) throw new Error("PLAYWRIGHT_DIR is not set");
  ({ chromium } = require(require.resolve("playwright", { paths: [dir, path.join(dir, "node_modules")] })));
} catch (e) { console.log(`  skip: Playwright not available (${e.message}).`); process.exit(3); }

const IGNORE = /fonts\.(googleapis|gstatic)\.com|ERR_TUNNEL_CONNECTION_FAILED|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED|net::ERR_FAILED|net::ERR_ABORTED/; // ERR_ABORTED: a save cut short when the test closes the page

// renders every scene of every registered explainer on an off-screen board and runs each beat's animation to its end
const RENDER_ALL = () => {
  const out = { n: XP.all().length, errors: [], beats: 0 };
  const host = document.createElement("div"); host.className = "xp"; host.style.cssText = "position:fixed;left:-2000px;top:0;width:640px;height:360px";
  document.body.appendChild(host);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("viewBox", "0 0 640 360"); svg.setAttribute("class", "xp-stage"); host.appendChild(svg);
  for (const L of XP.all()) {
    host.setAttribute("dir", L.lang === "en" ? "ltr" : "rtl");
    if (!L.title || !L.scenes.length || !(L.quiz || []).length) out.errors.push(`${L.key}: missing title, scenes or quiz`);
    (L.quiz || []).forEach((q, i) => { if (!(q.a >= 0 && q.a < q.o.length) || new Set(q.o).size !== q.o.length || !q.e) out.errors.push(`${L.key} quiz ${i + 1}: bad answer index, duplicate options or no explanation`); });
    L.scenes.forEach((sc, si) => {
      try {
        svg.innerHTML = ""; const c = sc.setup(svg); c._stage = svg;
        for (const b of sc.beats) {
          if (typeof b.say !== "string" || !b.say.trim()) out.errors.push(`${L.key} s${si + 1}: a beat without narration`);
          const t = b.run ? b.run(c) : null; if (t) t.progress(1);
          if (b.after) { const t2 = b.after(c, true); if (t2) t2.progress(1); }
          out.beats++;
        }
      } catch (e) { out.errors.push(`${L.key} s${si + 1}: ${e.message}`); }
      gsap.killTweensOf("*");
    });
  }
  host.remove();
  return out;
};

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || "/opt/pw-browsers/chromium" });
  const A = await admin();
  const U = await signup(`xp_${uid()}@t.com`);
  const cookieOf = c => { const [k, v] = c.ck().split("="); return [{ name: k, value: v, url: BASE }]; };
  const page = async (who, vp) => {
    const ctx = await browser.newContext({ viewport: vp || { width: 1280, height: 800 }, reducedMotion: "reduce" });
    if (who) await ctx.addCookies(cookieOf(who));
    const p = await ctx.newPage(); p.errs = [];
    p.on("pageerror", e => p.errs.push("pageerror: " + e.message));
    p.on("console", m => { if (m.type() === "error" && !IGNORE.test(m.text() + " " + JSON.stringify(m.location()))) p.errs.push(m.text()); });
    p.on("requestfailed", r => { if (!IGNORE.test(r.url() + " " + (r.failure() || {}).errorText)) p.errs.push("requestfailed " + r.url()); });
    return p;
  };
  try {
    section("guest: free explainers only");
    let p = await page(null);
    await p.goto(BASE + "/app", { waitUntil: "load" });
    await p.waitForFunction(() => window.XP && XP.all().length > 0, null, { timeout: 15000 });
    await p.waitForTimeout(500);
    let r = await p.evaluate(RENDER_ALL);
    ok(r.n === 16, "a guest has the 16 free explainers", r.n);
    ok(r.errors.length === 0, `every free scene renders (${r.beats} beats)`, r.errors);
    ok(p.errs.length === 0, "no console or page errors (guest)", p.errs);
    await p.context().close();

    section("subscriber: all 66 explainers render from free + premium bundles");
    p = await page(A);
    await p.goto(BASE + "/app", { waitUntil: "load" });
    const all = await p.waitForFunction(() => window.XP && XP.all().length === 66, null, { timeout: 20000 }).then(() => true, () => false);
    ok(all, "premium bundle loads for a subscriber (66 explainers)", await p.evaluate(() => window.XP && XP.all().length));
    r = await p.evaluate(RENDER_ALL);
    ok(r.errors.length === 0, `every scene of every explainer renders (${r.beats} beats)`, r.errors.slice(0, 10));
    ok(p.errs.length === 0, "no console or page errors (subscriber)", p.errs);
    await p.context().close();

    for (const [vp, key] of [[{ width: 390, height: 844 }, "ar-order"], [{ width: 1280, height: 800 }, "en-ge-angles"]]) {
      section(`player at ${vp.width}px: ${key}`);
      p = await page(U, vp);
      await p.goto(BASE + "/app" + (key.startsWith("en-") ? "?lang=en" : ""), { waitUntil: "load" });
      await p.waitForFunction(k => window.XP && XP.get(k), key, { timeout: 15000 });
      await p.evaluate(() => { window.__done = null; XP.setHooks({ onDone: (k, s, n) => { window.__done = [k, s, n]; } }); });
      await p.evaluate(k => XP.open(k), key);
      await p.waitForTimeout(150);
      ok(await p.isVisible("#xp-start"), "player opens on the start cover");
      ok(await p.evaluate(() => document.activeElement && document.activeElement.id === "xp-start"), "focus starts on the start button");
      await p.click("#xp-start");
      await p.waitForTimeout(600);
      ok(await p.evaluate(() => document.querySelector("#xp-cover").hidden && document.querySelector("#xp-stage").childElementCount > 0), "start hides the cover and draws the first scene");
      const tooSmall = await p.evaluate(() => [...document.querySelectorAll("#xp button")].filter(b => b.offsetParent && !b.closest(".xp-cover")).map(b => { const r = b.getBoundingClientRect(); return [b.id || b.className || b.textContent.trim().slice(0, 12), Math.round(r.width), Math.round(r.height)]; }).filter(([, w, h]) => w < 44 || h < 44));
      ok(tooSmall.length === 0, "every player button is at least 44×44", tooSmall);
      await p.click("#xp-chap [data-go=quiz]");
      await p.waitForSelector(".xp-opt");
      const q = await p.evaluate(() => { const w = document.querySelector("#xp-sw"), st = document.querySelector("#xp-stage"); return { inFlow: w.classList.contains("xp-q") && getComputedStyle(st).display === "none" && getComputedStyle(document.querySelector("#xp-quiz")).position !== "absolute",
        disabled: ["#xp-pp", "#xp-rep", "#xp-nxt"].every(s => document.querySelector(s).disabled), prev: !document.querySelector("#xp-prev").disabled, focus: document.activeElement && document.activeElement.tagName === "H3" }; });
      ok(q.inFlow, "the final challenge replaces the board in the page flow");
      ok(q.disabled && q.prev, "play/replay/next are disabled during the challenge, previous stays", q);
      ok(q.focus, "focus moves to the question");
      const quiz = await p.evaluate(k => XP.get(k).quiz.map(x => x.a), key);
      for (let i = 0; i < quiz.length; i++) {
        await p.click(`.xp-opt >> nth=${quiz[i]}`);
        const fb = await p.evaluate(() => ({ right: document.querySelectorAll(".xp-opt.right .mk svg").length, why: !!document.querySelector(".xp-why.ok"), all: [...document.querySelectorAll(".xp-opt")].every(b => b.disabled) }));
        ok(fb.right === 1 && fb.why && fb.all, `question ${i + 1}: marked correct, explained, options locked`, fb);
        await p.click("#xp-qn");
      }
      const end = await p.evaluate(() => ({ res: !!document.querySelector(".xp-res.ok"), done: window.__done, pri: document.activeElement && document.activeElement.classList.contains("pri") }));
      ok(end.res && end.pri, "end card shows a pass and focuses its main action", end);
      ok(end.done && end.done[0] === key && end.done[1] === quiz.length, "completion hook receives the score", end.done);
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.querySelector("#xp").scrollWidth > innerWidth);
      ok(!overflow, "no horizontal overflow in the player");
      await p.click("#xp-prev");
      await p.waitForTimeout(400);
      ok(await p.evaluate(() => !document.querySelector("#xp-quiz") && !document.querySelector("#xp-pp").disabled && getComputedStyle(document.querySelector("#xp-stage")).display !== "none"), "previous returns to the last scene and re-enables the controls");
      await p.keyboard.press("Escape");
      ok(await p.evaluate(() => !document.querySelector("#xp") && !document.body.classList.contains("xp-open")), "Escape closes the player");
      ok(p.errs.length === 0, "no console or page errors in the player", p.errs);
      await p.context().close();
    }
  } finally { await browser.close(); }
  await done();
})().catch(e => { console.error("suite crashed:", e); process.exit(1); });
