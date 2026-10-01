/* English explainers: completion */
(function(){ if(!window.XP||!XP.ready) return;

const blank=(x,y,w=110,h=44,s=22)=>({type:'box',x,y,w,h,c:'surface2',text:'......',s,cls:'t-pri'});
const fitSize=t=>t.length>=9?18:t.length>=7?19:t.length>=6?22:27;

/* ================= Lesson: signal words ================= */
const S1={ s:{type:'text',x:120,y:148,s:24,text:'It was raining,'},
  sig:{type:'note',x:292,y:140,w:110,h:60,c:'n1',text:'so',size:28,rot:-1.5},
  b:blank(355,115,265,50,21),
  hint:{type:'text',x:292,y:212,s:26,hand:true,text:'keeps going →'},
  foot:{type:'note',x:320,y:292,w:440,h:62,c:'n0',text:'The signal sets the direction',size:23,rot:-1} };

const LW=[['but',100,150],['although',230,150],['whereas',100,235],['however',230,235]], RW=[['because',410,150],['so',540,150],['therefore',410,235],['and',540,235]];
const S2={ hL:{type:'box',x:35,y:70,w:260,h:46,c:'pinksoft',text:'Flip the meaning',s:22}, hR:{type:'box',x:345,y:70,w:260,h:46,c:'oksoft',text:'Keep the meaning',s:22} };
LW.forEach(([t,x,y],i)=>{ S2['r'+i]={type:'note',x,y,w:126,h:62,c:'n1',text:t,size:fitSize(t),rot:i%2?1.5:-1.5}; });
RW.forEach(([t,x,y],i)=>{ S2['l'+i]={type:'note',x,y,w:126,h:62,c:'n3',text:t,size:fitSize(t),rot:i%2?1.5:-1.5}; });
S2.foot={type:'text',x:320,y:320,s:30,hand:true,text:'Flip or keep?'};

const OP=[['abundant',110],['limited',250],['vast',390],['varied',530]];
const S3={ w1:{type:'text',x:163,y:95,s:26,text:'Despite'}, b:blank(232,68,130,40,22), w2:{type:'text',x:451,y:95,s:26,text:'resources,'},
  w3:{type:'text',x:320,y:150,s:24,text:'the team achieved impressive results.'},
  pred:{type:'note',x:320,y:210,w:260,h:54,c:'n0',text:'Your guess: few',size:24,rot:-1.5} };
OP.forEach(([t,x],i)=>{ S3['o'+i]={type:'box',x:x-62,y:256,w:124,h:46,c:'surface',text:t,s:21}; });
S3.v={type:'check',x:250,y:330,s:.6};

const S4={ l1:{type:'text',x:320,y:80,s:25,text:'Sam trained hard for months,'},
  b:blank(125,104,120,44,24), l2:{type:'text',x:377,y:134,s:25,text:'he lost the race.'},
  ans:{type:'note',x:185,y:126,w:120,h:50,c:'n0',text:'yet',size:26,rot:-1.5},
  why:{type:'text',x:320,y:235,s:26,hand:true,text:'Hard work, then a loss: the meaning flips'} };

const S5={ a:{type:'note',x:120,y:160,w:186,h:96,c:'n0',text:'1 Signal word',size:20,rot:-2},
  b:{type:'note',x:320,y:160,w:186,h:96,c:'n1',text:'2 Predict',size:22,rot:1.5},
  c:{type:'note',x:520,y:160,w:186,h:96,c:'n3',text:'3 Then options',size:19,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'Options come after your guess, not before'} };

XP.add({ key:'en-co-signals', lang:'en', sk:'completion', ord:10, title:'Signal words in sentence completion', min:'4 min',
  goals:['See how the signal word sets the direction of the missing word','Tell contrast words apart from cause and addition words','Predict the missing word before reading the options'],
  scenes:[
  { t:'Sentences have a direction', items:S1, beats:[
    { say:'In sentence completion, the signal word is your compass. It shows which way the missing part goes.', show:['s','sig','b'] },
    { say:'It was raining, so we took umbrellas. So keeps the meaning going the same way.', set:{b:'we took umbrellas'}, show:['hint'] },
    { say:'Switch to but, and it flips: it was raining, but the trip went ahead.', set:{sig:'but',b:'the trip went ahead',hint:'flips ↩'}, show:['foot'] } ]},
  { t:'Flip words and keep words', items:S2, beats:[
    { say:'Contrast words flip the meaning: but, although, whereas, however.', show:['hL','r0','r1','r2','r3'], gap:.3 },
    { say:'Cause and addition words keep it going: because, so, therefore, and.', show:['hR','l0','l1','l2','l3'], gap:.3 },
    { say:'So ask first: does the signal flip the meaning, or keep it?', show:['foot'], hl:['hL','hR'] } ]},
  { t:'Predict before the options', items:S3, beats:[
    { say:'Cover the options first. The team did impressively despite its resources.', show:['w1','b','w2','w3'], gap:.2 },
    { say:'Despite flips the meaning, and the result is impressive. So the resources must have been few.', hl:['w1'], show:['pred'] },
    { say:'Now read the options. Limited matches your guess.', show:['o0','o1','o2','o3','v'], gap:.15, set:{b:'limited'} },
    { say:'Abundant and vast agree with the result instead of flipping it, so cross them out.', strike:['o0','o2'] } ]},
  { t:'Your turn: which word?', items:S4, beats:[
    { say:'Your turn. Does the second half keep the first, or flip it?', show:['l1','b','l2'], gap:.25 },
    { say:'Sam trained hard for months, then lost the race. Which word fits the blank?', hl:['b'] } ],
    ask:{ opts:['so','because','yet','therefore'], a:2, show:['ans','why'],
      right:'Well done. Hard training leads you to expect a win, so a loss needs a flip word: yet.',
      wrong:'Careful. Hard training suggests a win, but he lost, so the meaning flips. The answer is yet.' } },
  { t:'Your steps', items:S5, beats:[
    { say:'Your steps: find the signal, predict your word, then read the options.', show:['a','b','c'], gap:.4 },
    { say:'Predicting first protects you from an attractive option that points the wrong way.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'Despite the ______ weather, the children went out to play in the park.', o:['mild','freezing','lovely','clear'], a:1, e:'"Despite" flips the meaning: they went out even though the weather was bad, so "freezing".'},
    {q:'She went to bed early; ______, she woke up full of energy.', o:['however','although','as a result','whereas'], a:2, e:'Waking up energetic is a result of sleeping early, so we need a result word: "as a result".'},
    {q:'My brother loves sports, ______ my sister prefers reading.', o:['because','whereas','therefore','so'], a:1, e:'Two different preferences are contrasted, so "whereas" fits.'},
  ] });

/* ================= Lesson: two blanks & meaning agreement ================= */
const OPT=[['strengthens / whereas',165,202],['weakens / but',475,202],['strengthens / so',165,264],['damages / and',475,264]];
const T1={ a1:{type:'text',x:171,y:92,s:26,text:'Enough sleep'}, b1:blank(278,66,160,40,21), a2:{type:'text',x:515,y:92,s:26,text:'memory,'},
  b2:blank(58,120,120,40,21), a3:{type:'text',x:374,y:146,s:24,text:'staying up late weakens it.'} };
OPT.forEach(([t,x,y],i)=>{ T1['o'+i]={type:'box',x:x-135,y:y-24,w:270,h:48,c:'surface',text:t,s:20}; });
T1.v={type:'check',x:320,y:202,s:.55};

const T2={ a1:{type:'text',x:238,y:110,s:26,text:'The lecture was so'}, b1:blank(392,84,150,44,22),
  a2:{type:'text',x:188,y:180,s:26,text:'that most students'}, b2:blank(342,154,190,44,21), a3:{type:'text',x:569,y:180,s:26,text:'it.'},
  x:{type:'cross',x:320,y:258,s:.8}, v:{type:'check',x:320,y:258,s:.8},
  tag:{type:'text',x:320,y:322,s:26,hand:true,text:'Check the whole sentence, not each blank'} };

const CL=[['pay','attention',170,125],['make','a decision',470,125],['take','a risk',170,225],['give','a speech',470,225]];
const T3={}; CL.forEach(([v,n,x,y],i)=>{ T3['v'+i]={type:'note',x:x-68,y,w:128,h:62,c:'n2',text:v,size:26,rot:-1.5}; T3['n'+i]={type:'note',x:x+68,y,w:128,h:62,c:'n0',text:n,size:n.length>=10?18:n.length>=8?20:24,rot:1.5}; });
T3.foot={type:'text',x:320,y:315,s:28,hand:true,text:'A verb calls for its usual partner'};

const T4={ l1:{type:'text',x:157,y:80,s:22,text:'The state pays close'}, b1:blank(301,57,130,36,20), w2:{type:'text',x:529,y:80,s:22,text:'to education,'},
  b2:blank(79,103,100,36,20), l2:{type:'text',x:376,y:126,s:22,text:'it funds schools generously.'},
  ans:{type:'note',x:320,y:225,w:300,h:64,c:'n0',text:'attention + so',size:27,rot:-1.5} };

const T5={ a:{type:'note',x:120,y:160,w:186,h:96,c:'n0',text:'1 Clearer blank',size:18,rot:-2},
  b:{type:'note',x:320,y:160,w:186,h:96,c:'n1',text:'2 Eliminate',size:22,rot:1.5},
  c:{type:'note',x:520,y:160,w:186,h:96,c:'n3',text:'3 Read it all',size:21,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'And watch for words that go together'} };

XP.add({ key:'en-co-twoblank', lang:'en', sk:'completion', ord:20, title:'Two blanks and meaning agreement', min:'4 min',
  goals:['Start with the clearer blank and use it to eliminate options','Check that the whole sentence makes sense','Recognize collocations such as "pay attention"'],
  scenes:[
  { t:'Start with the clearer blank', items:T1, beats:[
    { say:'With two blanks, don\'t solve both at once. Start with the clearer one.', show:['a1','b1','a2','b2','a3','o0','o1','o2','o3'], gap:.12 },
    { say:'Enough sleep strengthens memory; it doesn\'t weaken or damage it. Two options are out.', set:{b1:'strengthens'}, strike:['o1','o3'] },
    { say:'Two are left. Sleep and staying up late are contrasted, so we need whereas.', set:{b2:'whereas'}, strike:['o2'], show:['v'] } ]},
  { t:'Read the whole sentence', items:T2, beats:[
    { say:'After choosing, reread the whole sentence. Each blank can fit alone while the meaning still clashes.', show:['a1','b1','a2','b2','a3'], gap:.15 },
    { say:'So clear that most students misunderstood it? Each word fits alone, but together they contradict.', set:{b1:'clear',b2:'misunderstood'}, show:['x'] },
    { say:'Now: so confusing that most students misunderstood it. The whole sentence agrees.', set:{b1:'confusing'}, hide:['x'], show:['v','tag'] } ]},
  { t:'Words that go together', items:T3, beats:[
    { say:'Some words naturally go together. We call them collocations, like pay attention.', show:['v0','n0'] },
    { say:'We also say make a decision, take a risk, and give a speech.', show:['v1','n1','v2','n2','v3','n3'], gap:.25 },
    { say:'So when one of these verbs comes before a blank, look for its usual partner.', show:['foot'], hl:['v0','n0'] } ]},
  { t:'Your turn: two blanks', items:T4, beats:[
    { say:'Your turn. Start with the blank after pays close, then check the whole meaning.', show:['l1','b1','w2','b2','l2'], gap:.2 },
    { say:'Which option fills both blanks?', hl:['b1','b2'] } ],
    ask:{ opts:['attention / so','neglect / so','attention / but','disregard / and'], a:0, show:['ans'],
      right:'Well done. Pays close calls for attention, and generous funding results from it, so the link is so.',
      wrong:'Pays close calls for attention, and funding follows from it. So the answer is attention with so.' } },
  { t:'Two-blank steps', items:T5, beats:[
    { say:'Your steps: start with the clearer blank, eliminate with it, then read the whole sentence.', show:['a','b','c'], gap:.4 },
    { say:'And watch for collocations. They can settle a blank in seconds.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'The runner was ______ at the start of the race, ______ he managed to win in the end.', o:['ahead / but','behind / but','behind / so','tired / because'], a:1, e:'Winning after falling behind is a surprise, so the second blank needs a contrast word: "but".'},
    {q:'The father pays close ______ to his children\'s upbringing.', o:['attention','thought','decision','opinion'], a:0, e:'"Pay close attention" is a fixed collocation.'},
    {q:'The manager made a firm ______, ______ the problem was solved quickly.', o:['decision / so','opinion / but','decision / although','stance / whereas'], a:0, e:'"Make a decision" is a collocation, and the quick fix is a result of it, so "so".'},
  ] });
})();
