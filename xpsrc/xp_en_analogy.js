/* English explainers: analogy */
(function(){ if(!window.XP||!XP.ready) return;

/* a word pair: two notes (first word on the LEFT) with a colon between them */
const pair=(items,id,y,a,b,c,{xa=120,xb=270,w=120,h=60,size=26}={})=>{
  items[id+'a']={type:'note',x:xa,y,w,h,c,text:a,size,rot:-1.5};
  items[id+'c']={type:'text',x:(xa+xb)/2,y:y+10,s:30,text:':'};
  items[id+'b']={type:'note',x:xb,y,w,h,c,text:b,size,rot:1.5};
  return [id+'a',id+'c',id+'b']; };

/* ================= Lesson: build the bridge (re-created from the hand-built Arabic lesson) ================= */
const B1={ a:{type:'note',x:200,y:180,w:150,h:90,c:'n0',text:'pen',size:40,rot:-4},
  col:{type:'text',x:320,y:196,s:48,text:':'},
  b:{type:'note',x:440,y:180,w:150,h:90,c:'n3',text:'write',size:36,rot:3},
  ar:{type:'arrow',x1:235,y1:125,x2:405,y2:125,cls:'s-pink',bend:-60,text:'What links them?',s:24} };

const BW=[['A pen',91,'t-pri'],['is a tool',227,'t-ink'],['used for',387,'t-ink'],['writing',531,'t-pri']];
const B2={}; BW.forEach(([t,x,cls],i)=>{ B2['w'+i]={type:'text',x,y:150,s:30,cls,text:t}; });
Object.assign(B2,{ ul:{type:'path',d:'M50 172 Q320 192 590 172',cls:'s-pink'},
  chip:{type:'note',x:320,y:255,w:250,h:62,c:'n2',text:'tool → its use',size:26,rot:-2} });

const BO=[['knife : cut',130,'n0'],['book : library',320,'n1'],['tree : leaf',510,'n3']];
const B3={ tpl:{type:'text',x:320,y:78,s:22,cls:'t-ink2',text:'A ____ is a tool used for ____'},
  test:{type:'text',x:320,y:150,s:26,hand:true,text:'A knife is a tool used for cutting.'} };
BO.forEach(([t,x,c],i)=>{ B3['o'+i]={type:'box',x:x-88,y:205,w:176,h:56,c:'surface2',text:t,s:21}; });
Object.assign(B3,{ v0:{type:'check',x:130,y:305,s:.75}, x1:{type:'cross',x:320,y:305,s:.75}, x2:{type:'cross',x:510,y:305,s:.75} });

const B4={}; pair(B4,'p',76,'doctor','hospital','n0',{xa:230,xb:410,w:140,h:54,size:24});
Object.assign(B4,{ hint:{type:'text',x:320,y:132,s:22,hand:true,text:'Bridge: a doctor works in a hospital'},
  ans:{type:'note',x:320,y:222,w:450,h:66,c:'n0',text:'A teacher works in a school',size:24,rot:-1} });

const B5={}; const p1=pair(B5,'p',110,'egg','hen','n2',{xa:240,xb:400});
Object.assign(B5,{ ea:{type:'note',x:240,y:250,w:120,h:60,c:'n1',text:'egg',size:26,rot:2},
  ec:{type:'text',x:320,y:260,s:30,text:':'},
  eb:{type:'note',x:400,y:250,w:120,h:60,c:'n1',text:'hen',size:26,rot:-2},
  lab:{type:'text',x:320,y:62,s:24,hand:true,text:'An egg comes from a hen'},
  x:{type:'cross',x:545,y:250},
  ar:{type:'arrow',x1:170,y1:196,x2:470,y2:196,cls:'s-pri',bend:-10,text:'first word → second word',s:20} });

XP.add({ key:'en-analogy', lang:'en', sk:'analogy', ord:10, title:'Analogies: build the bridge', min:'4 min',
  goals:['See that an analogy asks about the relationship, not the words','Build a short bridge sentence','Test every option with the same bridge','Keep the direction of the relationship'],
  scenes:[
  { t:'What is an analogy?', items:B1, beats:[
    { say:'In an analogy question, you get two words with a link between them. Your job is to find another pair with the same link.', show:['a','col','b'], gap:.3 },
    { say:'The secret: don\'t look at the words themselves. Look at the relationship between them.', show:['ar'] } ]},
  { t:'Build the bridge', items:B2, beats:[
    { say:'Turn that relationship into a short, clear sentence. We call it the bridge.', show:['w0','w1','w2','w3'], gap:.35 },
    { say:'A pen is a tool used for writing. So the relationship is a tool and its use.', show:['ul','chip'] } ]},
  { t:'Test the options', items:B3, beats:[
    { say:'Now put each option into the same bridge, one at a time.', show:['tpl','o0','o1','o2'], gap:.2 },
    { say:'Knife and cut. A knife is a tool used for cutting. It fits.', show:['test','v0'], hl:['o0'] },
    { say:'Book and library. Is a book a tool used for library? That makes no sense.', set:{test:'A book is a tool used for… library?'}, show:['x1'], strike:['o1'] },
    { say:'Tree and leaf. That is a whole and its part, not a tool and its use. Cross it out.', set:{test:'A tree is a tool used for… leaf?'}, show:['x2'], strike:['o2'] } ]},
  { t:'Your turn', items:B4, beats:[
    { say:'Your turn. Doctor and hospital. Build the bridge in your head: a doctor works in a hospital.', show:['pa','pc','pb'] },
    { say:'Which pair matches the same bridge?', show:['hint'] } ],
    ask:{ opts:['teacher : school','book : reader','water : thirst','pen : ink'], a:0, show:['ans'],
      right:'Well done. A teacher works in a school. Same relationship: a person and their workplace.',
      wrong:'Test the bridge: does a book work in a reader? No. The only pair that fits is teacher and school.' } },
  { t:'The direction trap', items:B5, beats:[
    { say:'Watch the order of the words. Egg and hen: an egg comes from a hen.', show:[...p1,'lab'] },
    { say:'If an option says hen and egg, the relationship is reversed. That is a very common trap.', show:['ea','ec','eb','x'], move:{ea:[160,0],eb:[-160,0]} },
    { say:'So always read the bridge in the same order: first word, then second word.', show:['ar'] } ]},
  ],
  quiz:[
    {q:'SCALPEL : SURGEON', o:['book : library','brush : painter','car : road','sea : fish'], a:1, e:'Bridge: a scalpel is a tool a surgeon uses, and a brush is a tool a painter uses.'},
    {q:'THIRST : WATER', o:['fire : smoke','rain : cloud','hunger : food','sleep : bed'], a:2, e:'Bridge: thirst is relieved by water, and hunger is relieved by food.'},
    {q:'BRANCH : TREE', o:['hand : finger','finger : hand','pen : notebook','door : key'], a:1, e:'A branch is part of a tree, and a finger is part of a hand. "hand : finger" is the same link reversed.'},
  ] });

/* ================= Lesson: relation types ================= */
const T1={}; pair(T1,'p',135,'page','book','n0'); pair(T1,'q',262,'scissors','cut','n3',{size:23});
delete T1.pc; delete T1.qc;
Object.assign(T1,{ ar1:{type:'arrow',x1:130,y1:99,x2:260,y2:99,cls:'s-pink',bend:-22,text:'part of'},
  tag1:{type:'note',x:470,y:135,w:210,h:62,c:'n2',text:'part → whole',size:25,rot:-2},
  ar2:{type:'arrow',x1:130,y1:226,x2:260,y2:226,cls:'s-pink',bend:-22,text:'used to'},
  tag2:{type:'note',x:470,y:262,w:210,h:62,c:'n2',text:'tool → use',size:25,rot:1.5} });

const T2={}; pair(T2,'p',125,'drought','famine','n1',{size:23}); pair(T2,'q',232,'judge','court','n3');
delete T2.pc; delete T2.qc;
Object.assign(T2,{ ar1:{type:'arrow',x1:130,y1:89,x2:260,y2:89,cls:'s-pink',bend:-22,text:'leads to'},
  tag1:{type:'note',x:470,y:125,w:210,h:62,c:'n2',text:'cause → effect',size:24,rot:-2},
  ar2:{type:'arrow',x1:130,y1:196,x2:260,y2:196,cls:'s-pink',bend:-22,text:'works in'},
  tag2:{type:'note',x:470,y:232,w:210,h:62,c:'n2',text:'place',size:26,rot:1.5},
  ex:{type:'box',x:350,y:292,w:240,h:46,c:'surface2',text:'Also: bee : hive',s:21} });

const T3={}; const o3={xa:105,xb:270,w:130,h:54,size:23};
const r1=pair(T3,'a',92,'brave','bold','n0',o3), r2=pair(T3,'b',164,'generous','stingy','n1',{...o3,size:21}), r3=pair(T3,'c',236,'warm','hot','n3',o3);
Object.assign(T3,{ t1:{type:'box',x:380,y:70,w:180,h:44,c:'prisoft',text:'Synonyms',s:22}, t2:{type:'box',x:380,y:142,w:180,h:44,c:'prisoft',text:'Antonyms',s:22},
  t3:{type:'box',x:380,y:214,w:180,h:44,c:'pinksoft',text:'Degree',s:22},
  l1:{type:'box',x:107,y:292,w:110,h:44,c:'sky',text:'cold',s:21}, l2:{type:'box',x:232,y:292,w:110,h:44,c:'butter',text:'cool',s:21},
  l3:{type:'box',x:357,y:292,w:110,h:44,c:'pinksoft',text:'warm',s:21}, l4:{type:'box',x:482,y:292,w:110,h:44,c:'pink',text:'hot',s:21} });

const T4={}; const t4=pair(T4,'p',95,'apple','fruit','n0',{xa:130,xb:280});
Object.assign(T4,{ tag:{type:'note',x:480,y:95,w:220,h:62,c:'n2',text:'type → category',size:23,rot:-2},
  q:{type:'text',x:320,y:100,s:25,text:'Which pair shows a difference of degree?'},
  ans:{type:'note',x:320,y:222,w:480,h:66,c:'n0',text:'A downpour is heavier than a drizzle',size:21,rot:-1} });

const TY=[['Part–whole','n0'],['Tool–use','n1'],['Cause–effect','n2'],['Synonyms','n3'],['Antonyms','n1'],['Degree','n0'],['Place','n3'],['Type–category','n2']];
const T5={}; TY.forEach(([t,c],i)=>{ T5['k'+i]={type:'note',x:[95,245,395,545][i%4],y:i<4?135:228,w:142,h:70,c,text:t,size:t.length>11?16:18,rot:i%2?.8:-.8}; });
T5.foot={type:'text',x:320,y:318,s:28,hand:true,text:'Name the type first, then build the bridge'};

XP.add({ key:'en-an-types', lang:'en', sk:'analogy', ord:20, title:'Types of analogy relationships', min:'4 min',
  goals:['Know the most common relationship types in analogies','Name the type of a pair quickly','Tell synonyms apart from degree','Build the right bridge for each type'],
  scenes:[
  { t:'Parts and tools', items:T1, beats:[
    { say:'Analogy links come in a few common types. Know them, and the bridge comes fast. First: part and whole.', show:['pa','pb'] },
    { say:'Page and book. A page is part of a book.', show:['ar1','tag1'] },
    { say:'Second: a tool and its use. Scissors and cut. Scissors are a tool used to cut.', show:['qa','qb','ar2','tag2'] } ]},
  { t:'Cause and place', items:T2, beats:[
    { say:'Third: cause and effect. Drought and famine. A drought leads to famine.', show:['pa','pb','ar1','tag1'] },
    { say:'Fourth: place. Judge and court. A judge works in a court.', show:['qa','qb','ar2','tag2'] },
    { say:'Place also covers where a creature lives, like bee and hive.', show:['ex'] } ]},
  { t:'Same, opposite, stronger', items:T3, beats:[
    { say:'Synonyms are two words with the same meaning, like brave and bold.', show:[...r1,'t1'] },
    { say:'Antonyms are opposites, like generous and stingy.', show:[...r2,'t2'] },
    { say:'But warm and hot are not synonyms. They show degree: hot is stronger than warm.', show:[...r3,'t3'], hl:['t3'] },
    { say:'Picture a ladder: cold, cool, warm, hot. Each step is stronger than the one before.', show:['l1','l2','l3','l4'], gap:.3 } ]},
  { t:'Type and category', items:T4, beats:[
    { say:'Finally, type and category. Apple and fruit. An apple is a type of fruit.', show:[...t4,'tag'] },
    { say:'Your turn. Which of these pairs shows a difference of degree?', hide:[...t4,'tag'], show:['q'] } ],
    ask:{ opts:['tall : short','branch : tree','drizzle : downpour','needle : sew'], a:2, show:['ans'],
      right:'Well done. A downpour is much heavier rain than a drizzle, so it is a higher degree of the same thing.',
      wrong:'Not this one. Tall and short are opposites, and the other two are part and whole, and a tool. Degree is drizzle and downpour.' } },
  { t:'The types board', items:T5, beats:[
    { say:'Here are the common types, all on one board.', show:TY.map((_,i)=>'k'+i), gap:.15 },
    { say:'When you see a pair, name the type first. Then build the bridge and test the options with it.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'What is the relationship in DROUGHT : FAMINE?', o:['Synonyms','Cause and effect','Part and whole','Degree'], a:1, e:'A drought leads to famine: cause, then effect.'},
    {q:'BEE : HIVE', o:['pen : ink','bird : nest','lion : cub','tree : branch'], a:1, e:'Place: a hive is where a bee lives, and a nest is where a bird lives.'},
    {q:'WARM : HOT', o:['breeze : gale','night : day','mountain : rock','water : river'], a:0, e:'Degree: hot is stronger than warm, and a gale is a much stronger wind than a breeze.'},
  ] });

/* ================= Lesson: tricky analogies ================= */
const K1={}; const k1=pair(K1,'s',95,'rain','flood','n3',{xa:245,xb:395});
Object.assign(K1,{ br:{type:'text',x:320,y:162,s:26,hand:true,text:'Heavy rain causes floods'},
  oA:{type:'box',x:75,y:196,w:220,h:56,c:'surface2',text:'success : effort',s:22}, oB:{type:'box',x:345,y:196,w:220,h:56,c:'surface2',text:'spark : fire',s:22},
  cA:{type:'text',x:185,y:280,s:20,cls:'t-ink2',text:'effect → cause'}, cB:{type:'text',x:455,y:280,s:20,cls:'t-ink2',text:'cause → effect'},
  xA:{type:'cross',x:185,y:318,s:.7}, vB:{type:'check',x:455,y:318,s:.7} });

const K2={}; const k2=pair(K2,'s',92,'water','thirst','n3',{xa:245,xb:395});
Object.assign(K2,{ br:{type:'text',x:320,y:160,s:26,hand:true,text:'Water relieves thirst'},
  oA:{type:'box',x:60,y:190,w:250,h:56,c:'surface2',text:'medicine : illness',s:21}, oB:{type:'box',x:330,y:190,w:250,h:56,c:'surface2',text:'food : hunger',s:21},
  vA:{type:'check',x:185,y:290,s:.7}, vB:{type:'check',x:455,y:290,s:.7}, xA:{type:'cross',x:185,y:290,s:.7} });

const K3={}; const k3=pair(K3,'s',80,'cub','lion','n0',{xa:240,xb:400,h:52});
Object.assign(K3,{ br:{type:'text',x:320,y:134,s:24,hand:true,text:'A cub is a young lion'},
  ans:{type:'note',x:320,y:222,w:380,h:64,c:'n0',text:'A foal is a young horse',size:24,rot:-1.5} });

const K4={ q1:{type:'note',x:120,y:150,w:186,h:96,c:'n0',text:'Same order?',size:21,rot:-2},
  q2:{type:'note',x:320,y:150,w:186,h:96,c:'n1',text:'Sharper bridge?',size:18,rot:1.5},
  q3:{type:'note',x:520,y:150,w:186,h:96,c:'n3',text:'Exact match?',size:21,rot:-1.5},
  foot:{type:'text',x:320,y:290,s:28,hand:true,text:'Three checks before you choose'} };

XP.add({ key:'en-an-tricky', lang:'en', sk:'analogy', ord:30, title:'Tricky analogies', min:'3 min',
  goals:['Spot an option whose order is reversed','Sharpen the bridge when two options fit','Rule out an option that is close but not exact'],
  scenes:[
  { t:'The reversed-order trap', items:K1, beats:[
    { say:'Rain and flood. The bridge: heavy rain causes floods. That is cause, then effect.', show:[...k1,'br'] },
    { say:'Success and effort looks close, but success is the effect and effort is the cause. The order is reversed.', show:['oA','cA','xA'] },
    { say:'Spark and fire puts the cause first and the effect second, exactly like the original.', show:['oB','cB','vB'] } ]},
  { t:'Two options fit?', items:K2, beats:[
    { say:'Sometimes two options pass the same bridge. Water and thirst: water relieves thirst.', show:[...k2,'br'] },
    { say:'Medicine relieves illness, and food relieves hunger. Both fit, so the bridge is too general.', show:['oA','vA','oB','vB'] },
    { say:'Make it sharper: thirst is a natural need that water satisfies.', set:{br:'Thirst is a natural need that water satisfies'}, hl:['br'] },
    { say:'Hunger is a need that food satisfies, but illness is not a need. Cross out medicine and illness.', hide:['vA'], show:['xA'], strike:['oA'] } ]},
  { t:'Close or exact?', items:K3, beats:[
    { say:'The most dangerous option is close, but not exact. Cub and lion: a cub is a young lion.', show:[...k3,'br'] },
    { say:'Which pair matches this bridge exactly?', hl:['br'] } ],
    ask:{ opts:['kitten : tiger','foal : horse','egg : hen','lion : jungle'], a:1, show:['ans'],
      right:'Well done. A foal is a young horse. A kitten is not a young tiger, and an egg is not a young hen.',
      wrong:'Careful. A kitten is related to a tiger but is not its young, and an egg is not a young hen. The exact match is foal and horse.' } },
  { t:'Before you choose', items:K4, beats:[
    { say:'Before you choose, ask three questions. First: is the order the same?', show:['q1'] },
    { say:'Second: does only one option pass? If two pass, sharpen your bridge.', show:['q2'] },
    { say:'Third: is the match exact, not just close? Only then, choose.', show:['q3','foot'] } ]},
  ],
  quiz:[
    {q:'FIRE : SMOKE', o:['smoke : fire','earthquake : destruction','water : river','sun : moon'], a:1, e:'Cause, then effect. "smoke : fire" has the same link but in reverse order.'},
    {q:'JUDGE : COURTROOM', o:['doctor : hospital','student : school','traveler : airport','fish : water'], a:0, e:'All are places, but the exact bridge is "works in": a doctor works in a hospital; a student and a traveler do not work in theirs.'},
    {q:'ROOM : HOUSE', o:['roof : rain','player : stadium','classroom : school','window : light'], a:2, e:'A room is part of a house, and a classroom is part of a school. "player : stadium" is a close place link, not part and whole.'},
  ] });
})();
