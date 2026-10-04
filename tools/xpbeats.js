// Lists every narrated beat of every explainer (both languages), grouped into continuous segments
// that end at each interactive stop. Usage: node tools/xpbeats.js > /tmp/xpbeats.json
const fs = require("fs"), path = require("path"), vm = require("vm");
const P = (v, i) => Array.isArray(v) && v.length === 2 && v.every(x => typeof x === "string") ? v[i] : v;
const out = [];
const ctx = { window: {} }; ctx.window.XP = { ready: true, bi: D => [0, 1].forEach(i => {
  const key = (i ? "en-" : "") + D.key, segs = [[]], fb = {};
  D.scenes.forEach((sc, si) => sc.beats.forEach((b, bi) => {
    const id = `${key}-s${si + 1}-b${bi + 1}`, wait = !!sc.ask && bi === sc.beats.length - 1;
    segs[segs.length - 1].push({ id, si, say: P(b.say, i) });
    if (wait) { fb[id] = { ok: P(sc.ask.right, i), no: P(sc.ask.wrong, i) }; segs.push([]); }
  }));
  out.push({ key, lang: i ? "en" : "ar", segs: segs.filter(s => s.length), fb });
}) };
ctx.XP = ctx.window.XP; vm.createContext(ctx);
const dir = path.join(__dirname, "..", "xpsrc");
for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort()) vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx);
process.stdout.write(JSON.stringify(out, null, 1));
