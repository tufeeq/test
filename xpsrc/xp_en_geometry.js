/* English explainers: geometry */
(function(){ if(!window.XP||!XP.ready) return;
/* ---- small geometry helpers (angles in visual degrees, counter-clockwise, 0 = pointing right) ---- */
const R1=v=>Math.round(v*10)/10;
const P=(c,r,a)=>[R1(c[0]+r*Math.cos(a*Math.PI/180)),R1(c[1]-r*Math.sin(a*Math.PI/180))];
const arcD=(c,r,a0,a1)=>{ const p=P(c,r,a0), q=P(c,r,a1); return `M${p[0]} ${p[1]} A${r} ${r} 0 ${a1-a0>180?1:0} 0 ${q[0]} ${q[1]}`; };
const ang=(c,r,a0,a1,cls='s-pri')=>({type:'path',d:arcD(c,r,a0,a1),cls});
const lab=(c,r,a,text,cls='t-ink',s=20)=>{ const p=P(c,r,a); return {type:'eq',x:p[0],y:R1(p[1]+s*0.36),s,text,cls}; };
const seg=(p,q,cls='s-ink')=>({type:'line',x1:p[0],y1:p[1],x2:q[0],y2:q[1],cls});
const pts=a=>a.map(p=>p.join(',')).join(' ');
const rmark=(c,a0,k=14)=>{ const u=P(c,k,a0), w=P(c,k,a0+90), m=[R1(u[0]+w[0]-c[0]),R1(u[1]+w[1]-c[1])]; return {type:'path',d:`M${u[0]} ${u[1]} L${m[0]} ${m[1]} L${w[0]} ${w[1]}`,cls:'s-ink'}; };
const tick=(p,q)=>{ const mx=(p[0]+q[0])/2, my=(p[1]+q[1])/2, L=Math.hypot(q[0]-p[0],q[1]-p[1]), nx=-(q[1]-p[1])/L*9, ny=(q[0]-p[0])/L*9;
  return {type:'path',d:`M${R1(mx-nx)} ${R1(my-ny)} L${R1(mx+nx)} ${R1(my+ny)}`,cls:'s-pri'}; };
/* apex of a triangle on base b-c with base angles ab (at b) and ac (at c) */
const apex=(b,c,ab,ac)=>{ const w=c[0]-b[0], tb=Math.tan(ab*Math.PI/180), tc=Math.tan(ac*Math.PI/180), x=w*tc/(tb+tc); return [R1(b[0]+x),R1(b[1]-x*tb)]; };
const circD=(c,r)=>`M${c[0]+r} ${c[1]} A${r} ${r} 0 1 0 ${c[0]-r} ${c[1]} A${r} ${r} 0 1 0 ${c[0]+r} ${c[1]}`;

/* =================== 1. Angles =================== */
{
const O=[220,230], O2=[220,210];
const X=[220,205];
const T1=[250,130], T2=[R1(250-100/Math.tan(Math.PI/3)),230];
const Q1=[340,100], Q2=[R1(340-65/Math.tan(Math.PI/3)),165];
XP.add({ key:'en-ge-angles', lang:'en', sk:'geometry', ord:10, title:'Angles and parallel lines', min:'3 min',
  goals:['Know that a straight angle is 180° and a full turn is 360°','Use the fact that vertical angles are equal','Spot corresponding and alternate angles on parallel lines','Find a missing angle in a GAT-style figure'],
  scenes:[
  { t:'A line and a full turn', items:{
      ln:seg([70,230],[370,230]), o:{type:'dot',x:O[0],y:O[1],r:5,c:'ink'},
      a180:ang(O,45,0,180,'s-pri'), l180:lab(O,72,90,'180°','t-pri',22),
      ray:seg(O,P(O,150,50)),
      a50:ang(O,40,0,50,'s-pink'), l50:lab(O,68,22,'?','t-hand',24),
      a130:ang(O,30,50,180,'s-ok'), l130:lab(O,58,118,'130°','t-ok'),
      eq1:{type:'eq',x:220,y:292,s:26,text:'180 − 130 = 50',cls:'t-ink'},
      n1:{type:'note',x:505,y:135,h:62,c:'n0',w:230,text:'Straight = 180°',size:22,rot:-3},
      r1:seg(O2,P(O2,115,90)), r2:seg(O2,P(O2,115,200)), r3:seg(O2,P(O2,115,320)), o2:{type:'dot',x:O2[0],y:O2[1],r:5,c:'ink'},
      b1:ang(O2,30,90,200,'s-pink'), b2:ang(O2,30,200,320,'s-ok'), b3:ang(O2,30,320,450,'s-pri'),
      k1:lab(O2,60,145,'110°','t-ink'), k2:lab(O2,60,260,'120°','t-ink'), k3:lab(O2,62,25,'130°','t-ink'),
      n2:{type:'note',x:505,y:255,w:236,h:62,c:'n3',text:'Full turn = 360°',size:22,rot:2} },
    beats:[
      { say:'A straight angle is half a turn: one hundred and eighty degrees.', show:['ln','o','a180','l180','n1'] },
      { say:'A ray splits it into two angles that always total one hundred and eighty.', hide:['a180','l180'], show:['ray','a130','l130','a50','l50'] },
      { say:'If one is one hundred and thirty, the other is one hundred and eighty minus that, which is fifty.', set:{l50:'50°'}, show:['eq1'] },
      { say:'A full turn is three hundred and sixty degrees, so angles around a point add up to that.', hide:['ln','o','ray','a50','l50','a130','l130','eq1'], show:['r1','r2','r3','o2','b1','k1','b2','k2','b3','k3','n2'], gap:.12 },
    ]},
  { t:'Vertical angles', items:{
      m1:seg(P(X,150,30),P(X,150,210)), m2:seg(P(X,150,150),P(X,150,330)),
      aR:ang(X,36,-30,30,'s-pink'), aL:ang(X,36,150,210,'s-pink'), aT:ang(X,28,30,150,'s-ok'), aB:ang(X,28,210,330,'s-ok'),
      lR:lab(X,66,0,'60°','t-ink'), lL:lab(X,66,180,'60°','t-ink'), lT:lab(X,52,90,'120°','t-ink'), lB:lab(X,52,270,'120°','t-ink'),
      n1:{type:'note',x:505,y:140,w:240,h:62,c:'n1',text:'Vertical: equal',size:22,rot:-2},
      n2:{type:'note',x:505,y:255,w:240,h:62,c:'n0',text:'Neighbors: 180°',size:22,rot:2} },
    beats:[
      { say:'Two crossing lines make four angles.', show:['m1','m2'] },
      { say:'Vertical angles face each other and are equal. If this one is sixty, its opposite is sixty too.', show:['aR','lR','aL','lL','n1'] },
      { say:'Neighbors on a line add up to one hundred and eighty, so the other two are each one hundred and twenty.', show:['aT','lT','aB','lB','n2'] },
    ]},
  { t:'Parallel lines and a transversal', items:{
      p1:seg([50,T1[1]],[370,T1[1]]), p2:seg([50,T2[1]],[370,T2[1]]), tr:seg(P(T1,55,60),P(T2,55,240)),
      F:{type:'path',d:`M${P(T1,55,60).join(' ')} L${T2.join(' ')} L${T2[0]+90} ${T2[1]} M${T1.join(' ')} L${T1[0]+90} ${T1[1]}`,cls:'s-pri'},
      Z:{type:'path',d:`M${T1[0]-90} ${T1[1]} L${T1.join(' ')} L${T2.join(' ')} L${T2[0]+90} ${T2[1]}`,cls:'s-pri'},
      c1:ang(T1,26,0,60,'s-pink'), lc1:lab(T1,50,30,'60°','t-ink'),
      c2:ang(T2,26,0,60,'s-pink'), lc2:lab(T2,50,30,'60°','t-ink'),
      al:ang(T1,26,180,240,'s-ok'), lal:lab(T1,50,210,'60°','t-ink'),
      n1:{type:'note',x:505,y:140,w:250,h:60,c:'n1',text:'Corresponding: equal',size:18,rot:-2},
      n2:{type:'note',x:505,y:235,w:250,h:60,c:'n3',text:'Alternate: equal',size:19,rot:2},
      warn:{type:'text',x:225,y:318,s:22,text:'Only if the lines are parallel!',hand:true} },
    beats:[
      { say:'Parallel lines never meet. A transversal cuts across both.', show:['p1','p2','tr'] },
      { say:'Corresponding angles sit in the same spot at each crossing, and they are equal.', show:['F','c1','lc1','c2','lc2','n1'] },
      { say:'Alternate interior angles lie between the lines, on opposite sides of the transversal. Also equal.', hide:['F','c1','lc1'], show:['Z','al','lal','n2'], hl:['c2'] },
      { say:'Careful: these rules only work when the lines are parallel.', show:['warn'] },
    ]},
  { t:'Your turn: find x', items:{
      p1:seg([150,Q1[1]],[520,Q1[1]]), p2:seg([150,Q2[1]],[520,Q2[1]]), tr:seg(P(Q1,32,60),P(Q2,32,240)),
      a60:ang(Q1,22,0,60,'s-pink'), l60:lab(Q1,52,18,'60°','t-ink'),
      as:ang(Q2,22,240,360,'s-ok'), ls:lab(Q2,40,300,'x','t-ok',22),
      c2:ang(Q2,22,0,60,'s-pink'), lc2:lab(Q2,52,18,'60°','t-hand',22),
      eq:{type:'eq',x:320,y:290,s:30,text:'180 − 60 = 120°',cls:'t-pri'} },
    beats:[
      { say:'Two parallel lines, cut by a transversal. The top angle is sixty degrees.', show:['p1','p2','tr','a60','l60'] },
      { say:'What is angle x at the bottom crossing?', show:['as','ls'] },
    ],
    ask:{ opts:['60°','120°','30°','240°'], a:1, y:246,
      right:'Correct. The corresponding angle below is sixty, and it shares a line with x, so x is one hundred and twenty.',
      wrong:'It is one hundred and twenty. The angle matching sixty sits next to x on a line, so x is one hundred and eighty minus sixty.',
      show:['c2','lc2','eq'] } },
  ],
  quiz:[
    {q:'Two adjacent angles lie on a straight line. One is 110°. What is the other?', o:['70°','110°','80°','250°'], a:0, e:'They add up to 180°, so 180 − 110 = 70°.'},
    {q:'Two lines intersect, and one of the angles is 45°. What is the angle vertically opposite it?', o:['135°','45°','90°','315°'], a:1, e:'Vertical angles are equal. 135° is the neighboring angle.'},
    {q:'Three angles around a point are 120°, 150° and x. What is x?', o:['60°','100°','90°','210°'], a:2, e:'Angles around a point add up to 360°, so x = 360 − 270 = 90°.'},
  ] });
}

/* =================== 2. Triangles =================== */
{
const B=[60,275], C=[330,275], A=apex(B,C,60,50);
const I1=[80,280], I2=[250,280], IA=apex(I1,I2,65,65);
const E1=[360,280], E2=[560,280], EA=apex(E1,E2,60,60);
const S1=[268,200], S2=[372,200], SA=apex(S1,S2,70,70);
const letters=[[A[0],A[1]-12,'A',22],[B[0]-12,B[1]+24,'B',22],[C[0]+12,C[1]+24,'C',22]];
XP.add({ key:'en-ge-triangles', lang:'en', sk:'geometry', ord:20, title:'Triangles and their angles', min:'3 min',
  goals:['See why the angles of a triangle add up to 180°','Find an exterior angle from the two far interior angles','Use the properties of isosceles and equilateral triangles'],
  scenes:[
  { t:'The angle sum', items:{
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft',labels:letters},
      aB:ang(B,34,0,60,'s-pink'), lB:lab(B,60,28,'60°'),
      aC:ang(C,34,130,180,'s-ok'), lC:lab(C,60,156,'50°'),
      aA:ang(A,30,240,310,'s-pri'), lA:lab(A,58,275,'70°'),
      par:seg([A[0]-110,A[1]],[A[0]+110,A[1]]),
      cL:ang(A,30,180,240,'s-pink'), lcL:lab(A,54,208,'60°'),
      cR:ang(A,30,310,360,'s-ok'), lcR:lab(A,54,332,'50°'),
      n1:{type:'note',x:510,y:135,w:200,h:62,c:'n0',text:'Sum = 180°',size:24,rot:-3},
      bx:{type:'box',x:384,y:215,w:246,h:56,c:'surface',text:'60 + 70 + 50 = 180',s:20,ltr:true} },
    beats:[
      { say:'This is triangle A B C. It has three angles.', show:['tri'] },
      { say:'Angle B is sixty, angle C is fifty, and angle A is seventy.', show:['aB','lB','aC','lC','aA','lA'], gap:.3 },
      { say:'Draw a line through A parallel to the base. The new angles match the base angles, because they are alternate.', show:['par','cL','lcL','cR','lcR'] },
      { say:'The three angles at A form a straight line, so any triangle’s angles add up to one hundred and eighty degrees.', show:['n1','bx'], hl:['aA'] },
    ]},
  { t:'The exterior angle', items:{
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft',labels:letters},
      aB:ang(B,34,0,60,'s-pink'), lB:lab(B,60,28,'60°'),
      aA:ang(A,30,240,310,'s-pri'), lA:lab(A,58,275,'70°'),
      ext:seg(C,[420,C[1]]),
      aX:ang(C,26,0,130,'s-pink'), lX:lab(C,52,62,'?','t-hand',24),
      aC:ang(C,40,130,180,'s-ok'), lC:lab(C,64,156,'50°','t-ok'),
      bx:{type:'box',x:415,y:100,w:195,h:56,c:'surface',text:'60 + 70 = 130',s:22,ltr:true},
      n1:{type:'note',x:510,y:205,w:236,h:66,c:'n1',text:'Exterior = A + B',size:22,rot:2} },
    beats:[
      { say:'In the same triangle, angle B is sixty and angle A is seventy.', show:['tri','aB','lB','aA','lA'] },
      { say:'Extend the base past C to make an exterior angle. How big is it?', show:['ext','aX','lX'] },
      { say:'It equals the two far interior angles added: sixty plus seventy equals one hundred and thirty.', set:{lX:'130°'}, show:['bx','n1'] },
      { say:'Check: with its neighbor, fifty, it makes one hundred and eighty.', show:['aC','lC'] },
    ]},
  { t:'Isosceles and equilateral', items:{
      iso:{type:'poly',points:pts([IA,I1,I2]),c:'pinksoft'}, t1:tick(I1,IA), t2:tick(I2,IA),
      i1:ang(I1,28,0,65,'s-pink'), li1:lab(I1,52,30,'65°'), i2:ang(I2,28,115,180,'s-pink'), li2:lab(I2,52,150,'65°'),
      i3:ang(IA,26,245,295,'s-pri'), li3:lab(IA,50,270,'50°','t-pri'),
      cap1:{type:'text',x:165,y:322,s:20,text:'Isosceles',cls:'t-ink2'},
      equ:{type:'poly',points:pts([EA,E1,E2]),c:'oksoft'}, u1:tick(E1,EA), u2:tick(E2,EA), u3:tick(E1,E2),
      e1:lab(E1,42,30,'60°'), e2:lab(E2,42,150,'60°'), e3:lab(EA,44,270,'60°'),
      cap2:{type:'text',x:460,y:322,s:20,text:'Equilateral',cls:'t-ink2'} },
    beats:[
      { say:'An isosceles triangle has two equal sides, marked with ticks.', show:['iso','t1','t2','cap1'] },
      { say:'Its base angles are equal too. If one is sixty-five, so is the other.', show:['i1','li1','i2','li2'] },
      { say:'The third angle is one hundred and eighty minus one hundred and thirty, which is fifty.', show:['i3','li3'] },
      { say:'An equilateral triangle has three equal sides, and every angle is sixty degrees.', show:['equ','u1','u2','u3','e1','e2','e3','cap2'], gap:.2 },
    ]},
  { t:'Your turn: the base angle', items:{
      tri:{type:'poly',points:pts([SA,S1,S2]),c:'pinksoft'}, t1:tick(S1,SA), t2:tick(S2,SA),
      aA:ang(SA,24,250,290,'s-pri'), lA:lab(SA,52,270,'40°','t-pri',18),
      b1:ang(S1,22,0,70,'s-pink'), lb:lab(S1,42,35,'x','t-hand',24), b2:ang(S2,22,110,180,'s-pink'),
      cap:{type:'text',x:500,y:136,s:24,text:'Isosceles',hand:true},
      eq:{type:'eq',x:320,y:290,s:30,text:'(180 − 40) ÷ 2 = 70°',cls:'t-pri'} },
    beats:[
      { say:'An isosceles triangle has a top angle of forty degrees.', show:['tri','t1','t2','aA','lA','cap'] },
      { say:'What is each base angle, x?', show:['b1','b2','lb'] },
    ],
    ask:{ opts:['40°','70°','140°','50°'], a:1, y:246,
      right:'Well done. That leaves one hundred and forty, shared by two equal angles, so each is seventy.',
      wrong:'It is seventy. One hundred and eighty minus forty is one hundred and forty, split equally between the two base angles.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'Two angles of a triangle are 45° and 75°. What is the third angle?', o:['60°','50°','70°','120°'], a:0, e:'180 − (45 + 75) = 60°.'},
    {q:'An exterior angle of a triangle is 110°. One of the two far interior angles is 40°. What is the other?', o:['30°','70°','150°','50°'], a:1, e:'The exterior angle equals the two far angles added, so 110 − 40 = 70°.'},
    {q:'An equilateral triangle. First quantity: one of its angles. Second quantity: 60°', o:['A: The first is greater','B: The second is greater','C: The two are equal','D: Cannot be determined'], a:2, e:'Each angle of an equilateral triangle is 180 ÷ 3 = 60°.'},
  ] });
}

/* =================== 3. Perimeter and area =================== */
{
const rect=[[90,100],[330,100],[330,260],[90,260]];
const L=[[300,70],[400,70],[400,190],[240,190],[240,130],[300,130]];
XP.add({ key:'en-ge-area', lang:'en', sk:'geometry', ord:30, title:'Perimeter and area', min:'4 min',
  goals:['Tell perimeter and area apart','Find the area of a rectangle and a square','Find a triangle’s area as half the base times the height','Split a composite shape into simple shapes'],
  scenes:[
  { t:'Perimeter: the fence', items:{
      r:{type:'poly',points:pts(rect),c:'prisoft'},
      lt:{type:'text',x:210,y:88,s:22,text:'6 cm'}, lb:{type:'text',x:210,y:290,s:22,text:'6 cm'},
      ll:{type:'text',x:58,y:188,s:22,text:'4 cm'}, lr:{type:'text',x:362,y:188,s:22,text:'4 cm'},
      trace:{type:'path',d:'M90 100 H330 V260 H90 Z',cls:'s-pink'},
      eq1:{type:'eq',x:495,y:150,s:24,text:'6 + 4 + 6 + 4 = 20',cls:'t-ink'},
      n1:{type:'note',x:505,y:250,w:264,h:66,c:'n0',text:'2 × (length + width)',size:20,rot:-2} },
    beats:[
      { say:'Perimeter is the distance around a shape, like walking once along its fence.', show:['r','lt','lr','lb','ll'], gap:.25 },
      { say:'Add all four sides: six plus four plus six plus four equals twenty centimeters.', show:['trace','eq1'] },
      { say:'In short: two times the length plus the width.', show:['n1'] },
    ]},
  { t:'Area: count the squares', items:{
      g:{type:'grid',x:90,y:100,rows:4,cols:6,cell:38,gap:2,fill:24,c:'n2'},
      lt:{type:'text',x:209,y:88,s:22,text:'6 cm'}, ll:{type:'text',x:58,y:188,s:22,text:'4 cm'},
      eq1:{type:'eq',x:505,y:150,s:26,text:'6 × 4 = 24 cm²',cls:'t-pri'},
      sq:{type:'grid',x:460,y:225,rows:5,cols:5,cell:16,gap:2,fill:25,c:'n1'},
      eq2:{type:'eq',x:505,y:345,s:22,text:'5 × 5 = 25',cls:'t-ink'},
      n1:{type:'text',x:505,y:212,s:22,text:'Square',cls:'t-ink2'} },
    beats:[
      { say:'Area is the number of small squares that cover a shape.', show:['g'] },
      { say:'Four rows of six squares: six times four is twenty-four square centimeters.', show:['lt','ll','eq1'] },
      { say:'A square’s area is its side times itself. Side five gives area twenty-five.', show:['sq','n1','eq2'] },
    ]},
  { t:'Area of a triangle', items:{
      box:{type:'path',d:'M70 110 H286 V254 H70 Z',cls:'s-ink'},
      oL:{type:'poly',points:'70,110 170,110 70,254',c:'surface2'}, oR:{type:'poly',points:'170,110 286,110 286,254',c:'surface2'},
      tri:{type:'poly',points:'70,254 286,254 170,110',c:'pinksoft'},
      h:seg([170,110],[170,254],'s-pri'), rm:{type:'path',d:'M170 242 H182 V254',cls:'s-ink'},
      lbase:{type:'text',x:178,y:284,s:22,text:'base 6'},
      hb:seg([300,110],[300,254],'s-pri'), lh:{type:'text',x:366,y:190,s:22,text:'height 4',cls:'t-pri'},
      eq1:{type:'eq',x:515,y:150,s:26,text:'½ × 6 × 4 = 12',cls:'t-pri'},
      n1:{type:'note',x:510,y:255,w:236,h:66,c:'n0',text:'½ × base × height',size:20,rot:-2} },
    beats:[
      { say:'Draw the triangle inside a rectangle with the same base and height.', show:['box','tri','lbase'] },
      { say:'The height splits the rectangle in two, and the triangle fills exactly half of each part.', show:['h','rm','oL','oR'] },
      { say:'So the triangle is half the rectangle: one half times six times four equals twelve.', show:['hb','lh','eq1'] },
      { say:'Remember: half the base times the height. The height meets the base at a right angle; it is not the slanted side.', show:['n1'], hl:['h'] },
    ]},
  { t:'Your turn: a composite shape', items:{
      sh:{type:'poly',points:pts(L),c:'prisoft'},
      l5:lab([350,55],0,0,'5'), l6:lab([416,130],0,0,'6'), l8:lab([320,208],0,0,'8'), l3:lab([226,160],0,0,'3'),
      l3a:lab([270,120],0,0,'3','t-ink2',18), l3b:lab([288,100],0,0,'3','t-ink2',18),
      cut:seg([300,130],[400,130],'s-pink'),
      iA:lab([320,160],0,0,'24','t-pri',22), iB:lab([350,100],0,0,'15','t-pri',22),
      eq:{type:'eq',x:320,y:290,s:30,text:'24 + 15 = 39',cls:'t-pri'} },
    beats:[
      { say:'This composite shape has no single formula.', show:['sh','l5','l6','l8','l3','l3a','l3b'], gap:.15 },
      { say:'Cut it into two rectangles and add their areas. What is the total area?', show:['cut'] },
    ],
    ask:{ opts:['48','39','28','45'], a:1, y:248,
      right:'Correct. The bottom rectangle is eight times three, twenty-four. The top is five times three, fifteen. Total, thirty-nine.',
      wrong:'It is thirty-nine: twenty-four for the bottom rectangle and fifteen for the top. Careful, twenty-eight is the perimeter, not the area.',
      show:['iA','iB','eq'] } },
  ],
  quiz:[
    {q:'A rectangle is 9 cm long and 4 cm wide. What is its area?', o:['26 cm²','36 cm²','13 cm²','45 cm²'], a:1, e:'9 × 4 = 36 cm². 26 is the perimeter.'},
    {q:'A triangle has a base of 10 and a height of 6. What is its area?', o:['60','16','30','32'], a:2, e:'½ × 10 × 6 = 30.'},
    {q:'A square has a perimeter of 20 cm. What is its area?', o:['25 cm²','20 cm²','100 cm²','40 cm²'], a:0, e:'The side is 20 ÷ 4 = 5, so the area is 5 × 5 = 25 cm².'},
  ] });
}

/* =================== 4. Pythagoras =================== */
{
const C1=[110,270], A1=[110,138], B1=[286,270];
const C=[220,232], A=[220,160], B=[316,232];
const Q=[270,190], QA=[270,118], QB=[366,190];
XP.add({ key:'en-ge-pyth', lang:'en', sk:'geometry', ord:40, title:'The Pythagorean theorem', min:'3 min',
  goals:['Identify the hypotenuse of a right triangle','Understand the Pythagorean theorem with squares','Memorize the triples 3-4-5, 6-8-10 and 5-12-13','Find a missing side quickly'],
  scenes:[
  { t:'The right triangle', items:{
      tri:{type:'poly',points:pts([A1,B1,C1]),c:'prisoft'}, rm:rmark(C1,0,16),
      g1:{type:'text',x:84,y:212,s:20,text:'leg',cls:'t-ink2'}, g2:{type:'text',x:198,y:296,s:20,text:'leg',cls:'t-ink2'},
      hyp:seg(A1,B1,'s-pink'), lh:{type:'text',x:262,y:180,s:24,text:'hypotenuse',hand:true},
      n1:{type:'note',x:500,y:140,w:220,h:62,c:'n1',text:'The longest side',size:22,rot:-2},
      n2:{type:'note',x:500,y:250,w:270,h:62,c:'n3',text:'Faces the right angle',size:19,rot:2} },
    beats:[
      { say:'A right triangle has one angle of ninety degrees. We mark it with a small square.', show:['tri','rm'] },
      { say:'The two sides that form the right angle are called the legs.', show:['g1','g2'] },
      { say:'The side facing the right angle is the hypotenuse, always the longest side.', show:['hyp','lh','n1','n2'] },
    ]},
  { t:'The rule with squares', items:{
      q3:{type:'grid',x:148,y:160,rows:3,cols:3,cell:22,gap:2,fill:9,c:'n1'},
      q4:{type:'grid',x:220,y:232,rows:4,cols:4,cell:22,gap:2,fill:16,c:'n3'},
      q5:{type:'grid',x:245,y:89,rows:5,cols:5,cell:22,gap:2,fill:25,c:'n2',rot:36.87},
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft'}, rm:rmark(C,0,12),
      s3:lab([204,203],0,0,'3'), s4:lab([268,254],0,0,'4'), s5:lab([280,182],0,0,'5'),
      t9:lab([184,196],0,0,'9','t-note',28), t16:lab([268,282],0,0,'16','t-note',28), t25:lab([304,150],0,0,'25','t-note',30),
      bx:{type:'box',x:425,y:120,w:185,h:56,c:'surface',text:'9 + 16 = 25',s:24,ltr:true},
      n1:{type:'note',x:517,y:240,w:200,h:66,c:'n0',text:'a² + b² = c²',size:28,rot:-2},
      cap:{type:'text',x:517,y:310,s:20,text:'c is the hypotenuse',hand:true} },
    beats:[
      { say:'In this right triangle, the legs are three and four, and the hypotenuse is five.', show:['tri','rm','s3','s4','s5'] },
      { say:'Draw a square on each leg: areas nine and sixteen.', hide:['s3','s4','s5'], show:['q3','t9','q4','t16'] },
      { say:'The square on the hypotenuse has area twenty-five, exactly nine plus sixteen.', show:['q5','t25','bx'] },
      { say:'That is the Pythagorean theorem: a squared plus b squared equals c squared, where c is the hypotenuse.', show:['n1','cap'] },
    ]},
  { t:'Triples to memorize', items:{
      n1:{type:'note',x:150,y:145,w:180,h:76,c:'n0',text:'3, 4, 5',size:32,rot:-3},
      e1:{type:'eq',x:150,y:218,s:20,text:'9 + 16 = 25',cls:'t-ink2'},
      ar:{type:'arrow',x1:250,y1:128,x2:378,y2:128,bend:-40,text:'× 2'},
      n2:{type:'note',x:480,y:145,w:180,h:76,c:'n3',text:'6, 8, 10',size:32,rot:2},
      e2:{type:'eq',x:480,y:218,s:20,text:'36 + 64 = 100',cls:'t-ink2'},
      n3:{type:'note',x:315,y:275,w:210,h:76,c:'n1',text:'5, 12, 13',size:32,rot:-1},
      e3:{type:'eq',x:315,y:340,s:20,text:'25 + 144 = 169',cls:'t-ink2'} },
    beats:[
      { say:'Memorize a few famous side sets to save time. The best known is three, four, five.', show:['n1','e1'] },
      { say:'Multiples work too. Double it and you get six, eight, ten.', show:['ar','n2','e2'] },
      { say:'Another one is five, twelve, thirteen. Look for these before you calculate.', show:['n3','e3'] },
    ]},
  { t:'Your turn: the missing side', items:{
      tri:{type:'poly',points:pts([QA,QB,Q]),c:'prisoft'}, rm:rmark(Q,0,12),
      l6:lab([254,160],0,0,'6'), l10:lab([332,142],0,0,'10'), ls:lab([318,205],0,0,'x','t-hand',24),
      n1:{type:'note',x:500,y:150,w:200,h:62,c:'n2',text:'x² = 10² − 6²',size:24,rot:-3},
      eq:{type:'eq',x:320,y:290,s:28,text:'x² = 100 − 36 = 64  →  x = 8',cls:'t-pri'} },
    beats:[
      { say:'In this right triangle, we know the hypotenuse, ten, and one leg, six.', show:['tri','rm','l6','l10','ls'] },
      { say:'To find a missing leg, subtract: the hypotenuse squared minus the known leg squared.', show:['n1'] },
      { say:'How long is side x?', hl:['ls'] },
    ],
    ask:{ opts:['4','8','16','12'], a:1, y:248,
      right:'Well done. One hundred minus thirty-six is sixty-four, and its square root is eight: three, four, five doubled.',
      wrong:'It is eight. One hundred minus thirty-six is sixty-four, whose square root is eight. Notice: three, four, five doubled.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'A right triangle has legs of 5 and 12. How long is the hypotenuse?', o:['17','13','15','14'], a:1, e:'The (5, 12, 13) triple: 25 + 144 = 169 = 13².'},
    {q:'A right triangle has a hypotenuse of 20 and one leg of 12. How long is the other leg?', o:['8','16','14','10'], a:1, e:'(3, 4, 5) × 4 gives 12, 16, 20.'},
    {q:'Which set could be the side lengths of a right triangle?', o:['4, 5, 6','5, 6, 7','9, 12, 15','2, 3, 4'], a:2, e:'9, 12, 15 is (3, 4, 5) × 3, and 81 + 144 = 225 = 15².'},
  ] });
}

/* =================== 5. Circles =================== */
{
const K=[190,210], K2=[190,205];
const cl=[170,200], cr=[460,200], d=R1(85/Math.SQRT2);
XP.add({ key:'en-ge-circle', lang:'en', sk:'geometry', ord:50, title:'The circle', min:'3 min',
  goals:['Know the radius, the diameter and how they relate','Find the circumference 2πr and the area πr²','Link a circle to a square drawn inside it or around it'],
  scenes:[
  { t:'Radius and diameter', items:{
      c:{type:'circle',cx:K[0],cy:K[1],r:110,c:'surface2'},
      r1:seg(K,P(K,110,45),'s-line'), r2:seg(K,P(K,110,205),'s-line'), r3:seg(K,P(K,110,255),'s-line'),
      cen:{type:'dot',x:K[0],y:K[1],r:5,c:'ink',text:'O',dx:12,dy:28},
      rad:seg(K,P(K,110,0),'s-pri'), lr:{type:'eq',x:250,y:198,s:22,text:'r',cls:'t-pri'},
      dia:seg(P(K,110,150),P(K,110,330),'s-pink'), ld:{type:'text',x:340,y:294,s:22,text:'diameter',hand:true},
      n1:{type:'note',x:505,y:140,w:230,h:62,c:'n1',text:'diameter = 2r',size:24,rot:-2},
      n2:{type:'note',x:505,y:255,w:230,h:62,c:'n3',text:'r = diameter ÷ 2',size:22,rot:2} },
    beats:[
      { say:'Every point on a circle is the same distance from one point, the center.', show:['c','cen','r1','r2','r3'] },
      { say:'That distance is called the radius.', show:['rad','lr'] },
      { say:'The diameter runs through the center, edge to edge, so it is twice the radius.', show:['dia','ld','n1'] },
      { say:'Careful: if you are given the diameter, halve it before you use a formula.', show:['n2'] },
    ]},
  { t:'Circumference and area', items:{
      fill:{type:'circle',cx:K2[0],cy:K2[1],r:100,c:'prisoft'},
      edge:{type:'circle',cx:K2[0],cy:K2[1],r:100,c:'surface2'},
      trace:{type:'path',d:circD(K2,100),cls:'s-pink'},
      rad:seg(K2,P(K2,100,0),'s-ink'), lr:{type:'eq',x:240,y:196,s:22,text:'r = 3',cls:'t-ink'},
      n1:{type:'note',x:495,y:115,w:272,h:58,c:'n1',text:'Circumference = 2πr',size:20,rot:-2},
      n2:{type:'note',x:495,y:200,w:272,h:58,c:'n2',text:'Area = πr²',size:22,rot:2},
      x1:{type:'eq',x:490,y:275,s:22,text:'Circumference = 6π',cls:'t-ink'},
      x2:{type:'eq',x:490,y:310,s:22,text:'Area = 9π',cls:'t-pri'},
      pi:{type:'eq',x:190,y:342,s:22,text:'π ≈ 3.14',cls:'t-ink2'} },
    beats:[
      { say:'The circumference is the distance around: two times pi times the radius.', show:['edge','trace','n1'] },
      { say:'The area is the space inside: pi times the radius squared.', hide:['edge'], show:['fill','n2'] },
      { say:'For a circle with radius three, the circumference is six pi and the area is nine pi.', show:['rad','lr','x1','x2'] },
      { say:'Pi is about three point one four. Answers are usually left in terms of pi.', show:['pi'] },
    ]},
  { t:'Circles and squares', items:{
      sqO:{type:'poly',points:pts([[cl[0]-70,cl[1]-70],[cl[0]+70,cl[1]-70],[cl[0]+70,cl[1]+70],[cl[0]-70,cl[1]+70]]),c:'oksoft'},
      cL:{type:'circle',cx:cl[0],cy:cl[1],r:70,c:'prisoft'},
      dL:seg([cl[0]-70,cl[1]],[cl[0]+70,cl[1]],'s-pri'),
      capL:{type:'text',x:cl[0],y:302,s:20,text:'side = diameter'},
      cR:{type:'circle',cx:cr[0],cy:cr[1],r:85,c:'oksoft'},
      sqI:{type:'poly',points:pts([[cr[0]-d,cr[1]-d],[cr[0]+d,cr[1]-d],[cr[0]+d,cr[1]+d],[cr[0]-d,cr[1]+d]]),c:'prisoft'},
      dR:seg([cr[0]-d,cr[1]+d],[cr[0]+d,cr[1]-d],'s-pink'),
      capR:{type:'text',x:cr[0],y:318,s:20,text:'diagonal = diameter'},
      tip:{type:'text',x:320,y:348,s:22,text:'Always draw the diameter',hand:true} },
    beats:[
      { say:'When a circle fits inside a square, the square’s side equals the circle’s diameter.', show:['sqO','cL','dL','capL'] },
      { say:'When a square sits inside a circle, the square’s diagonal is the circle’s diameter.', show:['cR','sqI','dR','capR'] },
      { say:'Both cases come up often in the GAT. Draw the diameter first, and the answer follows.', show:['tip'], hl:['dL','dR'] },
    ]},
  { t:'Your turn: circle in a square', items:{
      sq:{type:'poly',points:'260,72 380,72 380,192 260,192',c:'oksoft'},
      c:{type:'circle',cx:320,cy:132,r:60,c:'prisoft'},
      l10:lab([234,139],0,0,'10','t-ink',22),
      dia:seg([260,132],[380,132],'s-pri'),
      eq:{type:'eq',x:320,y:290,s:30,text:'r = 5  →  area = 25π',cls:'t-pri'} },
    beats:[
      { say:'A square with side ten has a circle inside it that touches all four sides.', show:['sq','c','l10'] },
      { say:'Remember, the square’s side is the circle’s diameter. What is the area of the circle?', show:['dia'] },
    ],
    ask:{ opts:['100π','25π','10π','20π'], a:1, y:248,
      right:'Excellent. The diameter is ten, so the radius is five, and the area is pi times twenty-five.',
      wrong:'It is twenty-five pi. The diameter is ten, so the radius is five, and five squared is twenty-five. Forgetting to halve gives one hundred pi.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'A circle has a radius of 4 cm. What is its circumference?', o:['16π','8π','4π','64π'], a:1, e:'C = 2 × π × 4 = 8π. 16π is the area.'},
    {q:'A circle has a diameter of 10. What is its area?', o:['100π','10π','25π','50π'], a:2, e:'r = 5, so the area is π × 5² = 25π.'},
    {q:'A square is drawn inside a circle of radius 5. How long is the square’s diagonal?', o:['5','10','25','5√2'], a:1, e:'The square’s diagonal is the circle’s diameter: 2 × 5 = 10.'},
  ] });
}
})();
