// IELTS Academy — AI examiner: marks Writing (Task 1/2) and Speaking answers against the public IELTS band descriptors.
// Uses the Anthropic Messages API when ANTHROPIC_API_KEY is set; otherwise the app falls back to its built-in checker.
const API = process.env.ANTHROPIC_API_BASE || "https://api.anthropic.com/v1";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

const WRITING_SYS = `You are a certified, strict but encouraging IELTS Writing examiner. You mark against the public IELTS band descriptors:
Task Achievement (Task 1) or Task Response (Task 2), Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.
Bands are whole or half bands from 0 to 9. Be calibrated: do not inflate. Penalise: under-length (Task 1 < 150 words, Task 2 < 250 words), memorised/off-topic text, missing overview (Task 1), unclear position (Task 2), wrong letter tone (General Training Task 1).
The candidate is an Arabic speaker. Watch especially for: article errors, missing verb "to be", run-on sentences joined with commas, subject–verb agreement, wrong prepositions, overuse of "and", direct translation from Arabic, spelling.
Reply with ONLY a JSON object, no markdown, in this exact shape:
{"bands":{"TA":6.5,"CC":6,"LR":6,"GRA":5.5},"overall":6,"words":0,
 "summary":{"ar":"two or three sentences in simple Arabic","en":"same in English"},
 "strengths":[{"ar":"...","en":"..."}],
 "fixes":[{"quote":"exact short quote from the essay","better":"corrected version","why":{"ar":"...","en":"..."},"crit":"GRA"}],
 "next":{"ar":"the single most important thing to do to reach the next band","en":"..."},
 "upgrade":"one paragraph of the essay rewritten at band 8 (keep the candidate's ideas)"}
Give 2-3 strengths and 4-8 fixes ordered by impact. Quotes must be copied exactly from the essay.`;

const SPEAKING_SYS = `You are a certified IELTS Speaking examiner. You receive the transcript of a candidate's spoken answer (produced by speech recognition, so ignore punctuation and minor recognition errors) and its duration.
Mark Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy from 0-9 (half bands allowed). You cannot hear pronunciation: estimate it only from clues (fillers, broken words) and say it is an estimate. Be calibrated; do not inflate. Very short answers (Part 1 under 15 words, Part 2 under 120 words or under 60 seconds, Part 3 under 40 words) cannot score above 5 for fluency.
The candidate is an Arabic speaker.
Reply with ONLY a JSON object, no markdown:
{"bands":{"FC":6,"LR":6,"GRA":5.5,"P":6},"overall":6,
 "summary":{"ar":"...","en":"..."},
 "strengths":[{"ar":"...","en":"..."}],
 "fixes":[{"quote":"exact words from the transcript","better":"a more natural / accurate version","why":{"ar":"...","en":"..."},"crit":"LR"}],
 "next":{"ar":"...","en":"..."},
 "upgrade":"the same answer as a band-8 speaker would say it, natural spoken English, similar length"}`;


const PLACE_SYS = `You are a certified IELTS examiner giving a quick PLACEMENT estimate for a new Arabic-speaking learner. Be calibrated and do not inflate.
WRITING: a short opinion response to a Task-2-style question (target 120+ words, 15 minutes). Mark TA, CC, LR, GRA as you would Task 2, but judge length against 120 words, not 250 (under 120 words: TA max 5; under 80: TA max 4).
SPEAKING: speech-recognition transcripts (ignore punctuation and minor recognition errors) of short answers to Part 1 and Part 3 questions, with durations. Mark FC, LR, GRA and estimate P from clues only. Very short answers cannot score above 5 for fluency.
If a section is not provided, return null for it.
Reply with ONLY a JSON object, no markdown:
{"W":{"bands":{"TA":6,"CC":6,"LR":6,"GRA":5.5},"summary":{"ar":"one or two sentences in simple Arabic","en":"..."},"next":{"ar":"the single most useful thing to work on","en":"..."}},
 "S":{"bands":{"FC":6,"LR":6,"GRA":5.5,"P":6},"summary":{"ar":"...","en":"..."},"next":{"ar":"...","en":"..."}}}`;

function extractJSON(t) {
  const s = String(t || ""); const a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a < 0 || b <= a) throw new Error("no json");
  return JSON.parse(s.slice(a, b + 1));
}
async function claude(system, user, maxTokens) {
  const r = await fetch(API + "/messages", {
    method: "POST",
    headers: { "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error("anthropic " + r.status + " " + JSON.stringify(j).slice(0, 300)); throw e; }
  return (j.content || []).filter(c => c.type === "text").map(c => c.text).join("");
}
const half = v => { const n = Number(v); return isFinite(n) ? Math.max(0, Math.min(9, Math.round(n * 2) / 2)) : null; };
const words = s => String(s || "").trim().split(/\s+/).filter(Boolean).length;
const clip = (s, n) => String(s == null ? "" : s).slice(0, n);
function clean(o, keys) {
  const bands = {}; keys.forEach(k => bands[k] = half(o.bands && o.bands[k]));
  const vals = keys.map(k => bands[k]).filter(v => v != null);
  const overall = vals.length ? Math.round(2 * vals.reduce((a, b) => a + b, 0) / vals.length) / 2 : null; // IELTS rounding to nearest half
  const bi = x => ({ ar: clip(x && x.ar, 600), en: clip(x && x.en, 600) });
  return {
    bands, overall,
    summary: bi(o.summary), next: bi(o.next),
    strengths: (Array.isArray(o.strengths) ? o.strengths : []).slice(0, 4).map(bi),
    fixes: (Array.isArray(o.fixes) ? o.fixes : []).slice(0, 10).map(f => ({ quote: clip(f.quote, 300), better: clip(f.better, 400), why: bi(f.why), crit: clip(f.crit, 4) })),
    upgrade: clip(o.upgrade, 2500)
  };
}

module.exports = function ai(app, { pool, wrap, fail, needUser, C, limited }) {
  async function quota(req, kind) { // kind: ai_writing | ai_speaking
    const cfg = await C.loadCfg(), plan = await C.planOf(req.user);
    if (plan.source === "admin") return { ok: true, plan };
    if (plan.tier === "pro") {
      const max = kind === "ai_writing" ? cfg.pro.aiWritingDaily : cfg.pro.aiSpeakingDaily;
      const n = (await pool.query("SELECT count(*)::int n FROM events WHERE user_id=$1 AND type=$2 AND day=CURRENT_DATE", [req.user.id, kind])).rows[0].n;
      return { ok: n < max, plan, left: Math.max(0, max - n - 1), reason: "daily" };
    }
    const max = kind === "ai_writing" ? cfg.free.aiWriting : cfg.free.aiSpeaking;
    const n = (await pool.query("SELECT count(*)::int n FROM events WHERE user_id=$1 AND type=$2", [req.user.id, kind])).rows[0].n;
    return { ok: n < max, plan, left: Math.max(0, max - n - 1), reason: "free" };
  }
  app.get("/api/ai/status", needUser, wrap(async (req, res) => {
    const w = await quota(req, "ai_writing"), s = await quota(req, "ai_speaking");
    res.json({ on: !!process.env.ANTHROPIC_API_KEY, writing: { ok: w.ok, left: w.ok ? w.left + 1 : 0 }, speaking: { ok: s.ok, left: s.ok ? s.left + 1 : 0 } });
  }));

  app.post("/api/ai/writing", needUser, wrap(async (req, res) => {
    if (!process.env.ANTHROPIC_API_KEY) return fail(res, 503, "ai-not-configured");
    if (limited("aiw:" + req.user.id, 30, 3600e3)) return fail(res, 429, "too-many-requests");
    const b = req.body || {}, task = ["t1a", "t1g", "t2"].includes(b.task) ? b.task : "t2";
    const essay = clip(b.essay, 6000), prompt = clip(b.prompt, 2500), data = clip(b.data, 3000);
    if (words(essay) < 40) return fail(res, 400, "too-short");
    const q = await quota(req, "ai_writing"); if (!q.ok) return fail(res, 402, q.reason === "daily" ? "ai-daily-limit" : "ai-free-limit");
    const user = `${task === "t2" ? "IELTS Writing Task 2" : task === "t1a" ? "IELTS Academic Writing Task 1" : "IELTS General Training Writing Task 1 (letter)"}
TASK PROMPT:
${prompt}
${data ? "DATA SHOWN IN THE VISUAL (for checking accuracy):\n" + data + "\n" : ""}
CANDIDATE'S ANSWER (${words(essay)} words):
${essay}`;
    let out;
    try { out = clean(extractJSON(await claude(WRITING_SYS, user, 2500)), ["TA", "CC", "LR", "GRA"]); }
    catch (e) { console.error("ai writing", e.message); return fail(res, 502, "ai-failed"); }
    out.words = words(essay);
    await pool.query("INSERT INTO events(user_id,type,k,v) VALUES($1,'ai_writing',$2,$3)", [req.user.id, task, out.overall]);
    res.json({ result: out, left: q.left });
  }));

  app.post("/api/ai/speaking", needUser, wrap(async (req, res) => {
    if (!process.env.ANTHROPIC_API_KEY) return fail(res, 503, "ai-not-configured");
    if (limited("ais:" + req.user.id, 60, 3600e3)) return fail(res, 429, "too-many-requests");
    const b = req.body || {}, part = [1, 2, 3].includes(Number(b.part)) ? Number(b.part) : 1;
    const transcript = clip(b.transcript, 5000), question = clip(b.question, 800), dur = Math.max(0, Math.min(600, Number(b.seconds) || 0));
    if (words(transcript) < 5) return fail(res, 400, "too-short");
    const q = await quota(req, "ai_speaking"); if (!q.ok) return fail(res, 402, q.reason === "daily" ? "ai-daily-limit" : "ai-free-limit");
    const user = `IELTS Speaking Part ${part}\nQUESTION / CUE CARD:\n${question}\nDURATION: ${Math.round(dur)} seconds\nTRANSCRIPT (${words(transcript)} words):\n${transcript}`;
    let out;
    try { out = clean(extractJSON(await claude(SPEAKING_SYS, user, 1800)), ["FC", "LR", "GRA", "P"]); }
    catch (e) { console.error("ai speaking", e.message); return fail(res, 502, "ai-failed"); }
    await pool.query("INSERT INTO events(user_id,type,k,v) VALUES($1,'ai_speaking',$2,$3)", [req.user.id, "p" + part, out.overall]);
    res.json({ result: out, left: q.left });
  }));

  // placement test: writing + speaking marked together; one free marking per learner, separate from the free AI marking
  app.post("/api/ai/placement", needUser, wrap(async (req, res) => {
    if (!process.env.ANTHROPIC_API_KEY) return fail(res, 503, "ai-not-configured");
    if (limited("aip:" + req.user.id, 6, 3600e3)) return fail(res, 429, "too-many-requests");
    const plan = await C.planOf(req.user);
    if (plan.source !== "admin") {
      const pro = plan.tier === "pro";
      const n = (await pool.query(`SELECT count(*)::int n FROM events WHERE user_id=$1 AND type='ai_placement'${pro ? " AND day=CURRENT_DATE" : ""}`, [req.user.id])).rows[0].n;
      if (n >= (pro ? 3 : 1)) return fail(res, 402, pro ? "ai-daily-limit" : "ai-free-limit");
    }
    const b = req.body || {}, w = b.writing && words(b.writing.essay) >= 30 ? { prompt: clip(b.writing.prompt, 1500), essay: clip(b.writing.essay, 4000) } : null;
    const sp = (Array.isArray(b.speaking) ? b.speaking : []).slice(0, 5).map(x => ({ part: [1, 2, 3].includes(Number(x.part)) ? Number(x.part) : 1, q: clip(x.question, 300), t: clip(x.transcript, 2000), s: Math.max(0, Math.min(300, Number(x.seconds) || 0)) })).filter(x => words(x.t) >= 3);
    if (!w && !sp.length) return fail(res, 400, "too-short");
    const user = `${w ? `WRITING\nQUESTION:\n${w.prompt}\nANSWER (${words(w.essay)} words):\n${w.essay}\n\n` : "WRITING: not provided\n\n"}${sp.length ? "SPEAKING\n" + sp.map((x, i) => `${i + 1}. Part ${x.part} question: ${x.q}\nDuration: ${Math.round(x.s)} seconds\nTranscript (${words(x.t)} words): ${x.t}`).join("\n\n") : "SPEAKING: not provided"}`;
    let o;
    try { o = extractJSON(await claude(PLACE_SYS, user, 1500)); }
    catch (e) { console.error("ai placement", e.message); return fail(res, 502, "ai-failed"); }
    const part = (x, keys) => { if (!x || !x.bands) return null; const c = clean(x, keys); return { bands: c.bands, overall: c.overall, summary: c.summary, next: c.next }; };
    const out = { W: w ? part(o.W, ["TA", "CC", "LR", "GRA"]) : null, S: sp.length ? part(o.S, ["FC", "LR", "GRA", "P"]) : null };
    await pool.query("INSERT INTO events(user_id,type,k,v) VALUES($1,'ai_placement',$2,$3)", [req.user.id, (out.W ? "W" : "") + (out.S ? "S" : ""), out.W ? out.W.overall : out.S && out.S.overall]);
    res.json({ result: out });
  }));
};
