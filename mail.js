// Transactional email (password reset) through Resend's HTTP API — no extra packages.
// Needs RESEND_API_KEY; the sender defaults to no-reply@<CANONICAL_HOST> (that domain must be verified in Resend).
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const configured = () => !!process.env.RESEND_API_KEY || process.env.MAIL_LOG === "1";
const from = () => process.env.MAIL_FROM || `أكاديمية الآيلتس <no-reply@${process.env.CANONICAL_HOST || "myielts.academy"}>`;
async function send({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) { console.log("[mail:dev]", to, subject, (text.match(/https?:\/\/\S+/) || [""])[0]); return { id: "dev" }; } // local testing only
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ from: from(), to: [to], subject, html, text, reply_to: process.env.MAIL_REPLY_TO || `info@${process.env.CANONICAL_HOST || "myielts.academy"}` })
  });
  if (!r.ok) { const t = (await r.text()).slice(0, 300); if (r.status === 403) diagnose("send rejected"); throw new Error("resend " + r.status + " " + t); }
  return r.json();
}
// Ask Resend for the domain's state, request (re)verification if needed, and log each DNS record's status.
let lastDiag = 0;
async function diagnose(reason) {
  if (!process.env.RESEND_API_KEY || Date.now() - lastDiag < 10 * 60e3) return; lastDiag = Date.now();
  const H = { Authorization: "Bearer " + process.env.RESEND_API_KEY };
  try {
    const list = await (await fetch("https://api.resend.com/domains", { headers: H })).json();
    const ds = list.data || [];
    if (!ds.length) { console.error("[mail] Resend account behind RESEND_API_KEY has NO domains. Add myielts.academy in the same Resend account (" + reason + ")"); return; }
    for (const d of ds) {
      const full = await (await fetch("https://api.resend.com/domains/" + d.id, { headers: H })).json();
      console.log(`[mail] Resend domain ${d.name} status=${d.status} region=${d.region || full.region || "?"} (${reason})`);
      (full.records || []).forEach(r => console.log(`[mail]   ${r.record} ${r.type} ${r.name} -> ${String(r.value).slice(0, 70)} : ${r.status}`));
      if (d.status !== "verified") { const v = await fetch("https://api.resend.com/domains/" + d.id + "/verify", { method: "POST", headers: H }); console.log("[mail] verification requested:", v.status); }
    }
  } catch (e) { console.error("[mail] diagnose failed", e.message); }
}
function sendReset({ to, name, link, minutes, lang }) {
  const ar = lang !== "en", n = esc(name || "");
  const subject = ar ? "إعادة تعيين كلمة المرور · أكاديمية الآيلتس" : "Reset your password · IELTS Academy";
  const btn = `<a href="${esc(link)}" style="display:inline-block;background:#CC4A22;color:#fff;text-decoration:none;font-weight:700;padding:12px 26px;border-radius:12px;border:2px solid #14213D">${ar ? "عيّن كلمة مرور جديدة" : "Set a new password"}</a>`;
  const body = ar
    ? `<p>مرحبًا ${n}،</p><p>وصلنا طلب لإعادة تعيين كلمة المرور لحسابك في أكاديمية الآيلتس. اضغط الزر لتعيين كلمة مرور جديدة:</p><p style="margin:22px 0">${btn}</p><p style="color:#6B7390;font-size:14px">الرابط صالح لمدة ${minutes} دقيقة ولمرة واحدة فقط. إن لم تطلب ذلك فتجاهل هذه الرسالة، وستبقى كلمة مرورك كما هي.</p>`
    : `<p>Hi ${n},</p><p>We received a request to reset the password for your IELTS Academy account. Press the button to choose a new one:</p><p style="margin:22px 0">${btn}</p><p style="color:#6B7390;font-size:14px">The link works once and expires in ${minutes} minutes. If you did not ask for this, ignore this email and your password stays the same.</p>`;
  const html = `<!doctype html><html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}"><body style="margin:0;background:#FBF8F2;font-family:Tahoma,Arial,sans-serif;color:#14213D">
<div style="max-width:520px;margin:0 auto;padding:28px 18px"><div style="font-weight:700;font-size:18px;margin-bottom:14px">${ar ? "أكاديمية الآيلتس" : "IELTS Academy"}</div>
<div style="background:#fff;border:1.5px solid #E6DFD1;border-radius:16px;padding:22px;line-height:1.8;text-align:${ar ? "right" : "left"}">${body}
<p style="color:#6B7390;font-size:12px;word-break:break-all;direction:ltr;text-align:left">${esc(link)}</p></div>
<p style="color:#6B7390;font-size:12px;text-align:center;margin-top:16px">myielts.academy</p></div></body></html>`;
  const text = ar ? `مرحبًا ${name || ""}\nلإعادة تعيين كلمة المرور افتح الرابط (صالح ${minutes} دقيقة ولمرة واحدة):\n${link}\nإن لم تطلب ذلك فتجاهل الرسالة.` : `Hi ${name || ""}\nOpen this link to reset your password (one use, ${minutes} minutes):\n${link}\nIf you did not ask for this, ignore this email.`;
  return send({ to, subject, html, text });
}
module.exports = { configured, send, sendReset, diagnose };
setTimeout(() => diagnose("startup"), 5000).unref();
