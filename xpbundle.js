// Splits the explainer lesson sources (xpsrc/*.js) into two script bundles at runtime:
//   free    → only the lessons whose key is in the free list (served publicly)
//   premium → every other lesson (served only to subscribers)
// Each source file is an IIFE whose lessons are registered by top-level calls like XP.add({key:'…',…}) or ADD({…}).
// We parse with acorn and cut out the call statements (and, for the hand-built legacy file, the LESSONS object
// properties) that belong to the other bundle, so a lesson's source is never shipped to someone not entitled to it.
const fs = require("fs");
const path = require("path");
const acorn = require("acorn");

const SRC = path.join(__dirname, "xpsrc");
const keyOfObj = node => {
  if (!node || node.type !== "ObjectExpression") return null;
  for (const p of node.properties) if (p.type === "Property" && !p.computed && ((p.key.type === "Identifier" && p.key.name === "key") || (p.key.type === "Literal" && p.key.value === "key")) && p.value.type === "Literal") return String(p.value.value);
  return null;
};
// walk every node (simple recursive walker; acorn-walk not needed)
function walk(node, fn, parent) {
  if (!node || typeof node.type !== "string") return;
  fn(node, parent);
  for (const k in node) {
    if (k === "loc" || k === "start" || k === "end") continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach(c => c && typeof c.type === "string" && walk(c, fn, node));
    else if (v && typeof v.type === "string") walk(v, fn, node);
  }
}

function splitSource(code, keep) {
  const ast = acorn.parse(code, { ecmaVersion: "latest", sourceType: "script" });
  const cuts = [];      // [start,end) ranges to remove
  const edits = [];     // [start,end,replacement]
  walk(ast, (n, parent) => {
    // XP.add({...}) / ADD({...}) / add({...}) as an expression statement
    if (n.type === "ExpressionStatement" && n.expression.type === "CallExpression") {
      const k = keyOfObj(n.expression.arguments[0]);
      if (k && !keep(k)) cuts.push([n.start, n.end]);
    }
    // legacy: const LESSONS={percent:{key:'percent',…},…}  and  ['percent',…].forEach(k=>XP.add(LESSONS[k]))
    if (n.type === "Property" && n.value && n.value.type === "ObjectExpression" && parent && parent.type === "ObjectExpression") {
      const k = keyOfObj(n.value);
      if (k && !keep(k) && parent.properties.length > 1) {
        // remove the property and its trailing comma
        let end = n.end; while (end < code.length && /[\s,]/.test(code[end])) { if (code[end] === ",") { end++; break; } end++; }
        cuts.push([n.start, end]);
      }
    }
    if (n.type === "ArrayExpression" && parent && parent.type === "MemberExpression" && parent.property && parent.property.name === "forEach" && n.elements.every(e => e && e.type === "Literal" && typeof e.value === "string")) {
      const ks = n.elements.map(e => e.value).filter(keep);
      edits.push([n.start, n.end, JSON.stringify(ks)]);
    }
  });
  const all = [...cuts.map(([s, e]) => [s, e, ""]), ...edits].sort((a, b) => b[0] - a[0]);
  let out = code, lastStart = Infinity;
  for (const [s, e, r] of all) { if (e > lastStart) continue; out = out.slice(0, s) + r + out.slice(e); lastStart = s; }
  return out;
}

let cache = { sig: "", free: "", premium: "", keys: { all: [], free: [] } };
function files() { return fs.existsSync(SRC) ? fs.readdirSync(SRC).filter(f => /\.js$/.test(f)).sort((a, b) => (a === "xp_legacy.js" ? -1 : b === "xp_legacy.js" ? 1 : a < b ? -1 : 1)) : []; }
function allKeys() {
  const ks = [];
  for (const f of files()) { const code = fs.readFileSync(path.join(SRC, f), "utf8"); walk(acorn.parse(code, { ecmaVersion: "latest" }), n => { if (n.type === "ObjectExpression") { const k = keyOfObj(n); if (k && n.properties.some(p => p.key && (p.key.name === "scenes" || p.key.value === "scenes"))) ks.push(k); } }); }
  return [...new Set(ks)];
}
function build(freeKeys) {
  const sig = JSON.stringify([...freeKeys].sort());
  if (cache.sig === sig && cache.free) return cache;
  const free = new Set(freeKeys);
  let fOut = "", pOut = "";
  for (const f of files()) {
    const code = fs.readFileSync(path.join(SRC, f), "utf8");
    try {
      fOut += `/* ${f} */\n` + splitSource(code, k => free.has(k)) + "\n";
      pOut += `/* ${f} */\n` + splitSource(code, k => !free.has(k)) + "\n";
    } catch (e) { console.error("xpbundle: cannot split", f, e.message); }
  }
  const keys = allKeys();
  cache = { sig, free: fOut, premium: pOut, keys: { all: keys, free: keys.filter(k => free.has(k)) } };
  return cache;
}
module.exports = { build, allKeys, splitSource };
