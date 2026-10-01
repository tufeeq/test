/* English explainers: reading (reading comprehension) */
(function(){ if(!window.XP||!XP.ready) return;

/* passage card: a box plus one left-aligned text item per line (keys pbox, l1, l2, …) */
const PASS=(lines,y,{lh=38,s=19,h}={})=>{ const o={pbox:{type:'box',x:30,y,w:580,h:h||(lines.length*lh+26),c:'surface2'}};
  lines.forEach((t,i)=>{ o['l'+(i+1)]={type:'text',x:54,y:y+13+lh*(i+0.5)+s*0.36,s,anchor:'start',text:t}; }); return o; };

/* ---------- 1. main idea vs details ---------- */
const BAMBOO=['Bamboo is one of the most useful plants.','Its young shoots are cooked as food, its tall','stems build houses, and its fibers make paper.'];
XP.add({ key:'en-re-main', lang:'en', sk:'reading', ord:10, title:'Main idea and details', min:'3 min',
  goals:['Tell the main idea from the details','Find the topic sentence in a passage','Choose a title that covers the whole passage','Rule out titles that are too narrow or too broad'],
  scenes:[
  { t:'A short passage',
    items:{
      ...PASS(BAMBOO,76,{lh:40,s:20}),
      ul:{type:'line',x1:52,y1:125,x2:520,y2:125,cls:'s-pink'},
      tag:{type:'note',x:320,y:262,w:230,h:58,c:'n2',text:'Topic sentence',size:24,rot:-2},
      tip:{type:'text',x:320,y:330,s:30,hand:true,text:'Usually the first or last sentence'},
    },
    beats:[
      { say:'Read this short passage about bamboo. Each part of it has a job.', show:['pbox','l1','l2','l3'], gap:.5 },
      { say:'The first sentence says bamboo is one of the most useful plants. That is the topic sentence.', show:['ul','tag'] },
      { say:'It usually comes at the start or the end of a passage. The other sentences give details.', show:['tip'] },
    ]},
  { t:'The umbrella and the details',
    items:{
      idea:{type:'note',x:320,y:104,w:440,h:62,c:'n0',text:'Main idea: bamboo is very useful',size:21,rot:-1},
      k1:{type:'line',x1:320,y1:138,x2:125,y2:208,cls:'s-pri'},
      k2:{type:'line',x1:320,y1:138,x2:320,y2:208,cls:'s-pri'},
      k3:{type:'line',x1:320,y1:138,x2:515,y2:208,cls:'s-pri'},
      d1:{type:'box',x:40,y:208,w:170,h:48,c:'prisoft',text:'shoots: food',s:18,cls:'t-pri'},
      d2:{type:'box',x:235,y:208,w:170,h:48,c:'prisoft',text:'stems: houses',s:18,cls:'t-pri'},
      d3:{type:'box',x:430,y:208,w:170,h:48,c:'prisoft',text:'fibers: paper',s:18,cls:'t-pri'},
      bot:{type:'text',x:320,y:314,s:30,hand:true,text:'A detail is part of the picture, not all of it'},
    },
    beats:[
      { say:'The main idea is what the whole passage is about: bamboo is very useful.', show:['idea'] },
      { say:'The details support it: shoots are food, stems build houses, and fibers make paper.', show:['k1','d1','k2','d2','k3','d3'], gap:.25 },
      { say:'Each detail is true, but covers only one part, so it can’t be the main idea.', show:['bot'], hl:['d3'] },
    ]},
  { t:'Your turn: pick a title',
    items:{
      q:{type:'text',x:320,y:90,s:28,cls:'t-pri',text:'What is the best title?'},
      sub:{type:'text',x:320,y:128,s:18,cls:'t-ink2',text:'Remember: bamboo is one of the most useful plants'},
      ans:{type:'note',x:320,y:222,w:340,h:64,c:'n3',text:'Title = main idea',size:25,rot:-1},
    },
    beats:[
      { say:'A title question is a main idea question in a few words.', show:['q'] },
      { say:'Bamboo is one of the most useful plants. Which title fits best?', show:['sub'] },
    ],
    ask:{ opts:['Bamboo in building','The uses of bamboo','The history of Asia','How paper is made'], a:1, s:19,
      right:'Well done. The uses of bamboo covers the whole passage: shoots, stems and fibers.',
      wrong:'The best title is the uses of bamboo; it covers shoots, stems and fibers. The others are too narrow or too broad.',
      show:['ans'] } },
  { t:'Narrow, broad, just right',
    items:(()=>{ const o={}; [['Bamboo in building','Too narrow','n1'],['The history of Asia','Too broad','n1'],['The uses of bamboo','Just right','n3']].forEach(([tt,tag,c],i)=>{ const y=100+i*70;
      o['r'+i]={type:'box',x:50,y:y-25,w:330,h:50,c:'surface2',text:tt,s:22}; o['t'+i]={type:'note',x:490,y,w:180,h:50,c,text:tag,size:22,rot:i%2?2:-2}; });
      o.tip={type:'text',x:320,y:322,s:30,hand:true,text:'Does it cover the start and the end?'}; return o; })(),
    beats:[
      { say:'Bamboo in building is too narrow: it covers only the stems. That is the detail trap.', show:['r0','t0'] },
      { say:'The history of Asia is too broad. The passage never mentions history.', show:['r1','t1'] },
      { say:'The uses of bamboo is just right. It covers the whole passage and nothing more.', show:['r2','t2'] },
      { say:'Before you choose, ask: does it cover both the start and the end?', show:['tip'] },
    ]},
  ],
  quiz:[
    {q:'"Sleep is essential to good health. Without it, the body heals slowly, the mind struggles to focus, and moods become harder to control." The best title is:', o:['Healing wounds','Why sleep matters for health','Dreams at night','How to focus'], a:1, e:'The first sentence is the topic sentence; the rest are examples of it.'},
    {q:'In the passage above, "the mind struggles to focus" is:', o:['the main idea','a detail that supports the main idea','the writer’s opposing view','the title of the passage'], a:1, e:'It is one example of why sleep matters, so it is a detail.'},
    {q:'A title that covers only one sentence of a passage is:', o:['just right','too narrow','too broad','complete'], a:1, e:'A good title covers the whole passage; one that covers only part of it is too narrow.'},
  ]});

/* ---------- 2. stated, inferred, not mentioned ---------- */
const WHALE=['Each autumn, humpback whales leave the cold','polar seas and swim thousands of kilometers','to warm waters, where their calves are born.'];
XP.add({ key:'en-re-stated', lang:'en', sk:'reading', ord:20, title:'Stated, inferred, or not mentioned?', min:'4 min',
  goals:['Tell a stated fact from an inferred one','Find the evidence in the passage for every answer','Answer from the passage, not from general knowledge','Solve "all of the following EXCEPT" questions'],
  scenes:[
  { t:'Three kinds',
    items:{
      ...PASS(WHALE,74,{lh:40,s:20}),
      a:{type:'note',x:125,y:272,w:170,h:60,c:'n3',text:'Stated',size:22,rot:-2},
      b:{type:'note',x:320,y:272,w:170,h:60,c:'n2',text:'Inferred',size:22,rot:2},
      c:{type:'note',x:515,y:272,w:190,h:60,c:'n1',text:'Not mentioned',size:19,rot:-2},
    },
    beats:[
      { say:'Here is a short passage about humpback whales. Every answer choice is one of three kinds.', show:['pbox','l1','l2','l3'], gap:.5 },
      { say:'It may be stated, or inferred, which means the passage points to it without saying it in those words.', show:['a','b'] },
      { say:'Or it may not be mentioned at all, even if it is true.', show:['c'] },
    ]},
  { t:'Stated or inferred?',
    items:{
      qa:{type:'box',x:30,y:66,w:580,h:44,c:'surface2',text:'"Each autumn, humpback whales leave the cold…"',s:17,cls:'t-ink2'},
      sa:{type:'box',x:30,y:124,w:430,h:48,c:'surface',text:'Humpbacks leave polar seas in autumn',s:17},
      ta:{type:'note',x:540,y:148,w:125,h:50,c:'n3',text:'Stated',size:20,rot:-2},
      qb:{type:'box',x:30,y:200,w:580,h:44,c:'surface2',text:'"…to warm waters, where their calves are born."',s:17,cls:'t-ink2'},
      sb:{type:'box',x:30,y:258,w:430,h:48,c:'surface',text:'The calves are not born in polar seas',s:17},
      tb:{type:'note',x:540,y:282,w:125,h:50,c:'n2',text:'Inferred',size:20,rot:2},
    },
    beats:[
      { say:'Compare each choice with the passage. Humpbacks leave polar seas in autumn: the first line says almost exactly that.', show:['qa','sa'] },
      { say:'So it is stated, with clear evidence.', show:['ta'] },
      { say:'Now: the calves are not born in polar seas. No line says that in those words.', show:['qb','sb'] },
      { say:'But the calves are born in warm waters, far from the cold seas. So it is inferred, and the evidence is still there.', show:['tb'] },
    ]},
  { t:'The general knowledge trap',
    items:{
      st:{type:'box',x:50,y:78,w:540,h:56,c:'surface2',text:'Humpback whales eat krill and small fish',s:20},
      ck:{type:'check',x:185,y:180},
      ckt:{type:'text',x:220,y:188,s:21,anchor:'start',text:'True in real life'},
      cr:{type:'cross',x:185,y:238},
      crt:{type:'text',x:220,y:246,s:21,anchor:'start',cls:'t-bad',text:'Not in the passage'},
      rule:{type:'note',x:320,y:310,w:400,h:58,c:'n0',text:'Answer from the passage only',size:20,rot:-2},
    },
    beats:[
      { say:'You may see a choice like this: humpback whales eat krill and small fish.', show:['st'] },
      { say:'You may even know it is true.', show:['ck','ckt'] },
      { say:'But the passage never says it, and the question is about the passage, not your knowledge. So it is not mentioned.', show:['cr','crt','rule'], gap:.35 },
    ]},
  { t:'Your turn: EXCEPT',
    items:{
      q:{type:'text',x:320,y:80,s:22,cls:'t-pri',text:'All of these are mentioned EXCEPT:'},
      sub:{type:'text',x:320,y:112,s:16,cls:'t-ink2',text:'Three choices have evidence; find the one that doesn’t'},
      ans:{type:'note',x:320,y:222,w:420,h:64,c:'n3',text:'Groups are never mentioned',size:22,rot:-1},
    },
    beats:[
      { say:'In an except question the task flips: three choices are in the passage, and you want the one that is not.', show:['q'] },
      { say:'Match each choice to its evidence. Which one does the passage not mention?', show:['sub'] },
    ],
    ask:{ opts:['They leave in autumn','They swim a long way','Calves are born in warm water','They travel in large groups'], a:3, column:true, y:156, s:18,
      right:'Well done. Autumn, the long swim and the calves are all in the passage. Groups are never mentioned.',
      wrong:'Autumn is in the first line, the long swim in the second, and the calves in the third. Groups are never mentioned.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'"The museum closed early because of heavy snow, so the class went home before finishing their sketches." Why did the museum close, according to the passage?', o:['A public holiday','Heavy snow','Repair work','Too few visitors'], a:1, e:'It is stated: "because of heavy snow."'},
    {q:'From the passage above, we can infer that the class:', o:['finished their sketches early','was sketching at the museum','did not enjoy art','was afraid of snow'], a:1, e:'Not said in those words, but they left the closing museum "before finishing their sketches."'},
    {q:'The passage above mentions all of the following EXCEPT:', o:['The museum closed early','It snowed heavily','The class went home','The power went out'], a:3, e:'A power cut can happen in a storm, but the passage never mentions one.'},
  ]});

/* ---------- 3. efficient reading strategy ---------- */
const ROOF=['Sam grew tomatoes on his roof. His neighbors','mocked the idea at first, but they warmed to','it after the harvest and asked him for tips.'];
XP.add({ key:'en-re-strategy', lang:'en', sk:'reading', ord:30, title:'Read smart and fast', min:'4 min',
  goals:['Start with the questions or a quick skim','Spot the key word and go back to where it appears','Work out a word’s meaning from context','Find what a pronoun refers to'],
  scenes:[
  { t:'Start with the question',
    items:{
      qa:{type:'box',x:35,y:76,w:275,h:48,c:'prisoft',text:'What does "mocked" mean?',s:17,cls:'t-pri'},
      qb:{type:'box',x:330,y:76,w:275,h:48,c:'prisoft',text:'What does "it" refer to?',s:17,cls:'t-pri'},
      tip:{type:'text',x:320,y:164,s:30,hand:true,text:'The question tells you what to look for'},
      ...PASS(ROOF,190,{lh:40}),
    },
    beats:[
      { say:'Don’t start by reading word by word. Glance at the questions first, so you know what to look for.', show:['qa','qb'] },
      { say:'Here we need the meaning of a word, and what a pronoun refers to.', show:['tip'] },
      { say:'Then skim the passage for its topic: Sam grew tomatoes on his roof.', show:['pbox','l1','l2','l3'], gap:.4 },
    ]},
  { t:'The key word',
    items:{
      ...PASS(ROOF,64,{lh:38}),
      chip:{type:'note',x:130,y:250,w:160,h:58,c:'n1',text:'mocked',size:26,rot:-3},
      sent:{type:'box',x:245,y:224,w:350,h:52,c:'butter',text:'mocked the idea at first',s:20,cls:'t-note'},
      hint:{type:'text',x:320,y:326,s:30,hand:true,text:'Read around it, not the whole passage'},
    },
    beats:[
      { say:'Find the key word in the question. Here it is mocked.', show:['pbox','l1','l2','l3','chip'], gap:.25 },
      { say:'Scan for it, then read the sentence around it.', show:['sent'] },
      { say:'You don’t reread the whole passage for every question, so you save time.', show:['hint'] },
    ]},
  { t:'Meaning from context',
    items:{
      s1:{type:'box',x:35,y:74,w:275,h:50,c:'surface2',text:'mocked the idea at first',s:18},
      s2:{type:'box',x:330,y:74,w:275,h:50,c:'surface2',text:'but they warmed to it',s:18},
      gn:{type:'note',x:320,y:170,w:420,h:56,c:'n2',text:'but → the opposite comes next',size:20,rot:-1},
      mean:{type:'eq',x:320,y:238,s:26,cls:'t-pri',text:'mocked = made fun of'},
      test:{type:'box',x:150,y:262,w:450,h:52,c:'oksoft',text:'His neighbors made fun of the idea',s:19},
      ck:{type:'check',x:112,y:288,s:.9},
    },
    beats:[
      { say:'What does mocked mean? No dictionary needed. Look at what comes next: but they warmed to it.', show:['s1','s2'] },
      { say:'But signals a contrast. Warming to an idea is the opposite of laughing at it, so mocked means made fun of.', show:['gn','mean'] },
      { say:'Check by swapping it in: his neighbors made fun of the idea. It makes sense.', show:['test','ck'] },
    ]},
  { t:'Your turn: pronouns',
    items:{
      rule:{type:'note',x:320,y:94,w:520,h:58,c:'n0',text:'A pronoun points back to a matching noun',size:19,rot:-1},
      d1:{type:'box',x:150,y:160,w:340,h:52,c:'surface2',text:'and asked him for tips',s:22},
      dn:{type:'note',x:320,y:262,w:200,h:56,c:'n3',text:'him → Sam',size:24,rot:2},
      q:{type:'text',x:320,y:88,s:28,cls:'t-pri',text:'but they warmed to it'},
      sub:{type:'text',x:320,y:128,s:19,cls:'t-ink2',text:'What does "it" refer to?'},
      ans:{type:'note',x:320,y:222,w:260,h:64,c:'n3',text:'it → the idea',size:26,rot:-1},
    },
    beats:[
      { say:'A pronoun points back to an earlier noun that matches it: one or many, person or thing.', show:['rule'] },
      { say:'In the phrase asked him for tips, him means Sam, who grew the tomatoes.', show:['d1','dn'] },
      { say:'Now: but they warmed to it. What does it refer to?', hide:['rule','d1','dn'], show:['q','sub'] },
    ],
    ask:{ opts:['the idea','the tomatoes','the neighbors','Sam'], a:0,
      right:'Well done. It means one thing, not a person. Only the idea fits: they mocked it, then warmed to it.',
      wrong:'It means one thing. The tomatoes and neighbors are many, and Sam would be him. It refers to the idea.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'"The doctor was so adept that she could diagnose an illness at a glance, and patients traveled from distant towns to see her." The word "adept" means:', o:['skilled','angry','generous','tired'], a:0, e:'The next part explains it: she could diagnose an illness at a glance.'},
    {q:'In the passage above, "her" in "to see her" refers to:', o:['the illness','the doctor','the patients','the towns'], a:1, e:'Patients traveled to see the doctor; "her" is one female person, which matches "the doctor."'},
    {q:'The best first step to save time in reading comprehension is:', o:['Memorize the passage before the questions','Read the questions or skim the passage quickly','Read every choice three times','Start with the longest question'], a:1, e:'Knowing what you need first lets you go straight to the evidence.'},
  ]});
})();
