/* Explainers: Listening (الاستماع) */
(function(){ if(!window.XP||!XP.ready||!XP.bi) return;
const B=XP.bi;

/* ---------- L-detail: numbers, spelling, corrections ---------- */
B({ key:'xp-L-detail', sk:'L-detail', ord:10, title:['الأرقام والتهجئة وفخ التصحيح','Numbers, spelling and the correction trap'], min:['٤ دقائق','4 min'],
  goals:[['تكتب الإجابة التي تأتي بعد التصحيح','Write the answer that comes after a correction'],['تلتقط التهجئة وdouble','Catch spelling and “double”'],['تفرّق بين fifteen وfifty','Tell fifteen from fifty'],['تلتزم بعدد الكلمات','Keep to the word limit']],
  scenes:[
  { t:['الجزء الأول: نموذج','Part 1: a form'],
    items:{
      card:{type:'box',x:120,y:70,w:400,h:170,c:'surface2'},
      h:{type:'text',x:320,y:104,s:22,text:'Booking form'},
      r1:{type:'text',x:320,y:148,s:22,text:'Surname: ________'},
      r2:{type:'text',x:320,y:188,s:22,text:'Arrival date: ________ August'},
      r3:{type:'text',x:320,y:226,s:22,text:'Phone: ________'},
      tip:{type:'note',x:320,y:300,w:400,h:56,c:'n0',size:22,rot:-1,text:['الإجابة تُقال حرفيًا، بالترتيب','The answer is said exactly, in order']},
    },
    beats:[
      { say:['الجزء الأول من الاستماع محادثة يومية، مثل حجز أو تسجيل، وأمامك نموذج فيه فراغات.','Listening Part 1 is an everyday conversation, like a booking, and you complete a form.'], show:['card','h','r1','r2','r3'], gap:.3 },
      { say:['هنا لا يحتاج الأمر إلى فهم عميق؛ الإجابة تُقال حرفيًا، والأسئلة بترتيب التسجيل. مهارتك الحقيقية هي الدقة: اسم مكتوب صحيحًا، ورقم كامل.','You do not need deep understanding here. The answer is said exactly, and the questions follow the recording. The real skill is accuracy: a name spelt correctly, a number in full.'], show:['tip'] },
    ]},
  { t:['فخ التصحيح','The correction trap'],
    items:{
      q:{type:'text',x:320,y:84,s:22,text:'Arrival date: ________ August'},
      b1:{type:'note',x:165,y:170,w:210,h:64,c:'n1',size:22,rot:-2,text:'“the 12th…”'},
      b2:{type:'note',x:450,y:170,w:280,h:64,c:'n2',size:22,rot:2,text:'“no, sorry — the 14th”'},
      x1:{type:'cross',x:165,y:236},
      c2:{type:'check',x:450,y:236},
      rule:{type:'text',x:320,y:316,s:24,hand:true,text:['اكتب دائمًا ما بعد «no, sorry» و«actually»','Always write what comes after “no, sorry” or “actually”']},
    },
    beats:[
      { say:['أشهر فخ في هذا الجزء هو التصحيح. يقول المتحدث معلومة، ثم يغيّرها.','The most common trap here is the correction: the speaker says something, then changes it.'], show:['q'] },
      { say:['تسمع: the twelfth. فيكتب الطالب المستعجل اثني عشر.','You hear “the twelfth”, and a hurried student writes 12.'], show:['b1'] },
      { say:['ثم مباشرة: no, sorry, the fourteenth. المعلومة الأولى كانت طُعمًا.','Then straight away: “no, sorry, the fourteenth”. The first piece of information was bait.'], show:['b2','x1','c2'] },
      { say:['القاعدة: لا تكتب حتى يكتمل الكلام، والإجابة هي دائمًا ما يأتي بعد كلمات التصحيح: no, sorry، أو actually، أو I mean.','The rule: do not write until the speaker finishes. The answer is always what comes after “no, sorry”, “actually” or “I mean”.'], show:['rule'] },
    ]},
  { t:['التهجئة وكلمة double','Spelling and “double”'],
    items:{
      sp:{type:'text',x:320,y:92,s:26,text:'“H – O – double L – I – N – S”'},
      l1:{type:'box',x:150,y:130,w:46,h:54,c:'prisoft',text:'H',s:28},
      l2:{type:'box',x:202,y:130,w:46,h:54,c:'prisoft',text:'O',s:28},
      l3:{type:'box',x:254,y:130,w:46,h:54,c:'n0',text:'L',s:28},
      l4:{type:'box',x:306,y:130,w:46,h:54,c:'n0',text:'L',s:28},
      l5:{type:'box',x:358,y:130,w:46,h:54,c:'prisoft',text:'I',s:28},
      l6:{type:'box',x:410,y:130,w:46,h:54,c:'prisoft',text:'N',s:28},
      l7:{type:'box',x:462,y:130,w:46,h:54,c:'prisoft',text:'S',s:28},
      pairs:{type:'note',x:320,y:250,w:460,h:62,c:'n2',size:22,rot:-1,text:'A, E, I  ·  G, J  ·  B, P, V'},
      tip:{type:'text',x:320,y:318,s:22,hand:true,text:['هذه الحروف يخلط بينها المتعلم العربي، فتدرّب عليها','Arabic speakers often mix these letters up: practise them']},
    },
    beats:[
      { say:['الأسماء تُتهجّى حرفًا حرفًا. اسمع: H، O، double L، I، N، S.','Names are spelt letter by letter. Listen: H, O, double L, I, N, S.'], show:['sp'] },
      { say:['كلمة double تعني أن الحرف يتكرر مرتين. فتكتب L ثم L. والاسم Hollins.','“Double” means the letter appears twice: L, then L. The name is Hollins.'], show:['l1','l2','l3','l4','l5','l6','l7'], gap:.15 },
      { say:['وانتبه لحروف يخلط بينها كثير منا: A وE وI، وG وJ، وB وP وV. حرف P غير موجود في العربية، فنسمعه أحيانًا B.','Watch the letters that are easy to confuse: A, E and I; G and J; B, P and V.'], show:['pairs'] },
      { say:['تدرّب على نطق الحروف الإنجليزية بصوت مرتفع، فمن يعرف كيف يُنطق الحرف يلتقطه بسرعة.','Practise saying English letters aloud: if you can say a letter, you can catch it.'], show:['tip'] },
    ]},
  { t:['الأرقام: oh وdouble وteen','Numbers: “oh”, “double” and “-teen”'],
    items:{
      a:{type:'note',x:170,y:120,w:230,h:62,c:'n0',size:24,rot:-2,text:'“oh” = 0'},
      b:{type:'note',x:460,y:120,w:250,h:62,c:'n3',size:24,rot:2,text:'“double seven” = 77'},
      c1:{type:'box',x:150,y:196,w:150,h:64,c:'surface2',text:'fifTEEN',s:28},
      c2:{type:'box',x:340,y:196,w:150,h:64,c:'surface2',text:'FIFty',s:28},
      n1:{type:'text',x:225,y:292,s:26,text:'15'},
      n2:{type:'text',x:415,y:292,s:26,text:'50'},
      tip:{type:'text',x:320,y:336,s:22,hand:true,text:['الضغط في آخر الكلمة = teen','Stress at the end = -teen']},
    },
    beats:[
      { say:['في أرقام الهاتف يقول المتحدث oh بدل الصفر.','In phone numbers, speakers say “oh” for zero.'], show:['a'] },
      { say:['وdouble seven تعني سبعة سبعة، أي رقمان.','And “double seven” means 7 7, two digits.'], show:['b'] },
      { say:['والأخطر: fifteen وfifty. الفرق في الضغط. في fifteen يقع الضغط على آخر الكلمة، وفي fifty على أولها.','The most dangerous pair: fifteen and fifty. The difference is stress: fifTEEN at the end, FIFty at the start.'], show:['c1','c2','n1','n2'], gap:.3 },
      { say:['فإن سمعت نهاية طويلة واضحة، فهي teen.','If you hear a long, clear ending, it is -teen.'], show:['tip'] },
    ]},
  { t:['دورك: اكتب الاسم','Your turn: write the name'],
    items:{
      q:{type:'text',x:320,y:78,s:22,text:'“It’s G – R – double E – N – W – A – Y.”'},
      sub:{type:'text',x:320,y:116,s:19,cls:'t-ink2',text:['ما الكتابة الصحيحة؟','Which spelling is correct?']},
      ans:{type:'note',x:320,y:300,w:300,h:60,c:'n3',size:26,rot:-1,text:'GREENWAY'},
    },
    beats:[
      { say:['دورك الآن. اسمع التهجئة: G، R، double E، N، W، A، Y. ما الكتابة الصحيحة؟','Your turn. Listen: G, R, double E, N, W, A, Y. Which spelling is correct?'], show:['q','sub'] },
    ],
    ask:{ opts:['Greenway','Grenway','Greenaway','Greenwey'], a:0, y:180,
      right:['صحيح. double E تعني حرفي E، ثم N W A Y: Greenway.','Correct. Double E gives two Es, then N, W, A, Y: Greenway.'],
      wrong:['الصحيح Greenway. كلمة double E تعني حرفين، وبعدها W ثم A ثم Y.','It is Greenway: double E means two Es, then W, A, Y.'],
      show:['ans'] } },
  { t:['حدّ الكلمات','The word limit'],
    items:{
      ins:{type:'box',x:90,y:66,w:460,h:54,c:'n0',text:'ONE WORD AND/OR A NUMBER',s:22},
      g1:{type:'text',x:200,y:162,s:24,text:'cot'}, k1:{type:'check',x:290,y:156,s:.8},
      g2:{type:'text',x:430,y:162,s:24,text:'a cot'}, k2:{type:'cross',x:530,y:156,s:.8},
      g3:{type:'text',x:200,y:226,s:24,text:'£45'}, k3:{type:'check',x:290,y:220,s:.8},
      g4:{type:'text',x:430,y:226,s:24,text:'14th August'}, k4:{type:'cross',x:560,y:220,s:.8}, r4:{type:'text',x:450,y:258,s:16,cls:'t-ink2',text:['لا تكرّر كلمة مطبوعة','don’t repeat printed words']},
      tip:{type:'note',x:320,y:302,w:470,h:60,c:'n2',size:21,rot:-1,text:['تجاوز الحدّ = خطأ، حتى لو كانت الكلمة صحيحة','Over the limit = wrong, even if the word is right']},
    },
    beats:[
      { say:['اقرأ التعليمات قبل الاستماع: كلمة واحدة، أو رقم، أو كلاهما.','Read the instructions first: one word, a number, or both.'], show:['ins'] },
      { say:['cot كلمة واحدة، صحيحة. أما a cot فكلمتان، فتُحسب خطأ.','“Cot” is one word: correct. “A cot” is two words: wrong.'], show:['g1','k1','g2','k2'], gap:.25 },
      { say:['ورمز الجنيه مع الرقم يُحسب رقمًا واحدًا. لكن إذا كان August مكتوبًا في النموذج فلا تكرّره.','A currency sign with a number counts as one number. But if “August” is already printed, do not write it again.'], show:['g3','k3','g4','k4','r4'], gap:.25 },
      { say:['تذكّر: تجاوز عدد الكلمات خطأ كامل، حتى لو كانت المعلومة صحيحة.','Remember: going over the limit loses the mark, even if the information is right.'], show:['tip'] },
    ]},
  ],
  quiz:[
    {q:['تسمع: «Let’s meet on Tuesday. Oh no, I’m busy then — Thursday.» ماذا تكتب؟','You hear: “Let’s meet on Tuesday. Oh no, I’m busy then — Thursday.” What do you write?'], o:['Tuesday','Thursday','Tuesday or Thursday','busy'], a:1, e:['الإجابة ما بعد التصحيح.','The answer is the one after the correction.']},
    {q:['«oh seven seven double nine» تُكتب:','“oh seven seven double nine” is written:'], o:['07799','7799','077 9','0779'], a:0, e:['oh = 0، وdouble nine = 99.','“Oh” is 0 and “double nine” is 99.']},
    {q:['التعليمات: ONE WORD ONLY. أيّها مقبول؟','Instructions: ONE WORD ONLY. Which is acceptable?'], o:['a garden','the garden','garden','big garden'], a:2, e:['كلمة واحدة فقط: garden.','One word only: garden.']},
  ]});

/* ---------- L-mcq: distractors ---------- */
B({ key:'xp-L-mcq', sk:'L-mcq', ord:10, title:['المشتّتات في الاختيار من متعدد','Distractors in multiple choice'], min:['٤ دقائق','4 min'],
  goals:[['تعرف لماذا يُذكر كل خيار في التسجيل','Know why every option is mentioned'],['تلتقط but وactually','Catch “but” and “actually”'],['تميّز الماضي من الحاضر','Separate past from present'],['تقرأ السؤال بالكلمات المفتاحية','Read questions by their key words']],
  scenes:[
  { t:['كل الخيارات تُذكر','Every option is mentioned'],
    items:{
      q:{type:'text',x:320,y:80,s:22,text:'Which event is now the most popular?'},
      o1:{type:'box',x:160,y:110,w:320,h:46,c:'surface2',text:'A  the night walk',s:21,anchor:'start'},
      o2:{type:'box',x:160,y:166,w:320,h:46,c:'surface2',text:'B  the summer concerts',s:21,anchor:'start'},
      o3:{type:'box',x:160,y:222,w:320,h:46,c:'surface2',text:'C  the plant sale',s:21,anchor:'start'},
      tip:{type:'note',x:320,y:310,w:470,h:58,c:'n1',size:21,rot:-1,text:['ستسمع الخيارات الثلاثة، واحد فقط صحيح','You will hear all three; only one is right']},
    },
    beats:[
      { say:['في أسئلة الاختيار من متعدد، الصعوبة ليست أن تسمع الخيار. الصعوبة أنك ستسمع كل الخيارات.','In multiple choice, the problem is not hearing the option. You will hear every option.'], show:['q','o1','o2','o3'], gap:.25 },
      { say:['المتحدث يذكر الخيارات الخاطئة عمدًا، ثم يستبعدها. هذه هي المشتّتات.','The speaker mentions the wrong options on purpose and then rules them out. These are distractors.'], show:['tip'] },
    ]},
  { t:['كيف يستبعد المتحدث الخيار','How the speaker rules options out'],
    items:{
      s1:{type:'text',x:320,y:92,s:21,text:'“The summer concerts used to be the biggest event…”'},
      s2:{type:'text',x:320,y:150,s:21,text:'“…but now it’s the night walk that sells out first.”'},
      m1:{type:'note',x:170,y:226,w:180,h:52,c:'n1',size:22,rot:-2,text:'used to'},
      m2:{type:'note',x:470,y:226,w:180,h:52,c:'n3',size:22,rot:2,text:'but now'},
      x:{type:'cross',x:170,y:286,s:.8}, c:{type:'check',x:470,y:286,s:.8},
    },
    beats:[
      { say:['اسمع: the summer concerts used to be the biggest event. هل نختار الحفلات؟','Listen: “The summer concerts used to be the biggest event.” Do we choose the concerts?'], show:['s1'] },
      { say:['لا. used to تعني كان في الماضي. والسؤال يقول now.','No. “Used to” means in the past, and the question says “now”.'], show:['m1','x'] },
      { say:['ثم يأتي: but now it is the night walk. كلمة but تقلب الكلام، وما بعدها هو الإجابة غالبًا.','Then: “but now it’s the night walk”. “But” turns the sentence, and what follows is usually the answer.'], show:['s2','m2','c'] },
    ]},
  { t:['إشارات الاستبعاد','Ruling-out signals'],
    items:(()=>{ const o={}; [['but','n0'],['actually','n2'],['in fact','n3'],['used to','n1'],['not any more','n0'],['I thought… however','n2']].forEach(([w,c],i)=>{ o['w'+i]={type:'note',x:[150,320,490][i%3],y:i<3?120:206,w:150,h:58,c,size:20,rot:i%2?2:-2,text:w}; });
      o.tip={type:'text',x:320,y:300,s:23,hand:true,text:['ضع إشارة على الخيار المستبعد فور سماعه','Cross out an option as soon as it is ruled out']}; return o; })(),
    beats:[
      { say:['هذه كلمات تسمعها قبل الإجابة الصحيحة أو بعد المشتّت: but، actually، in fact.','These words come around the right answer or after a distractor: but, actually, in fact.'], show:['w0','w1','w2'], gap:.3 },
      { say:['وهذه تشير إلى الماضي أو إلى رأي تغيّر: used to، not any more، و I thought then however.','These point to the past or a changed opinion: used to, not any more, I thought… however.'], show:['w3','w4','w5'], gap:.3 },
      { say:['أثناء الاستماع، اشطب الخيار المستبعد فورًا، فيبقى أمامك خياران أو خيار واحد.','While listening, cross out an option the moment it is ruled out.'], show:['tip'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      q:{type:'text',x:320,y:74,s:21,text:'Who runs the garden today?'},
      s:{type:'box',x:70,y:92,w:500,h:58,c:'surface2',s:19,text:'“People assume the council runs it, but in fact it belongs to a charity.”'},
      ans:{type:'note',x:320,y:306,w:300,h:56,c:'n3',size:24,rot:-1,text:'a charity'},
    },
    beats:[
      { say:['دورك. السؤال: من يدير الحديقة اليوم؟ اقرأ ما قاله المتحدث، ثم اختر.','Your turn. Who runs the garden today? Read what the speaker said, then choose.'], show:['q','s'] },
    ],
    ask:{ opts:['the town council','a charity','a group of doctors'], a:1, y:190,
      right:['أحسنت. people assume هو المشتّت، وbut in fact تأتي بالإجابة: جمعية خيرية.','Well done. “People assume” is the distractor; “but in fact” brings the answer: a charity.'],
      wrong:['الإجابة a charity. عبارة people assume تذكر رأيًا خاطئًا، ثم but in fact تصحّحه.','The answer is a charity. “People assume” gives a wrong belief; “but in fact” corrects it.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['«We were going to fly, but in the end we took the train.» كيف سافروا؟','“We were going to fly, but in the end we took the train.” How did they travel?'], o:['by plane','by train','by car','by bus'], a:1, e:['were going to = خطة لم تحدث. in the end = ما حدث فعلًا.','“Were going to” is a plan that did not happen; “in the end” is what happened.']},
    {q:['أي كلمة تعني غالبًا أن الخيار السابق خاطئ؟','Which word usually means the option just mentioned is wrong?'], o:['also','actually','and','because'], a:1, e:['actually تصحّح ما قبلها.','“Actually” corrects what came before.']},
    {q:['السؤال يسأل عن «now». المتحدث قال: «It used to be the library.» هل الإجابة the library؟','The question asks about “now”. The speaker said “It used to be the library.” Is the answer the library?'], o:[['نعم','Yes'],['لا','No']], a:1, e:['used to = الماضي، والسؤال عن الحاضر.','“Used to” is the past; the question is about now.']},
  ]});

/* ---------- L-map: maps and directions ---------- */
B({ key:'xp-L-map', sk:'L-map', ord:10, title:['الخريطة: أين أنت وإلى أين تتجه؟','Maps: where are you and which way?'], min:['٤ دقائق','4 min'],
  goals:[['تحدد نقطة البداية واتجاهها','Find the start point and facing direction'],['تفهم opposite وnext to وbeyond','Understand opposite, next to, beyond'],['تتبع المسار بإصبعك','Trace the route with your finger']],
  scenes:[
  { t:['ابدأ من «أنت هنا»','Start from “You are here”'],
    items:{
      road:{type:'line',x1:60,y1:320,x2:580,y2:320,cls:'s-ink'},
      gate:{type:'note',x:320,y:300,w:150,h:44,c:'n1',size:20,rot:0,text:'Main gate'},
      path:{type:'line',x1:320,y1:278,x2:320,y2:140,cls:'s-pri'},
      fw:{type:'arrow',x1:320,y1:250,x2:320,y2:150,cls:'s-pink',bend:0,text:''},
      L:{type:'text',x:200,y:200,s:26,text:['يسار','left'],en:{text:'left'}},
      R:{type:'text',x:440,y:200,s:26,text:['يمين','right']},
      tip:{type:'note',x:320,y:80,w:400,h:54,c:'n0',size:21,rot:-1,text:['يمينك ويسارك حسب اتجاه سيرك','Left and right depend on the way you face']},
    },
    beats:[
      { say:['أول خطوة في سؤال الخريطة: ابحث عن «أنت هنا» أو المدخل. هذه نقطة البداية.','First step in a map question: find “You are here” or the entrance. That is your start.'], show:['road','gate'] },
      { say:['ثم تخيّل أنك تمشي داخل الخريطة. إن كنت تسير إلى الأعلى، فيمينك هو يمين الورقة.','Then imagine you are walking into the map. If you walk up the page, your right is the page’s right.'], show:['path','fw','L','R'] },
      { say:['لكن إن استدار المسار نحو الأسفل، ينقلب اليمين واليسار. لذلك حدّد دائمًا الاتجاه الذي تسير فيه.','But if the path turns down the page, left and right swap. Always fix the direction you are walking.'], show:['tip'] },
    ]},
  { t:['كلمات المكان','Position words'],
    items:lang=>(()=>{ const o={};
      [['opposite',['مقابل','facing it']],['next to',['بجوار','beside it']],['beyond / past',['بعد أن تتجاوزه','after you pass it']],['on the corner',['على الزاوية','where two roads meet']],['at the far end',['في الطرف البعيد','furthest away']],['in the middle of',['في الوسط','in the centre']]].forEach(([w,m],i)=>{ const x=(lang==='ar'?[525,320,115]:[115,320,525])[i%3], y=i<3?96:216;
        o['w'+i]={type:'box',x:x-85,y:y,w:170,h:52,c:'n0',text:w,s:20}; o['m'+i]={type:'text',x,y:y+84,s:19,cls:'t-ink2',text:m}; });
      return o; })(),
    beats:[
      { say:['هذه الكلمات تتكرر في كل خريطة: opposite أي مقابل، وnext to أي بجوار.','These words appear in every map: opposite, and next to.'], show:['w0','m0','w1','m1'], gap:.2 },
      { say:['وbeyond أو past أي بعد أن تتجاوز المكان، وon the corner أي على الزاوية.','Beyond or past means after you pass a place; on the corner means where two paths meet.'], show:['w2','m2','w3','m3'], gap:.2 },
      { say:['وat the far end أي في الطرف البعيد، وin the middle of أي في الوسط. احفظها كمجموعة واحدة.','At the far end means furthest away; in the middle of means the centre. Learn them as a set.'], show:['w4','m4','w5','m5'], gap:.2 },
    ]},
  { t:['دورك: أين المقهى؟','Your turn: where is the café?'],
    items:{
      s:{type:'text',x:320,y:56,s:19,text:'“Turn right as you come in; the café is just past the lockers.”'},
      frame:{type:'box',x:50,y:76,w:330,h:226,c:'surface2'},
      you:{type:'note',x:215,y:318,w:140,h:38,c:'n1',size:18,text:'Entrance'},
      desk:{type:'box',x:175,y:220,w:80,h:38,c:'prisoft',text:'Desk',s:17},
      lk:{type:'box',x:268,y:262,w:58,h:26,c:'n0',text:'lockers',s:13},
      A:{type:'box',x:322,y:226,w:44,h:44,c:'surface',text:'A',s:22},
      B:{type:'box',x:66,y:226,w:44,h:44,c:'surface',text:'B',s:22},
      C:{type:'box',x:322,y:92,w:44,h:44,c:'surface',text:'C',s:22},
    },
    beats:[
      { say:['دورك. أنت عند المدخل في أسفل المخطط. تسمع: turn right as you come in, the café is just past the lockers. أين المقهى؟','Your turn. You are at the entrance at the bottom. “Turn right as you come in; the café is just past the lockers.” Where is the café?'], show:['frame','you','desk','A','B','C','lk','s'], gap:.1 },
    ],
    ask:{ opts:['A','B','C'], a:0, y:130, x:510, w:170,
      right:['صحيح. يمينك وأنت تدخل، وبعد الخزائن مباشرة: A.','Correct: on your right as you enter, just past the lockers: A.'],
      wrong:['الإجابة A. وأنت تدخل من الأسفل، يمينك هو يمين المخطط، والمقهى بعد الخزائن مباشرة، لا في الطرف البعيد.','It is A. Entering from the bottom, your right is the plan’s right, and the café is just past the lockers, not at the far end.'] } },
  ],
  quiz:[
    {q:['تسير نحو أسفل الخريطة وتسمع: «turn left». إلى أي جهة من الورقة تنعطف؟','You walk down the map and hear “turn left”. Which side of the page do you turn to?'], o:[['يسار الورقة','the page’s left'],['يمين الورقة','the page’s right']], a:1, e:['عندما تسير نحو الأسفل ينقلب الاتجاه: يسارك هو يمين الورقة.','Walking down the page, your left is the page’s right.']},
    {q:['«The shop is opposite the bank» تعني:','“The shop is opposite the bank” means:'], o:['next to the bank','facing the bank','behind the bank','inside the bank'], a:1, e:['opposite = مقابل، على الجهة الأخرى.','Opposite means facing it, on the other side.']},
    {q:['«Go past the fountain» تعني:','“Go past the fountain” means:'], o:['stop at the fountain','walk beyond the fountain','turn at the fountain','go back to the fountain'], a:1, e:['past = تتجاوزها وتكمل.','Past means you continue beyond it.']},
  ]});

/* ---------- L-notes: lecture signposting ---------- */
B({ key:'xp-L-notes', sk:'L-notes', ord:10, title:['المحاضرة: اتبع إشارات المحاضر','Lectures: follow the signposts'], min:['٤ دقائق','4 min'],
  goals:[['تستخدم العناوين خريطة للمحاضرة','Use the headings as a map'],['تلتقط إشارات الانتقال','Catch moving-on signposts'],['تتوقع نوع الكلمة من القواعد','Predict the word type from grammar']],
  scenes:[
  { t:['العناوين خريطتك','The headings are your map'],
    items:{
      h:{type:'text',x:320,y:76,s:24,text:'The history of glass'},
      a:{type:'box',x:140,y:100,w:360,h:40,c:'n0',text:'Ingredients',s:20},
      a1:{type:'text',x:320,y:166,s:19,cls:'t-ink2',text:'sand, soda and ______ for strength'},
      b:{type:'box',x:140,y:186,w:360,h:40,c:'n2',text:'Glassblowing',s:20},
      b1:{type:'text',x:320,y:252,s:19,cls:'t-ink2',text:'made glass ______ and everyday'},
      c:{type:'box',x:140,y:272,w:360,h:40,c:'n3',text:'Venice',s:20},
    },
    beats:[
      { say:['في الجزء الرابع تسمع محاضرة كاملة بلا توقف، وأمامك ملاحظات فيها عناوين.','In Part 4 you hear a whole lecture without a break, with notes under headings.'], show:['h'] },
      { say:['العناوين هي خريطة المحاضرة. اقرأها قبل البدء، فالمحاضر سيمرّ عليها بالترتيب نفسه.','The headings are the map of the lecture. Read them first: the lecturer follows the same order.'], show:['a','a1','b','b1','c'], gap:.25 },
    ]},
  { t:['إشارات الانتقال','Moving-on signposts'],
    items:{
      s1:{type:'note',x:180,y:110,w:260,h:56,c:'n0',size:20,rot:-2,text:'“Let’s turn to…”'},
      s2:{type:'note',x:460,y:110,w:260,h:56,c:'n2',size:20,rot:2,text:'“Another reason is…”'},
      s3:{type:'note',x:180,y:196,w:260,h:56,c:'n3',size:20,rot:2,text:'“Moving on to…”'},
      s4:{type:'note',x:460,y:196,w:260,h:56,c:'n1',size:20,rot:-2,text:'“Finally,…”'},
      tip:{type:'text',x:320,y:290,s:23,hand:true,text:['إذا ضعت، انتقل للعنوان التالي وانتظر الإشارة','If you get lost, jump to the next heading and wait']},
    },
    beats:[
      { say:['المحاضر يعلن الانتقال بعبارات ثابتة، مثل: let’s turn to، وanother reason is.','The lecturer announces each move with fixed phrases, like “Let’s turn to” and “Another reason is”.'], show:['s1','s2'], gap:.3 },
      { say:['وmoving on to، وfinally. كل إشارة تعني: انظر إلى العنوان التالي في ملاحظاتك.','And “Moving on to”, “Finally”. Each one means: look at the next heading in your notes.'], show:['s3','s4'], gap:.3 },
      { say:['وإن فاتك فراغ، لا تتوقف عنده. انتقل للعنوان التالي وانتظر الإشارة، ثم عد إليه في وقت المراجعة.','If you miss a gap, do not stop. Move to the next heading, wait for the signpost, and come back later.'], show:['tip'] },
    ]},
  { t:['توقّع نوع الكلمة','Predict the word type'],
    items:{
      g:{type:'text',x:320,y:96,s:23,text:'made glass ______ and everyday'},
      p:{type:'note',x:320,y:166,w:380,h:56,c:'n0',size:21,rot:-1,text:['بعد made glass نحتاج صفة','After “made glass” we need an adjective']},
      h:{type:'text',x:320,y:236,s:21,text:'“…glass became cheap, and it was soon an everyday material…”'},
      a:{type:'note',x:320,y:300,w:200,h:54,c:'n3',size:26,rot:2,text:'cheap'},
    },
    beats:[
      { say:['قبل الاستماع، اسأل: أي نوع من الكلمات يناسب الفراغ؟ هنا: made glass ثم فراغ ثم and everyday.','Before you listen, ask what kind of word fits. Here: “made glass”, a gap, “and everyday”.'], show:['g'] },
      { say:['القواعد تقول: نحتاج صفة، مثل everyday.','Grammar says we need an adjective, like “everyday”.'], show:['p'] },
      { say:['المحاضر يقول: glass became cheap. والفراغ يحتاج صفة، فنكتب cheap. والقاعدة: الجواب هو الكلمة نفسها التي تسمعها، دون تغيير صيغتها.','The lecturer says “glass became cheap”, and the gap needs an adjective: cheap. The answer is always the exact word you hear.'], show:['h','a'] },
    ]},
  { t:['دورك','Your turn'],
    items:{
      g:{type:'text',x:320,y:84,s:21,text:'Roman windows were not very ______'},
      s:{type:'box',x:80,y:104,w:480,h:52,c:'surface2',s:19,text:'“…their windows were small and not very clear.”'},
      ans:{type:'note',x:320,y:310,w:200,h:54,c:'n3',size:26,rot:-1,text:'clear'},
    },
    beats:[
      { say:['دورك. ما الكلمة الواحدة التي تكمل الفراغ؟','Your turn. Which single word completes the gap?'], show:['g','s'] },
    ],
    ask:{ opts:['small','clear','windows','very clear'], a:1, y:200,
      right:['صحيح: clear، صفة بعد not very، وكلمة واحدة.','Correct: “clear”, an adjective after “not very”, one word.'],
      wrong:['الإجابة clear. كلمة small مذكورة لكن الجملة تقول not very، وvery clear كلمتان.','It is “clear”. “Small” is mentioned, but the gap follows “not very”; “very clear” is two words.'],
      show:['ans'] } },
  ],
  quiz:[
    {q:['ماذا تعني عبارة «Let’s now look at…» في المحاضرة؟','What does “Let’s now look at…” signal in a lecture?'], o:[['نهاية المحاضرة','the end of the talk'],['الانتقال لعنوان جديد','a move to a new heading'],['مثال','an example'],['خلاصة','a summary']], a:1, e:['إشارة انتقال: انظر للعنوان التالي.','A moving-on signpost: look at the next heading.']},
    {q:['الفراغ: «the ______ of the river» — ما نوع الكلمة؟','Gap: “the ______ of the river”. What type of word?'], o:[['صفة','adjective'],['اسم','noun'],['فعل','verb'],['ظرف','adverb']], a:1, e:['بين the وof نحتاج اسمًا.','Between “the” and “of” we need a noun.']},
    {q:['فاتك فراغ في المحاضرة. ماذا تفعل؟','You missed a gap in the lecture. What do you do?'], o:[['أتوقف وأحاول التذكر','stop and try to remember'],['أنتقل للفراغ التالي فورًا','move straight to the next gap'],['أترك بقية القسم','give up on the section'],['أكتب أي كلمة','write any word']], a:1, e:['المحاضرة لا تتوقف؛ انتقل وعد في المراجعة.','The lecture keeps going: move on and return later.']},
  ]});

})();
