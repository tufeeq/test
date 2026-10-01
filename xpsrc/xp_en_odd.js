/* English explainers: odd (odd one out) */
(function(){ if(!window.XP||!XP.ready) return;

/* four word notes in a row (LTR: first word on the left) */
const W4=(words,y,cols,size=26)=>{ const xs=[135,265,395,525], o={}; words.forEach((w,i)=>{ o['w'+(i+1)]={type:'note',x:xs[i],y,w:116,h:76,c:cols[i],text:w,size,rot:[-3,2,-2,3][i]}; }); return o; };

XP.add({ key:'en-od-link', lang:'en', sk:'odd', ord:10, title:'Odd one out: find the link', min:'3 min',
  goals:['Recognize the odd-one-out question','Find the link between three words before choosing','Spot the kinds of link: meaning, category, part, degree','Pick the word that breaks the link'],
  scenes:[
  { t:'Three belong, one doesn’t',
    items:{
      frame:{type:'path',d:'M79 128 H451 Q465 128 465 142 V218 Q465 232 451 232 H79 Q65 232 65 218 V142 Q65 128 79 128 Z',cls:'s-pri'},
      q:{type:'text',x:340,y:88,s:22,cls:'t-ink2',text:'Which word does not belong?'},
      ...W4(['hawk','pigeon','eagle','wolf'],180,['n0','n3','n2','n1']),
      lab:{type:'text',x:265,y:280,s:32,hand:true,text:'all birds'},
      x:{type:'cross',x:525,y:272},
    },
    beats:[
      { say:'In an odd-one-out question you get four words. Three share one link, and the fourth does not.', show:['q','w1','w2','w3','w4'], gap:.3 },
      { say:'Don’t hunt for the odd word. Find the link first: hawk, pigeon and eagle are all birds.', show:['frame','lab'] },
      { say:'A wolf is not a bird, so it breaks the link. The wolf is the odd one out.', show:['x'], hl:['w4'] },
    ]},
  { t:'Kinds of link',
    items:(()=>{ const o={}; const rows=[['Meaning','happy · glad · joyful','sad'],['Category','apple · banana · grape','carrot'],['Parts','wheel · brake · engine','sail'],['Degree','drizzle · rain · downpour','thunder']];
      rows.forEach(([tag,ws,odd],i)=>{ const y=100+i*66; o['t'+i]={type:'box',x:30,y:y-22,w:130,h:44,c:'prisoft',text:tag,s:19,cls:'t-pri'}; o['r'+i]={type:'text',x:330,y:y+7,s:20,text:ws}; o['o'+i]={type:'box',x:495,y:y-21,w:115,h:42,c:'pinksoft',text:odd,s:20}; });
      return o; })(),
    beats:[
      { say:'It can be meaning: happy, glad and joyful are synonyms, and sad is their opposite.', show:['t0','r0','o0'] },
      { say:'A category: apple, banana and grape are fruits, but a carrot is a vegetable.', show:['t1','r1','o1'] },
      { say:'Parts of one thing: a wheel, a brake and an engine belong to a car, but a sail belongs to a boat.', show:['t2','r2','o2'] },
      { say:'Or degrees: drizzle, rain, then a downpour. Thunder is not a kind of rain.', show:['t3','r3','o3'] },
    ]},
  { t:'Three steps',
    items:{
      s1:{type:'note',x:135,y:170,w:170,h:72,c:'n0',text:'Read all four',size:18,rot:-2},
      s2:{type:'note',x:320,y:170,w:170,h:72,c:'n3',text:'Name the link',size:18,rot:2},
      s3:{type:'note',x:505,y:170,w:170,h:72,c:'n2',text:'Test the fourth',size:18,rot:-2},
      n1:{type:'text',x:135,y:112,s:24,cls:'t-pri',text:'1'},
      n2:{type:'text',x:320,y:112,s:24,cls:'t-pri',text:'2'},
      n3:{type:'text',x:505,y:112,s:24,cls:'t-pri',text:'3'},
      a1:{type:'arrow',x1:212,y1:216,x2:242,y2:216,bend:22,cls:'s-pink'},
      a2:{type:'arrow',x1:397,y1:216,x2:427,y2:216,bend:22,cls:'s-pink'},
      tip:{type:'text',x:320,y:294,s:30,hand:true,text:'No link? Try meaning, category, parts, degree'},
    },
    beats:[
      { say:'Step one: read all four words before you judge any of them.', show:['n1','s1'] },
      { say:'Step two: name the link between three of them, such as birds or fruits.', show:['a1','n2','s2'] },
      { say:'Step three: test the fourth word against that link. If it breaks it, it is the odd one.', show:['a2','n3','s3'] },
      { say:'No link yet? Try another kind: meaning, category, parts, then degree.', show:['tip'] },
    ]},
  { t:'Your turn',
    items:{
      q:{type:'text',x:320,y:92,s:32,cls:'t-pri',text:'page · cover · index · shelf'},
      sub:{type:'text',x:320,y:130,s:19,cls:'t-ink2',text:'Find the link first, then pick the odd word'},
      ans:{type:'note',x:320,y:220,w:420,h:70,c:'n0',text:'All parts of a book except shelf',size:23,rot:-1},
    },
    beats:[
      { say:'Your turn: page, cover, index, shelf. Find the link, then choose the odd one out.', show:['q','sub'] },
    ],
    ask:{ opts:['page','cover','index','shelf'], a:3,
      right:'Well done. A page, a cover and an index are parts of a book. A shelf holds books, but it is not part of one.',
      wrong:'A page, a cover and an index are all parts of a book. A shelf is not, so it is the odd one out.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'Choose the word that does not belong:', o:['bee','butterfly','sparrow','fly'], a:2, e:'A bee, a butterfly and a fly are insects; a sparrow is a bird.'},
    {q:'Choose the word that does not belong:', o:['brave','cowardly','bold','fearless'], a:1, e:'Brave, bold and fearless are synonyms; cowardly is their opposite.'},
    {q:'Choose the word that does not belong:', o:['trunk','branch','vase','leaf'], a:2, e:'A trunk, a branch and a leaf are parts of a tree; a vase is not.'},
  ]});

XP.add({ key:'en-od-deep', lang:'en', sk:'odd', ord:20, title:'Finer links and the look-alike trap', min:'4 min',
  goals:['Look for a finer link when a broad one fits all four words','Spot links such as tools of one trade and synonyms','Ignore words that only look or sound alike','Check your answer with: all are … except …'],
  scenes:[
  { t:'A finer link',
    items:{
      ...W4(['sickle','plow','scalpel','hoe'],140,['n0','n0','n0','n0']),
      g:{type:'text',x:320,y:250,s:30,hand:true,text:'All tools? Too broad'},
      t1:{type:'box',x:85,y:205,w:100,h:40,c:'prisoft',text:'farmer',s:19,cls:'t-pri'},
      t2:{type:'box',x:215,y:205,w:100,h:40,c:'prisoft',text:'farmer',s:19,cls:'t-pri'},
      t3:{type:'box',x:345,y:205,w:100,h:40,c:'pinksoft',text:'surgeon',s:19},
      t4:{type:'box',x:475,y:205,w:100,h:40,c:'prisoft',text:'farmer',s:19,cls:'t-pri'},
      rule:{type:'text',x:320,y:300,s:23,cls:'t-pri',text:'The finer link: tools of one trade'},
    },
    beats:[
      { say:'Sickle, plow, scalpel, hoe. At first glance they are all tools.', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'That link is too broad: it fits all four, so it can’t separate them. We need a finer one.', show:['g'] },
      { say:'A sickle, a plow and a hoe are a farmer’s tools; a scalpel is a surgeon’s. So the scalpel is odd.', hide:['g'], show:['t1','t2','t4','t3','rule'], gap:.3, hl:['w3'] },
    ]},
  { t:'Different words, same thing',
    items:{
      ...W4(['sofa','chair','couch','settee'],140,['n3','n1','n3','n3']),
      x:{type:'cross',x:265,y:222},
      xl:{type:'text',x:250,y:278,s:28,hand:true,text:'another seat'},
      nt:{type:'note',x:490,y:262,w:210,h:62,c:'n0',text:'Names for a sofa',size:20,rot:-2},
    },
    beats:[
      { say:'Sofa, chair, couch, settee. You can sit on all four, so where is the link?', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'Look at meaning: couch and settee are other names for a sofa. Those three are synonyms.', show:['nt'], hl:['w1','w3','w4'] },
      { say:'A chair is a different seat, not another name for a sofa. So the chair is the odd one out.', show:['x','xl'] },
    ]},
  { t:'The look-alike trap',
    items:{
      ...W4(['bay','sea','ocean','tea'],140,['n3','n3','n3','n1']),
      trap:{type:'text',x:320,y:238,s:30,hand:true,text:'bay · sea · tea: three short words'},
      m1:{type:'box',x:85,y:205,w:100,h:40,c:'n3',text:'water',s:19,cls:'t-note'},
      m2:{type:'box',x:215,y:205,w:100,h:40,c:'n3',text:'water',s:19,cls:'t-note'},
      m3:{type:'box',x:345,y:205,w:100,h:40,c:'n3',text:'water',s:19,cls:'t-note'},
      x:{type:'cross',x:525,y:225},
      rule:{type:'text',x:320,y:300,s:23,cls:'t-pri',text:'Meaning is the link, not spelling'},
    },
    beats:[
      { say:'Bay, sea, ocean, tea. Bay, sea and tea are short words, and sea and tea rhyme.', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'So some pick ocean because it looks different. That is a trap: looking alike is not a link.', show:['trap'], strike:['trap'] },
      { say:'The real link is meaning: a bay, a sea and an ocean are bodies of water. The odd one is tea.', hide:['trap'], show:['m1','m2','m3','x','rule'], gap:.3 },
    ]},
  { t:'Check with a sentence',
    items:{
      fr:{type:'note',x:360,y:78,w:260,h:50,c:'n2',text:'All are … except …',size:21,rot:-1},
      ex:{type:'box',x:80,y:190,w:480,h:56,c:'surface2',text:'All are bodies of water except tea',s:21},
      ok:{type:'text',x:320,y:298,s:30,hand:true,text:'A true sentence = a sure answer'},
      q:{type:'text',x:320,y:140,s:25,cls:'t-pri',text:'purple · maroon · simple · orange'},
      ans:{type:'note',x:320,y:222,w:400,h:66,c:'n3',text:'All are colors except simple',size:22,rot:-1},
    },
    beats:[
      { say:'Before you lock in an answer, check it with a sentence: all are something, except one.', show:['fr'] },
      { say:'For example: all are bodies of water except tea. If the sentence is true, your answer is right.', show:['ex','ok'] },
      { say:'Try it: purple, maroon, simple, orange. Which is the odd one? Use your check sentence.', hide:['ex','ok'], show:['q'] },
    ],
    ask:{ opts:['purple','maroon','simple','orange'], a:2,
      right:'Well done. All are colors except simple, and the look-alike ending did not fool you.',
      wrong:'Simple looks like purple, but looks are not a link. All are colors except simple.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'Choose the word that does not belong:', o:['scissors','comb','hairdryer','oar'], a:3, e:'Scissors, a comb and a hairdryer are a hairdresser’s tools; an oar is used for rowing.'},
    {q:'Choose the word that does not belong:', o:['doctor','physician','nurse','medic'], a:2, e:'Doctor, physician and medic name the same job; a nurse is a different job.'},
    {q:'Choose the word that does not belong:', o:['star','sun','moon','spoon'], a:3, e:'A star, the sun and the moon are in the sky. Moon and spoon rhyme, but rhyming is not a link.'},
  ]});
})();
