(function(){
  const els = [...document.querySelectorAll('[data-en]')];
  // the server may have rendered the page in English (/?lang=en): then the text on the page is the English one
  const srvEn = document.documentElement.lang === 'en';
  els.forEach(e => { if (!srvEn) e.dataset.ar = e.textContent; }); // server-rendered English carries the Arabic in data-ar
  let lang = 'ar'; try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('ielts_lp_lang') || 'ar'; } catch (e) {}
  if (lang !== 'en') lang = 'ar';
  // plans + currency come embedded (#lp-cfg) so the cards never flash or depend on a second request
  let CFG = null; try { CFG = JSON.parse(document.getElementById('lp-cfg').textContent); } catch (e) {}
  function apply() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    els.forEach(e => { const t = lang === 'ar' ? e.dataset.ar : e.dataset.en; if (t) e.textContent = t; });
    document.getElementById('lp-lang').textContent = lang === 'ar' ? 'English' : 'العربية';
    document.querySelectorAll('a[href^="/app"]').forEach(a => { try { const u = new URL(a.getAttribute('href'), location.origin); u.searchParams.set('lang', lang); a.setAttribute('href', u.pathname + u.search + u.hash); } catch (e) {} });
    const cp = document.getElementById('lp-cmp-price'); if (cp && CFG && CFG.plans.length) { const m = Math.min(...CFG.plans.map(p => Math.round(p.price / Math.max(1, p.days / 30)))); cp.textContent = lang === 'ar' ? `من ${String(m).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])} ريالًا شهريًا` : `from SAR ${m}/month`; }
    document.title = lang === 'ar' ? 'أكاديمية الآيلتس | IELTS Academy' : 'IELTS Academy | أكاديمية الآيلتس';
    plans();
  }
  document.getElementById('lp-lang').onclick = () => { lang = lang === 'ar' ? 'en' : 'ar'; try { localStorage.setItem('ielts_lp_lang', lang); } catch (e) {} apply(); };
  function plans() {
    const box = document.getElementById('lp-plans'); if (!CFG) return; // no config: keep the server-rendered cards
    box.querySelectorAll('.paid').forEach(x => x.remove());
    const ar = lang === 'ar', num = n => ar ? String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) : n;
    const ben = ar ? ['كل الشروحات المرئية التفاعلية للمهارات الـ١٦', 'كل الاختبارات الكاملة مع الشرح بالعربية', 'المصحح الذكي للكتابة والمحادثة يوميًا', 'كل الدروس والبطاقات والإجابات النموذجية', 'الخطة الكاملة وصندوق أخطاء غير محدود', 'اختبار محادثة كامل بممتحن صوتي'] : ['All 16 interactive video explainers', 'Every full test with Arabic explanations', 'Daily AI marking for Writing & Speaking', 'All lessons, cards and model answers', 'The full plan and unlimited mistake box', 'A full speaking mock with a voiced examiner'];
    const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    CFG.plans.forEach(p => { const d = document.createElement('div'); d.className = 'card paid' + (p.best ? ' best' : '');
      d.innerHTML = `<h3>${esc(ar ? p.ar : p.en)}${p.best ? ` <span class="chip pri">${ar ? 'الأوفر' : 'Best value'}</span>` : ''}</h3><div class="price">${num(p.price)} <small style="font-size:1rem">${ar ? 'ريال' : 'SAR'}</small></div>${p.days > 31 ? `<p class="small" style="margin:0;color:var(--teal-t,#14686C);font-weight:700">${ar ? `≈ ${num(Math.round(p.price / (p.days / 30)))} ريال شهريًا` : `≈ SAR ${Math.round(p.price / (p.days / 30))}/month`}</p>` : ''}<p class="small muted">${ar ? `دفعة واحدة لمدة ${num(p.days)} يومًا · بدون تجديد تلقائي` : `One payment for ${p.days} days · no auto-renewal`}</p><ul class="benefits">${ben.map(b => `<li>✓ ${b}</li>`).join('')}</ul><a class="btn ${p.best ? 'primary' : ''} block" href="/app?lang=${lang}#upgrade">${ar ? 'اشترك' : 'Subscribe'}</a>`;
      box.appendChild(d); });
  }
  if (!CFG) fetch('/api/config').then(r => r.json()).then(j => { CFG = j.config; apply(); }).catch(() => {});
  apply();
})();
