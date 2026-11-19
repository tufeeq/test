// One-language builds of public/app.js. The app carries all its content in Arabic and English side by side
// (bi('…','…'), {ar:'…', en:'…'}, VB_EN.push(…), Object.assign(T.en,{…})). A student only ever sees one language at a
// time, so the server serves /app-ar.js or /app-en.js: the same file with the other language's *content* emptied.
//
// Only content is removed, never state or logic: a value is emptied only when it is made of literals (strings, numbers,
// arrays, objects, and functions whose bodies are never run in that language) and holds some text. Anything with a call,
// an assignment or a variable outside a function body is kept as it is. Keys stay ({ar:'…', en:''}), so `'ar' in o`
// checks and L() keep working. The app reloads with the other build when the student switches language (__BL).
"use strict";
const acorn = require("acorn");

const PURE = new Set(["vAn", "vCo", "vCx", "vOdA", "vOdE", "vRe", "bi"]);
// constructors that take the two languages as positional arguments: name → [indexes of Arabic args, indexes of English args]
const POS = { FDV: [[4], [5]], FC: [[3, 4, 5], [6, 7, 8]], C: [[0, 3], [1, 4]] };
// a cut must not change how many random numbers are drawn (seeded model tests and sections stay identical)
const RANDOM = new Set(["R", "pick", "shuffle", "rnd", "mulberry", "rotTake", "genFork", "genUnique"]);
function drawsRandom(n) { let hit = false; (function w(x) { if (hit || !x || typeof x.type !== "string") return; if (x.type === "Identifier" && RANDOM.has(x.name)) { hit = true; return; } for (const k in x) { if (k === "loc") continue; const v = x[k]; if (Array.isArray(v)) v.forEach(w); else if (v && typeof v.type === "string") w(v); } })(n); return hit; }
const SKIP = new Set(["loc", "start", "end", "range", "raw"]);
function children(n, f) { for (const k in n) { if (SKIP.has(k)) continue; const v = n[k]; if (Array.isArray(v)) v.forEach(x => x && typeof x.type === "string" && f(x)); else if (v && typeof v.type === "string") f(v); } }

// is this value pure content (safe to replace by '' / [] when its language is not shown)?
function contentOnly(n) {
  let text = false, ok = true;
  (function w(x, inFn) {
    if (!ok) return;
    switch (x.type) {
      case "Literal": if (typeof x.value === "string" && x.value.length > 1) text = true; return;
      case "TemplateLiteral": text = true; if (!inFn && x.expressions.some(e => !isPlain(e))) { ok = false; return; } return;
      case "ArrayExpression": x.elements.forEach(e => e && (e.type === "SpreadElement" ? (ok = false) : w(e, inFn))); return;
      case "ObjectExpression": x.properties.forEach(p => { if (p.type !== "Property" || p.computed) { ok = false; return; } w(p.value, inFn); }); return;
      case "ArrowFunctionExpression": case "FunctionExpression": return; // never runs in the other language; contents don't matter
      case "CallExpression": // the item constructors (vRe('L1','…',[…],'…') …) only build plain objects
        if (x.callee.type === "Identifier" && PURE.has(x.callee.name)) { x.arguments.forEach(a => w(a, inFn)); return; }
        ok = false; return;
      case "UnaryExpression": return w(x.argument, inFn);
      case "BinaryExpression": w(x.left, inFn); w(x.right, inFn); return; // 'a'+'b' string building
      default: ok = false;
    }
  })(n, false);
  return ok && text && !drawsRandom(n);
  function isPlain(e) { return e.type === "Literal" || (e.type === "BinaryExpression" && isPlain(e.left) && isPlain(e.right)); }
}

function split(src, keep) {
  if (keep !== "ar" && keep !== "en") throw new Error("lang");
  const drop = keep === "ar" ? "en" : "ar", DROP_IDX = keep === "ar" ? 1 : 0;
  const ast = acorn.parse(src, { ecmaVersion: "latest", sourceType: "script" });
  const cuts = [];
  const cut = (n, rep) => cuts.push([n.start, n.end, rep]);
  // top-level statements that only add the other language's content
  const BANK = keep === "ar" ? "VB_EN" : "VB_AR";
  for (const st of ast.body) {
    if (st.type !== "ExpressionStatement" || st.expression.type !== "CallExpression") continue;
    const c = st.expression, cal = c.callee;
    if (cal.type === "MemberExpression" && !cal.computed && cal.object.type === "Identifier" && cal.object.name === BANK && cal.property.name === "push" && c.arguments.length && c.arguments.every(contentOnly)) { cut(st, ";"); st._gone = true; continue; }
    if (cal.type === "MemberExpression" && cal.object.type === "Identifier" && cal.object.name === "Object" && cal.property.name === "assign" && c.arguments.length === 2) {
      const t = c.arguments[0];
      if (t.type === "MemberExpression" && !t.computed && t.property.name === drop && t.object.type === "Identifier" && ["T", "PASSAGES", "VOCAB"].includes(t.object.name) && contentOnly(c.arguments[1])) { cut(st, ";"); st._gone = true; }
    }
  }
  (function w(n) {
    if (n._gone) return;
    if (n.type === "CallExpression" && n.callee.type === "Identifier" && POS[n.callee.name]) {
      const idx = new Set(POS[n.callee.name][keep === "ar" ? 1 : 0]);
      n.arguments.forEach((a, i) => {
        if (idx.has(i) && (a.type === "Literal" || a.type === "TemplateLiteral") && !drawsRandom(a)) cut(a, "''");
        else if (idx.has(i) && a.type === "ObjectExpression" && contentOnly(a)) cut(a, "{}");
        else w(a);
      });
      return;
    }
    if (n.type === "CallExpression" && n.callee.type === "Identifier" && n.callee.name === "bi" && n.arguments.length === 2) {
      const a = n.arguments[DROP_IDX];
      if ((a.type === "Literal" || a.type === "TemplateLiteral") && !drawsRandom(a)) { cut(a, "''"); w(n.arguments[1 - DROP_IDX]); return; }
    }
    if (n.type === "ObjectExpression") {
      const props = n.properties.filter(p => p.type === "Property" && !p.computed && p.key);
      const name = p => p.key.type === "Identifier" ? p.key.name : p.key.value;
      if (props.some(p => name(p) === "ar") && props.some(p => name(p) === "en")) {
        for (const p of n.properties) {
          if (p.type === "Property" && !p.computed && p.key && name(p) === drop && !p.shorthand && contentOnly(p.value)) cut(p.value, p.value.type === "ArrayExpression" ? "[]" : "''");
          else w(p);
        }
        return;
      }
    }
    // the other language's bank: VB_EN = [ … ] (pushes to it are cut above)
    if (n.type === "VariableDeclarator" && n.id.type === "Identifier" && n.id.name === BANK && n.init && n.init.type === "ArrayExpression" && contentOnly(n.init)) { cut(n.init, "[]"); return; }
    children(n, w);
  })(ast);
  cuts.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const parts = []; let pos = 0;
  for (const [s, e, r] of cuts) { if (s < pos) continue; parts.push(src.slice(pos, s), r); pos = e; } // a cut inside another: the outer one wins
  parts.push(src.slice(pos));
  const out = parts.join("");
  return `var __BL=${JSON.stringify(keep)};\n` + out;
}

module.exports = { split, contentOnly };
