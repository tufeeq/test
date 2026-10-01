/* English explainers: comparison */
(function(){ if(!window.XP||!XP.ready) return;
/* keep text readable in dark mode: light fills get note ink, dark fills get stage ink */
const LIGHT=['n0','n1','n2','n3','butter','sky'], DARKF=['surface','surface2','prisoft','pinksoft'];
const ADD=L=>{ L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k]; if((it.type==='box'||it.type==='circle')&&LIGHT.includes(it.c)&&!it.cls) it.cls='t-note'; if(it.type==='note'&&DARKF.includes(it.c)&&!it.cls) it.cls='t-ink'; } }); XP.add(L); };
const E=(x,y,s,text,cls)=>({type:'eq',x,y,s,text,cls});
const CH=['A: First is greater','B: Second is greater','C: They are equal','D: Can’t be determined'];
/* 4-option asks: the engine puts option 0 in the right-hand column, so swap each pair to read A B / C D left to right */
const L4=(opts,a)=>({ opts, a, s:17 });
/* two quantity boxes: first on the left, second on the right */
const QB=(y,a,b,h=56,s=24)=>({
  qa:{type:'box',x:65,y,w:230,h,c:'prisoft',text:a,s},
  qb:{type:'box',x:345,y,w:230,h,c:'surface2',text:b,s},
});

/* ---------- 1. the four choices ---------- */
ADD({ key:'en-cm-choices', lang:'en', sk:'comparison', ord:10, title:'The four comparison choices', min:'3 min',
  goals:['Recognise the comparison format and its fixed choices','Know what each choice means','Know when the answer is “cannot be determined”','Rule out D when there is no unknown'],
  scenes:[
  { t:'The question format',
    items:{
      la:{type:'text',x:177,y:92,s:20,cls:'t-ink2',text:'Quantity 1'},
      lb:{type:'text',x:462,y:92,s:20,cls:'t-ink2',text:'Quantity 2'},
      qa:{type:'box',x:75,y:105,w:205,h:90,c:'prisoft',text:'?',s:44,cls:'t-pri'},
      qb:{type:'box',x:360,y:105,w:205,h:90,c:'surface2',text:'?',s:44,cls:'t-pri'},
      vs:{type:'text',x:320,y:160,s:22,hand:true,text:'versus'},
      c1:{type:'note',x:180,y:245,w:270,h:50,c:'n0',text:'A: First is greater',size:18,rot:-1.5},
      c2:{type:'note',x:460,y:245,w:270,h:50,c:'n1',text:'B: Second is greater',size:18,rot:1.5},
      c3:{type:'note',x:180,y:312,w:270,h:50,c:'n3',text:'C: They are equal',size:18,rot:1},
      c4:{type:'note',x:460,y:312,w:270,h:50,c:'n2',text:'D: Cannot be determined',size:18,rot:-1},
    },
    beats:[
      {say:'A comparison question gives you two quantities. Your job is to decide how they relate.', show:['la','qa','vs','lb','qb'], gap:.3},
      {say:'The four choices are the same in every question, so learn them once and save time.', show:['c1','c2','c3','c4'], gap:.35},
    ]},
  { t:'What each choice means',
    items:(function(){ const o={}, rows=[['A','First is always greater','12  vs  9','n0'],['B','Second is always greater','3 × 4  vs  15','n1'],['C','Always equal','½  vs  0.5','n3'],['D','Not enough information','x  vs  5','n2']];
      rows.forEach((r,i)=>{ const y=100+i*64; o['k'+i]={type:'circle',cx:80,cy:y,r:22,c:r[3],text:r[0],s:22};
        o['m'+i]={type:'text',x:116,y:y+7,s:18,anchor:'start',text:r[1]};
        o['e'+i]={type:'box',x:400,y:y-24,w:190,h:48,c:'surface2',text:r[2],s:21}; }); return o; })(),
    beats:[
      {say:'Choice A: the first quantity is always greater, like twelve versus nine.', show:['k0','m0','e0'], gap:.3},
      {say:'Choice B: the second is always greater, like three times four versus fifteen.', show:['k1','m1','e1'], gap:.3},
      {say:'Choice C: they are always equal, like one half versus zero point five.', show:['k2','m2','e2'], gap:.3},
      {say:'Choice D: it cannot be determined, because no single relationship holds.', show:['k3','m3','e3'], gap:.3},
      {say:'Notice the word always. The relationship must hold in every case, not just one.', hl:['m0','m1','m2']},
    ]},
  { t:'When is it D?',
    items:{
      top:E(320,100,32,'x  vs  5'),
      t1:{type:'box',x:45,y:125,w:265,h:52,c:'n3',text:'x = 8 → first is greater',s:17},
      t2:{type:'box',x:330,y:125,w:265,h:52,c:'n1',text:'x = 2 → second is greater',s:17},
      cn:{type:'note',x:320,y:232,w:340,h:58,c:'n2',text:'The relation changed → D',size:22,rot:-1.5},
      n2:{type:'note',x:320,y:312,w:440,h:50,c:'n0',text:'No unknown? Then it is not D',size:21,rot:1},
    },
    beats:[
      {say:'Pick D when the relationship changes with the unknown. Take x versus five, with no condition.', show:['top']},
      {say:'If x is eight, the first is greater. If x is two, the second is. It changes, so the answer is D.', show:['t1','t2','cn'], gap:.5},
      {say:'But if both quantities are plain numbers with no unknown, the answer can never be D.', show:['n2']},
    ]},
  { t:'Your turn',
    items:Object.assign(QB(72,'25% of 40','40% of 25',56,24),{
      s1:E(320,222,32,'10 = 10','t-pri'),
      tip:{type:'note',x:320,y:290,w:360,h:56,c:'n0',text:'a% of b = b% of a',size:23,rot:-1.5},
    }),
    beats:[
      {say:'Your turn. Quantity one is twenty-five percent of forty. Quantity two is forty percent of twenty-five.', show:['qa','qb'], gap:.4},
      {say:'Which of the four choices is correct?'},
    ],
    ask:{ ...L4(CH,2),
      right:'Well done. Both equal ten, so the answer is C.',
      wrong:'A quarter of forty is ten, and forty percent of twenty-five is also ten. They are equal, so it’s C. D is out, as there is no unknown.',
      show:['s1','tip'] }},
  ],
  quiz:[
    {q:'Quantity 1: 3 × 8 — Quantity 2: 25', o:CH, a:1, e:'3 × 8 = 24, and 24 is less than 25.'},
    {q:'Quantity 1: 0.75 — Quantity 2: ¾', o:CH, a:2, e:'¾ = 0.75, so they are equal.'},
    {q:'x is a real number. Quantity 1: x — Quantity 2: 3', o:CH, a:3, e:'At x = 5 the first is greater; at x = 1 the second is greater.'},
  ]});

/* ---------- 2. testing values ---------- */
ADD({ key:'en-cm-test', lang:'en', sk:'comparison', ord:20, title:'Testing values', min:'4 min',
  goals:['See why one test is not enough','Test zero, negatives, fractions and large numbers','Choose D as soon as the relationship flips','Read the condition and test only inside it'],
  scenes:[
  { t:'One test isn’t enough',
    items:Object.assign(QB(75,'First: x²','Second: x',58,24),{
      t2:E(320,190,24,'x = 2 → 4 is greater than 2'),
      wc:{type:'note',x:320,y:268,w:340,h:58,c:'n1',text:'First always greater?',size:23,rot:-1.5},
    }),
    beats:[
      {say:'When an unknown appears, like x squared versus x, don’t stop at the first number you think of.', show:['qa','qb'], gap:.4},
      {say:'Most people try two: four is greater than two, so the first seems always greater.', show:['t2','wc'], gap:.5},
      {say:'But that’s too quick. Other numbers might surprise you.', strike:['wc']},
    ]},
  { t:'The golden list',
    items:(function(){ const o={}, xs=[125,255,385,515], v=['0','−1','½','100'], k=['zero','negative','fraction','large'], h=['wipes out','flips sign','shrinks','grows fast'], c=['n0','n1','n3','n2'];
      xs.forEach((x,i)=>{ o['n'+i]={type:'note',x,y:140,w:110,h:84,c:c[i],text:v[i],size:36,rot:[-3,2,-2,3][i]}; o['k'+i]={type:'text',x,y:218,s:21,cls:'t-ink2',text:k[i]}; o['h'+i]={type:'text',x,y:266,s:19,hand:true,text:h[i]}; }); return o; })(),
    beats:[
      {say:'Always test zero, a negative, a fraction between zero and one, and a large number.', show:['n0','k0','n1','k1','n2','k2','n3','k3'], gap:.3},
      {say:'Zero wipes out products, negatives flip signs, fractions shrink when squared, and large numbers show which grows faster.', show:['h0','h1','h2','h3'], gap:.4},
    ]},
  { t:'Test with me',
    items:{
      hA:{type:'eq',x:190,y:92,s:24,cls:'t-pri',text:'First: x²'},
      hB:{type:'eq',x:450,y:92,s:24,cls:'t-pri',text:'Second: x'},
      r1:{type:'box',x:70,y:122,w:500,h:52,c:'n3',text:'x = 2:  4 vs 2 → first is greater',s:20},
      r2:{type:'box',x:70,y:190,w:500,h:52,c:'n1',text:'x = ½:  ¼ vs ½ → second is greater',s:20},
      rn:{type:'note',x:320,y:298,w:360,h:58,c:'n2',text:'The relation flipped → D',size:23,rot:-1.5},
    },
    beats:[
      {say:'Back to x squared versus x. At x equals two, it’s four versus two: the first is greater.', show:['hA','hB','r1'], gap:.3},
      {say:'With x equal to one half, it’s one quarter versus one half. Now the second is greater!', show:['r2']},
      {say:'The relationship flipped, so the answer is D right away. No more tests needed.', show:['rn']},
    ]},
  { t:'Read the condition first',
    items:{
      cond:{type:'box',x:180,y:72,w:280,h:52,c:'butter',text:'Condition: x > 1',s:24},
      e1:{type:'note',x:200,y:170,w:80,h:54,c:'surface2',text:'0',size:28,rot:-2},
      e2:{type:'note',x:320,y:170,w:80,h:54,c:'surface2',text:'−1',size:28,rot:2},
      e3:{type:'note',x:440,y:170,w:80,h:54,c:'surface2',text:'½',size:28,rot:-1},
      a1:E(320,245,24,'x = 2:  4 > 2'),
      a2:E(320,285,24,'x = 10:  100 > 10'),
      ans:{type:'text',x:320,y:333,s:24,hand:true,text:'first is always greater → A'},
    },
    beats:[
      {say:'Read the condition first. Here x is greater than one, so zero, negatives and fractions are out.', show:['cond','e1','e2','e3'], strike:['e1','e2','e3'], gap:.3},
      {say:'Try two and ten: the first wins both times, and stays ahead for any x above one. The answer is A.', show:['a1','a2','ans'], gap:.5},
    ]},
  { t:'Your turn',
    items:Object.assign(QB(70,'First: 2x','Second: x',48,23),{
      cond:{type:'text',x:320,y:138,s:18,cls:'t-ink2',text:'No condition on x'},
      w1:E(320,200,22,'x = 1:  2 vs 1 → A'),
      w2:E(320,245,22,'x = −1:  −2 vs −1 → B'),
      w3:{type:'note',x:320,y:305,w:340,h:52,c:'n2',text:'The relation changes → D',size:21,rot:-1.5},
    }),
    beats:[
      {say:'Your turn. Quantity one is two x, and quantity two is x. There is no condition on x.', show:['qa','qb','cond'], gap:.35},
      {say:'Test zero, a negative and a positive, then choose.'},
    ],
    ask:{ ...L4(CH,3),
      right:'Correct. At one, the first is greater. At negative one, the second is greater. It changes, so the answer is D.',
      wrong:'Try negative one: negative two versus negative one, so the second is greater. At one, the first is greater. So it’s D.',
      show:['w1','w2','w3'] }},
  ],
  quiz:[
    {q:'x is negative. Quantity 1: x² — Quantity 2: x', o:CH, a:0, e:'The square of a negative is positive, and a positive is always greater than a negative.'},
    {q:'No condition on x. Quantity 1: x² — Quantity 2: 0', o:CH, a:3, e:'At x = 0 they are equal; at x = 1 the first is greater.'},
    {q:'0 < x < 1. Quantity 1: x³ — Quantity 2: x', o:CH, a:1, e:'A fraction shrinks when raised to a higher power: at x = ½, x³ = ⅛.'},
  ]});

/* ---------- 3. simplify before computing ---------- */
/* one side of a comparison, read left to right: t1  op  t2 */
const SIDE=(pre,x,y,t1,t2,op='+')=>({ [pre+'1']:E(x-62,y,32,t1), [pre+'p']:E(x,y,30,op), [pre+'2']:E(x+52,y,32,t2) });
ADD({ key:'en-cm-simplify', lang:'en', sk:'comparison', ord:30, title:'Simplify before you calculate', min:'3 min',
  goals:['Cross out terms that appear on both sides','Know what you may do to both sides without changing the relationship','Compare by estimating instead of full calculation'],
  scenes:[
  { t:'Cross out what’s shared',
    items:Object.assign({
      la:{type:'text',x:180,y:88,s:20,cls:'t-ink2',text:'Quantity 1'},
      lb:{type:'text',x:460,y:88,s:20,cls:'t-ink2',text:'Quantity 2'},
      ba:{type:'box',x:65,y:100,w:230,h:64,c:'prisoft'},
      bb:{type:'box',x:345,y:100,w:230,h:64,c:'surface2'},
    }, SIDE('a',180,144,'487','39'), SIDE('b',460,144,'487','41'), {
      rem:{type:'text',x:320,y:222,s:24,text:'What’s left: 39 vs 41'},
      v:{type:'note',x:320,y:290,w:320,h:58,c:'n0',text:'Second is greater → B',size:23,rot:-1.5},
    }),
    beats:[
      {say:'In comparison, you don’t need exact answers, just which side is bigger.', show:['la','ba','a1','ap','a2','lb','bb','b1','bp','b2'], gap:.12},
      {say:'Four hundred and eighty-seven appears on both sides, so cross it out.', strike:['a1','b1']},
      {say:'That leaves thirty-nine versus forty-one, so the second is greater.', show:['rem','v'], gap:.5},
    ]},
  { t:'What you may do',
    items:{
      r1:{type:'box',x:110,y:78,w:500,h:56,c:'n3',text:'Add or subtract the same number',s:18},
      k1:{type:'check',x:70,y:106},
      r2:{type:'box',x:110,y:156,w:500,h:56,c:'n3',text:'Multiply/divide by the same positive number',s:18},
      k2:{type:'check',x:70,y:184},
      r3:{type:'box',x:110,y:234,w:500,h:56,c:'n1',text:'Don’t multiply by a negative or an unknown',s:18},
      k3:{type:'cross',x:70,y:262},
    },
    beats:[
      {say:'You may add or subtract the same number on both sides; the relationship stays the same.', show:['r1','k1'], gap:.3},
      {say:'You may also multiply or divide both sides by the same positive number.', show:['r2','k2'], gap:.3},
      {say:'But multiplying by a negative, or by an unknown that might be negative, can flip it.', show:['r3','k3'], gap:.3},
    ]},
  { t:'Unknown on both sides',
    items:Object.assign({
      ba:{type:'box',x:65,y:90,w:230,h:64,c:'prisoft'},
      bb:{type:'box',x:345,y:90,w:230,h:64,c:'surface2'},
    }, SIDE('a',180,134,'x','7'), SIDE('b',460,134,'x','9'), {
      rem:{type:'text',x:320,y:212,s:24,text:'What’s left: 7 vs 9'},
      v:{type:'note',x:320,y:282,w:420,h:58,c:'n0',text:'Second always greater → B, not D',size:21,rot:1.5},
    }),
    beats:[
      {say:'The unknown can appear on both sides, like x plus seven versus x plus nine.', show:['ba','a1','ap','a2','bb','b1','bp','b2'], gap:.12},
      {say:'Subtract x from both sides: seven versus nine. The second is always greater, so it’s B, not D.', strike:['a1','b1'], show:['rem','v'], gap:.5},
    ]},
  { t:'Estimate, don’t calculate',
    items:Object.assign(QB(78,'198 × 5','1000',58,28),{
      s1:{type:'text',x:320,y:190,s:24,text:'198 is less than 200'},
      s2:E(320,238,28,'200 × 5 = 1000'),
      v:{type:'note',x:320,y:302,w:320,h:56,c:'n0',text:'Second is greater → B',size:23,rot:-1.5},
    }),
    beats:[
      {say:'When the arithmetic is heavy, estimate: one hundred and ninety-eight times five versus one thousand.', show:['qa','qb'], gap:.4},
      {say:'One hundred and ninety-eight is less than two hundred, and two hundred times five is one thousand.', show:['s1','s2'], gap:.5},
      {say:'So the first is under one thousand: the second is greater. Note which way you rounded.', show:['v']},
    ]},
  { t:'Your turn',
    items:Object.assign(QB(66,'','',72,34),{
      h1:E(460,93,26,'1'), hl:{type:'line',x1:440,y1:101,x2:480,y2:101,cls:'s-ink'}, h2:E(460,128,26,'2'),
      f1:E(180,93,26,'7'), fl:{type:'line',x1:160,y1:101,x2:200,y2:101,cls:'s-ink'}, f2:E(180,128,26,'15'),
      w1:{type:'text',x:320,y:215,s:26,text:'Half of 15 is 7.5'},
      w2:{type:'text',x:320,y:260,s:26,text:'and 7 is less than 7.5'},
      v:{type:'note',x:320,y:318,w:320,h:52,c:'n0',text:'Second is greater → B',size:22,rot:-1.5},
    }),
    beats:[
      {say:'Your turn. Quantity one is seven fifteenths, and quantity two is one half.', show:['qa','f1','fl','f2','qb','h1','hl','h2'], gap:.15},
      {say:'Compare them without long division. What’s the answer?'},
    ],
    ask:{ ...L4(CH,1),
      right:'Well done. Seven is less than half of fifteen, so the fraction is under one half. It’s B.',
      wrong:'Half of fifteen is seven and a half, but the top is only seven, so the fraction is under one half. The answer is B.',
      show:['w1','w2','v'] }},
  ],
  quiz:[
    {q:'Quantity 1: 365 + 89 — Quantity 2: 365 + 98', o:CH, a:1, e:'Cross out 365 on both sides: 89 is less than 98.'},
    {q:'Quantity 1: 102 × 10 — Quantity 2: 1000', o:CH, a:0, e:'102 is more than 100, and 100 × 10 = 1000, so the first is greater.'},
    {q:'Quantity 1: 4 × 25 × 7 — Quantity 2: 7 × 100', o:CH, a:2, e:'4 × 25 = 100, so both sides are 100 × 7.'},
  ]});
})();
