/* GAT Academy admin dashboard (Railway build) */
(function(){
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ar = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
const root = $("#root");
let toastT; const toast = m => { const e = $("#toast"); e.textContent = m; e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => e.hidden = true, 2600); };
async function api(method, url, body) {
  const r = await fetch(url, { method, headers: { "Content-Type": "application/json", "X-Masar": "1" }, credentials: "same-origin", body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({})); if (!r.ok) { const e = new Error(j.error || "server"); e.code = j.error; throw e; } return j;
}
let USERS = [], sortKey = "updated", asc = false, q = "", confirmDel = null, tempPw = null, me = null;

function loginView(err = "") {
  root.innerHTML = `<form class="card login" id="lf"><h1>لوحة تحكم أكاديمية القدرات</h1><p class="muted small">للمشرفين فقط.</p>
    <label>البريد الإلكتروني<input type="email" id="le" dir="ltr" autocomplete="email" required></label>
    <label>كلمة المرور<input type="password" id="lp" dir="ltr" autocomplete="current-password" required></label>
    <button class="btn primary block" type="submit">دخول</button>
    ${err ? `<p class="acct-err">${esc(err)}</p>` : ""}</form>`;
  $("#lf").onsubmit = async e => { e.preventDefault(); try { await api("POST", "/api/login", { email: $("#le").value.trim(), password: $("#lp").value }); boot(); } catch (x) { loginView(x.code === "too-many-requests" ? "محاولات كثيرة، انتظر قليلًا." : "البريد أو كلمة المرور غير صحيحة."); } };
}
function notAdminView(u) {
  root.innerHTML = `<div class="card login"><h2>هذا الحساب ليس مشرفًا</h2>
    <p class="small">المشرفون تحددهم قيمة <code>ADMIN_EMAILS</code> في إعدادات الخدمة على Railway (Variables). أضف البريد التالي إليها، فتُعاد تهيئة الخدمة تلقائيًا، ثم حدّث الصفحة:</p>
    <div class="uid">${esc(u.email)}</div><button class="btn ghost sm" id="so">تسجيل الخروج</button></div>`;
  $("#so").onclick = async () => { await api("POST", "/api/logout").catch(() => {}); loginView(); };
}
const d10 = v => v ? String(v).slice(0, 10) : "";
const lost = e => { if (e && e.code === "unauthenticated") { loginView("انتهت الجلسة، ادخل من جديد."); return true; } return false; };
async function load() {
  root.innerHTML = `<p class="status">جارٍ تحميل المستخدمين...</p>`;
  let r;
  try { r = await api("GET", "/api/admin/users"); }
  catch (e) {
    if (e.code === "unauthenticated") return loginView("انتهت الجلسة، ادخل من جديد.");
    if (e.code === "forbidden") return notAdminView(me);
    root.innerHTML = `<div class="card login"><p>تعذّر تحميل المستخدمين. تحقق من الاتصال ثم أعد المحاولة.</p><button class="btn primary sm" id="rt">إعادة المحاولة</button></div>`;
    $("#rt").onclick = load; return;
  }
  USERS = r.users.map(x => { const s = x.summary || {}; return { id: x.id, email: x.email || "", track: x.track || "", target: x.target ?? "", est: s.est ?? null, ready: s.readiness ?? 0,
    solved: s.solved || 0, acc: s.acc || 0, models: s.models || 0, streak: s.streak || 0, last: s.lastActive || "", updated: d10(x.updated_at), created: d10(x.created_at), examDate: x.exam_date || "" }; });
  render();
}
const COLS = [["email","البريد"],["track","المسار"],["target","الهدف"],["est","التقديرية"],["ready","الجاهزية"],["solved","الأسئلة"],["acc","الدقة"],["models","النماذج"],["streak","السلسلة"],["last","آخر نشاط"],["created","التسجيل"],["examDate","موعد الاختبار"]];
function render() {
  const list = USERS.filter(x => !q || x.email.toLowerCase().includes(q)).sort((a, b) => { const A = a[sortKey] ?? -1, B = b[sortKey] ?? -1; return (A > B ? 1 : A < B ? -1 : 0) * (asc ? 1 : -1); });
  const week = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const withEst = USERS.filter(x => x.est != null), withP = USERS.filter(x => x.updated), avg = a => a.length ? Math.round(a.reduce((s, v) => s + v, 0) / a.length) : 0;
  const k = [["المسجلون", USERS.length], ["نشطون آخر ٧ أيام", USERS.filter(x => x.last >= week).length], ["متوسط الدرجة التقديرية", withEst.length ? avg(withEst.map(x => x.est)) : "—"], ["متوسط الجاهزية", withP.length ? ar(avg(withP.map(x => x.ready))) + "٪" : "—"], ["إجمالي الأسئلة المحلولة", USERS.reduce((s, x) => s + x.solved, 0)], ["وصلوا ٩٥+", withEst.filter(x => x.est >= 95).length]];
  const buckets = [["أقل من ٧٠", x => x < 70], ["٧٠–٧٩", x => x >= 70 && x < 80], ["٨٠–٨٩", x => x >= 80 && x < 90], ["٩٠–٩٤", x => x >= 90 && x < 95], ["٩٥–١٠٠", x => x >= 95]];
  const bc = buckets.map(([l, f]) => [l, withEst.filter(x => f(x.est)).length]); const mx = Math.max(1, ...bc.map(b => b[1]));
  const sel = confirmDel && USERS.find(x => x.id === confirmDel);
  root.innerHTML = `
  <div class="adm-top"><h1><span class="hl">لوحة تحكم أكاديمية القدرات</span></h1><span class="status" dir="ltr">${esc(me.email)}</span><a class="btn ghost sm" href="/">الموقع</a><button class="btn ghost sm" id="rl">تحديث</button><button class="btn ghost sm" id="so">خروج</button></div>
  <div class="kgrid">${k.map(([l, v]) => `<div class="kpi"><span class="kl">${l}</span><b class="kv num">${typeof v === "number" ? ar(v) : v}</b></div>`).join("")}</div>
  <section class="card"><h2>توزيع الدرجات التقديرية</h2><div class="dist">${bc.map(([l, n]) => `<div class="drow"><span>${l}</span><span class="dbar"><span style="inline-size:${Math.round(100 * n / mx)}%"></span></span><b class="num">${ar(n)}</b></div>`).join("")}</div>
    <p class="small muted">من ${ar(withEst.length)} طالبًا أنهوا اختبارًا تشخيصيًا أو قسمًا أو نموذجًا.</p></section>
  <section class="card"><div class="tools"><input type="search" id="q" placeholder="ابحث بالبريد" value="${esc(q)}" dir="ltr"><button class="btn primary sm" id="csv">تصدير CSV</button><span class="status">${ar(list.length)} مستخدم</span></div>
    ${tempPw ? `<div class="ex-confirm inline"><p>كلمة المرور المؤقتة للطالب <b dir="ltr">${esc(tempPw.email)}</b>:</p><div class="uid">${esc(tempPw.tempPassword)}</div><p class="small">أرسلها له، ويغيّرها من نافذة الحساب بعد الدخول. لن تظهر مرة أخرى.</p><div class="row"><button class="btn ghost sm" id="tpc">انسخ</button><button class="btn ghost sm" id="tpx">إغلاق</button></div></div>` : ""}
    ${sel ? `<div class="ex-confirm inline"><p>سيُحذف حساب <b dir="ltr">${esc(sel.email)}</b> وكل بياناته نهائيًا.</p><div class="row"><button class="btn danger sm" id="dy">احذف</button><button class="btn ghost sm" id="dn">تراجع</button></div></div>` : ""}
    ${list.length ? `<div class="tbl"><table class="ut"><thead><tr>${COLS.map(([c, l]) => `<th data-k="${c}" tabindex="0" scope="col" aria-sort="${sortKey === c ? (asc ? "ascending" : "descending") : "none"}" class="${sortKey === c ? "sorted" + (asc ? " asc" : "") : ""}">${l}</th>`).join("")}<th scope="col"><span class="sr">إجراءات</span></th></tr></thead><tbody>
    ${list.map(x => `<tr><td class="mail" title="${esc(x.email)}">${esc(x.email)}</td><td>${x.track === "lit" ? "نظري" : x.track ? "علمي" : ""}</td><td class="num">${esc(x.target)}</td><td class="num">${x.est ?? "—"}</td><td class="num">${x.ready}%</td><td class="num">${x.solved}</td><td class="num">${x.acc}%</td><td class="num">${x.models}/30</td><td class="num">${x.streak}</td><td class="num">${esc(x.last)}</td><td class="num">${esc(x.created)}</td><td class="num">${esc(x.examDate)}</td><td>${x.email === me.email ? `<span class="status">حسابك</span>` : `<div class="row"><button class="btn ghost sm" data-pw="${esc(x.id)}" aria-label="كلمة مؤقتة لـ ${esc(x.email)}">كلمة مؤقتة</button><button class="btn danger-ghost sm" data-del="${esc(x.id)}" aria-label="حذف ${esc(x.email)}">حذف</button></div>`}</td></tr>`).join("")}
    </tbody></table></div>` : `<p class="empty">${USERS.length ? "لا نتائج مطابقة للبحث." : "لا يوجد مستخدمون بعد."}</p>`}</section>`;
  $("#so").onclick = async () => { await api("POST", "/api/logout").catch(() => {}); loginView(); }; $("#rl").onclick = load;
  const qi = $("#q"); qi.oninput = () => { q = qi.value.trim().toLowerCase(); const p = qi.selectionStart; render(); const n = $("#q"); n.focus(); n.setSelectionRange(p, p); };
  document.querySelectorAll("th[data-k]").forEach(th => { th.onclick = () => { if (sortKey === th.dataset.k) asc = !asc; else { sortKey = th.dataset.k; asc = false; } render(); const n = document.querySelector(`th[data-k="${th.dataset.k}"]`); if (n) n.focus(); }; th.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); th.onclick(); } }; });
  document.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { confirmDel = b.dataset.del; tempPw = null; render(); });
  document.querySelectorAll("[data-pw]").forEach(b => b.onclick = async () => { try { tempPw = await api("POST", `/api/admin/users/${encodeURIComponent(b.dataset.pw)}/reset-password`); confirmDel = null; render(); } catch (e) { if (!lost(e)) toast("تعذّر إنشاء كلمة مؤقتة"); } });
  const tpc = $("#tpc"); if (tpc) tpc.onclick = () => navigator.clipboard?.writeText(tempPw.tempPassword).then(() => toast("تم النسخ")).catch(() => {});
  const tpx = $("#tpx"); if (tpx) tpx.onclick = () => { tempPw = null; render(); };
  const dy = $("#dy"); if (dy) dy.onclick = async () => { try { await api("DELETE", `/api/admin/users/${encodeURIComponent(confirmDel)}`); USERS = USERS.filter(x => x.id !== confirmDel); toast("تم الحذف"); } catch (e) { if (lost(e)) return; toast("تعذّر الحذف"); } confirmDel = null; render(); };
  const dn = $("#dn"); if (dn) dn.onclick = () => { confirmDel = null; render(); };
  $("#csv").onclick = () => {
    // Excel: UTF-8 BOM so Arabic displays, CRLF rows, and neutralise cells that would run as formulas (=,+,-,@)
    const cell = v => { let t = String(v ?? ""); if (/^[=+\-@\t\r]/.test(t) && !/^-?\d+(\.\d+)?$/.test(t)) t = "'" + t; return `"${t.replace(/"/g, '""')}"`; };
    const rows = [COLS.map(c => c[0]).join(",")].concat(list.map(x => COLS.map(([c]) => cell(x[c])).join(",")));
    const url = URL.createObjectURL(new Blob(["\ufeff" + rows.join("\r\n") + "\r\n"], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `gat-academy-users-${new Date().toISOString().slice(0, 10)}.csv`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
}
async function boot() {
  try { const r = await api("GET", "/api/me"); me = r.user; if (!me) return loginView(); if (!me.isAdmin) return notAdminView(me); await load(); }
  catch (e) { loginView("تعذّر الاتصال بالخادم."); }
}
boot();
})();
