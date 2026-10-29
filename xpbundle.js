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

// Identifiers used as references (not property names / member names), with their position
function references(ast) {
  const refs = [];
  walk(ast, (n, parent) => {
    if (n.type !== "Identifier" || !parent) return;
    if (parent.type === "MemberExpression" && parent.property === n && !parent.computed) return;
    if ((parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") && parent.key === n && !parent.computed && !parent.shorthand) return;
    refs.push({ name: n.name, at: n.start });
  });
  return refs;
}
// the statements of each file's wrapping IIFE: (function(){ … })();
function iifeBodies(ast) {
  const out = [];
  for (const st of ast.body) {
    const e = st.type === "ExpressionStatement" ? st.expression : null;
    const fn = e && e.type === "CallExpression" ? e.callee : null;
    if (fn && (fn.type === "FunctionExpression" || fn.type === "ArrowFunctionExpression") && fn.body.type === "BlockStatement") out.push(fn.body.body);
  }
  return out;
}

function splitSource(code, keep) {
  const comments = [];
  const ast = acorn.parse(code, { ecmaVersion: "latest", sourceType: "script", onComment: (block, text, start, end) => comments.push([start, end, block && /\n/.test(text) ? "\n" : " "]) });
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
  // Top-level helpers and data that only the removed lessons used (a reading passage in a `const`, a scene's items built
  // with `const K1={}; pair(K1,…); Object.assign(K1,{…})`) would otherwise still ship: mark and sweep over each IIFE's
  // top-level statements (below). The test suite checks every lesson comes out identical to its source.
  const refs = references(ast);
  const inCut = at => cuts.some(([s, e]) => at >= s && at < e);
  // statements: {st, names (declared), targets (names it fills in), pure (no side effects of its own)}
  const nodes = [];
  const rootOf = n => { while (n && n.type === "MemberExpression") n = n.object; return n && n.type === "Identifier" ? n.name : null; };
  const isFn = n => n.type === "FunctionExpression" || n.type === "ArrowFunctionExpression" || n.type === "FunctionDeclaration";
  // pure: no call or assignment runs when the statement runs (function bodies are only defined, not run).
  // targets: the names the statement fills in. Only the statement's own call counts (a helper called deep inside a
  // lesson's data, e.g. opts:L4(CH,1), only reads CH).
  function effects(node, top) {
    const targets = new Set(); let pure = true;
    (function visit(n, parent) {
      if (!n || typeof n.type !== "string") return;
      if (isFn(n) && parent) return;
      // data builders do not count as effects: the file's own helpers (unless they fill a top-level name, see targets),
      // Math/Array/Object/JSON/String/Number utilities and new Set/Map
      if (n.type === "CallExpression" || n.type === "NewExpression") {
        const c = n.callee, a0 = n.arguments[0];
        const local = c.type === "Identifier" && top.has(c.name) && !(a0 && a0.type === "Identifier" && top.has(a0.name));
        const util = c.type === "MemberExpression" && !c.computed && c.object.type === "Identifier" && ["Math", "Array", "Object", "JSON", "String", "Number"].includes(c.object.name) && !(c.object.name === "Object" && c.property.name === "assign" && a0 && a0.type === "Identifier");
        const ctor = n.type === "NewExpression" && c.type === "Identifier" && ["Set", "Map"].includes(c.name);
        if (!(local || util || ctor)) pure = false;
      }
      if (n === node && n.type === "CallExpression") {
        const c = n.callee, a0 = n.arguments[0];
        // fill(K1, …) / Object.assign(K1, …) fills K1;  [S1, S2].forEach(fix) fills S1 and S2
        if ((c.type === "Identifier" || (c.type === "MemberExpression" && !c.computed && c.object.type === "Identifier" && c.object.name === "Object" && c.property.name === "assign")) && a0 && a0.type === "Identifier" && top.has(a0.name)) targets.add(a0.name);
        if (c.type === "MemberExpression" && !c.computed && c.property.name === "forEach" && c.object.type === "ArrayExpression" && c.object.elements.length && c.object.elements.every(x => x && x.type === "Identifier" && top.has(x.name))) c.object.elements.forEach(x => targets.add(x.name));
        // list.forEach((x, i) => { K[…] = …; fill(K, …); }) fills K
        if (c.type === "MemberExpression" && !c.computed && c.property.name === "forEach") { const cb = n.arguments[0]; if (cb && isFn(cb)) walk(cb.body, m => {
          if (m.type === "AssignmentExpression" && m.left.type === "MemberExpression") { const r = rootOf(m.left); if (r && top.has(r)) targets.add(r); }
          if (m.type === "CallExpression" && m.callee.type === "Identifier" && m.arguments[0] && m.arguments[0].type === "Identifier" && top.has(m.arguments[0].name)) targets.add(m.arguments[0].name); }); }
      }
      if (n === node && n.type === "UnaryExpression" && n.operator === "delete") { pure = false; const r = rootOf(n.argument); if (r && top.has(r)) targets.add(r); }  // delete K1.pc
      if (n.type === "AssignmentExpression" || n.type === "UpdateExpression" || n.type === "TaggedTemplateExpression" || n.type === "AwaitExpression" || n.type === "YieldExpression") {
        pure = false; const r = n === node && n.type === "AssignmentExpression" && n.left.type === "MemberExpression" ? rootOf(n.left) : null; if (r && top.has(r)) targets.add(r);
      }
      for (const k in n) { if (k === "loc" || k === "start" || k === "end") continue; const v = n[k];
        if (Array.isArray(v)) v.forEach(x => x && typeof x.type === "string" && visit(x, n)); else if (v && typeof v.type === "string") visit(v, n); }
    })(node, null);
    return { targets, pure };
  }
  const bodies = iifeBodies(ast);
  bodies.forEach((body, bi) => {
    const top = new Set();
    for (const st of body) {
      if (st.type === "FunctionDeclaration" && st.id) top.add(st.id.name);
      else if (st.type === "VariableDeclaration") st.declarations.forEach(d => d.id.type === "Identifier" && top.add(d.id.name));
    }
    for (const st of body) {
      if (inCut(st.start)) continue;
      if (st.type === "FunctionDeclaration" && st.id) nodes.push({ bi, st, names: [st.id.name], targets: new Set(), pure: true });
      else if (st.type === "VariableDeclaration" && st.declarations.every(d => d.id.type === "Identifier")) {
        const ef = { targets: new Set(), pure: true };
        for (const d of st.declarations) if (d.init) { const x = effects(d.init, top); x.targets.forEach(t => ef.targets.add(t)); ef.pure = ef.pure && x.pure; }
        nodes.push({ bi, st, names: st.declarations.map(d => d.id.name), ...ef });
      } else if (st.type === "ExpressionStatement" && !(st.expression.type === "CallExpression" && keyOfObj(st.expression.arguments[0]))) { // lesson registrations follow their key
        const ef = effects(st.expression, top), c = st.expression.callee;
        // [S1, S2].forEach(fix): the list is trimmed to the names still alive
        const arr = c && c.type === "MemberExpression" && c.property.name === "forEach" && c.object.type === "ArrayExpression" && ef.targets.size && c.object.elements.every(x => x && x.type === "Identifier") ? c.object : null;
        if (ef.targets.size) nodes.push({ bi, st, names: [], ...ef, arr });
      }
    }
  });
  // mark: names used by code that always stays (kept lessons, guards…) are alive; a declaration is alive when one of its
  // names is, or when it has effects we cannot attribute; a fill is alive when what it fills is. Everything else goes.
  // (each file's IIFE is its own scope)
  const inside = (at, n) => at >= n.st.start && at < n.st.end;
  bodies.forEach((body, bi) => {
  if (!body.length) return;
  const b0 = body[0].start, b1 = body[body.length - 1].end, mine = nodes.filter(n => n.bi === bi), rs = refs.filter(r => r.at >= b0 && r.at < b1 && !inCut(r.at));
  const live = new Set(rs.filter(r => !mine.some(n => inside(r.at, n))).map(r => r.name));
  for (let changed = true; changed;) {
    changed = false;
    for (const n of mine) {
      if (n.live) continue;
      if (!(n.names.some(x => live.has(x)) || [...n.targets].some(x => live.has(x)) || (!n.pure && !n.targets.size))) continue;
      n.live = true; changed = true;
      const skip = n.arr ? new Set(n.arr.elements.map(e => e.start)) : null;
      for (const r of rs) if (inside(r.at, n) && !(skip && skip.has(r.at))) live.add(r.name);
    }
  }
  for (const n of mine) {
    if (!n.live) cuts.push([n.st.start, n.st.end]);
    else if (n.arr && n.arr.elements.some(e => !live.has(e.name))) edits.push([n.arr.start, n.arr.end, "[" + n.arr.elements.filter(e => live.has(e.name)).map(e => e.name).join(",") + "]"]);
  }
  });
  // comments are never shipped (a section header names its lesson)
  for (const [s, e, r] of comments) if (!inCut(s)) edits.push([s, e, r]);
  // a range inside a removed range goes with it (applying it first would make the outer one look like an overlap)
  const all = [...cuts.map(([s, e]) => [s, e, ""]), ...edits]
    .filter(([s, e], i, arr) => !cuts.some(([cs, ce]) => cs <= s && e <= ce && (cs !== s || ce !== e)) && !(arr.findIndex(([s2, e2]) => s2 === s && e2 === e) < i))
    .sort((a, b) => b[0] - a[0]);
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
