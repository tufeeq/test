(function(){
  const els = [...document.querySelectorAll('[data-en]')]; els.forEach(e => e.dataset.ar = e.textContent);
  let lang = 'ar'; try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('ielts_lp_lang') || 'ar'; } catch (e) {}
  function apply() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    els.forEach(e => e.textContent = lang === 'ar' ? e.dataset.ar : e.dataset.en);
    document.getElementById('lp-lang').textContent = lang === 'ar' ? 'English' : 'العربية';
    document.querySelectorAll('a[href^="/app"]').forEach(a => { const b = a.dataset.base || (a.dataset.base = a.getAttribute('href').split('?')[0]); a.href = b + (b.includes('#') ? '' : '') + (b.indexOf('?') < 0 ? '?lang=' : '&lang=') + lang; });
    const cp = document.getElementById('lp-cmp-price'); if (cp && CFG && CFG.plans.length) { const m = Math.min(...CFG.plans.map(p => Math.round(p.price / Math.max(1, p.days / 30)))); cp.textContent = lang === 'ar' ? `من ${String(m).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])} ريالًا شهريًا` : `from SAR ${m}/month`; }
    document.title = lang === 'ar' ? 'أكاديمية الآيلتس | IELTS Academy' : 'IELTS Academy | أكاديمية الآيلتس';
    plans();
  }
  document.getElementById('lp-lang').onclick = () => { lang = lang === 'ar' ? 'en' : 'ar'; try { localStorage.setItem('ielts_lp_lang', lang); } catch (e) {} apply(); };
  let CFG = null;
  function plans() {
    const box = document.getElementById('lp-plans'); box.querySelectorAll('.paid').forEach(x => x.remove()); if (!CFG) return;
    const ar = lang === 'ar', num = n => ar ? String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) : n;
    const ben = ar ? ['كل الشروحات المرئية التفاعلية للمهارات الـ١٦', 'كل الاختبارات الكاملة مع الشرح بالعربية', 'المصحح الذكي للكتابة والمحادثة يوميًا', 'كل الدروس والبطاقات والإجابات النموذجية', 'الخطة الكاملة وصندوق أخطاء غير محدود', 'اختبار محادثة كامل بممتحن صوتي'] : ['All 16 interactive video explainers', 'Every full test with Arabic explanations', 'Daily AI marking for Writing & Speaking', 'All lessons, cards and model answers', 'The full plan and unlimited mistake box', 'A full speaking mock with a voiced examiner'];
    CFG.plans.forEach(p => { const d = document.createElement('div'); d.className = 'card paid' + (p.best ? ' best' : '');
      d.innerHTML = `<h3>${ar ? p.ar : p.en}${p.best ? ` <span class="chip pri">${ar ? 'الأوفر' : 'Best value'}</span>` : ''}</h3><div class="price">${num(p.price)} <small style="font-size:1rem">${ar ? 'ريال' : 'SAR'}</small></div>${p.days > 31 ? `<p class="small" style="margin:0;color:var(--teal-t,#14686C);font-weight:700">${ar ? `≈ ${num(Math.round(p.price / (p.days / 30)))} ريال شهريًا` : `≈ SAR ${Math.round(p.price / (p.days / 30))}/month`}</p>` : ''}<p class="small muted">${ar ? `دفعة واحدة لمدة ${num(p.days)} يومًا · بدون تجديد تلقائي` : `One payment for ${p.days} days · no auto-renewal`}</p><ul class="benefits">${ben.map(b => `<li>✓ ${b}</li>`).join('')}</ul><a class="btn ${p.best ? 'primary' : ''} block" href="/app?lang=${lang}#upgrade">${ar ? 'اشترك' : 'Subscribe'}</a>`;
      box.appendChild(d); });
  }
  fetch('/api/config').then(r => r.json()).then(j => { CFG = j.config; apply(); }).catch(() => {});
  apply();
})();
