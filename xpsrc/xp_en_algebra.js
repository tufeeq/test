/* English explainers: algebra */
(function(){ if(!window.XP||!XP.ready) return;
/* keep text readable in dark mode: light fills get note ink, dark fills get stage ink */
const LIGHT=['n0','n1','n2','n3','butter','sky'], DARKF=['surface','surface2','prisoft','pinksoft'];
const ADD=L=>{ L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k]; if((it.type==='box'||it.type==='circle')&&LIGHT.includes(it.c)&&!it.cls) it.cls='t-note'; if(it.type==='note'&&DARKF.includes(it.c)&&!it.cls) it.cls='t-ink'; } }); XP.add(L); };
/* 4-option asks: the engine places option 0 in the right-hand column, so swap each pair to read left to right */
const L4=(opts,a)=>({ opts, a });

/* ---------- 0. the equation is a balance (re-created in the DSL) ---------- */
/* scale: pivot at (320,130), pans hang at x=155 (left) and x=485 (right), pan tops at y=208 */
const SCALE=(on)=>{ const s=on?{show0:true}:{}; return {
  base:{type:'poly',points:'270,334 370,334 338,314 302,314',c:'ink',...s},
  post:{type:'box',x:315,y:130,w:10,h:186,rx:4,c:'ink',stroke:false,...s},
  lsA:{type:'line',x1:155,y1:130,x2:93,y2:208,...s}, lsB:{type:'line',x1:155,y1:130,x2:217,y2:208,...s},
  lpan:{type:'poly',points:'81,208 229,208 207,228 103,228',c:'surface',...s},
  rsA:{type:'line',x1:485,y1:130,x2:423,y2:208,...s}, rsB:{type:'line',x1:485,y1:130,x2:547,y2:208,...s},
  rpan:{type:'poly',points:'411,208 559,208 537,228 433,228',c:'surface',...s},
  beam:{type:'box',x:150,y:124,w:340,h:12,rx:6,c:'ink',stroke:false,...s},
  beamT:{type:'box',x:150,y:124,w:340,h:12,rx:6,c:'ink',stroke:false,rot:10},
  piv:{type:'circle',cx:320,cy:130,r:10,c:'butter',...s},
}; };
const XB=(x,on)=>({type:'box',x,y:169,w:38,h:38,rx:6,c:'pri',text:'x',s:22,cls:'t-inv',...(on?{show0:true}:{})});
const WT=(x,y,on)=>({type:'box',x,y,w:22,h:22,rx:5,c:'butter',...(on?{show0:true}:{})});
const LEFT=['lsA','lsB','lpan'], RIGHT=['rsA','rsB','rpan'];
const mv=(keys,dy)=>Object.fromEntries(keys.map(k=>[k,[0,dy]]));

ADD({ key:'en-balance', lang:'en', sk:'algebra', ord:10, title:'An equation is a balance', min:'4 min',
  goals:['See an equation as a balanced scale','Apply the rule: whatever you do to one side, do to the other','Solve a two-step equation','Check a solution by substituting'],
  scenes:[
  { t:'An equation is a balance',
    items:Object.assign(SCALE(false),{
      xb:XB(98), lw1:WT(142,185), lw2:WT(166,185), lw3:WT(190,185),
      rw1:WT(438,185), rw2:WT(462,185), rw3:WT(486,185), rw4:WT(510,185), rw5:WT(450,161), rw6:WT(474,161), rw7:WT(498,161),
      ll:{type:'text',x:155,y:264,s:20,hand:true,text:'left side'},
      rl:{type:'text',x:485,y:264,s:20,hand:true,text:'right side'},
      eq:{type:'eq',x:320,y:74,s:34,text:'x + 3 = 7'},
    }),
    beats:[
      {say:'An equation is like a balance scale. Both sides always weigh exactly the same.', show:['base','post','beam','piv','lsA','lsB','lpan','rsA','rsB','rpan'], gap:.08},
      {say:'On the left pan sits a mystery box we call x, along with three small weights.', show:['xb','lw1','lw2','lw3','ll'], gap:.2},
      {say:'On the right pan sit seven weights. So x plus three equals seven.', show:['rw1','rw2','rw3','rw4','rw5','rw6','rw7','rl','eq'], gap:.12},
    ]},
  { t:'Same on both sides',
    items:Object.assign(SCALE(true),{
      xb:XB(98,true), lw1:WT(142,185,true), lw2:WT(166,185,true), lw3:WT(190,185,true),
      rw1:WT(438,185,true), rw2:WT(462,185,true), rw3:WT(486,185,true), rw4:WT(510,185,true), rw5:WT(450,161,true), rw6:WT(474,161,true), rw7:WT(498,161,true),
      eq:{type:'eq',x:320,y:74,s:34,text:'x + 3 = 7',show0:true},
      bad:{type:'text',x:155,y:245,s:24,cls:'t-bad',text:'Out of balance!'},
      res:{type:'note',x:320,y:70,w:160,h:56,c:'n0',text:'x = 4',size:32,rot:-3},
      rule:{type:'note',x:135,y:305,w:230,h:56,c:'n2',text:'Same on both sides',size:18,rot:-2},
    }),
    beats:[
      {say:'We want the box on its own, so let’s lift the three weights off the left pan.', hide:['lw1','lw2','lw3','beam'], show:['beamT'], move:Object.assign(mv([...LEFT,'xb'],-29),mv([...RIGHT,'rw1','rw2','rw3','rw4','rw5','rw6','rw7'],29))},
      {say:'The scale tips! We changed only one side, so it’s no longer equal.', show:['bad'], hl:['beamT']},
      {say:'Now lift three weights off the right pan too. The balance comes back, and x equals four.', hide:['rw5','rw6','rw7','beamT','bad','eq'], show:['beam','res','rule'], move:Object.assign(mv([...LEFT,'xb'],29),mv([...RIGHT,'rw1','rw2','rw3','rw4'],-29)), gap:.4},
    ]},
  { t:'Divide both sides',
    items:Object.assign(SCALE(true),{
      xb1:XB(114), xb2:XB(158),
      rw1:WT(426,185), rw2:WT(450,185), rw3:WT(474,185), rw4:WT(498,185), rw5:WT(522,185),
      rw6:WT(426,161), rw7:WT(450,161), rw8:WT(474,161), rw9:WT(498,161), rw10:WT(522,161),
      eq:{type:'eq',x:320,y:74,s:34,text:'2x = 10'},
      d1:{type:'text',x:155,y:266,s:24,hand:true,text:'÷ 2'},
      d2:{type:'text',x:485,y:266,s:24,hand:true,text:'÷ 2'},
      res:{type:'note',x:320,y:70,w:160,h:56,c:'n2',text:'x = 5',size:32,rot:3},
    }),
    beats:[
      {say:'Here, two identical boxes balance ten weights.', show:['eq','xb1','xb2','rw1','rw2','rw3','rw4','rw5','rw6','rw7','rw8','rw9','rw10'], gap:.08},
      {say:'Let’s divide both sides by two.', show:['d1','d2'], gap:.3},
      {say:'One box stays on the left, and half the weights, five, stay on the right. So x equals five.', hide:['xb2','rw6','rw7','rw8','rw9','rw10','eq'], move:{xb1:[22,0]}, show:['res']},
    ]},
  { t:'Your turn: first step',
    items:{
      eq:{type:'eq',x:320,y:84,s:38,text:'3x + 2 = 14'},
      q:{type:'text',x:320,y:114,s:20,cls:'t-ink2',text:'What is the correct first step?'},
      s1:{type:'eq',x:320,y:180,s:34,text:'3x = 12'},
      s2:{type:'note',x:320,y:255,w:160,h:60,c:'n0',text:'x = 4',size:32,rot:-3},
    },
    beats:[
      {say:'Your turn. Here is three x plus two equals fourteen.', show:['eq']},
      {say:'What is the correct first step?', show:['q']},
    ],
    ask:{ opts:['Subtract 2 from both sides','Divide only the left side by 3','Subtract 2 from the left side only'], a:0, column:true, s:20,
      right:'Correct. Subtract two from both sides to get three x equals twelve. Then divide by three: x equals four.',
      wrong:'That changes only one side and breaks the balance. Subtract two from both sides, then divide by three. x equals four.',
      show:['s1','s2'] }},
  { t:'Check by substituting',
    items:{
      a:{type:'eq',x:320,y:110,s:40,text:'3 × 4 + 2'},
      b:{type:'eq',x:320,y:180,s:40,cls:'t-pri',text:'= 14'},
      ck:{type:'check',x:410,y:168,s:1.1},
      tip:{type:'note',x:320,y:275,w:510,h:62,c:'n3',text:'Multiple choice? Try plugging in the options',size:18,rot:-1.5},
    },
    beats:[
      {say:'Always check your answer. Put four back in: three times four plus two.', show:['a']},
      {say:'That makes fourteen. Both sides match, so the solution is right.', show:['b','ck'], gap:.4},
      {say:'On multiple choice, plugging in the options can be even faster than solving.', show:['tip']},
    ]},
  ],
  quiz:[
    {q:'If x − 5 = 9, then x =', o:['4','14','45','−4'], a:1, e:'Add 5 to both sides: x = 9 + 5 = 14.'},
    {q:'If 4x = 28, then x =', o:['24','32','7','112'], a:2, e:'Divide both sides by 4: x = 7.'},
    {q:'If 2x + 6 = 20, then x =', o:['7','13','10','4'], a:0, e:'Subtract 6: 2x = 14, then divide by 2: x = 7.'},
  ]});

/* ---------- 1. variables and expressions ---------- */
ADD({ key:'en-al-vars', lang:'en', sk:'algebra', ord:5, title:'Variables and expressions', min:'3 min',
  goals:['Know what a variable like x means','Combine like terms','Simplify an algebraic expression','Substitute a value for the variable'],
  scenes:[
  { t:'What is a variable?',
    items:{
      bx:{type:'box',x:270,y:90,w:100,h:100,c:'prisoft',text:'x',s:56,cls:'t-pri'},
      lbl:{type:'text',x:320,y:225,s:22,cls:'t-ink2',text:'A closed box holding a number we don’t know yet'},
      n1:{type:'note',x:140,y:110,w:80,h:60,c:'n0',text:'3',size:30,rot:-5},
      n2:{type:'note',x:130,y:190,w:80,h:60,c:'n1',text:'7',size:30,rot:4},
      n3:{type:'note',x:500,y:150,w:80,h:60,c:'n3',text:'10',size:30,rot:-3},
      eq:{type:'eq',x:320,y:262,s:32,text:'3x = 3 × x'},
      m1:{type:'box',x:240,y:290,w:44,h:44,c:'prisoft',text:'x',s:22,cls:'t-pri'},
      m2:{type:'box',x:298,y:290,w:44,h:44,c:'prisoft',text:'x',s:22,cls:'t-pri'},
      m3:{type:'box',x:356,y:290,w:44,h:44,c:'prisoft',text:'x',s:22,cls:'t-pri'},
    },
    beats:[
      {say:'A variable is a letter holding the place of a number we don’t know yet, usually x.', show:['bx','lbl']},
      {say:'Think of it as a closed box. Inside could be three, seven or ten, depending on the problem.', show:['n1','n2','n3'], gap:.3},
      {say:'When we write three x, we mean three times x: three identical boxes.', hide:['n1','n2','n3','lbl'], show:['eq','m1','m2','m3'], gap:.25},
    ]},
  { t:'Like terms',
    items:{
      q:{type:'eq',x:320,y:105,s:40,text:'2x + 3x'},
      a1:{type:'box',x:134,y:140,w:52,h:52,c:'pinksoft',text:'x',s:24},
      a2:{type:'box',x:194,y:140,w:52,h:52,c:'pinksoft',text:'x',s:24},
      pl:{type:'text',x:287,y:178,s:34,text:'+'},
      b1:{type:'box',x:328,y:140,w:52,h:52,c:'sky',text:'x',s:24},
      b2:{type:'box',x:388,y:140,w:52,h:52,c:'sky',text:'x',s:24},
      b3:{type:'box',x:448,y:140,w:52,h:52,c:'sky',text:'x',s:24},
      res:{type:'note',x:320,y:245,w:170,h:62,c:'n0',text:'5x',size:36,rot:-2},
      e2:{type:'eq',x:220,y:335,s:28,text:'2x + 3y'},
      cr:{type:'cross',x:320,y:325,s:.8},
      e2t:{type:'text',x:440,y:335,s:22,hand:true,text:'can’t combine'},
    },
    beats:[
      {say:'Like terms share the same variable, such as two x and three x.', show:['q']},
      {say:'Two boxes and three boxes of the same kind...', show:['a1','a2','pl','b1','b2','b3'], gap:.2},
      {say:'make five boxes. So two x plus three x equals five x. Add the numbers in front and keep the x.', hide:['pl'], move:{a1:[37,0],a2:[37,0],b1:[-37,0],b2:[-37,0],b3:[-37,0]}, show:['res']},
      {say:'But x and y are different, so two x plus three y can’t be combined into one term.', show:['e2','cr','e2t']},
    ]},
  { t:'Simplifying',
    items:{
      ex:{type:'eq',x:320,y:105,s:40,text:'4x + 5 − x + 2'},
      l1:{type:'eq',x:320,y:175,s:30,cls:'t-pri',text:'4x − x = 3x'},
      l2:{type:'eq',x:320,y:225,s:30,cls:'t-ink2',text:'5 + 2 = 7'},
      res:{type:'note',x:320,y:292,w:200,h:62,c:'n3',text:'3x + 7',size:32,rot:2},
    },
    beats:[
      {say:'To simplify, group each kind: x terms together, and plain numbers together.', show:['ex']},
      {say:'Four x minus x is three x. A lone x just means one x.', show:['l1']},
      {say:'Five plus two is seven. So the simplified expression is three x plus seven.', show:['l2','res']},
    ]},
  { t:'Substitution',
    items:{
      g1:{type:'text',x:268,y:82,s:24,cls:'t-ink2',text:'If'},
      g2:{type:'eq',x:340,y:82,s:32,cls:'t-pri',text:'x = 4'},
      q:{type:'eq',x:320,y:126,s:34,text:'3x + 2 = ?'},
      w1:{type:'eq',x:320,y:215,s:36,text:'3 × 4 + 2 = 14'},
      tip:{type:'note',x:320,y:288,w:440,h:56,c:'n1',text:'The number in front multiplies x',size:20,rot:-1.5},
    },
    beats:[
      {say:'Substituting means opening the box and putting the number in place of x.', show:['g1','g2']},
      {say:'Your turn. If x equals four, what is three x plus two?', show:['q']},
    ],
    ask:{ ...L4(['34','14','12','9'],1),
      right:'Well done. Three times four is twelve, plus two makes fourteen.',
      wrong:'Three x means three times x, not a three beside a four. Three times four is twelve, plus two makes fourteen.',
      show:['w1','tip'] }},
  { t:'Simplify, then substitute',
    items:{
      e1:{type:'eq',x:320,y:110,s:38,text:'2x + 3x − 4x'},
      e2:{type:'eq',x:320,y:170,s:38,cls:'t-pri',text:'= x'},
      e3:{type:'box',x:180,y:205,w:280,h:54,c:'butter',text:'x = 10 → answer 10',s:22},
      tip:{type:'note',x:320,y:305,w:420,h:56,c:'n2',text:'Simplify first, then substitute',size:21,rot:-2},
    },
    beats:[
      {say:'On the test, simplify before you substitute. It saves a lot of work.', show:['e1','tip']},
      {say:'Two x plus three x minus four x is just x. So if x is ten, the answer is simply ten.', show:['e2','e3']},
    ]},
  ],
  quiz:[
    {q:'Simplify: 5x + 2 − 2x + 4', o:['3x + 6','7x + 6','3x + 2','9x'], a:0, e:'5x − 2x = 3x, and 2 + 4 = 6.'},
    {q:'If x = 3, what is 4x − 5?', o:['39','7','12','17'], a:1, e:'4 × 3 = 12, then 12 − 5 = 7.'},
    {q:'If x = 2 and y = 5, what is 3x + y?', o:['11','37','10','21'], a:0, e:'3 × 2 + 5 = 6 + 5 = 11.'},
  ]});

/* ---------- 2. exponents and roots ---------- */
ADD({ key:'en-al-exp', lang:'en', sk:'algebra', ord:20, title:'Exponents and roots', min:'4 min',
  goals:['See an exponent as repeated multiplication','Apply the product and power-of-a-power rules','Know that a zero exponent gives one','Find roots of perfect squares'],
  scenes:[
  { t:'Repeated multiplication',
    items:{
      pw:{type:'eq',x:150,y:160,s:76,cls:'t-pri',text:'2⁵'},
      ex:{type:'eq',x:410,y:135,s:32,text:'2 × 2 × 2 × 2 × 2'},
      res:{type:'eq',x:410,y:190,s:36,cls:'t-pri',text:'= 32'},
      nb:{type:'note',x:170,y:268,w:170,h:56,c:'n3',text:'Base: 2',size:22,rot:-2},
      ne:{type:'note',x:420,y:268,w:250,h:56,c:'n1',text:'Exponent: 5 times',size:22,rot:1.5},
    },
    beats:[
      {say:'An exponent means repeated multiplication. Two to the fifth is five twos multiplied together.', show:['pw','ex']},
      {say:'The big number is the base. The small raised exponent says how many times.', show:['nb','ne']},
      {say:'Step by step: two, four, eight, sixteen, thirty-two.', show:['res']},
    ]},
  { t:'Multiplying powers',
    items:{
      q:{type:'eq',x:320,y:100,s:42,text:'2³ × 2⁴'},
      x1:{type:'eq',x:320,y:165,s:28,text:'(2 × 2 × 2) × (2 × 2 × 2 × 2)'},
      r:{type:'eq',x:320,y:225,s:42,cls:'t-pri',text:'= 2⁷'},
      rule:{type:'note',x:320,y:298,w:420,h:58,c:'n0',text:'Same base → add the exponents',size:21,rot:-1.5},
    },
    beats:[
      {say:'What happens when we multiply powers of the same base, like two cubed times two to the fourth?', show:['q']},
      {say:'Unpack them: three twos, then four twos. Seven twos in all.', show:['x1']},
      {say:'So it’s two to the seventh. Same base: add the exponents.', show:['r','rule']},
    ]},
  { t:'Power of a power; zero',
    items:{
      pp:{type:'eq',x:170,y:110,s:40,text:'(3²)³'},
      pp2:{type:'eq',x:170,y:165,s:26,text:'3² × 3² × 3²'},
      pp3:{type:'eq',x:170,y:220,s:40,cls:'t-pri',text:'= 3⁶'},
      r2:{type:'note',x:160,y:292,w:280,h:56,c:'n2',text:'Multiply the exponents',size:19,rot:2},
      dv:{type:'line',x1:320,y1:85,x2:320,y2:325,cls:'s-line'},
      z1:{type:'eq',x:470,y:105,s:28,text:'2³ = 8'},
      z2:{type:'eq',x:470,y:147,s:28,text:'2² = 4'},
      z3:{type:'eq',x:470,y:189,s:28,text:'2¹ = 2'},
      z4:{type:'eq',x:470,y:237,s:38,cls:'t-pri',text:'2⁰ = 1'},
      zh:{type:'text',x:580,y:150,s:20,hand:true,text:'÷ 2'},
      r3:{type:'note',x:470,y:292,w:230,h:56,c:'n3',text:'Exponent 0 → 1',size:22,rot:-2},
    },
    beats:[
      {say:'Next, three squared, all cubed: that’s three squared, three times over.', show:['dv','pp','pp2']},
      {say:'Two plus two plus two is six, giving three to the sixth. So multiply the exponents.', show:['pp3','r2']},
      {say:'For a zero exponent, see the pattern: each step down halves the result.', show:['z1','z2','z3','zh'], gap:.35},
      {say:'Eight, four, two, then one. So two to the zero is one, as is any nonzero number to the zero.', show:['z4','r3']},
    ]},
  { t:'Square roots',
    items:{
      g:{type:'grid',x:90,y:90,rows:5,cols:5,cell:30,gap:3,fill:25,c:'prisoft'},
      gl:{type:'eq',x:172,y:292,s:26,text:'5 × 5 = 25'},
      q1:{type:'text',x:440,y:130,s:22,text:'What times itself gives 25?'},
      sq:{type:'eq',x:440,y:205,s:44,cls:'t-pri',text:'√25 = 5'},
      q2:{type:'eq',x:320,y:118,s:44,text:'√64 = ?'},
      a1:{type:'eq',x:320,y:215,s:40,cls:'t-pri',text:'8 × 8 = 64'},
      tip:{type:'note',x:320,y:290,w:320,h:56,c:'n0',text:'A root is not a half!',size:24,rot:-2},
    },
    beats:[
      {say:'A square root undoes squaring: which number, times itself, gives this one?', show:['q1']},
      {say:'Twenty-five cells make a square five on each side, so the square root of twenty-five is five.', show:['g','gl','sq']},
      {say:'Your turn. What is the square root of sixty-four?', hide:['g','gl','q1','sq'], show:['q2']},
    ],
    ask:{ ...L4(['32','8','16','6'],1),
      right:'Right. Eight times eight is sixty-four.',
      wrong:'Thirty-two is half of sixty-four, not its root. Eight times eight is sixty-four, so the root is eight.',
      show:['a1','tip'] }},
  { t:'Learn the squares',
    items:Object.assign({
      t1:{type:'eq',x:320,y:264,s:32,text:'2³ = 2 × 2 × 2 = 8'},
      t2:{type:'note',x:320,y:320,w:300,h:48,c:'n1',text:'not 2 × 3 = 6',size:22,rot:-1.5},
    }, (function(){ const o={};
      for(let i=1;i<=12;i++){ const r=Math.floor((i-1)/4), k=(i-1)%4; o['s'+i]={type:'box',x:62+k*132,y:72+r*50,w:120,h:40,c:r%2?'surface2':'prisoft',text:i+'² = '+(i*i),s:18,ltr:true}; }
      return o; })()),
    beats:[
      {say:'Learn the squares from one to twelve. They make roots quick on the test.', show:['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12'], gap:.1},
      {say:'And watch the trap: two cubed is eight, not six.', show:['t1','t2']},
    ]},
  ],
  quiz:[
    {q:'3² × 3³ = ?', o:['3⁵','3⁶','9⁵','6⁵'], a:0, e:'Same base, so add the exponents: 2 + 3 = 5.'},
    {q:'(2³)² = ?', o:['2⁵','2⁶','2⁹','4³'], a:1, e:'Power of a power: multiply the exponents, 3 × 2 = 6, which is 64.'},
    {q:'√144 + 7⁰ = ?', o:['12','13','19','8'], a:1, e:'√144 = 12 and 7⁰ = 1, so the sum is 13.'},
  ]});

/* ---------- 3. sequences ---------- */
const row=(pre,xs,y,texts,cs,w=86,h=66,size=28)=>{ const o={}; xs.forEach((x,i)=>{ o[pre+(i+1)]={type:'note',x,y,w,h,c:cs[i]||'n0',text:texts[i],size,rot:[-3,2,-2,3,-1][i%5]}; }); return o; };
const X5=[110,220,330,440,550];
const arr=(pre,y,labels,last)=>{ const o={}; for(let i=0;i<4;i++) o[pre+(i+1)]={type:'arrow',x1:X5[i]+25,y1:y,x2:X5[i+1]-25,y2:y,bend:-30,text:labels,...(i===3&&last?{cls:'s-pink'}:{})}; return o; };
ADD({ key:'en-al-seq', lang:'en', sk:'algebra', ord:30, title:'Sequences and patterns', min:'4 min',
  goals:['Find a sequence’s rule from the step between terms','Tell arithmetic (constant difference) from geometric (constant ratio)','Find the next term and a missing term'],
  scenes:[
  { t:'Arithmetic sequences',
    items:Object.assign(row('t',X5,190,['3','7','11','15','?'],['n3','n3','n3','n3','n1']), arr('a',150,'+4',true), {
      nt:{type:'note',x:320,y:295,w:400,h:56,c:'n0',text:'Same difference → arithmetic',size:21,rot:-1.5},
    }),
    beats:[
      {say:'A sequence is a list of numbers that follows a fixed rule. Each number is called a term.', show:['t1','t2','t3','t4','t5'], gap:.2},
      {say:'Look at the step between terms, not each number alone. From three to seven, we add four.', show:['a1','a2','a3'], gap:.3},
      {say:'A constant difference makes it arithmetic. The next term is fifteen plus four: nineteen.', show:['a4','nt'], set:{t5:'19'}},
    ]},
  { t:'Negative differences',
    items:Object.assign(row('t',X5,190,['20','17','14','11','?'],['n2','n2','n2','n2','n1']), arr('a',150,'−3',true), {
      nt:{type:'note',x:320,y:295,w:380,h:56,c:'n0',text:'Negative, but still fixed',size:22,rot:1.5},
    }),
    beats:[
      {say:'The difference can be negative: twenty, seventeen, fourteen, eleven.', show:['t1','t2','t3','t4','t5'], gap:.2},
      {say:'We subtract three each time, so the next term is eight. The step just has to stay the same.', show:['a1','a2','a3','a4','nt'], gap:.25, set:{t5:'8'}},
    ]},
  { t:'Geometric sequences',
    items:Object.assign(row('g',X5,180,['2','6','18','54','?'],['n0','n0','n0','n0','n1']), arr('m',140,'×3',true), {
      d1:{type:'eq',x:165,y:255,s:22,cls:'t-bad',text:'+4'},
      d2:{type:'eq',x:275,y:255,s:22,cls:'t-bad',text:'+12'},
      d3:{type:'eq',x:385,y:255,s:22,cls:'t-bad',text:'+36'},
      nt:{type:'note',x:320,y:312,w:320,h:52,c:'n2',text:'Same ratio → geometric',size:22,rot:1.5},
    }),
    beats:[
      {say:'Here the differences change: four, twelve, thirty-six.', show:['g1','g2','g3','g4','g5','d1','d2','d3'], gap:.15},
      {say:'But each term is three times the one before. That’s geometric, with a ratio of three.', strike:['d1','d2','d3'], show:['m1','m2','m3','nt'], gap:.3},
      {say:'So the next term is fifty-four times three, one hundred and sixty-two.', show:['m4'], set:{g5:'162'}},
    ]},
  { t:'The missing term',
    items:Object.assign(row('k',[110,215,320,425,530],100,['5','11','?','23','29'],['n3','n3','n1','n3','n3'],80,60,28),{
      p1:{type:'arrow',x1:130,y1:138,x2:195,y2:138,bend:36,cls:'s-pink'},
      p2:{type:'arrow',x1:445,y1:138,x2:510,y2:138,bend:36,cls:'s-pink'},
      p1t:{type:'eq',x:162,y:182,s:22,cls:'t-hand',text:'+6'},
      p2t:{type:'eq',x:478,y:182,s:22,cls:'t-hand',text:'+6'},
      ans:{type:'eq',x:320,y:225,s:36,cls:'t-pri',text:'11 + 6 = 17'},
      chk:{type:'eq',x:320,y:285,s:28,cls:'t-ink2',text:'17 + 6 = 23'},
      ck:{type:'check',x:440,y:276,s:.8},
    }),
    beats:[
      {say:'When a middle term is missing, find the rule from its known neighbours.', show:['k1','k2','k3','k4','k5'], gap:.2},
      {say:'Five to eleven adds six, and twenty-three to twenty-nine adds six too.', show:['p1','p1t','p2','p2t'], gap:.3},
      {say:'Your turn. What is the missing term?', hide:['p1','p1t','p2','p2t']},
    ],
    ask:{ ...L4(['16','17','18','20'],1),
      right:'Well done. Eleven plus six is seventeen, and seventeen plus six is twenty-three.',
      wrong:'The step is six. Eleven plus six is seventeen, and seventeen plus six gives twenty-three.',
      show:['ans','chk','ck'] }},
  { t:'Your test plan',
    items:{
      r1:{type:'box',x:70,y:72,w:500,h:50,c:'n3',text:'Constant differences? → arithmetic',s:20},
      r2:{type:'box',x:70,y:136,w:500,h:50,c:'pinksoft',text:'Constant ratio? → geometric',s:20},
      r3:{type:'box',x:70,y:200,w:500,h:50,c:'prisoft',text:'Neither? → differences of differences',s:20},
      ex:{type:'eq',x:320,y:295,s:28,text:'3, 5, 9, 17, ...'},
      exd:{type:'text',x:320,y:333,s:22,hand:true,text:'steps: 2, 4, 8 (doubling)'},
    },
    beats:[
      {say:'Your plan: find the differences first. If they are constant, it’s arithmetic.', show:['r1']},
      {say:'If not, try dividing. A constant ratio means it’s geometric.', show:['r2']},
      {say:'Otherwise, look at the differences of the differences. In three, five, nine, seventeen, the steps double.', show:['r3','ex','exd']},
    ]},
  ],
  quiz:[
    {q:'What comes next: 4, 9, 14, 19, ...?', o:['23','24','25','29'], a:1, e:'Arithmetic with a difference of 5: 19 + 5 = 24.'},
    {q:'What comes next: 3, 6, 12, 24, ...?', o:['30','36','48','42'], a:2, e:'Geometric with a ratio of 2: 24 × 2 = 48.'},
    {q:'Find the missing term: 81, 27, ?, 3, 1', o:['9','12','18','6'], a:0, e:'Each term is a third of the one before: 27 ÷ 3 = 9.'},
  ]});

/* ---------- 4. word problems ---------- */
const dict=(i,en,m,y)=>({ ['p'+i]:{type:'box',x:60,y,w:290,h:40,c:'surface2',text:en,s:18}, ['r'+i]:{type:'text',x:380,y:y+28,s:24,cls:'t-pri',text:'→'}, ['e'+i]:{type:'eq',x:480,y:y+29,s:26,text:m} });
ADD({ key:'en-al-word', lang:'en', sk:'algebra', ord:40, title:'From word problem to equation', min:'4 min',
  goals:['Translate phrases like “twice a number”, “more than” and “the sum of”','Name the unknown and write the equation','Solve an age or price problem','Go back to what was asked before choosing'],
  scenes:[
  { t:'Translation dictionary',
    items:Object.assign({},
      dict(1,'twice a number','2x',70), dict(2,'half a number','x ÷ 2',118), dict(3,'5 more than a number','x + 5',166),
      dict(4,'5 less than a number','x − 5',214), dict(5,'the sum of two numbers','x + y',262), dict(6,'is / becomes','=',310)),
    beats:[
      {say:'A word problem hides an equation. Call the unknown x; then twice a number is two x.', show:['p1','r1','e1'], gap:.3},
      {say:'Half a number is x divided by two.', show:['p2','r2','e2'], gap:.3},
      {say:'Five more than a number means plus five; five less means minus five.', show:['p3','r3','e3','p4','r4','e4'], gap:.25},
      {say:'The sum of two numbers is x plus y, and is or becomes means equals.', show:['p5','r5','e5','p6','r6','e6'], gap:.25},
    ]},
  { t:'Example: ages',
    items:{
      pr1:{type:'text',x:320,y:90,s:21,text:'Ahmed is twice as old as his brother,'},
      pr1b:{type:'text',x:320,y:120,s:21,text:'and their ages add up to 30.'},
      pr2:{type:'text',x:320,y:150,s:22,cls:'t-pri',text:'How old is the brother?'},
      na:{type:'note',x:190,y:202,w:210,h:56,c:'n3',text:'Brother: x',size:23,rot:-2},
      nb:{type:'note',x:450,y:202,w:210,h:56,c:'n1',text:'Ahmed: 2x',size:23,rot:2},
      eq1:{type:'eq',x:320,y:275,s:32,text:'x + 2x = 3x = 30'},
      eq2:{type:'eq',x:320,y:325,s:32,cls:'t-pri',text:'x = 30 ÷ 3 = 10'},
    },
    beats:[
      {say:'Ahmed is twice as old as his brother, and their ages add up to thirty. How old is the brother?', show:['pr1','pr1b','pr2'], gap:.3},
      {say:'Call the younger one x. The brother is x, and Ahmed is two x.', show:['na','nb'], gap:.4},
      {say:'Together they make thirty: x plus two x is three x, and that equals thirty.', show:['eq1']},
      {say:'Divide by three, and x is ten. The brother is ten, and Ahmed is twenty.', show:['eq2']},
    ]},
  { t:'Go back to the question',
    items:{
      t1:{type:'text',x:320,y:105,s:26,text:'What if it asked for Ahmed’s age?'},
      c10:{type:'note',x:220,y:195,w:120,h:72,c:'n1',text:'10',size:36,rot:-3},
      cr:{type:'cross',x:220,y:282},
      c20:{type:'note',x:420,y:195,w:120,h:72,c:'n3',text:'20',size:36,rot:2},
      ck:{type:'check',x:420,y:282},
    },
    beats:[
      {say:'After solving, reread the question. Does it ask for x, or something else?', show:['t1']},
      {say:'If it asks for Ahmed’s age, the answer is twenty, not ten. Ten often sits among the choices as a trap.', show:['c10','cr','c20','ck'], gap:.35},
    ]},
  { t:'Your turn: prices',
    items:{
      pr1:{type:'text',x:320,y:76,s:20,text:'A pen costs 4 riyals more than a notebook,'},
      pr1b:{type:'text',x:320,y:104,s:20,text:'and together they cost 20 riyals.'},
      pr2:{type:'text',x:320,y:134,s:20,cls:'t-pri',text:'Let the notebook cost x.'},
      w1:{type:'eq',x:320,y:222,s:32,text:'2x + 4 = 20'},
      w2:{type:'box',x:170,y:250,w:300,h:54,c:'butter',text:'Notebook 8, pen 12',s:22},
    },
    beats:[
      {say:'Your turn. A pen costs four riyals more than a notebook, and together they cost twenty riyals.', show:['pr1','pr1b'], gap:.3},
      {say:'If the notebook costs x, which equation is correct?', show:['pr2']},
    ],
    ask:{ ...L4(['x + 4 = 20','x + (x + 4) = 20','4x = 20','x − 4 = 20'],1), s:20,
      right:'Correct. The notebook is x and the pen x plus four, together twenty. So the notebook costs eight and the pen twelve.',
      wrong:'The total includes both prices: x for the notebook plus x plus four for the pen, making twenty. So the notebook is eight, the pen twelve.',
      show:['w1','w2'] }},
  { t:'The four steps',
    items:{
      n1:{type:'note',x:170,y:120,w:285,h:64,c:'n0',text:'1. Name the unknown',size:18,rot:-2},
      n2:{type:'note',x:470,y:120,w:285,h:64,c:'n3',text:'2. Translate the phrases',size:18,rot:2},
      n3:{type:'note',x:170,y:210,w:285,h:64,c:'n2',text:'3. Solve the equation',size:18,rot:1.5},
      n4:{type:'note',x:470,y:210,w:285,h:64,c:'n1',text:'4. Reread the question',size:18,rot:-1.5},
      tip:{type:'text',x:320,y:300,s:24,hand:true,text:'Step four protects you from the trap'},
    },
    beats:[
      {say:'Remember the four steps: name the unknown, translate, solve, then reread the question.', show:['n1','n2','n3','n4','tip'], gap:.5},
    ]},
  ],
  quiz:[
    {q:'When 6 is added to twice a number, the result is 20. What is the number?', o:['7','13','14','8'], a:0, e:'2x + 6 = 20, so 2x = 14 and x = 7.'},
    {q:'Two numbers add up to 30, and one is 6 more than the other. What is the larger number?', o:['12','18','24','15'], a:1, e:'x + (x + 6) = 30, so x = 12 and the larger is 18.'},
    {q:'Khalid is three times as old as his son, and their ages add up to 48. How old is Khalid?', o:['12','36','24','32'], a:1, e:'x + 3x = 48, so x = 12 (the son) and Khalid is 36. Careful: the question asks for Khalid.'},
  ]});
})();
