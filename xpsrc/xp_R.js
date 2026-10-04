/* Explainers: Reading (القراءة) */
(function(){ if(!window.XP||!XP.ready||!XP.bi) return;
const B=XP.bi;
/* a passage card: box + one text line per entry (keys pb, p1, p2…) */
const PASS=(lines,y,{lh=34,s=19,x=60,w=520}={})=>{ const o={pb:{type:'box',x,y,w,h:lines.length*lh+22,c:'surface2'}};
  lines.forEach((t,i)=>{ o['p'+(i+1)]={type:'text',x:x+w/2,y:y+11+lh*(i+0.5)+s*0.36,s,text:t,fit:w-24}; }); return o; };

/* ---------- R-tfng ---------- */
B({ key:'xp-R-tfng', sk:'R-tfng', ord:10, title:['صح / خطأ / غير مذكور','True / False / Not Given'], min:['٥ دقائق','5 min'],
  goals:[['تفرّق بين FALSE وNOT GIVEN','Tell FALSE from NOT GIVEN'],['تنتبه للكلمات المطلقة','Watch absolute words'],['تقارن العبارة بالنص فقط، لا بمعلوماتك','Judge by the text only, not your knowledge']],
  scenes:[
  { t:['ثلاثة أسئلة لا سؤال واحد','Three different questions'],
    items:{
      t:{type:'note',x:130,ar:{x:510},y:130,w:170,h:66,c:'n3',size:26,rot:-2,text:'TRUE'},
      f:{type:'note',x:320,y:130,w:170,h:66,c:'n1',size:26,rot:1,text:'FALSE'},
      n:{type:'note',x:510,ar:{x:130},y:130,w:190,h:66,c:'n0',size:24,rot:2,text:'NOT GIVEN'},
      td:{type:'text',x:130,ar:{x:510},y:208,s:18,cls:'t-ink2',text:['النص يقول الشيء نفسه','the text says the same']},
      fd:{type:'text',x:320,y:208,s:18,cls:'t-ink2',text:['النص يقول العكس','the text says the opposite']},
      nd:{type:'text',x:510,ar:{x:130},y:208,s:18,cls:'t-ink2',text:['النص لا يقول','the text does not say']},
      tip:{type:'text',x:320,y:296,s:23,hand:true,text:['احكم بالنص وحده، لا بما تعرفه','Judge by the text alone, not what you know']},
    },
    beats:[
      { say:['في هذا النوع ثلاثة احتمالات. TRUE: النص يقول المعنى نفسه بكلمات أخرى.','There are three answers. TRUE: the text says the same thing in other words.'], show:['t','td'] },
      { say:['FALSE: النص يقول العكس تمامًا، تناقض صريح.','FALSE: the text says the opposite, a clear contradiction.'], show:['f','fd'] },
      { say:['NOT GIVEN: النص لا يقول شيئًا عن هذه النقطة بالذات. لا تأكيد ولا نفي.','NOT GIVEN: the text says nothing about this exact point. Neither yes nor no.'], show:['n','nd'] },
      { say:['والقاعدة الذهبية: احكم بالنص وحده. حتى لو كانت العبارة صحيحة في الواقع، إن لم يذكرها النص فهي NOT GIVEN.','The golden rule: judge by the text alone. Even if a statement is true in real life, if the text does not say it, it is NOT GIVEN.'], show:['tip'] },
    ]},
  { t:['FALSE أم NOT GIVEN؟','FALSE or NOT GIVEN?'],
    items:{
      ...PASS(['The museum opened in 1990 and attracts','about 200,000 visitors a year.'],60),
      s1:{type:'text',x:250,y:186,s:20,text:'1. The museum opened before 1985.'},
      a1:{type:'note',x:540,y:180,w:120,h:44,c:'n1',size:18,rot:2,text:'FALSE'},
      s2:{type:'text',x:250,y:240,s:20,text:'2. Most visitors are tourists.'},
      a2:{type:'note',x:540,y:234,w:150,h:44,c:'n0',size:18,rot:-2,text:'NOT GIVEN'},
      tip:{type:'note',x:320,y:308,w:470,h:56,c:'n2',size:20,rot:-1,text:['اسأل: هل يمكن أن تكون العبارة صحيحة مع النص؟','Ask: could the statement be true alongside the text?']},
    },
    beats:[
      { say:['اقرأ النص: افتُتح المتحف عام ألف وتسعمئة وتسعين، ويزوره نحو مئتي ألف زائر سنويًا.','Read: the museum opened in 1990 and has about 200,000 visitors a year.'], show:['pb','p1','p2'] },
      { say:['العبارة الأولى: افتُتح قبل عام ألف وتسعمئة وخمسة وثمانين. النص يقول تسعين، فالعبارة مستحيلة مع النص. هذه FALSE.','Statement one: it opened before 1985. The text says 1990, so the statement cannot be true. FALSE.'], show:['s1','a1'] },
      { say:['العبارة الثانية: معظم الزوار سياح. النص ذكر العدد فقط، ولم يذكر من هم. هذه NOT GIVEN.','Statement two: most visitors are tourists. The text gives the number, not who they are. NOT GIVEN.'], show:['s2','a2'] },
      { say:['الاختبار السريع: هل يمكن أن تكون العبارة صحيحة والنص صحيح معًا؟ إن كان لا يمكن، فهي FALSE. وإن كان ممكنًا لكن غير مؤكد، فهي NOT GIVEN.','The quick test: could the statement and the text both be true? If not, FALSE. If possibly but not confirmed, NOT GIVEN.'], show:['tip'] },
    ]},
  { t:['الكلمات المطلقة','Absolute words'],
    items:{
      w1:{type:'note',x:130,y:110,w:140,h:52,c:'n1',size:22,rot:-2,text:'all'},
      w2:{type:'note',x:280,y:110,w:140,h:52,c:'n1',size:22,rot:2,text:'always'},
      w3:{type:'note',x:430,y:110,w:140,h:52,c:'n1',size:22,rot:-1,text:'only'},
      w4:{type:'note',x:560,y:110,w:110,h:52,c:'n1',size:22,rot:2,text:'never'},
      t:{type:'text',x:320,y:200,s:20,text:'Text: “Some species can survive the winter.”'},
      st:{type:'text',x:320,y:244,s:20,text:'Statement: “All species survive the winter.”'},
      a:{type:'note',x:320,y:306,w:170,h:52,c:'n1',size:22,rot:-1,text:'FALSE'},
    },
    beats:[
      { say:['راقب الكلمات المطلقة في العبارة: all، always، only، never. كلمة واحدة منها تغيّر الحكم.','Watch absolute words in the statement: all, always, only, never. One word can change the answer.'], show:['w1','w2','w3','w4'], gap:.2 },
      { say:['النص يقول: some species، بعض الأنواع. والعبارة تقول: all species، كل الأنواع.','The text says “some species”; the statement says “all species”.'], show:['t','st'] },
      { say:['بعض لا تساوي كل، فالعبارة تناقض النص. الإجابة FALSE.','“Some” is not “all”, so the statement contradicts the text: FALSE.'], show:['a'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      ...PASS(['Bees visit flowers mainly to collect nectar.'],70,{lh:40,s:20}),
      st:{type:'text',x:320,y:156,s:21,text:'Statement: “Bees prefer yellow flowers.”'},
      ans:{type:'note',x:320,y:316,w:200,h:52,c:'n0',size:22,rot:-1,text:'NOT GIVEN'},
    },
    beats:[
      { say:['دورك. النص: يزور النحل الأزهار أساسًا لجمع الرحيق. والعبارة: النحل يفضّل الأزهار الصفراء.','Your turn. Text: bees visit flowers mainly to collect nectar. Statement: bees prefer yellow flowers.'], show:['pb','p1','st'] },
    ],
    ask:{ opts:['TRUE','FALSE','NOT GIVEN'], a:2, y:200, x:320, w:300,
      right:['صحيح. النص لا يذكر الألوان أبدًا، فهي NOT GIVEN.','Correct. The text never mentions colours: NOT GIVEN.'],
      wrong:['الإجابة NOT GIVEN. النص يتحدث عن الرحيق، ولا يقول شيئًا عن الألوان، فلا تأكيد ولا نفي.','It is NOT GIVEN. The text talks about nectar and says nothing about colour.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['النص: «Prices rose slightly in 2020.» العبارة: «Prices fell in 2020.»','Text: “Prices rose slightly in 2020.” Statement: “Prices fell in 2020.”'], o:['TRUE','FALSE','NOT GIVEN'], a:1, e:['ارتفعت مقابل انخفضت: تناقض.','Rose versus fell: a contradiction.']},
    {q:['النص: «The bridge was designed by a local engineer.» العبارة: «The engineer had designed other bridges.»','Text: “The bridge was designed by a local engineer.” Statement: “The engineer had designed other bridges.”'], o:['TRUE','FALSE','NOT GIVEN'], a:2, e:['لا ذكر لجسور أخرى.','Other bridges are not mentioned.']},
    {q:['النص: «Few people attended the first meeting.» العبارة: «Attendance at the first meeting was low.»','Text: “Few people attended the first meeting.” Statement: “Attendance at the first meeting was low.”'], o:['TRUE','FALSE','NOT GIVEN'], a:0, e:['few people = attendance was low: إعادة صياغة.','“Few people” = “attendance was low”: a paraphrase.']},
  ]});

/* ---------- R-locate ---------- */
B({ key:'xp-R-locate', sk:'R-locate', ord:10, title:['المسح السريع: اعثر على الجواب دون أن تقرأ كل شيء','Scanning: find the answer without reading everything'], min:['٤ دقائق','4 min'],
  goals:[['تفرّق بين skimming وscanning','Tell skimming from scanning'],['تختار كلمة مفتاحية يسهل رصدها','Pick an easy-to-spot key word'],['تقرأ بتمعّن فقط حول الجواب','Read closely only around the answer']],
  scenes:[
  { t:['لا تقرأ كل كلمة','Don’t read every word'],
    items:{
      clock:{type:'note',x:320,y:110,w:320,h:66,c:'n1',size:24,rot:-1,text:['٦٠ دقيقة، ٤٠ سؤالًا، ٣ نصوص','60 min · 40 questions · 3 texts']},
      sk:{type:'box',x:80,y:180,w:220,h:84,c:'n3',text:'skimming',s:24},
      sc:{type:'box',x:340,y:180,w:220,h:84,c:'n2',text:'scanning',s:24},
      skd:{type:'text',x:190,y:292,s:18,cls:'t-ink2',text:['نظرة سريعة للفكرة العامة','a fast look for the gist']},
      scd:{type:'text',x:450,y:292,s:18,cls:'t-ink2',text:['بحث عن كلمة محددة','a search for one item']},
    },
    beats:[
      { say:['في القراءة ستون دقيقة لأربعين سؤالًا. من يقرأ كل كلمة ببطء لا ينتهي.','Reading gives you 60 minutes for 40 questions. If you read every word slowly, you will not finish.'], show:['clock'] },
      { say:['لذلك نستخدم مهارتين. الأولى skimming: نظرة سريعة لتعرف موضوع كل فقرة.','So we use two skills. Skimming: a fast look to know what each paragraph is about.'], show:['sk','skd'] },
      { say:['والثانية scanning: تبحث بعينك عن كلمة محددة، كاسم أو رقم أو تاريخ، كما تبحث عن اسمك في قائمة.','Scanning: your eyes hunt for one item, like a name, number or date, as you look for your name on a list.'], show:['sc','scd'] },
    ]},
  { t:['اختر الكلمة التي تلمع','Pick the word that stands out'],
    items:{
      q:{type:'text',x:320,y:84,s:21,text:'In which year did Kramer use mirrors in his experiment?'},
      k1:{type:'note',x:220,y:150,w:150,h:50,c:'n0',size:22,rot:-2,text:'Kramer'},
      k2:{type:'note',x:420,y:150,w:150,h:50,c:'n0',size:22,rot:2,text:'mirrors'},
      k3:{type:'note',x:320,y:220,w:220,h:50,c:'surface2',size:20,rot:0,text:'experiment'},
      x3:{type:'cross',x:450,y:220,s:.7},
      tip:{type:'text',x:320,y:300,s:22,hand:true,text:['الأسماء والأرقام والحروف الكبيرة أسهل في الرصد','Names, numbers and capitals are easiest to spot']},
    },
    beats:[
      { say:['اقرأ السؤال، واختر الكلمة الأسهل في الرصد. هنا: Kramer، اسم علم بحرف كبير.','Read the question and choose the easiest word to spot. Here, Kramer: a name with a capital letter.'], show:['q','k1'] },
      { say:['وmirrors كلمة محددة نادرة. أما experiment فعامة وتتكرر كثيرًا، فلا تبحث بها.','“Mirrors” is specific and rare. “Experiment” is general and repeated everywhere, so do not scan for it.'], show:['k2','k3','x3'] },
      { say:['الأسماء والأرقام والكلمات بحروف كبيرة تلمع في النص، فابحث بها أولًا.','Names, numbers and capitalised words jump out of the page, so scan for them first.'], show:['tip'] },
    ]},
  { t:['ثم اقرأ بتمعّن حول الجواب','Then read closely around it'],
    items:{
      ...PASS(['…In the 1950s, Gustav Kramer noticed that caged','starlings faced the direction of migration. When he','used mirrors to change the sun’s position, the birds','changed direction accordingly…'],64,{lh:32,s:18}),
      hl:{type:'line',x1:110,y1:166,x2:530,y2:166,cls:'s-pink'},
      a:{type:'note',x:320,y:290,w:420,h:56,c:'n2',size:20,rot:-1,text:['اقرأ الجملة قبلها والجملة بعدها','Read the sentence before and after']},
    },
    beats:[
      { say:['حين تجد الكلمة، توقّف واقرأ بتمعّن: الجملة نفسها، والجملة قبلها، والجملة بعدها.','When you find the word, stop and read carefully: the sentence itself, the one before and the one after.'], show:['pb','p1','p2','p3','p4'], gap:.2 },
      { show:['hl'], say:['هنا تجد mirrors، وقبلها بقليل الزمن: in the 1950s. الجواب غالبًا قريب من الكلمة، لا فيها بالضبط.','Here is “mirrors”, and just before it the time: in the 1950s. The answer is usually near the word, not on it.'], show:['a'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      q:{type:'text',x:320,y:84,s:21,text:'How many containers did McLean’s first ship carry?'},
      sub:{type:'text',x:320,y:122,s:19,cls:'t-ink2',text:['ما أفضل كلمة تبحث بها؟','Which is the best word to scan for?']},
      ans:{type:'note',x:320,y:310,w:330,h:54,c:'n3',size:21,rot:-1,text:['McLean: اسم بحرف كبير','McLean: a capitalised name']},
    },
    beats:[
      { say:['دورك. السؤال: كم حاوية حملت أول سفينة لماكلين؟ ما أفضل كلمة تبحث بها في النص؟','Your turn: how many containers did McLean’s first ship carry? Which word would you scan for?'], show:['q','sub'] },
    ],
    ask:{ opts:['ship','McLean','How many','carry'], a:1, y:180,
      right:['صحيح. McLean اسم بحرف كبير، يلمع في النص.','Right. McLean is a capitalised name that stands out.'],
      wrong:['الأفضل McLean. كلمات مثل ship وcarry تتكرر في النص كله.','McLean is best. Words like “ship” and “carry” appear everywhere.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['تريد معرفة موضوع كل فقرة بسرعة. أي مهارة؟','You want the topic of each paragraph quickly. Which skill?'], o:['scanning','skimming'], a:1, e:['skimming للفكرة العامة.','Skimming is for the gist.']},
    {q:['السؤال: «When did the Venice glassmakers move to Murano?» أفضل كلمة للمسح:','Question: “When did the Venice glassmakers move to Murano?” Best scan word:'], o:['glassmakers','move','Murano','When'], a:2, e:['Murano اسم نادر بحرف كبير.','Murano is a rare capitalised name.']},
    {q:['وجدت الكلمة المفتاحية. ماذا تفعل الآن؟','You found the key word. What now?'], o:[['أكتب الكلمة نفسها جوابًا','write that word as the answer'],['أقرأ الجمل حولها بتمعّن','read the sentences around it carefully'],['أنتقل للسؤال التالي','move to the next question'],['أعيد قراءة النص كاملًا','reread the whole text']], a:1, e:['الجواب يكون قريبًا من الكلمة.','The answer is near the key word.']},
  ]});

/* ---------- R-heading ---------- */
B({ key:'xp-R-heading', sk:'R-heading', ord:10, title:['العناوين: الفكرة الرئيسية لا التفصيل','Headings: the main idea, not a detail'], min:['٤ دقائق','4 min'],
  goals:[['تلخّص الفقرة في جملة','Sum up a paragraph in one line'],['تتجنب فخ الكلمة المتطابقة','Avoid the matching-word trap'],['تبدأ بالفقرات الأسهل','Start with the easiest paragraphs']],
  scenes:[
  { t:['المظلة والتفاصيل','The umbrella and the details'],
    items:{
      idea:{type:'note',x:320,y:100,w:420,h:60,c:'n0',size:22,rot:-1,text:'Main idea: the dangers of noise'},
      k1:{type:'line',x1:320,y1:132,x2:140,y2:196,cls:'s-pri'}, k2:{type:'line',x1:320,y1:132,x2:320,y2:196,cls:'s-pri'}, k3:{type:'line',x1:320,y1:132,x2:500,y2:196,cls:'s-pri'},
      d1:{type:'box',x:60,y:196,w:160,h:48,c:'prisoft',text:'sleep',s:20},
      d2:{type:'box',x:240,y:196,w:160,h:48,c:'prisoft',text:'heart disease',s:20},
      d3:{type:'box',x:420,y:196,w:160,h:48,c:'prisoft',text:'learning',s:20},
      tip:{type:'text',x:320,y:300,s:23,hand:true,text:['العنوان يغطي الفقرة كلها كالمظلة','A heading covers the whole paragraph, like an umbrella']},
    },
    beats:[
      { say:['العنوان الصحيح هو الفكرة التي تجمع الفقرة كلها، مثل مظلة.','The right heading is the idea that covers the whole paragraph, like an umbrella.'], show:['idea'] },
      { say:['أما النوم وأمراض القلب والتعلّم فتفاصيل تحت المظلة. كل منها صحيح، لكنه جزء فقط.','Sleep, heart disease and learning are details under the umbrella. Each is true, but only a part.'], show:['k1','d1','k2','d2','k3','d3'], gap:.2 },
      { say:['فإذا وجدت عنوانًا يذكر تفصيلًا واحدًا، فهو غالبًا فخ.','A heading that names just one detail is usually a trap.'], show:['tip'] },
    ]},
  { t:['فخ الكلمة المتطابقة','The matching-word trap'],
    items:{
      ...PASS(['Not all sound is harmful. Natural sounds, such as','birdsong and running water, can reduce stress…'],66,{lh:32,s:18}),
      h1:{type:'box',x:90,y:166,w:460,h:46,c:'surface2',text:'Why some people enjoy loud music',s:19},
      x1:{type:'cross',x:585,y:189,s:.7},
      h2:{type:'box',x:90,y:226,w:460,h:46,c:'surface2',text:'A surprising source of calm',s:19},
      c2:{type:'check',x:585,y:249,s:.7},
      tip:{type:'text',x:320,y:316,s:21,hand:true,text:['المعنى لا الكلمة: calm = reduce stress','Meaning, not words: calm = reduce stress']},
    },
    beats:[
      { say:['اقرأ الفقرة: ليس كل صوت ضارًا، فأصوات الطبيعة تخفف التوتر.','Read: not all sound is harmful; natural sounds can reduce stress.'], show:['pb','p1','p2'] },
      { say:['العنوان الأول فيه كلمة music، وهي قريبة من sound. لكن الفقرة لا تتحدث عن الموسيقى الصاخبة. هذا فخ الكلمة المتطابقة.','The first heading has “music”, close to “sound”, but the paragraph is not about loud music. That is the matching-word trap.'], show:['h1','x1'] },
      { say:['والعنوان الثاني لا يشترك مع الفقرة في أي كلمة، لكنه يحمل معناها: مصدر مفاجئ للهدوء.','The second heading shares no words with the paragraph, but carries its meaning: a surprising source of calm.'], show:['h2','c2','tip'] },
    ]},
  { t:['دورك: اختر العنوان','Your turn: choose the heading'],
    items:{
      ...PASS(['Long-term exposure to traffic noise has been linked','to high blood pressure, heart disease and strokes.'],70,{lh:32,s:18}),
      ans:{type:'note',x:320,y:320,w:360,h:50,c:'n3',size:21,rot:-1,text:'Serious health risks over time'},
    },
    beats:[
      { say:['دورك. اقرأ الفقرة، ثم اختر العنوان الذي يغطيها كلها.','Your turn. Read the paragraph, then choose the heading that covers all of it.'], show:['pb','p1','p2'] },
    ],
    ask:{ opts:['Traffic in cities','Serious health risks over time','Problems with blood','How strokes happen'], a:1, y:182,
      right:['أحسنت. long-term تعني over time، وثلاثة أمراض تعني health risks.','Well done. “Long-term” = over time, and three diseases = health risks.'],
      wrong:['الصحيح Serious health risks over time. الخيارات الأخرى إما تفصيل واحد أو موضوع لا تتحدث عنه الفقرة.','It is “Serious health risks over time”. The others are a single detail or not the topic.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['فقرة عن فوائد النخيل: الغذاء، والبناء، والحصير. أفضل عنوان:','A paragraph on palm trees: food, building, mats. Best heading:'], o:['Palm trees as food','The many uses of the palm','Building with wood','Farming in the desert'], a:1, e:['يغطي الاستخدامات الثلاثة.','It covers all three uses.']},
    {q:['عنوان يحتوي كلمة مكررة من الفقرة:','A heading repeats a word from the paragraph:'], o:[['صحيح دائمًا','always correct'],['قد يكون فخًا','may be a trap'],['خطأ دائمًا','always wrong']], a:1, e:['المعنى هو المهم، لا تطابق الكلمات.','Meaning matters, not matching words.']},
    {q:['أين تجد الفكرة الرئيسية غالبًا؟','Where is the main idea usually found?'], o:[['أول الفقرة أو آخرها','first or last sentence'],['في المنتصف دائمًا','always the middle'],['في الأرقام','in the numbers']], a:0, e:['ابدأ بالجملة الأولى والأخيرة.','Start with the first and last sentences.']},
  ]});

/* ---------- R-complete ---------- */
B({ key:'xp-R-complete', sk:'R-complete', ord:10, title:['إكمال الجمل: القواعد تدلّك على الجواب','Completion: grammar points to the answer'], min:['٤ دقائق','4 min'],
  goals:[['تتوقع نوع الكلمة','Predict the word type'],['تنسخ الكلمة من النص كما هي','Copy the word exactly'],['تلتزم بحد الكلمات','Keep to the word limit']],
  scenes:[
  { t:['ماذا يحتاج الفراغ؟','What does the gap need?'],
    items:{
      g1:{type:'text',x:320,y:96,s:22,text:'The roots reduce ______ by holding sediment.'},
      n1:{type:'note',x:320,y:150,w:240,h:48,c:'n0',size:20,rot:-1,text:['اسم (بعد فعل)','a noun (after a verb)']},
      g2:{type:'text',x:320,y:214,s:22,text:'Early umbrellas were very ______.'},
      n2:{type:'note',x:320,y:268,w:240,h:48,c:'n2',size:20,rot:1,text:['صفة (بعد very)','an adjective (after very)']},
    },
    beats:[
      { say:['قبل أن تبحث في النص، اقرأ الجملة واسأل: ماذا يحتاج الفراغ؟','Before you search the text, read the sentence and ask: what does the gap need?'], show:['g1'] },
      { say:['بعد الفعل reduce يأتي مفعول به، أي اسم.','After the verb “reduce” comes an object: a noun.'], show:['n1'] },
      { say:['وبعد very تأتي صفة. هذا التوقع يختصر عليك نصف الطريق.','After “very” comes an adjective. This prediction gets you halfway there.'], show:['g2','n2'] },
    ]},
  { t:['انسخ الكلمة كما هي','Copy the word exactly'],
    items:{
      ...PASS(['Their dense roots slow down waves and hold','sediment in place, reducing erosion.'],70,{lh:32,s:19}),
      a1:{type:'text',x:220,y:190,s:24,text:'erosion'}, c1:{type:'check',x:310,y:184,s:.8},
      a2:{type:'text',x:430,y:190,s:24,text:'eroding'}, x2:{type:'cross',x:520,y:184,s:.8},
      tip:{type:'note',x:320,y:278,w:460,h:56,c:'n1',size:20,rot:-1,text:['الكلمة من النص، دون تغيير صيغتها','Use the word from the text, unchanged']},
    },
    beats:[
      { say:['الجواب كلمة من النص نفسه. هنا: reducing erosion.','The answer is a word from the text. Here: reducing erosion.'], show:['pb','p1','p2'] },
      { say:['اكتب erosion كما وردت. لا تغيّرها إلى eroding ولا إلى كلمة مرادفة.','Write “erosion” as it appears. Do not change it to “eroding” or a synonym.'], show:['a1','c1','a2','x2'] },
      { say:['وانتبه للمفرد والجمع والتهجئة؛ خطأ حرف واحد يضيّع الدرجة.','Check singular, plural and spelling: one wrong letter loses the mark.'], show:['tip'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      ...PASS(['Lighting is usually the largest single cost, followed','by the air-conditioning needed to remove the heat.'],58,{lh:32,s:18}),
      g:{type:'text',x:320,y:172,s:20,fit:600,text:'After lighting, the biggest cost is ______. (ONE WORD)'},
      ans:{type:'note',x:320,y:318,w:280,h:50,c:'n3',size:22,rot:-1,text:'air-conditioning'},
    },
    beats:[
      { say:['دورك. ما الكلمة الواحدة التي تكمل الجملة؟','Your turn. Which single word completes the sentence?'], show:['pb','p1','p2','g'] },
    ],
    ask:{ opts:['lighting','air-conditioning','heat','cost'], a:1, y:212,
      right:['صحيح. followed by تعني أنها الثانية بعد الإضاءة، والكلمة بشرطة تُحسب كلمة واحدة.','Correct. “Followed by” means second after lighting, and a hyphenated word counts as one.'],
      wrong:['الإجابة air-conditioning. الإضاءة هي الأولى، وfollowed by تأتي بالثانية.','It is air-conditioning: lighting is first, and “followed by” brings the second.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['«The process takes about ______.» ما نوع الجواب المتوقع؟','“The process takes about ______.” What kind of answer?'], o:[['مدة زمنية','a period of time'],['صفة','an adjective'],['اسم شخص','a person’s name']], a:0, e:['takes about + مدة.','“Takes about” + a time period.']},
    {q:['النص: «cut on land». الفراغ (ONE WORD): «blocks were cut on ______»','Text: “cut on land”. Gap (ONE WORD): “blocks were cut on ______”'], o:['the land','land','lands','ground'], a:1, e:['كلمة واحدة كما في النص.','One word, exactly as in the text.']},
    {q:['كلمة «well-known» في حدّ الكلمات تُحسب:','“Well-known” in a word limit counts as:'], o:[['كلمة واحدة','one word'],['كلمتين','two words']], a:0, e:['الكلمة الموصولة بشرطة كلمة واحدة.','A hyphenated word is one word.']},
  ]});

/* ---------- R-para ---------- */
B({ key:'xp-R-para', sk:'R-para', ord:10, title:['إعادة الصياغة: السؤال لا يكرر كلمات النص','Paraphrase: questions don’t repeat the text'], min:['٤ دقائق','4 min'],
  goals:[['تتعرف على المرادفات','Recognise synonyms'],['تفهم تغيير صيغة الكلمة','Understand word-form changes'],['تلتقط إعادة صياغة الجملة كاملة','Catch whole-sentence paraphrase']],
  scenes:[
  { t:['ثلاث طرق لإعادة الصياغة','Three ways to paraphrase'],
    items:{
      a:{type:'box',x:70,y:86,w:500,h:52,c:'n0',s:20,text:'buy  →  purchase'},
      ad:{type:'text',x:320,y:162,s:18,cls:'t-ink2',text:['مرادف','synonym']},
      b:{type:'box',x:70,y:178,w:500,h:52,c:'n2',s:20,text:'it grew rapidly  →  rapid growth'},
      bd:{type:'text',x:320,y:254,s:18,cls:'t-ink2',text:['تغيير صيغة الكلمة','word-form change']},
      c:{type:'box',x:70,y:270,w:500,h:52,c:'n3',s:19,text:'not many people came  →  attendance was low'},
    },
    beats:[
      { say:['أسئلة الآيلتس نادرًا ما تكرر كلمات النص. إنها تعيد صياغتها بثلاث طرق.','IELTS questions rarely repeat the text’s words. They paraphrase in three ways.'], show:[] },
      { say:['الأولى المرادف: buy تصبح purchase.','First, a synonym: buy becomes purchase.'], show:['a','ad'] },
      { say:['الثانية تغيير صيغة الكلمة: grew rapidly تصبح rapid growth، الفعل صار اسمًا.','Second, a word-form change: “grew rapidly” becomes “rapid growth”.'], show:['b','bd'] },
      { say:['والثالثة إعادة الجملة كلها بمعنى واحد: not many people came تساوي attendance was low.','Third, the whole idea in new words: “not many people came” equals “attendance was low”.'], show:['c'] },
    ]},
  { t:['ابنِ بنك المرادفات','Build a synonym bank'],
    items:(()=>{ const o={}; [['cheap','inexpensive'],['rise','increase'],['old','elderly'],['main','principal'],['show','reveal'],['cause','lead to']].forEach(([a,b],i)=>{ const x=[160,480][i%2], y=96+Math.floor(i/2)*70;
        o['a'+i]={type:'note',x:x-60,y,w:110,h:48,c:'n0',size:19,rot:-2,text:a}; o['b'+i]={type:'note',x:x+70,y,w:130,h:48,c:'n2',size:19,rot:2,text:b}; });
      o.tip={type:'text',x:320,y:320,s:22,hand:true,text:['دوّن كل زوج تكتشفه في التدريب','Note every pair you meet in practice']}; return o; })(),
    beats:[
      { say:['هذه أزواج تتكرر كثيرًا في الاختبار.','These pairs come up again and again.'], show:['a0','b0','a1','b1','a2','b2'], gap:.15 },
      { say:['وكلما وجدت زوجًا جديدًا في التدريب، أضفه إلى دفترك. هكذا يرى الطالب الماهر الجواب فورًا.','Each time you meet a new pair in practice, add it to your notebook.'], show:['a3','b3','a4','b4','a5','b5','tip'], gap:.15 },
    ]},
  { t:['دورك','Your turn'],
    items:{
      ...PASS(['In some regions salt was even used as a form of money.'],70,{lh:40,s:19}),
      q:{type:'text',x:320,y:156,s:20,text:['أي عبارة تحمل المعنى نفسه؟','Which statement has the same meaning?']},
      ans:{type:'note',x:320,y:320,w:340,h:50,c:'n3',size:20,rot:-1,text:'salt = currency in some places'},
    },
    beats:[
      { say:['دورك. النص يقول: في بعض المناطق استُخدم الملح نوعًا من المال. أي عبارة تحمل المعنى نفسه؟','Your turn. Text: in some regions salt was used as a form of money. Which statement means the same?'], show:['pb','p1','q'] },
    ],
    ask:{ opts:['Salt was sold for money.','People paid with salt in certain areas.','Salt was expensive everywhere.','Money was made of salt.'], a:1, y:196, s:18,
      right:['صحيح. some regions تساوي certain areas، وused as money تساوي paid with salt.','Correct. “Some regions” = “certain areas”; “used as money” = “paid with salt”.'],
      wrong:['الإجابة People paid with salt in certain areas. أما sold for money فمعنى مختلف.','It is “People paid with salt in certain areas”. “Sold for money” is a different idea.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['«The number of visitors doubled» تساوي:','“The number of visitors doubled” means:'], o:['visitors fell by half','visitors increased twofold','visitors stayed the same','there were two visitors'], a:1, e:['doubled = تضاعف.','Doubled = increased twofold.']},
    {q:['مرادف «essential»:','A synonym of “essential”:'], o:['optional','vital','expensive','early'], a:1, e:['essential = vital.','Essential = vital.']},
    {q:['«It is difficult to predict» بصيغة أخرى:','“It is difficult to predict” in other words:'], o:['it is unpredictable','it is predicted','it is easy','it is a prediction'], a:0, e:['تغيير صيغة: unpredictable.','A word-form change: unpredictable.']},
  ]});

})();
