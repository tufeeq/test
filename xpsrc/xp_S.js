/* Explainers: Speaking (المحادثة) */
(function(){ if(!window.XP||!XP.ready||!XP.bi) return;
const B=XP.bi;

/* ---------- S-p1: extend answers ---------- */
B({ key:'xp-S-p1', sk:'S-p1', ord:10, title:['الجزء الأول: لا تجب بكلمة واحدة','Part 1: never answer in one word'], min:['٤ دقائق','4 min'],
  goals:[['توسّع الإجابة بطريقة A-R-E','Extend answers with A-R-E'],['تتحدث ٢–٣ جمل لكل سؤال','Speak 2–3 sentences per question'],['تبدو طبيعيًا لا محفوظًا','Sound natural, not memorised']],
  scenes:[
  { t:['المشكلة','The problem'],
    items:{
      q:{type:'note',x:200,y:110,w:280,h:56,c:'n3',size:20,rot:-2,text:'Do you like reading?'},
      a:{type:'note',x:440,y:190,w:200,h:56,c:'n1',size:22,rot:2,text:'“Yes.”'},
      x:{type:'cross',x:560,y:190,s:.8},
      tip:{type:'text',x:320,y:290,s:22,hand:true,text:['الإجابة القصيرة لا تُظهر لغتك','A short answer shows no language']},
    },
    beats:[
      { say:['في الجزء الأول يسألك الممتحن عن نفسك: عملك، دراستك، هواياتك. مثل: Do you like reading?','In Part 1 the examiner asks about you: work, studies, hobbies. For example: “Do you like reading?”'], show:['q'] },
      { say:['كثير من الطلاب يجيبون: Yes. هذه إجابة صحيحة، لكنها لا تعطي الممتحن أي لغة يقيّمها.','Many students say “Yes”. It is correct, but it gives the examiner no language to assess.'], show:['a','x','tip'] },
    ]},
  { t:['طريقة A-R-E','The A-R-E method'],
    items:{
      a:{type:'box',x:60,y:70,w:100,h:56,c:'n0',text:'A',s:26}, at:{type:'text',x:380,y:106,s:19,text:'Yes, I really enjoy it.'},
      r:{type:'box',x:60,y:140,w:100,h:56,c:'n2',text:'R',s:26}, rt:{type:'text',x:380,y:176,s:19,text:'It helps me relax after a long day.'},
      e:{type:'box',x:60,y:210,w:100,h:56,c:'n3',text:'E',s:26}, et:{type:'text',x:380,y:246,s:19,text:'Right now I’m reading a novel by…'},
      k:{type:'text',x:320,y:316,s:21,hand:true,text:['إجابة + سبب + مثال = ٢–٣ جمل','Answer + Reason + Example = 2–3 sentences']},
    },
    beats:[
      { say:['استخدم طريقة A-R-E. A: أجب مباشرة. Yes, I really enjoy it.','Use A-R-E. A: answer directly. “Yes, I really enjoy it.”'], show:['a','at'] },
      { say:['R: أعطِ سببًا. It helps me relax after a long day.','R: give a reason. “It helps me relax after a long day.”'], show:['r','rt'] },
      { say:['E: أعطِ مثالًا من حياتك. Right now I am reading a novel by… وهكذا تصبح إجابتك جملتين أو ثلاثًا، وهذا الطول المثالي.','E: an example from your life. “Right now I’m reading a novel by…” Two or three sentences is ideal.'], show:['e','et','k'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      q:{type:'note',x:320,y:90,w:320,h:52,c:'n3',size:20,rot:-1,text:'Do you prefer mornings or evenings?'},
      ans:{type:'note',x:320,y:322,w:500,h:46,c:'n0',size:16,rot:-1,text:'Evenings, because I’m more relaxed — like yesterday, I…'},
    },
    beats:[
      { say:['دورك. السؤال: هل تفضّل الصباح أم المساء؟ أي إجابة هي الأفضل؟','Your turn. “Do you prefer mornings or evenings?” Which answer is best?'], show:['q'] },
    ],
    ask:{ opts:['Evenings.','I prefer evenings because I feel more relaxed, and I usually go for a walk then.','Mornings and evenings are both parts of the day which people have.'], a:1, y:150, column:true, s:15, w:560,
      right:['ممتاز: إجابة، ثم سبب، ثم مثال من حياتك.','Excellent: an answer, a reason and an example from your life.'],
      wrong:['الأفضل الإجابة الثانية: إجابة وسبب ومثال. الأولى قصيرة جدًا، والثالثة لا تجيب.','The second is best: answer, reason, example. The first is too short; the third does not answer.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['كم جملة تقريبًا لكل سؤال في الجزء الأول؟','About how many sentences per Part 1 question?'], o:['1','2–3','6–8','10'], a:1, e:['جملتان أو ثلاث.','Two or three.']},
    {q:['ماذا تعني R في A-R-E؟','What does R stand for in A-R-E?'], o:['Repeat','Reason','Read','Rule'], a:1, e:['Reason: السبب.','Reason.']},
    {q:['أفضل بداية لإجابة «What’s your job?»:','Best start for “What’s your job?”:'], o:['Job.','I work as a nurse at a local hospital.','My job is my job.','I don’t know.'], a:1, e:['إجابة مباشرة كاملة، ثم توسّع.','A direct full answer, then extend.']},
  ]});

/* ---------- S-p2: cue card ---------- */
B({ key:'xp-S-p2', sk:'S-p2', ord:10, title:['الجزء الثاني: دقيقة تخطيط، دقيقتا كلام','Part 2: one minute to plan, two to speak'], min:['٥ دقائق','5 min'],
  goals:[['تخطط في دقيقة بكلمات مفتاحية','Plan in one minute with key words'],['تغطي كل نقاط البطاقة','Cover every point on the card'],['تملأ دقيقتين بقصة','Fill two minutes with a story']],
  scenes:[
  { t:['البطاقة','The cue card'],
    items:{
      card:{type:'box',x:120,y:64,w:400,h:190,c:'surface2'},
      t:{type:'text',x:320,y:98,s:20,text:'Describe a place you enjoyed visiting.'},
      b1:{type:'text',x:320,y:138,s:18,cls:'t-ink2',text:'• where it is'},
      b2:{type:'text',x:320,y:168,s:18,cls:'t-ink2',text:'• when you went'},
      b3:{type:'text',x:320,y:198,s:18,cls:'t-ink2',text:'• what you did there'},
      b4:{type:'text',x:320,y:228,s:18,cls:'t-ink2',text:'• and explain why you enjoyed it'},
      tm:{type:'note',x:320,y:306,w:420,h:52,c:'n0',size:20,rot:-1,text:['دقيقة للتحضير · دقيقتان للكلام','1 min to prepare · 2 min to speak']},
    },
    beats:[
      { say:['في الجزء الثاني يعطيك الممتحن بطاقة عليها موضوع وأربع نقاط.','In Part 2 you get a card with a topic and four points.'], show:['card','t','b1','b2','b3','b4'], gap:.25 },
      { say:['لديك دقيقة واحدة للتحضير، ثم تتحدث وحدك حتى دقيقتين. النقطة الأخيرة، explain why، هي الأهم لأنها تُظهر لغتك.','You have one minute to prepare, then speak alone for up to two minutes. The last point, “explain why”, matters most.'], show:['tm'] },
    ]},
  { t:['التخطيط في دقيقة','Planning in one minute'],
    items:{
      c:{type:'circle',cx:320,cy:190,r:52,c:'n0',text:'Al-Ula',s:20},
      w1:{type:'note',x:150,y:110,w:150,h:46,c:'n2',size:18,rot:-2,text:'north-west'},
      w2:{type:'note',x:490,y:110,w:150,h:46,c:'n2',size:18,rot:2,text:'last winter'},
      w3:{type:'note',x:150,y:270,w:170,h:46,c:'n3',size:18,rot:2,text:'Hegra, hiking'},
      w4:{type:'note',x:490,y:270,w:170,h:46,c:'n1',size:18,rot:-2,text:'history + calm'},
      l1:{type:'line',x1:272,y1:170,x2:205,y2:128,cls:'s-ink'}, l2:{type:'line',x1:368,y1:170,x2:435,y2:128,cls:'s-ink'},
      l3:{type:'line',x1:272,y1:210,x2:205,y2:252,cls:'s-ink'}, l4:{type:'line',x1:368,y1:210,x2:435,y2:252,cls:'s-ink'},
      tip:{type:'text',x:320,y:338,s:21,hand:true,text:['كلمات مفتاحية فقط، لا جمل كاملة','Key words only, not full sentences']},
    },
    beats:[
      { say:['لا تكتب جملًا في دقيقة التحضير. ارسم خريطة صغيرة: الموضوع في الوسط.','Do not write sentences in your minute. Draw a small map: the topic in the centre.'], show:['c'] },
      { say:['ثم كلمة أو كلمتان لكل نقطة: أين؟ north-west. متى؟ last winter.','Then one or two words per point: where? north-west. When? last winter.'], show:['l1','w1','l2','w2'] },
      { say:['ماذا فعلت؟ Hegra وhiking. ولماذا؟ التاريخ والهدوء. هذه الكلمات تكفيك لتتكلم دقيقتين.','What did you do? Hegra, hiking. Why? history and calm. These words are enough for two minutes.'], show:['l3','w3','l4','w4','tip'] },
    ]},
  { t:['املأ الدقيقتين','Fill the two minutes'],
    items:{
      s1:{type:'box',x:60,y:70,w:520,h:46,c:'n0',s:18,text:'Story: “I remember the first morning, when…”'},
      s2:{type:'box',x:60,y:128,w:520,h:46,c:'n2',s:18,text:'Detail: colours, sounds, people'},
      s3:{type:'box',x:60,y:186,w:520,h:46,c:'n3',s:18,text:'Feelings: “It made me feel…”'},
      tip:{type:'note',x:320,y:284,w:470,h:60,c:'n1',size:19,rot:-1,text:['استمر حتى يوقفك الممتحن','Keep going until the examiner stops you']},
    },
    beats:[
      { say:['لتملأ الوقت، احكِ قصة قصيرة: I remember the first morning, when…','To fill the time, tell a short story: “I remember the first morning, when…”'], show:['s1'] },
      { say:['وأضف تفاصيل: الألوان والأصوات والناس. ثم مشاعرك: It made me feel…','Add details: colours, sounds, people. Then feelings: “It made me feel…”'], show:['s2','s3'] },
      { say:['ولا تتوقف قبل أن يوقفك الممتحن. إن انتهت النقاط، عد للسبب وأضف مثالًا آخر.','Do not stop before the examiner stops you. If you run out, go back to “why” and add another example.'], show:['tip'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      q:{type:'text',x:320,y:84,s:20,text:['ماذا تكتب في دقيقة التحضير؟','What do you write in your preparation minute?']},
      ans:{type:'note',x:320,y:322,w:380,h:48,c:'n3',size:19,rot:-1,text:['كلمات مفتاحية لكل نقطة','Key words for each point']},
    },
    beats:[
      { say:['دورك. ماذا تكتب في دقيقة التحضير؟','Your turn. What should you write in the preparation minute?'], show:['q'] },
    ],
    ask:{ opts:[['جملًا كاملة لأحفظها','full sentences to memorise'],['كلمات مفتاحية لكل نقطة','key words for each point'],['لا شيء','nothing'],['النقطة الأولى فقط','only the first point']], a:1, y:150,
      right:['صحيح. كلمات قليلة لكل نقطة، فتتكلم بطبيعية وتغطي البطاقة كلها.','Correct: a few words per point, so you sound natural and cover the card.'],
      wrong:['الأفضل كلمات مفتاحية لكل نقطة. الجمل الكاملة تأخذ الوقت وتجعل كلامك محفوظًا.','Key words for each point. Full sentences waste time and sound memorised.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['كم دقيقة للتحضير في الجزء الثاني؟','How long to prepare in Part 2?'], o:['30 seconds','1 minute','2 minutes','5 minutes'], a:1, e:['دقيقة واحدة.','One minute.']},
    {q:['انتهت نقاطك بعد دقيقة. ماذا تفعل؟','You run out after one minute. What do you do?'], o:[['أتوقف','stop'],['أعود للسبب وأضيف مثالًا','return to “why” and add an example'],['أسأل الممتحن','ask the examiner'],['أكرر البطاقة','repeat the card']], a:1, e:['استمر حتى يوقفك الممتحن.','Keep going until you are stopped.']},
    {q:['أهم نقطة في البطاقة غالبًا:','Usually the most important point on the card:'], o:['where','when','explain why','who'], a:2, e:['explain why تُظهر لغة التبرير.','“Explain why” shows your language of reasoning.']},
  ]});

/* ---------- S-p3: discuss and justify ---------- */
B({ key:'xp-S-p3', sk:'S-p3', ord:10, title:['الجزء الثالث: رأي ثم تبرير ثم مثال','Part 3: opinion, reason, example'], min:['٤ دقائق','4 min'],
  goals:[['تبني إجابة من رأي وسبب ومثال','Build opinion + reason + example'],['تتحدث عن الناس والمجتمع لا عن نفسك','Talk about society, not just yourself'],['تستخدم لغة الاحتمال','Use language of possibility']],
  scenes:[
  { t:['من «أنا» إلى «الناس»','From “me” to “people”'],
    items:{
      p1:{type:'note',x:180,y:110,w:240,h:56,c:'n3',size:18,rot:-2,text:'Part 1: Do YOU read?'},
      p3:{type:'note',x:460,y:110,w:260,h:56,c:'n0',size:18,rot:2,text:'Part 3: Why do PEOPLE read less?'},
      a:{type:'arrow',x1:200,y1:146,x2:440,y2:146,cls:'s-pink',bend:44},
      tip:{type:'text',x:320,y:226,s:22,hand:true,text:['أسئلة عامة وأعمق، تحتاج تفكيرًا وتبريرًا','Broader, deeper questions that need reasons']},
    },
    beats:[
      { say:['الجزء الثالث مرتبط بموضوع الجزء الثاني، لكنه أعمق. السؤال لم يعد عنك، بل عن الناس والمجتمع.','Part 3 links to the Part 2 topic but goes deeper. Questions are about people and society, not you.'], show:['p1','a','p3'] },
      { say:['هنا يقيس الممتحن قدرتك على الرأي والتبرير والمقارنة.','Here the examiner checks how you give opinions, reasons and comparisons.'], show:['tip'] },
    ]},
  { t:['بناء الإجابة','Building the answer'],
    items:{
      o:{type:'box',x:60,y:66,w:520,h:46,c:'n0',s:18,text:'I think people read less nowadays…'},
      r:{type:'box',x:60,y:122,w:520,h:46,c:'n2',s:18,text:'mainly because phones offer quicker entertainment.'},
      e:{type:'box',x:60,y:178,w:520,h:46,c:'n3',s:18,text:'For example, my younger brother watches videos instead…'},
      c:{type:'box',x:60,y:234,w:520,h:46,c:'n1',s:18,text:'Having said that, audiobooks are becoming popular.'},
      tip:{type:'text',x:320,y:316,s:20,hand:true,text:['رأي · سبب · مثال · وجهة أخرى','Opinion · Reason · Example · Other side']},
    },
    beats:[
      { say:['ابدأ برأيك: I think people read less nowadays.','Start with your opinion: “I think people read less nowadays.”'], show:['o'] },
      { say:['ثم السبب: mainly because phones offer quicker entertainment. ثم مثال.','Then a reason, “mainly because phones offer quicker entertainment”, then an example.'], show:['r','e'], gap:.4 },
      { say:['ولتطوّر إجابتك أكثر، يمكنك أن تضيف الوجهة الأخرى: Having said that, audiobooks are becoming popular.','To develop your answer further, you can add the other side: “Having said that, audiobooks are becoming popular.”'], show:['c','tip'] },
    ]},
  { t:['لغة الاحتمال','Language of possibility'],
    items:(()=>{ const o={}; ['It’s likely that…','It might be because…','I’d say that…','It depends on…'].forEach((w,i)=>{ o['w'+i]={type:'note',x:[180,460][i%2],y:i<2?120:200,w:250,h:54,c:['n0','n2','n3','n1'][i],size:19,rot:i%2?2:-2,text:w}; });
      o.tip={type:'text',x:320,y:290,s:21,hand:true,text:['تُظهر أنك تفكر، لا تحفظ','They show you are thinking, not reciting']}; return o; })(),
    beats:[
      { say:['هذه عبارات تجعل رأيك أكثر نضجًا: It’s likely that، وIt might be because.','These phrases make your opinion more mature: “It’s likely that…”, “It might be because…”.'], show:['w0','w1'], gap:.3 },
      { say:['وI’d say that، وIt depends on. إنها تُظهر للممتحن أنك تفكر.','“I’d say that…”, “It depends on…”. They show the examiner you are thinking.'], show:['w2','w3','tip'], gap:.3 },
    ]},
  { t:['دورك','Your turn'],
    items:{
      q:{type:'note',x:320,y:84,w:440,h:50,c:'n3',size:18,rot:-1,text:'Should governments pay for public transport?'},
      ans:{type:'note',x:320,y:326,w:520,h:44,c:'n0',size:15,rot:-1,text:'Opinion + reason + example: a full Part 3 answer'},
    },
    beats:[
      { say:['دورك. أي إجابة هي الأقوى في الجزء الثالث؟','Your turn. Which is the strongest Part 3 answer?'], show:['q'] },
    ],
    ask:{ opts:['Yes.','Yes, I use the bus.','I’d say yes, mainly because cheaper fares reduce traffic — in Riyadh, the metro has already helped.'], a:2, y:150, column:true, s:15, w:580,
      right:['أحسنت: رأي بلغة احتمال، وسبب، ومثال حقيقي.','Well done: an opinion with a hedge, a reason and a real example.'],
      wrong:['الأقوى الإجابة الثالثة: رأي وسبب ومثال. الأولى قصيرة، والثانية عن نفسك فقط.','The third is strongest: opinion, reason, example. The others are too short or only about you.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['أسئلة الجزء الثالث تكون غالبًا عن:','Part 3 questions are mostly about:'], o:[['حياتك الشخصية','your personal life'],['المجتمع والناس','society and people'],['البطاقة نفسها','the card itself']], a:1, e:['أعمق وأعم.','Broader and deeper.']},
    {q:['أي عبارة تعرض الوجهة الأخرى؟','Which phrase introduces the other side?'], o:['For example','Having said that','Mainly because','I think'], a:1, e:['Having said that = ومع ذلك.','“Having said that” brings in the other side.']},
    {q:['«It depends on…» تُظهر:','“It depends on…” shows:'], o:[['أنك لا تعرف','you don’t know'],['تفكيرًا ناضجًا','mature thinking'],['خطأ قواعد','a grammar error']], a:1, e:['لغة تفكير وتحليل.','Language of analysis.']},
  ]});

})();
