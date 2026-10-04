/* Explainers: Writing (الكتابة) */
(function(){ if(!window.XP||!XP.ready||!XP.bi) return;
const B=XP.bi;

/* ---------- W-t1: overview + data language ---------- */
B({ key:'xp-W-t1', sk:'W-t1', ord:10, title:['المهمة الأولى: النظرة العامة أولًا','Task 1: the overview comes first'], min:['٥ دقائق','5 min'],
  goals:[['تكتب نظرة عامة بلا أرقام','Write an overview without numbers'],['تختار الملامح الرئيسية فقط','Select only the key features'],['تستخدم لغة الاتجاه والمقارنة','Use trend and comparison language']],
  scenes:[
  { t:['ما المطلوب؟','What is the task?'],
    items:{
      bars:{type:'bars',x:150,y:90,w:340,h:170,values:[20,35,50,80],labels:['2000','2005','2010','2015'],c:['prisoft','prisoft','prisoft','pri']},
      cap:{type:'text',x:320,y:76,s:19,cls:'t-ink2',text:'Online shoppers (%)'},
      tip:{type:'note',x:320,y:318,w:470,h:54,c:'n0',size:20,rot:-1,text:['صِف واختر وقارن، دون رأيك وفي ١٥٠ كلمة على الأقل','Describe, select, compare: no opinion, 150+ words']},
    },
    beats:[
      { say:['في المهمة الأولى أمامك رسم بياني أو جدول أو مخطط، والمطلوب أن تصفه في مئة وخمسين كلمة على الأقل، خلال عشرين دقيقة تقريبًا.','Task 1 gives you a chart, table or diagram. You describe it in at least 150 words, in about 20 minutes.'], show:['cap','bars'] },
      { say:['لا تكتب رأيك ولا أسبابًا من عندك. وظيفتك أن تختار أهم الملامح وتقارن بينها.','No opinions and no reasons of your own. Your job is to select the main features and compare them.'], show:['tip'] },
    ]},
  { t:['النظرة العامة','The overview'],
    items:{
      bars:{type:'bars',x:150,y:84,w:340,h:130,values:[20,35,50,80],labels:['2000','2005','2010','2015'],c:'prisoft',vals:false},
      arr:{type:'arrow',x1:180,y1:200,x2:470,y2:96,cls:'s-pink',bend:-10},
      ov:{type:'box',x:60,y:256,w:520,h:56,c:'n3',s:19,text:'Overall, online shopping rose steadily throughout the period.'},
      no:{type:'text',x:320,y:340,s:20,hand:true,text:['الاتجاه العام، بلا أرقام','The big picture, no numbers']},
    },
    beats:[
      { say:['أهم فقرة في المهمة الأولى هي النظرة العامة، overview. بدونها لا تتجاوز درجة الخمسة في معيار الإنجاز.','The most important paragraph is the overview. Without it, Task Achievement is capped at band 5.'], show:['bars'] },
      { say:['انظر إلى الصورة الكاملة: ما الاتجاه العام؟ هنا ارتفاع مستمر.','Look at the big picture: what is the main trend? Here, a steady rise.'], show:['arr'] },
      { say:['فتكتب: Overall, online shopping rose steadily throughout the period. جملة واحدة أو اثنتان، بلا أرقام.','So you write: “Overall, online shopping rose steadily throughout the period.” One or two sentences, no numbers.'], show:['ov','no'] },
    ]},
  { t:['لغة الاتجاه','Trend language'],
    items:(()=>{ const o={}; const rows=[['rose sharply',[[0,60],[110,0]]],['increased gradually',[[0,60],[110,30]]],['remained stable',[[0,30],[110,30]]],['fell dramatically',[[0,0],[110,60]]],['fluctuated',[[0,30],[22,8],[44,52],[66,12],[88,48],[110,26]]],['peaked at',[[0,60],[55,0],[110,40]]]];
      rows.forEach(([w,pts],i)=>{ const x0=85+(i%3)*190, y0=78+Math.floor(i/3)*136;
        o['f'+i]={type:'box',x:x0-14,y:y0-12,w:138,h:84,c:'surface2',stroke:false};
        o['g'+i]={type:'path',d:pts.map((p,j)=>(j?'L':'M')+(x0+p[0])+' '+(y0+p[1])).join(' '),cls:'s-pri'};
        o['t'+i]={type:'text',x:x0+55,y:y0+102,s:18,text:w}; });
      return o; })(),
    beats:[
      { say:['تعلّم الأفعال مع شدتها: rose sharply ارتفع بحدة، وincreased gradually زاد تدريجيًا، وremained stable بقي ثابتًا.','Learn verbs with their strength: rose sharply, increased gradually, remained stable.'], show:['f0','g0','t0','f1','g1','t1','f2','g2','t2'], gap:.15 },
      { say:['وfell dramatically انخفض بشدة، وfluctuated تذبذب، وpeaked at بلغ الذروة عند.','Then: fell dramatically, fluctuated, peaked at.'], show:['f3','g3','t3','f4','g4','t4','f5','g5','t5'], gap:.15 },
    ]},
  { t:['دورك: أي جملة نظرة عامة؟','Your turn: which is an overview?'],
    items:{
      bars:{type:'bars',x:180,y:70,w:280,h:110,values:[60,45,30,20],labels:['2000','2005','2010','2015'],c:'n1',vals:false},
      ans:{type:'note',x:320,y:330,w:460,h:46,c:'n3',size:18,rot:-1,text:'Overall, the figure declined steadily.'},
    },
    beats:[
      { say:['دورك. أي الجمل تصلح نظرة عامة لهذا الرسم؟','Your turn. Which sentence works as an overview for this chart?'], show:['bars'] },
    ],
    ask:{ opts:['In 2000 the figure was 60%.','Overall, the figure declined steadily.','I think this is a worrying trend.','The figure was 45% in 2005.'], a:1, y:216, s:16,
      right:['صحيح. اتجاه عام، بلا أرقام وبلا رأي.','Correct: the general trend, with no numbers and no opinion.'],
      wrong:['الصحيح Overall, the figure declined steadily. الجمل الأخرى تفاصيل برقم، أو رأي شخصي لا مكان له هنا.','It is “Overall, the figure declined steadily.” The others are single numbers or an opinion.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['النظرة العامة في المهمة الأولى يجب أن:','The Task 1 overview should:'], o:[['تذكر كل الأرقام','list every number'],['تصف الاتجاه الرئيسي','describe the main trend'],['تشرح الأسباب','explain the causes'],['تعطي رأيك','give your opinion']], a:1, e:['الصورة الكبيرة دون تفاصيل.','The big picture, not details.']},
    {q:['«The number ______ from 10 to 50 in five years.» أفضل فعل:','“The number ______ from 10 to 50 in five years.” Best verb:'], o:['remained stable','rose sharply','fluctuated','fell slightly'], a:1, e:['من ١٠ إلى ٥٠: ارتفاع حاد.','10 to 50 is a sharp rise.']},
    {q:['كم كلمة على الأقل في المهمة الأولى؟','Minimum words in Task 1?'], o:['100','150','250','300'], a:1, e:['١٥٠ كلمة.','150 words.']},
  ]});

/* ---------- W-t2: essay structure ---------- */
B({ key:'xp-W-t2', sk:'W-t2', ord:10, title:['المهمة الثانية: هيكل مقالة الـ٧','Task 2: the band-7 essay plan'], min:['٥ دقائق','5 min'],
  goals:[['تحدد نوع السؤال','Identify the question type'],['تبني مقالة من أربع فقرات','Build a four-paragraph essay'],['تكتب فقرة بنقطة وشرح ومثال','Write paragraphs with point, explanation, example']],
  scenes:[
  { t:['اقرأ السؤال بدقة','Read the question exactly'],
    items:{
      q:{type:'box',x:60,y:68,w:520,h:90,c:'surface2'},
      q1:{type:'text',x:320,y:104,s:19,text:'Some people think children should start school at 4.'},
      q2:{type:'text',x:320,y:138,s:19,text:'To what extent do you agree or disagree?'},
      t1:{type:'note',x:170,y:210,w:200,h:52,c:'n0',size:18,rot:-2,text:'To what extent…?'},
      t1d:{type:'text',x:170,y:262,s:17,cls:'t-ink2',text:['رأيك بوضوح','your clear opinion']},
      t2:{type:'note',x:470,y:210,w:200,h:52,c:'n2',size:18,rot:2,text:'Discuss both views'},
      t2d:{type:'text',x:470,y:262,s:17,cls:'t-ink2',text:['الرأيان ثم رأيك','both sides, then yours']},
      tip:{type:'text',x:320,y:320,s:22,hand:true,text:['أجب عن كل أجزاء السؤال','Answer every part of the question']},
    },
    beats:[
      { say:['أول خطوة: اقرأ السؤال ببطء، وحدّد نوعه. هذا السؤال يسأل: إلى أي مدى توافق؟','Step one: read the question slowly and find its type. This one asks: to what extent do you agree?'], show:['q','q1','q2','t1','t1d'] },
      { say:['وهذا يعني أن عليك رأيًا واضحًا من البداية للنهاية. أما discuss both views فتحتاج الرأيين ثم رأيك.','So you need a clear opinion from start to finish. “Discuss both views” needs both sides and then your view.'], show:['t2','t2d'] },
      { say:['الخطأ الأشهر هو الإجابة عن جزء واحد من السؤال. فأجب عن كل جزء.','The most common mistake is answering only part of the question.'], show:['tip'] },
    ]},
  { t:['أربع فقرات','Four paragraphs'],
    items:{
      a:{type:'box',x:70,y:66,w:400,h:50,c:'n0',s:19,text:['المقدمة: إعادة صياغة + رأيك','Intro: paraphrase + your position']},
      b:{type:'box',x:70,y:126,w:400,h:66,c:'n2',s:19,text:['الفقرة ١: فكرة واحدة + شرح + مثال','Body 1: one idea + explain + example']},
      c:{type:'box',x:70,y:202,w:400,h:66,c:'n2',s:19,text:['الفقرة ٢: فكرة ثانية + شرح + مثال','Body 2: second idea + explain + example']},
      d:{type:'box',x:70,y:278,w:400,h:50,c:'n3',s:19,text:['الخاتمة: تلخيص الرأي','Conclusion: restate your view']},
      w:{type:'text',x:555,y:200,s:18,cls:'t-ink2',text:['٢٦٠–٢٩٠ كلمة','260–290 words']},
    },
    beats:[
      { say:['المقالة القوية بسيطة: أربع فقرات. المقدمة تعيد صياغة السؤال وتعلن رأيك.','A strong essay is simple: four paragraphs. The introduction paraphrases the question and states your position.'], show:['a'] },
      { say:['ثم فقرتان، لكل فقرة فكرة واحدة فقط، تشرحها وتعطي مثالًا عليها.','Then two body paragraphs, each with one idea, explained and supported by an example.'], show:['b','c'], gap:.3 },
      { say:['ثم خاتمة قصيرة تلخّص رأيك دون أفكار جديدة. والطول المثالي بين مئتين وستين ومئتين وتسعين كلمة.','Then a short conclusion that restates your view with no new ideas. Aim for 260 to 290 words.'], show:['d','w'] },
    ]},
  { t:['داخل الفقرة: PEEL','Inside a paragraph: PEEL'],
    items:{
      p:{type:'box',x:60,y:66,w:110,h:50,c:'pri',text:'P',s:24,cls:'t-ink'}, pt:{type:'text',x:380,y:98,s:18,text:'Early schooling builds social skills.'},
      e1:{type:'box',x:60,y:128,w:110,h:50,c:'n0',text:'E',s:24}, e1t:{type:'text',x:380,y:160,s:18,text:'Children learn to share and cooperate.'},
      e2:{type:'box',x:60,y:190,w:110,h:50,c:'n2',text:'E',s:24}, e2t:{type:'text',x:380,y:222,s:18,text:'For example, in Finland…'},
      l:{type:'box',x:60,y:252,w:110,h:50,c:'n3',text:'L',s:24}, lt:{type:'text',x:380,y:284,s:18,text:'Therefore, an early start can help.'},
      k:{type:'text',x:320,y:334,s:19,hand:true,text:['نقطة · شرح · مثال · ربط بالسؤال','Point · Explain · Example · Link']},
    },
    beats:[
      { say:['كل فقرة تتبع نمطًا ثابتًا. P: النقطة في الجملة الأولى.','Each paragraph follows a pattern. P: the point, in the first sentence.'], show:['p','pt'] },
      { say:['E: شرحها. ثم E الثانية: مثال محدد.','E: explain it. Then E again: a specific example.'], show:['e1','e1t','e2','e2t'], gap:.3 },
      { say:['ثم L: اربط بالسؤال. هذا النمط يمنحك تماسكًا وحجة مكتملة.','Then L: link back to the question. This gives you coherence and a complete argument.'], show:['l','lt','k'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      q:{type:'text',x:320,y:84,s:19,text:['أي جملة تصلح أن تكون P في بداية الفقرة؟','Which sentence works as the P at the start of a paragraph?']},
      ans:{type:'note',x:320,y:322,w:460,h:46,c:'n3',size:17,rot:-1,text:'One major benefit of public transport is lower pollution.'},
    },
    beats:[
      { say:['دورك. أي جملة تصلح أن تكون الجملة الأولى في الفقرة؟','Your turn. Which sentence is the best opening point for a paragraph?'], show:['q'] },
    ],
    ask:{ opts:['For example, in Tokyo trains are full.','One major benefit of public transport is lower pollution.','In conclusion, buses are good.','Many people.'], a:1, y:130, column:true, s:16, w:520,
      right:['أحسنت. جملة تعلن فكرة الفقرة بوضوح، والبقية مثال أو خاتمة أو جملة ناقصة.','Well done: it states the paragraph’s idea clearly.'],
      wrong:['الصحيح One major benefit… لأنها تعلن الفكرة. أما For example فمثال يأتي لاحقًا.','The answer is “One major benefit…”, which states the idea; “For example” comes later.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['«Discuss both views and give your opinion» يتطلب:','“Discuss both views and give your opinion” requires:'], o:[['رأيًا واحدًا فقط','one view only'],['الرأيين ورأيك','both views and your opinion'],['حلولًا','solutions'],['أسبابًا فقط','causes only']], a:1, e:['أجب عن الأجزاء الثلاثة.','Answer all three parts.']},
    {q:['كم فكرة رئيسية في الفقرة الواحدة؟','How many main ideas per body paragraph?'], o:['1','2','3','4'], a:0, e:['فكرة واحدة مشروحة جيدًا.','One well-developed idea.']},
    {q:['الخاتمة يجب أن:','The conclusion should:'], o:[['تضيف فكرة جديدة','add a new idea'],['تلخّص رأيك','restate your view'],['تكون أطول فقرة','be the longest paragraph']], a:1, e:['بلا أفكار جديدة.','No new ideas.']},
  ]});

/* ---------- W-grammar: Arabic-speaker errors ---------- */
B({ key:'xp-W-grammar', sk:'W-grammar', ord:10, title:['أخطاء القواعد التي يقع فيها المتعلم العربي','Grammar errors Arabic speakers make'], min:['٥ دقائق','5 min'],
  goals:[['لا تحذف فعل الكينونة','Never drop the verb “to be”'],['تضبط أداة التعريف the','Control “the”'],['تطابق الفعل مع الفاعل','Make verbs agree with subjects']],
  scenes:[
  { t:['لماذا هذه الأخطاء؟','Why these errors?'],
    items:{
      a:{type:'box',x:70,y:90,w:230,h:60,c:'n0',text:['العربية','Arabic'],s:22},
      e:{type:'box',x:340,y:90,w:230,h:60,c:'n3',text:['الإنجليزية','English'],s:22},
      ar:{type:'text',x:185,y:196,s:24,text:'الطالبُ مجتهدٌ'},
      en:{type:'text',x:455,y:196,s:20,fit:240,text:'The student IS hard-working.'},
      tip:{type:'note',x:320,y:290,w:470,h:56,c:'n1',size:20,rot:-1,text:['نترجم من العربية في رؤوسنا، فتظهر هذه الأخطاء','We translate in our heads, and these errors appear']},
    },
    beats:[
      { say:['أغلب أخطائنا في الإنجليزية تأتي من الترجمة الحرفية من العربية.','Most of our English errors come from translating word for word from Arabic.'], show:['a','e'] },
      { say:['نقول بالعربية: الطالب مجتهد، دون فعل. لكن الإنجليزية تحتاج is.','In Arabic, “the student hard-working” needs no verb. English needs “is”.'], show:['ar','en'] },
      { say:['ومعرفة هذه الأخطاء الثلاثة ترفع درجة القواعد بسرعة.','Knowing these three errors raises your grammar score quickly.'], show:['tip'] },
    ]},
  { t:['الخطأ الأول: حذف is وare','Error 1: missing is/are'],
    items:{
      w:{type:'text',x:320,y:110,s:24,cls:'t-bad',text:'Pollution very dangerous.'},
      x:{type:'cross',x:540,y:104,s:.8},
      r:{type:'text',x:320,y:176,s:24,cls:'t-ok',text:'Pollution IS very dangerous.'},
      c:{type:'check',x:540,y:170,s:.8},
      tip:{type:'note',x:320,y:268,w:420,h:56,c:'n0',size:20,rot:-1,text:['كل جملة إنجليزية تحتاج فعلًا','Every English sentence needs a verb']},
    },
    beats:[
      { say:['اقرأ: Pollution very dangerous. الجملة بلا فعل.','Read: “Pollution very dangerous.” There is no verb.'], show:['w','x'] },
      { say:['الصحيح: Pollution is very dangerous. أضف is أو are أو was.','Correct: “Pollution is very dangerous.” Add is, are or was.'], show:['r','c'] },
      { say:['القاعدة: كل جملة إنجليزية تحتاج فعلًا. راجع كل جملة في مقالتك وابحث عن فعلها.','Rule: every English sentence needs a verb. Check each sentence for its verb.'], show:['tip'] },
    ]},
  { t:['الخطأ الثاني: the في كل مكان','Error 2: “the” everywhere'],
    items:{
      w:{type:'text',x:320,y:100,s:22,cls:'t-bad',text:'The education is important for the society.'},
      r:{type:'text',x:320,y:160,s:22,cls:'t-ok',text:'Education is important for society.'},
      tip:{type:'note',x:320,y:254,w:480,h:60,c:'n2',size:19,rot:-1,text:['الأسماء العامة بلا the: education, society, technology','General nouns take no “the”: education, society…']},
    },
    beats:[
      { say:['بالعربية نقول: التعليم مهم للمجتمع، بأل التعريف.','In Arabic we say “the education is important for the society”.'], show:['w'] },
      { say:['لكن في الإنجليزية، عندما نتحدث عن الشيء بشكل عام، نحذف the: Education is important for society.','But in English, when we mean something in general, there is no “the”: “Education is important for society.”'], show:['r'] },
      { say:['احفظ: الأسماء العامة مثل education وsociety وtechnology تأتي بلا the.','Remember: general nouns like education, society and technology take no “the”.'], show:['tip'] },
    ]},
  { t:['الخطأ الثالث: مطابقة الفعل','Error 3: subject–verb agreement'],
    items:{
      w:{type:'text',x:320,y:100,s:22,cls:'t-bad',text:'The number of cars increase every year.'},
      r:{type:'text',x:320,y:160,s:22,cls:'t-ok',text:'The number of cars increases every year.'},
      tip:{type:'note',x:320,y:254,w:440,h:56,c:'n0',size:20,rot:-1,text:['الفاعل هنا number، وهو مفرد','The subject is “number”: singular']},
    },
    beats:[
      { say:['اقرأ: The number of cars increase. الفعل لا يطابق الفاعل.','Read: “The number of cars increase.” The verb does not agree.'], show:['w'] },
      { say:['الفاعل الحقيقي هو number، مفرد، فالفعل increases بحرف s.','The real subject is “number”, singular, so the verb is “increases”.'], show:['r','tip'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      q:{type:'text',x:320,y:84,s:20,text:['أي جملة صحيحة؟','Which sentence is correct?']},
      ans:{type:'note',x:320,y:322,w:440,h:46,c:'n3',size:18,rot:-1,text:'Technology is changing our lives.'},
    },
    beats:[
      { say:['دورك. أي جملة صحيحة تمامًا؟','Your turn. Which sentence is fully correct?'], show:['q'] },
    ],
    ask:{ opts:['The technology changing our lives.','Technology is changing our lives.','The technology are changing our lives.','Technology changing the our lives.'], a:1, y:130, column:true, s:17, w:480,
      right:['صحيح: فعل is موجود، وtechnology عامة بلا the.','Correct: “is” is there, and general “technology” has no “the”.'],
      wrong:['الصحيح Technology is changing our lives: فعل كامل، وبلا the للاسم العام.','It is “Technology is changing our lives”: a full verb and no “the”.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['صحّح: «My city very beautiful.»','Correct: “My city very beautiful.”'], o:['My city very is beautiful.','My city is very beautiful.','My city are very beautiful.','The my city very beautiful.'], a:1, e:['أضف is.','Add “is”.']},
    {q:['أي جملة صحيحة؟','Which is correct?'], o:['The children need the love.','Children need love.','The children needs love.','Children needs the love.'], a:1, e:['عام: بلا the، والفعل يطابق الجمع.','General: no “the”; plural verb.']},
    {q:['«Each of the students ______ a book.»','“Each of the students ______ a book.”'], o:['have','has','having','are have'], a:1, e:['each مفرد: has.','“Each” is singular: has.']},
  ]});

/* ---------- W-cohesion: linking words ---------- */
B({ key:'xp-W-cohesion', sk:'W-cohesion', ord:10, title:['أدوات الربط: المعنى قبل الكثرة','Linking words: meaning before quantity'], min:['٤ دقائق','4 min'],
  goals:[['تعرف عائلات أدوات الربط','Know the linker families'],['تختار الأداة حسب العلاقة','Choose by relationship'],['تتجنب الإفراط في أدوات الربط','Avoid overusing linkers']],
  scenes:[
  { t:['عائلات أدوات الربط','Linker families'],
    items:(()=>{ const o={}; [['+',['إضافة','adding'],'Moreover, In addition','n0'],['↔',['تضاد','contrast'],'However, Although','n1'],['→',['نتيجة','result'],'Therefore, As a result','n2'],['e.g.',['مثال','example'],'For instance, such as','n3']].forEach(([s,n,ex,c],i)=>{ const y=78+i*64;
        o['s'+i]={type:'note',x:110,y:y+22,w:90,h:48,c,size:22,rot:i%2?2:-2,text:s}; o['n'+i]={type:'text',x:230,y:y+30,s:20,text:n}; o['e'+i]={type:'text',x:450,y:y+30,s:18,cls:'t-ink2',text:ex}; });
      return o; })(),
    beats:[
      { say:['أدوات الربط أربع عائلات. الإضافة: moreover وin addition.','Linking words come in four families. Adding: moreover, in addition.'], show:['s0','n0','e0'] },
      { say:['والتضاد: however وalthough.','Contrast: however, although.'], show:['s1','n1','e1'] },
      { say:['والنتيجة: therefore وas a result. والمثال: for instance وsuch as.','Result: therefore, as a result. Example: for instance, such as.'], show:['s2','n2','e2','s3','n3','e3'], gap:.2 },
    ]},
  { t:['اختر حسب العلاقة','Choose by the relationship'],
    items:{
      a:{type:'text',x:320,y:96,s:21,text:'Cars are convenient. ______, they cause pollution.'},
      x:{type:'note',x:200,y:166,w:180,h:50,c:'n0',size:20,rot:-2,text:'Moreover'}, xx:{type:'cross',x:200,y:220,s:.7},
      c:{type:'note',x:440,y:166,w:180,h:50,c:'n1',size:20,rot:2,text:'However'}, cc:{type:'check',x:440,y:220,s:.7},
      tip:{type:'text',x:320,y:300,s:22,hand:true,text:['ميزة ثم عيب = تضاد','Advantage then disadvantage = contrast']},
    },
    beats:[
      { say:['الجملة الأولى ميزة: السيارات مريحة. والثانية عيب: تسبب التلوث.','The first sentence is an advantage; the second is a disadvantage.'], show:['a'] },
      { say:['moreover للإضافة، فلا تصلح هنا. العلاقة تضاد، فنختار however.','“Moreover” adds, so it does not fit. The relationship is contrast: “however”.'], show:['x','xx','c','cc','tip'] },
    ]},
  { t:['لا تكثر منها','Don’t overuse them'],
    items:{
      w:{type:'box',x:50,y:70,w:510,h:84,c:'surface2',s:16,text:'Firstly, … Moreover, … Furthermore, … In addition, … Besides, …'},
      x:{type:'cross',x:596,y:112,s:.7},
      tip:{type:'note',x:320,y:220,w:480,h:62,c:'n2',size:19,rot:-1,text:['استخدم الضمائر أيضًا: this, these, such…','Also link with pronouns: this, these, such…']},
      ex:{type:'text',x:320,y:304,s:19,text:'…pollution. This problem affects…'},
    },
    beats:[
      { say:['الإكثار من أدوات الربط في بداية كل جملة يجعل الكتابة آلية، والمصحح ينتبه لذلك.','Starting every sentence with a linker makes writing mechanical, and examiners notice.'], show:['w','x'] },
      { say:['اربط أيضًا بالضمائر: this وthese وsuch. مثل: This problem affects many cities.','Link with pronouns too: this, these, such. For example: “This problem affects many cities.”'], show:['tip','ex'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      a:{type:'text',x:320,y:90,s:20,text:'Prices rose sharply. ______, many families bought less.'},
      ans:{type:'note',x:320,y:316,w:240,h:50,c:'n3',size:22,rot:-1,text:'As a result'},
    },
    beats:[
      { say:['دورك. ارتفعت الأسعار بحدة، ثم اشترت العائلات أقل. ما أداة الربط المناسبة؟','Your turn. Prices rose sharply; families bought less. Which linker fits?'], show:['a'] },
    ],
    ask:{ opts:['However','As a result','For instance','In contrast'], a:1, y:160,
      right:['صحيح. الثانية نتيجة للأولى، فنستخدم as a result.','Correct: the second is a result of the first.'],
      wrong:['الصحيح As a result، لأن شراء أقل نتيجة لارتفاع الأسعار.','It is “As a result”: buying less is a result of rising prices.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['«______ it was raining, we went out.»','“______ it was raining, we went out.”'], o:['Although','Therefore','Moreover','For example'], a:0, e:['تضاد داخل الجملة: although.','Contrast within a sentence: although.']},
    {q:['أي أداة تعطي مثالًا؟','Which linker gives an example?'], o:['However','For instance','Consequently','Furthermore'], a:1, e:['for instance = مثال.','For instance = example.']},
    {q:['ماذا تعني «Consequently»؟','What does “Consequently” show?'], o:[['إضافة','addition'],['نتيجة','result'],['تضاد','contrast'],['مثال','example']], a:1, e:['consequently = as a result.','Consequently = as a result.']},
  ]});

})();
