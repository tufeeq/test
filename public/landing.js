/* GAT Academy (أكاديمية القدرات) marketing page.
   The top part runs immediately in <head> (old app links, theme, language) so nothing flashes;
   the rest runs after the DOM is parsed: translations, live prices from /api/config, the explainer demo. */
(function () {
  'use strict';
  var D = document, R = D.documentElement;

  /* ---------- old app links: https://gat.academy/#lesson-algebra → /app#lesson-algebra ---------- */
  var OWN = { main: 1, demo: 1, how: 1, features: 1, skills: 1, voices: 1, pricing: 1, faq: 1 };
  var hash = location.hash;
  if (hash && hash.length > 1) {
    var hid = hash.slice(1);
    try { hid = decodeURIComponent(hid); } catch (e) {}
    if (!OWN[hid]) { location.replace('/app' + hash); return; }
  }
  R.classList.remove('no-js');

  /* ---------- storage helpers (private mode, blocked storage) ---------- */
  function sget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- theme: shares the app's key so the choice follows the student ---------- */
  var TKEY = 'masar100_theme';
  var TH = {};
  try { TH = JSON.parse(sget(TKEY) || '{}') || {}; } catch (e) { TH = {}; }
  function applyTheme() {
    if (TH.mode === 'light' || TH.mode === 'dark') R.setAttribute('data-theme', TH.mode); else R.removeAttribute('data-theme');
    if (TH.accent && TH.accent !== 'violet') R.setAttribute('data-accent', TH.accent); else R.removeAttribute('data-accent');
  }
  applyTheme();
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function isDark() { return TH.mode === 'dark' || (TH.mode !== 'light' && !!(mq && mq.matches)); }

  /* ---------- language: ?lang=en|ar > saved choice > the app's saved language > Arabic ---------- */
  var LKEY = 'gat_landing_lang';
  var LANG = 'ar';
  var qp = null;
  try { qp = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  if (qp === 'en' || qp === 'ar') { LANG = qp; sset(LKEY, qp); }
  else {
    var saved = sget(LKEY);
    if (saved === 'en' || saved === 'ar') LANG = saved;
    else { try { var S = JSON.parse(sget('masar100_v1') || 'null'); if (S && S.lang === 'en') LANG = 'en'; } catch (e) {} }
  }
  function setRootLang() { R.lang = LANG; R.dir = LANG === 'ar' ? 'rtl' : 'ltr'; }
  setRootLang();
  if (LANG === 'en') {
    R.classList.add('lp-pending');
    setTimeout(function () { R.classList.remove('lp-pending'); }, 1500);
  }

  /* ---------- numbers ---------- */
  var AR_D = '٠١٢٣٤٥٦٧٨٩';
  function N(n) {
    var s = String(n);
    return LANG === 'ar' ? s.replace(/\d/g, function (d) { return AR_D[d]; }).replace(/\./g, '٫') : s;
  }
  function money(n) { n = Number(n) || 0; return N(Number.isInteger(n) ? n : n.toFixed(2)); }
  function pct(f) { return LANG === 'ar' ? N(Math.round(f * 100)) + '٪' : Math.round(f * 100) + '%'; }
  // Arabic counted nouns: [one, two, 3–10, 11+]
  function arCount(n, f) {
    if (n === 1) return f[0];
    if (n === 2) return f[1];
    var m = n % 100;
    return N(n) + ' ' + (m >= 3 && m <= 10 ? f[2] : f[3]);
  }

  /* ---------- English copy (Arabic lives in the HTML) ---------- */
  var SCRIB = '<svg class="lp-scrib" viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12c38-7 76-9 114-6s66 4 100-3"/></svg>';
  var EN = {
    skip: 'Skip to content', n1: '1', n2: '2', n3: '3', n4: '4', n5: '5', brandFoot: 'GAT Academy · أكاديمية القدرات',
    brand: 'GAT Academy', brandSub: 'Prep for the General Aptitude Test',
    navAria: 'Page sections', navHow: 'How it works', navFeatures: 'Features', navSkills: 'Skills', navPricing: 'Pricing', navFaq: 'FAQ',
    themeAria: 'Dark mode', signIn: 'Sign in', startFree: 'Start free',
    heroEyebrow: 'General Aptitude Test · Qudurat · GAT',
    heroH: 'The GAT isn’t luck.<br>It’s <span class="lp-mark">ten skills' + SCRIB + '</span>, mastered.',
    heroLead: 'Start with a short diagnostic that pinpoints your level. Then a daily plan takes you all the way to test day: animated, narrated explainers, fresh practice, model tests in the computer-based format, and a mistake box that brings back what you got wrong before you forget it.',
    watch: 'Watch an explainer', proofAria: 'What you get',
    p1b: '33', p1: 'narrated explainers per language', p2b: '30', p2: 'model tests', p3b: '10', p3: 'skills measured and tracked',
    heroMicro: 'Free plan forever · No card needed · English & عربي',
    artMap: 'Mastery map', artSample: 'Illustration', verbal: 'Verbal', quant: 'Quantitative',
    sk_analogy: 'Verbal Analogy', sk_completion: 'Sentence Completion', sk_context: 'Contextual Error', sk_odd: 'Odd Word Out', sk_reading: 'Reading Comprehension',
    sk_arith: 'Arithmetic', sk_algebra: 'Algebra', sk_geometry: 'Geometry', sk_stats: 'Analysis & Statistics', sk_comparison: 'Quantitative Comparison',
    artWeek: 'This week’s plan', artToday: 'Today’s session', artT1: 'Review due mistakes', artT2: 'Explainer: variables', artT3: 'Algebra practice',
    artScoreV: '84', artScore: 'Estimated score',
    demoEyebrow: 'Try it now, no sign-up', demoH: 'Animated, narrated, and it stops so you can try',
    demoP: 'Each skill is taught step by step on the board in a clear voice. The explainer pauses so you can answer, then a short quiz locks the idea in. These ones are in the free plan. Pick one and press play:',
    capDemo: 'The player opens full screen and works with sound or with captions.',
    noJsDemo: 'The interactive demo needs JavaScript enabled in your browser.',
    playAria: 'Play the explainer', playL: 'Play the explainer', pickAria: 'Choose an explainer',
    pickNote: 'GAT Academy has 33 explainers in each language, covering all ten skills.',
    dA3: 'a tool for', dA_l: 'pen', dA_r: 'writing', dA4: 'scalpel : surgery',
    dO1: '3 + 4 × 2', dO2: 'Multiply first: 4 × 2 = 8', dO3: '3 + 8 = 11',
    dG1: '110°', dS1: 'It was cold, ____ the sun was out.', dS2: 'but', dS3: 'signals the unexpected',
    howEyebrow: 'From day one to test day', howH: 'How GAT Academy works', howP: 'Five clear steps, so every day you know what to study and why.',
    s1h: 'Diagnostic test', s1p: '20 questions in about 15 minutes, two from each skill, to show your level in all ten skills from day one.',
    s2h: 'Personal plan', s2p: 'A daily plan up to your test date that starts with your weakest skills and spreads review across the days.',
    s3h: 'Learn with explainers', s3p: 'An animated, narrated explainer for each idea, a short quiz after it, then flashcards, techniques and recurring patterns.',
    s4h: 'Practice and model tests', s4p: 'Fresh practice questions, then model tests in the computer-based format: 4 sections × 24 questions × 25 minutes.',
    s5h: 'Track your progress', s5p: 'A mastery map and an estimated score, plus a mistake box that brings back every question you missed until you master it.',
    featEyebrow: 'Everything in one place', featH: 'A complete kit, not just a question bank',
    featP: 'Learn the idea, practice it, test yourself under real exam conditions, and always know where you stand.',
    f1h: '33 animated explainers per language', f1p: 'Narrated in Arabic and in English. They pause so you can try it yourself, with a short quiz after.',
    f2h: '30 model tests', f2p: 'In the computer-based format: 4 sections × 24 questions, 25 minutes per section, with a real timer.',
    f3h: 'Fresh practice questions', f3p: 'New questions with changing numbers and wording, so you practice the idea instead of memorizing answers.',
    f4h: 'Illustrated flashcards', f4p: 'Cards that sum up each rule with a drawing. Flip and review them in minutes.',
    f5h: 'Vocabulary deck', f5p: 'Words that keep coming up in analogies, sentence completion and contextual error, with meanings.',
    f6h: 'Techniques & recurring patterns', f6p: 'Solving shortcuts and the question patterns that repeat, with an example for each.',
    f7h: 'A daily plan to your test date', f7p: 'A session ready for you every day: due reviews, then your two weakest skills, then a mix of questions.',
    f8h: 'Mistake box', f8p: 'Saves every question you got wrong and brings it back with spaced repetition, before you forget.',
    f9h: 'Mastery map', f9p: 'Your level in each of the ten skills at a glance, and where today’s minutes should go.',
    f10h: 'Estimated score', f10p: 'An estimate of your score based on how you actually perform, with a time analysis for each skill.',
    f11h: 'Arabic & English', f11p: 'Interface, questions and explainers in Arabic and in English, so you practice in your test language.',
    f12h: 'On your phone and computer', f12p: 'Runs in the browser with nothing to install, and your account carries your progress to any device.',
    skEyebrow: 'What the test measures', skH: 'The ten skills',
    skP: 'The test doesn’t measure what you memorized at school; it measures understanding and reasoning. Each skill comes with a lesson, explainers, practice and progress tracking.',
    verbalH: 'Verbal section', quantH: 'Quantitative section',
    skd_analogy: 'Find the relationship between two words, then pick the pair with the same relationship.',
    skd_completion: 'Choose what completes the meaning, using signal words and context.',
    skd_context: 'Spot the word that doesn’t fit the overall meaning of the sentence.',
    skd_odd: 'Find the word that doesn’t belong with the rest of the group.',
    skd_reading: 'Main idea, details and inference from a short passage.',
    skd_arith: 'Fractions, ratios, percentages and the order of operations.',
    skd_algebra: 'Variables, algebraic expressions and equations.',
    skd_geometry: 'Angles, triangles, circles and areas.',
    skd_stats: 'Mean, median and mode, and reading tables and charts.',
    skd_comparison: 'Compare two quantities and pick from the four fixed choices.',
    vEyebrow: 'From our students', vH: 'What students say',
    prEyebrow: 'Start free, upgrade when you’re ready', prH: 'Clear plans, no surprises',
    prP: 'The free plan is permanent: no time limit, no card, and everything in it works fully. A subscription unlocks everything up to your test day.',
    freeH: 'Free', freeTag: 'Forever', freePrice: '0 SAR', freeUnit: 'no time limit',
    freeD: 'Enough to find your level and start preparing seriously.',
    fl1: 'A diagnostic test: 20 questions in about 15 minutes', fl2: '8 animated, narrated explainers per language', fl3: '10 practice questions a day',
    fl4: 'A selection of flashcards and vocabulary from every skill', fl5: 'The first 2 weeks of the daily plan', fl6: 'A mistake box that keeps your last 15 mistakes',
    fl7: 'A selection of techniques and patterns', fl8: 'The mastery map, plus 2 skills in detail',
    freeCta: 'Start free', proH: 'Full access', proD: 'Everything in Free with no limits, plus everything you need to reach your target score:',
    pl1: 'All 33 explainers in each language', pl2: 'The 30 model tests, section tests and full timed mocks',
    pl3: 'Unlimited daily practice, plus targeted practice on a skill or pattern you choose', pl4: 'All flashcards, vocabulary, techniques and patterns',
    pl5: 'The full plan up to your test date, with your own test date and target score', pl6: 'Smart spaced repetition for mistakes and cards, and the cause of every mistake',
    pl7: 'Estimated score and time analysis per skill', pl8: 'Review any past attempt question by question',
    priceLoading: 'Current prices show here, and in the app.', seePlans: 'See plans in the app',
    payLine: 'Secure payment via Tap: mada, Apple Pay, STC Pay, Visa and Mastercard.',
    cmpH: 'Full comparison', cmpAria: 'Plan comparison', cmpFeat: 'Feature', cmpFree: 'Free', cmpPro: 'Full access',
    c1: 'Diagnostic test', c2: 'Animated, narrated explainers', c2f: '8 per language', c2p: '33 per language',
    c3: 'Practice questions', c3f: '10 a day', c3p: 'Unlimited', c4: 'Targeted practice on a skill or pattern',
    c5: 'The 30 model tests', c6: 'Section tests and full timed mocks', c7: 'Review past attempts question by question',
    c8: 'Flashcards and vocabulary', c8f: 'A selection', c9: 'Techniques and recurring patterns', c9f: 'A selection', all: 'All',
    c10: 'Daily study plan', c10f: 'First 2 weeks', c10p: 'Up to your test date', c11: 'Set your test date and target score',
    c12: 'Mistake box', c12f: 'Last 15', c12p: 'Complete', c13: 'Smart spaced repetition for mistakes and cards',
    c14: 'Mistake-cause analysis (concept, careless, time, trap)', c15: 'Mastery map', c16: 'Detailed skill analytics', c16f: '2 skills', c16p: 'All 10 skills',
    c17: 'Estimated score and time analysis per skill', c18: 'Arabic and English', yes: 'Included', no: 'Not included',
    faqEyebrow: 'Before you start', faqH: 'Frequently asked questions',
    q1: 'What is the General Aptitude Test (GAT)?',
    a1: '<p>A standardized test from the National Center for Assessment (Qiyas) at the Education and Training Evaluation Commission, taken by secondary school students. Saudi universities use it for admission as part of the weighted score. It doesn’t measure what you memorized from the curriculum; it measures your ability to understand, analyze and infer through language and numbers, in two parts: verbal and quantitative. That’s why it improves with skill practice, not by memorizing answers.</p>',
    q2: 'Is the free plan really free forever?',
    a2: '<p>Yes. The free plan is permanent: there’s no trial that runs out, and you don’t need a card to sign up. It includes the diagnostic test, selected explainers, daily practice questions, the first two weeks of your plan and more. Everything in it works fully, and subscriber features stay visible with their name and benefit, so you can decide for yourself.</p>',
    q3: 'What do I get when I subscribe?',
    a3: '<p>Everything: all 33 explainers in each language, the 30 model tests, section tests and full timed mocks, unlimited and targeted practice, all flashcards, vocabulary and techniques, the full plan up to your test date, spaced repetition and mistake-cause analysis, the estimated score, and review of any past attempt. A subscription ends when its period ends; it does not renew automatically.</p>',
    q4: 'Which payment methods can I use?',
    a4: '<p>You pay through Tap’s secure checkout, which accepts mada, Apple Pay, STC Pay, Visa and Mastercard. We never store your card details.</p>',
    q5: 'Can I get a refund?',
    a5: '<p>Yes. If your subscription isn’t right for you within the period shown in the pricing section, we refund the full amount to the same payment method. To request a refund, email <a href="mailto:info@gat.academy">info@gat.academy</a>.</p>',
    q6: 'Is it in Arabic and English?',
    a6: '<p>Yes. The interface, questions and narrated explainers are available in Arabic and in English, so you practice in the language of your test, and you can switch at any time with one tap.</p>',
    q7: 'Does it work on mobile?',
    a7: '<p>Yes. It runs in the browser on your phone, tablet or computer with nothing to install, and the design is made for small screens. Once you sign up, your progress is saved to your account and follows you to any device.</p>',
    q8: 'Is my data private?',
    a8: '<p>We keep only your email, your name and your practice progress (plus your track, target score and test date if you add them), and we use them only to support your preparation. We never ask for a phone number or ID, and you can delete your account and all your data at any time from the account page.</p>',
    finEyebrow: 'Five minutes is enough to start', finH: 'Find your level today. Start your plan tomorrow.',
    finP: 'Take the diagnostic for free, then watch the explainer for your weakest skill.',
    readGuide: 'Read the test guide',
    footD: 'A complete kit to prepare for the General Aptitude Test, in Arabic and English.', footAria: 'Links',
    footApp: 'Open the app', footGuide: 'Test guide', footPrivacy: 'Privacy Policy', footTerms: 'Terms'
  };
  var META = {
    ar: { title: null, desc: null },
    en: { title: 'GAT Academy | Prepare for the General Aptitude Test with a daily plan and narrated explainers',
          desc: 'Prepare for the Saudi General Aptitude Test (GAT / Qudurat) with a diagnostic, a daily plan up to your test date, 33 narrated explainers, 30 model tests in the computer-based format and a mistake box with spaced review. In Arabic and English, with a free plan that never expires.' }
  };

  /* ---------- the rest needs the DOM ---------- */
  var CFG = null, CFG_FAILED = false, AR_TXT = new Map(), AR_ARIA = new Map();
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };

  function translate() {
    $$('[data-i]').forEach(function (el) {
      if (!AR_TXT.has(el)) AR_TXT.set(el, el.innerHTML);
      var k = el.getAttribute('data-i');
      el.innerHTML = LANG === 'en' && EN[k] != null ? EN[k] : AR_TXT.get(el);
    });
    $$('[data-i-aria]').forEach(function (el) {
      if (!AR_ARIA.has(el)) AR_ARIA.set(el, el.getAttribute('aria-label'));
      var k = el.getAttribute('data-i-aria');
      el.setAttribute('aria-label', LANG === 'en' && EN[k] != null ? EN[k] : AR_ARIA.get(el));
    });
    var md = $('meta[name="description"]');
    if (META.ar.title == null) { META.ar.title = D.title; META.ar.desc = md ? md.content : ''; }
    D.title = META[LANG].title; if (md) md.content = META[LANG].desc;
    // the toggle offers the other language
    var lb = $('#lp-lang');
    if (lb) {
      var other = LANG === 'ar' ? 'en' : 'ar';
      lb.textContent = other === 'en' ? 'English' : 'العربية';
      lb.setAttribute('lang', other); lb.setAttribute('hreflang', other);
      lb.setAttribute('href', '?lang=' + other);
      lb.setAttribute('aria-label', other === 'en' ? 'English' : 'العربية');
    }
    // app links carry the language (the app can read ?lang= for first-time visitors)
    $$('[data-app]').forEach(function (a) { a.setAttribute('href', '/app?lang=' + LANG + a.getAttribute('data-app')); });
    var y = $('#lp-year'); if (y) y.textContent = N(new Date().getFullYear());
  }

  /* ---------- live config: free plan list, paid plans, refund, banner ---------- */
  function T(ar, en) { return LANG === 'ar' ? ar : en; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function cur(c) { return c === 'SAR' || !c ? T('ر.س', 'SAR') : esc(c); }
  function days(n) { return LANG === 'ar' ? arCount(n, ['يوم واحد', 'يومان', 'أيام', 'يومًا']) : N(n) + (n === 1 ? ' day' : ' days'); }
  function xpPerLang(f) { var ar = 0, en = 0; (f.xp || []).forEach(function (k) { if (/^en-/.test(k)) en++; else ar++; }); return Math.max(ar, en); }

  function renderFree() {
    if (!CFG || !CFG.free) return;
    var f = CFG.free, it = [];
    var nx = xpPerLang(f), dq = +f.dailyQuestions || 0, pw = +f.planWeeks || 0, mm = +f.mistakesMax || 0;
    if (f.diagnostic !== false) it.push(T('اختبار تشخيصي: ٢٠ سؤالًا في نحو ١٥ دقيقة', 'A diagnostic test: 20 questions in about 15 minutes'));
    if (nx) it.push(T(arCount(nx, ['شرح متحرك مسموع واحد', 'شرحان متحركان مسموعان', 'شروحات متحركة مسموعة', 'شرحًا متحركًا مسموعًا']) + ' بكل لغة', N(nx) + ' animated, narrated explainer' + (nx === 1 ? '' : 's') + ' per language'));
    if (dq) it.push(T(arCount(dq, ['سؤال تدريب واحد', 'سؤالا تدريب', 'أسئلة تدريب', 'سؤال تدريب']) + ' يوميًا', N(dq) + ' practice question' + (dq === 1 ? '' : 's') + ' a day'));
    if (f.cardsFrac) it.push(T('مختارات من البطاقات والمفردات في كل المهارات', 'A selection of flashcards and vocabulary from every skill'));
    if (pw) it.push(T('أول ' + arCount(pw, ['أسبوع', 'أسبوعين', 'أسابيع', 'أسبوعًا']) + ' من الخطة اليومية', 'The first ' + (pw === 1 ? 'week' : N(pw) + ' weeks') + ' of the daily plan'));
    if (mm) it.push(T('صندوق أخطاء يحفظ آخر ' + arCount(mm, ['خطأ', 'خطأين', 'أخطاء', 'خطأً']), 'A mistake box that keeps your last ' + N(mm) + ' mistakes'));
    if (f.techFrac) it.push(T('مختارات من التقنيات والأنماط', 'A selection of techniques and patterns'));
    it.push(T('خريطة الإتقان، وتحليل مفصّل لمهارتين', 'The mastery map, plus 2 skills in detail'));
    var ul = $('#lp-free-list');
    if (ul) ul.innerHTML = it.map(function (s) { return '<li>' + s + '</li>'; }).join('');
    // comparison table cells
    function cell(id, html) { var c = D.getElementById(id); if (c) c.innerHTML = html; }
    if (nx) cell('cmp-xp', T(N(nx) + ' بكل لغة', N(nx) + ' per language'));
    if (dq) cell('cmp-daily', T(N(dq) + ' يوميًا', N(dq) + ' a day'));
    if (f.cardsFrac) cell('cmp-cards', T('مختارات', 'A selection'));
    if (f.techFrac) cell('cmp-tech', T('مختارات', 'A selection'));
    if (pw) cell('cmp-plan', T('أول ' + arCount(pw, ['أسبوع', 'أسبوعين', 'أسابيع', 'أسبوعًا']), 'First ' + (pw === 1 ? 'week' : N(pw) + ' weeks')));
    if (mm) cell('cmp-mist', T('آخر ' + arCount(mm, ['خطأ', 'خطأين', 'أخطاء', 'خطأً']), 'Last ' + N(mm)));
  }

  function renderPlans() {
    var box = $('#lp-opts'); if (!box) return;
    var href = '/app?lang=' + LANG;
    if (!CFG) {
      if (CFG_FAILED) box.innerHTML = '<div class="lp-opt"><p>' + T('تعذّر تحميل الأسعار الآن. تجدها داخل المنصة.', 'Couldn’t load prices right now. You’ll find them in the app.') + '</p><a class="btn primary block" href="' + href + '#upgrade">' + T('اعرض الخطط في المنصة', 'See plans in the app') + '</a></div>';
      return;
    }
    var plans = (CFG.plans || []).slice();
    if (!plans.length) { box.innerHTML = '<div class="lp-opt"><p>' + T('لا توجد خطط اشتراك متاحة حاليًا.', 'No subscription plans are available right now.') + '</p></div>'; return; }
    box.innerHTML = plans.map(function (p) {
      var name = esc(LANG === 'ar' ? (p.ar || p.en || p.id) : (p.en || p.ar || p.id));
      var price = Number(p.price) || 0, d = Number(p.days) || 0;
      var per = d ? (Math.round(price / d * 100) / 100) : 0;
      return '<div class="lp-opt' + (p.best ? ' best' : '') + '">' +
        (p.best ? '<span class="lp-best">' + T('الأفضل قيمة', 'Best value') + '</span>' : '') +
        '<h4>' + name + '</h4>' +
        '<p class="lp-price"><b>' + money(price) + '</b><span>' + cur(CFG.currency) + (d ? ' · ' + days(d) : '') + '</span></p>' +
        '<p class="lp-per">' + (per ? T('≈ ' + money(per) + ' ر.س في اليوم', '≈ ' + money(per) + ' ' + (CFG.currency || 'SAR') + ' a day') : '') + '</p>' +
        '<a class="btn ' + (p.best ? 'primary' : 'ghost') + ' block" href="' + href + '#upgrade?plan=' + encodeURIComponent(p.id) + '">' + T('اشترك', 'Subscribe') + '</a>' +
        '</div>';
    }).join('');
    if (CFG.currency && CFG.currency !== 'SAR') $$('.lp-per', box).forEach(function (e) { e.textContent = ''; });
  }

  function renderRefund() {
    var r = CFG && CFG.refund, el = $('#lp-refund'), q5 = $('#lp-a5');
    if (!el) return;
    if (r && r.on && r.days) {
      $('#lp-refund-t').textContent = T('ضمان استرداد كامل خلال ' + days(+r.days) + ' من الاشتراك', 'Full refund within ' + days(+r.days) + ' of subscribing');
      el.hidden = false;
      if (q5) q5.innerHTML = '<p>' + T('نعم. إن لم يناسبك الاشتراك خلال ' + days(+r.days) + ' من بدايته، نعيد إليك المبلغ كاملًا إلى وسيلة الدفع نفسها. لطلب الاسترداد راسلنا على <a href="mailto:info@gat.academy" dir="ltr">info@gat.academy</a>.',
        'Yes. If your subscription isn’t right for you within ' + days(+r.days) + ' of starting it, we refund the full amount to the same payment method. To request a refund, email <a href="mailto:info@gat.academy">info@gat.academy</a>.') + '</p>';
    } else {
      el.hidden = true;
      if (CFG && q5) { var d = q5.closest('details'); if (d) d.hidden = true; }
    }
  }

  function renderBanner() {
    var b = CFG && CFG.banner, el = $('#lp-banner');
    if (!el) return;
    var txt = b && b.on ? (LANG === 'ar' ? b.ar : b.en) || '' : '';
    if (!txt) { el.hidden = true; return; }
    el.className = 'lp-banner ' + (b.tone || 'info');
    $('#lp-banner-t').textContent = txt;
    el.hidden = false;
  }

  function renderLive() { renderFree(); renderPlans(); renderRefund(); renderBanner(); }

  /* a signed-in student browsing the page: "Sign in" becomes "Open the app" */
  function signedIn() {
    var a = $('.lp-signin'); if (!a) return;
    AR_TXT.set(a, 'ادخل المنصة'); a.setAttribute('data-i', 'footApp'); a.setAttribute('data-app', '');
    translate();
  }
  function loadConfig() {
    var done = false;
    var to = setTimeout(function () { if (!done) { CFG_FAILED = true; renderPlans(); } }, 8000);
    fetch('/api/me', { credentials: 'same-origin', headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (j) { done = true; clearTimeout(to); CFG = (j && j.config) || null; CFG_FAILED = !CFG; if (j && j.user) signedIn(); renderLive(); })
      .catch(function () { done = true; clearTimeout(to); CFG_FAILED = true; renderPlans(); });
  }

  /* ---------- explainer demo ---------- */
  var DEMO = ['analogy', 'ar-order', 'ge-angles', 'co-signals'];
  var sel = 'analogy', tracks = null, lastTrigger = null;
  function xpKey(k) { return LANG === 'en' ? 'en-' + k : k; }
  function hasXP() { return !!(window.XP && window.XP.ready && typeof window.XP.open === 'function'); }
  function syncDemo() {
    var ok = hasXP(), any = false;
    $$('.lp-pk').forEach(function (b) {
      var k = b.getAttribute('data-xp'), L = ok ? window.XP.get(xpKey(k)) : null;
      if (ok && !L) { b.hidden = true; return; }
      b.hidden = false; any = true;
      if (L) {
        var t = $('[data-xt="' + k + '"]', b), m = $('[data-xm="' + k + '"]', b);
        if (t) t.textContent = L.title; if (m) m.textContent = L.min || '';
      }
    });
    if (ok && !any) { var g = $('.lp-demo-grid'); if (g) g.hidden = true; }
    var cur = $('.lp-pk[data-xp="' + sel + '"]');
    if (!cur || cur.hidden) { var first = $$('.lp-pk').filter(function (b) { return !b.hidden; })[0]; if (first) sel = first.getAttribute('data-xp'); }
    pick(sel);
  }
  function pick(k) {
    sel = k;
    $$('.lp-pk').forEach(function (b) { var on = b.getAttribute('data-xp') === k; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    var st = $('#lp-stage'); if (st) st.setAttribute('data-k', k);
    var t = $('[data-xt="' + k + '"]'), stt = $('#lp-stage-t');
    if (t && stt) stt.textContent = t.textContent;
  }
  function openXp(k, trigger) {
    if (!hasXP()) { var d = $('#demo'); if (d) d.scrollIntoView({ behavior: 'smooth' }); return; }
    var key = xpKey(k);
    if (!window.XP.get(key)) key = xpKey(DEMO[0]);
    lastTrigger = trigger || null;
    var play = $('#lp-play'); if (play) play.classList.add('busy');
    var wait = new Promise(function (res) { setTimeout(res, 2500); });
    Promise.race([tracks || Promise.resolve(), wait]).then(function () {
      if (play) play.classList.remove('busy');
      window.XP.open(key);
    });
  }
  function initDemo() {
    if (hasXP()) {
      try { tracks = window.XP.loadTracks(); } catch (e) { tracks = null; }
      window.XP.setHooks({ onClose: function () { if (lastTrigger && lastTrigger.focus) { try { lastTrigger.focus({ preventScroll: true }); } catch (e) {} } } });
    }
    $$('.lp-pk').forEach(function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-xp')); }); });
    var play = $('#lp-play'); if (play) play.addEventListener('click', function () { openXp(sel, play); });
    $$('[data-xp-hero]').forEach(function (a) { a.addEventListener('click', function (e) { if (!hasXP()) return; e.preventDefault(); openXp('analogy', a); }); });
    syncDemo();
  }

  /* ---------- header, theme button, language button ---------- */
  function syncThemeBtn() {
    var b = $('#lp-theme'); if (b) b.setAttribute('aria-pressed', isDark() ? 'true' : 'false');
  }
  function initChrome() {
    var top = $('#lp-top');
    var onScroll = function () { if (top) top.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    var tb = $('#lp-theme');
    if (tb) tb.addEventListener('click', function () {
      TH.mode = isDark() ? 'light' : 'dark';
      sset(TKEY, JSON.stringify(TH)); applyTheme(); syncThemeBtn();
    });
    if (mq && mq.addEventListener) mq.addEventListener('change', syncThemeBtn);
    syncThemeBtn();
    var lb = $('#lp-lang');
    if (lb) lb.addEventListener('click', function (e) {
      e.preventDefault();
      LANG = LANG === 'ar' ? 'en' : 'ar'; sset(LKEY, LANG);
      try { var u = new URL(location.href); if (u.searchParams.has('lang')) { u.searchParams.set('lang', LANG); history.replaceState(null, '', u.pathname + u.search + u.hash); } } catch (err) {}
      setRootLang(); translate(); renderLive(); syncDemo(); syncThemeBtn();
    });
  }

  /* ---------- gentle reveal for content below the fold ---------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var groups = ['.lp-sh', '.lp-steps', '.lp-feats', '.lp-skills', '.lp-plans', '.lp-cmp-wrap', '.lp-faqs', '.lp-band', '.lp-demo-grid'];
    var els = [];
    groups.forEach(function (g) {
      $$(g).forEach(function (el) {
        var kids = /lp-steps|lp-feats|lp-skills|lp-plans|lp-faqs/.test(el.className) ? Array.prototype.slice.call(el.children) : [el];
        kids.forEach(function (k, i) { els.push(k); k.style.setProperty('--d', Math.min(i, 6) * 0.06 + 's'); });
      });
    });
    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) return; // already on screen: leave it be
      el.classList.add('lp-rv'); io.observe(el);
    });
  }

  function start() {
    translate();
    R.classList.remove('lp-pending');
    renderLive();
    initChrome();
    initDemo();
    initReveal();
    loadConfig();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
