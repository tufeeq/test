/* English explainers: stats */
(function(){ if(!window.XP||!XP.ready) return;

/* ================= 1. mean, median, mode ================= */
const card=(x,v,c)=>({type:'note',x,y:130,w:64,h:64,c,text:v,size:30});
XP.add({ key:'en-st-mean', lang:'en', sk:'stats', ord:10, title:'Mean, median and mode', min:'4 min',
  goals:['Find the mean and see it as a balance point','Use the sum trick to find a missing value','Find the median after sorting, and the mode by frequency','Avoid taking the middle before sorting'],
  scenes:[
  { t:'The mean: evening out',
    items:{ bars:{type:'bars',x:70,y:90,w:300,h:200,values:[2,8,6,4],labels:['Khalid','Noura','Sara','Ali'],max:10,c:'pri'},
      ml:{type:'line',x1:62,y1:190,x2:378,y2:190,cls:'s-pink'},
      e1:{type:'eq',x:500,y:130,s:22,text:'2 + 8 + 6 + 4 = 20'}, e2:{type:'eq',x:500,y:192,s:34,text:'20 ÷ 4 = 5',cls:'t-pri'},
      n:{type:'note',x:500,y:268,w:180,h:58,c:'n0',text:'Mean = 5',size:26,rot:-2} },
    beats:[
      { say:'The mean asks: if we shared the total equally, how much would each get?', show:['bars'] },
      { say:'Add the values: two plus eight plus six plus four is twenty.', show:['e1'] },
      { say:'Divide by how many there are: twenty divided by four is five.', show:['e2','ml'] },
      { say:'It’s a balance point: what sits above the line exactly fills the gaps below it.', show:['n'], hl:['ml'] },
    ]},
  { t:'The sum trick',
    items:{ rule:{type:'note',x:320,y:98,w:400,h:62,c:'n2',text:'Sum = mean × count',size:28,rot:-1},
      q:{type:'eq',x:320,y:168,s:20,text:'Mean of 5 numbers = 12; four of them sum to 45',cls:'t-ink2'},
      e1:{type:'eq',x:320,y:218,s:30,text:'Sum: 12 × 5 = 60'}, e2:{type:'eq',x:320,y:266,s:30,text:'60 − 45 = 15',cls:'t-pri'},
      ans:{type:'box',x:165,y:290,w:310,h:50,c:'n0',text:'Missing number: 15',s:23,cls:'t-note'} },
    beats:[
      { say:'Flip it for the best trick here: sum equals mean times count.', show:['rule'] },
      { say:'Five numbers with a mean of twelve add up to twelve times five: sixty.', show:['q','e1'] },
      { say:'If four of them make forty-five, the fifth is sixty minus forty-five.', show:['e2'] },
      { say:'That’s fifteen. When a value is missing, start with the sum.', show:['ans'] },
    ]},
  { t:'Median and mode',
    items:{ c7:card(160,'7','n3'), c3a:card(240,'3','n1'), c9:card(320,'9','n3'), c3b:card(400,'3','n1'), c5:card(480,'5','n0'),
      lm:{type:'text',x:320,y:200,s:24,text:'median',hand:true}, lo:{type:'text',x:200,y:200,s:24,text:'mode',hand:true},
      ev:{type:'eq',x:320,y:252,s:22,text:'Even count: 2, 4, 6, 8 → (4 + 6) ÷ 2 = 5',cls:'t-ink2'},
      trap:{type:'note',x:320,y:312,w:440,h:52,c:'n1',text:'Sort first, then take the middle',size:21,rot:-1} },
    beats:[
      { say:'The median is the middle number. Take these five values.', show:['c7','c3a','c9','c3b','c5'], gap:.12 },
      { say:'First, sort them from smallest to largest.', move:{c7:[240,0],c3a:[-80,0],c9:[160,0],c3b:[-160,0],c5:[-160,0]} },
      { say:'Five is in the middle, so the median is five.', show:['lm'], hl:['c5'] },
      { say:'With an even count, average the two middle numbers.', show:['ev'] },
      { say:'The mode is the most frequent value. Three appears twice, so the mode is three.', show:['lo'], hl:['c3a','c3b'] },
      { say:'The trap: take the middle before sorting and you’d say nine. Wrong.', show:['trap'] },
    ]},
  { t:'Your turn: the missing score',
    items:{ q1:{type:'eq',x:320,y:82,s:24,text:'The mean score of 4 students = 80'}, q2:{type:'eq',x:320,y:122,s:20,text:'A 5th student joins; new mean = 82. His score?'},
      t1:{type:'eq',x:320,y:198,s:26,text:'Before: 4 × 80 = 320',cls:'t-ink2'}, t2:{type:'eq',x:320,y:244,s:26,text:'After: 5 × 82 = 410',cls:'t-ink2'},
      r:{type:'box',x:180,y:270,w:280,h:54,c:'n0',text:'410 − 320 = 90',s:28,cls:'t-note',ltr:true} },
    beats:[
      { say:'Your turn. Four students average eighty. A fifth joins, and the mean becomes eighty-two.', show:['q1','q2'] },
      { say:'Use the sum trick. What did the new student score?', hl:['q2'] },
    ],
    ask:{ opts:['82','90','86','100'], a:1,
      right:'Correct! The sum grew from three hundred and twenty to four hundred and ten: ninety more.',
      wrong:'Sum before: three hundred and twenty. Sum after: five times eighty-two, four hundred and ten. The difference is ninety.',
      show:['t1','t2','r'] } },
  ],
  quiz:[
    {q:'What is the median of 8, 2, 6, 4, 10, 5?', o:['5','6','5.5','7'], a:2, e:'Sorted: 2, 4, 5, 6, 8, 10. The two middle numbers are 5 and 6, and their mean is 5.5.'},
    {q:'The mean of 6 numbers is 15. One number is removed and the mean of the rest is 14. Which number was removed?', o:['20','15','1','19'], a:0, e:'Sum before: 6 × 15 = 90. Sum after: 5 × 14 = 70. The removed number is 20.'},
    {q:'What is the mode of 4, 7, 4, 9, 7, 4, 2?', o:['7','4','5','9'], a:1, e:'4 appears three times, more than any other value.'},
  ] });

/* ================= 2. probability ================= */
const balls={}; const bcol=['bad','bad','bad','bad','butter','butter','butter','butter','butter','butter','sky','sky'];
bcol.forEach((c,i)=>{ balls['b'+i]={type:'circle',cx:177+26*i,cy:102,r:10,c}; });
XP.add({ key:'en-st-prob', lang:'en', sk:'stats', ord:20, title:'Probability from zero', min:'3 min',
  goals:['Find a probability: favorable over total','Know that a probability lies between 0 and 1','Use the complement to shorten your work','Rule out impossible choices at once'],
  scenes:[
  { t:'What is probability?',
    items:{ g:{type:'grid',x:70,y:110,rows:2,cols:5,cell:40,gap:8,fill:3,c:'pink'}, cap:{type:'eq',x:166,y:236,s:18,text:'10 cubes: 3 pink, 7 white',cls:'t-ink2'},
      qq:{type:'text',x:166,y:300,s:26,text:'Random pick: pink?',hand:true},
      top:{type:'text',x:470,y:128,s:20,text:'favorable outcomes'}, bar:{type:'line',x1:365,y1:144,x2:575,y2:144}, bot:{type:'text',x:470,y:174,s:20,text:'all possible outcomes'},
      res:{type:'box',x:390,y:220,w:160,h:60,c:'n2',text:'3/10',s:34,cls:'t-note',ltr:true} },
    beats:[
      { say:'Probability measures how likely something is. Here are ten cubes: three pink, seven white.', show:['g','cap'] },
      { say:'Pick one without looking. What’s the probability it’s pink?', show:['qq'] },
      { say:'The rule: favorable outcomes over all possible outcomes.', show:['top','bar','bot'] },
      { say:'Three out of ten, so the probability is three tenths.', show:['res'], hl:['g'] },
    ]},
  { t:'From zero to one',
    items:{ nl:{type:'nline',x1:110,x2:530,y:175,from:0,to:1,step:.25},
      d0:{type:'dot',x:110,y:175,r:9,c:'bad',text:'impossible',dy:-24,s:20}, d1:{type:'dot',x:530,y:175,r:9,c:'pri',text:'certain',dy:-24,s:20},
      dh:{type:'dot',x:320,y:175,r:9,c:'pink',text:'half',dy:-24,s:20},
      n:{type:'note',x:320,y:275,w:400,h:54,c:'n0',text:'Never below 0, never above 1',size:22,rot:-1} },
    beats:[
      { say:'Every probability is a number from zero to one.', show:['nl'] },
      { say:'Zero means impossible, like drawing a yellow cube from a bag with none.', show:['d0'] },
      { say:'One means certain, like when every cube in the bag is pink.', show:['d1'] },
      { say:'In the middle is one half, like tossing a coin: one side out of two.', show:['dh'] },
      { say:'So cross out any choice that is negative or greater than one.', show:['n'] },
    ]},
  { t:'The complement',
    items:{ rule:{type:'note',x:320,y:92,w:360,h:58,c:'n2',text:'P(not A) = 1 − P(A)',size:26,rot:-1},
      g:{type:'grid',x:70,y:150,rows:2,cols:5,cell:40,gap:8,fill:3,c:'pink'},
      e:{type:'eq',x:470,y:195,s:30,text:'1 − 3/10 = 7/10'}, h:{type:'text',x:465,y:262,s:22,text:'Count the opposite if it’s easier',hand:true} },
    beats:[
      { say:'The probability that something does not happen is one minus the probability that it does.', show:['rule'] },
      { say:'In our example, pink is three tenths, so not pink is seven tenths.', show:['g','e'] },
      { say:'Use it when the opposite is quicker to count.', show:['h'] },
    ]},
  { t:'Your turn: not red',
    items:Object.assign({ t1:{type:'eq',x:320,y:72,s:22,text:'A box holds 4 red, 6 yellow and 2 blue balls'},
      t2:{type:'eq',x:320,y:138,s:20,text:'P(the ball drawn is NOT red) = ?',cls:'t-ink2'},
      r1:{type:'box',x:220,y:190,w:200,h:60,c:'n0',text:'8/12 = 2/3',s:32,cls:'t-note',ltr:true}, r2:{type:'eq',x:320,y:292,s:24,text:'or: 1 − 4/12 = 2/3',cls:'t-ink2'} }, balls),
    beats:[
      { say:'Your turn. A box holds four red balls, six yellow balls and two blue balls.', show:['t1',...Object.keys(balls)], gap:.05 },
      { say:'We draw one ball at random. What is the probability that it is not red?', show:['t2'] },
    ],
    ask:{ opts:['1/3','2/3','8/10','4/8'], a:1,
      right:'Well done! Eight of the twelve balls are not red, which is two thirds.',
      wrong:'There are twelve balls, and eight are not red. That’s eight twelfths, which simplifies to two thirds.',
      show:['r1','r2'] } },
  ],
  quiz:[
    {q:'A die is rolled once. What is the probability of an even number greater than 2?', o:['1/2','1/3','1/6','2/3'], a:1, e:'Only 4 and 6 work: 2 out of 6 = 1/3.'},
    {q:'If a plan has a 0.65 probability of success, what is the probability it fails?', o:['0.65','0.45','0.35','1.65'], a:2, e:'The complement: 1 − 0.65 = 0.35.'},
    {q:'Which value cannot be a probability?', o:['0','0.99','5/4','1'], a:2, e:'5/4 is greater than 1, and a probability is never more than 1.'},
  ] });

/* ================= 3. charts & tables ================= */
const DAYS=['Sat','Sun','Mon','Tue'], SALES=[20,30,15,40];
const tb={}; const TH=['Day','Sat','Sun','Mon','Tue'], TV=['Sales','20','30','15','40'];
TH.forEach((h,i)=>{ const x=70+100*i; tb['h'+i]={type:'box',x,y:64,w:100,h:36,rx:6,c:'prisoft',text:h,s:18,cls:'t-pri'}; tb['v'+i]={type:'box',x,y:100,w:100,h:36,rx:6,c:'surface',text:TV[i],s:i?22:18}; });
const tk=[].concat(...TH.map((_,i)=>['h'+i,'v'+i]));
XP.add({ key:'en-st-charts', lang:'en', sk:'stats', ord:30, title:'Reading charts and tables', min:'4 min',
  goals:['Read the title, axes and units before calculating','Find a percent change from the old value','Turn a pie slice into a percent, an amount and an angle','Pull what you need from a table quickly'],
  scenes:[
  { t:'Bar charts: read first',
    items:{ bars:{type:'bars',x:60,y:90,w:320,h:200,values:SALES,labels:DAYS,max:40,c:'pri'},
      unit:{type:'text',x:495,y:100,s:18,text:'Sales (thousands)',cls:'t-ink2'},
      hi:{type:'note',x:495,y:165,w:180,h:54,c:'n3',text:'Highest: 40',size:24,rot:-2}, lo:{type:'note',x:495,y:235,w:180,h:54,c:'n1',text:'Lowest: 15',size:24,rot:2},
      d:{type:'eq',x:495,y:312,s:26,text:'40 − 15 = 25',cls:'t-pri'} },
    beats:[
      { say:'Before calculating, read the title, axes and units. What does each bar stand for?', show:['bars','unit'] },
      { say:'A shop’s sales in thousands over four days. The tallest bar is Tuesday: forty thousand.', show:['hi'] },
      { say:'The shortest is Monday: fifteen thousand.', show:['lo'] },
      { say:'The difference: forty minus fifteen, twenty-five thousand.', show:['d'] },
    ]},
  { t:'Percent change',
    items:{ bars:{type:'bars',x:30,y:100,w:280,h:190,values:SALES,labels:DAYS,max:40,c:['pink','pink','surface2','surface2']},
      e1:{type:'eq',x:475,y:108,s:22,text:'Change: 30 − 20 = 10'}, e2:{type:'eq',x:475,y:170,s:30,text:'10 ÷ 20 = 50%',cls:'t-pri'},
      w:{type:'eq',x:475,y:236,s:30,text:'10 ÷ 30 ≈ 33%',cls:'t-bad'},
      rule:{type:'note',x:475,y:308,w:290,h:52,c:'n0',text:'Divide by the old value',size:21,rot:-1} },
    beats:[
      { say:'A frequent question: what is the percent increase from Saturday to Sunday?', show:['bars'] },
      { say:'First the change: thirty minus twenty is ten.', show:['e1'] },
      { say:'Divide the change by the old value: ten divided by twenty is a half, fifty percent.', show:['e2'] },
      { say:'The trap: dividing by the new value gives about thirty-three percent. Wrong.', show:['w','rule'], strike:['w'] },
    ]},
  { t:'Pie charts: a share of the whole',
    items:{ p0:{type:'pie',cx:180,cy:205,r:112,parts:10,fill:0}, p3:{type:'pie',cx:180,cy:205,r:112,parts:10,fill:3,c:'pink'},
      l:{type:'eq',x:470,y:115,s:28,text:'Food = 30%'},
      e1:{type:'eq',x:465,y:185,s:26,text:'30% of 8000 = 2400',cls:'t-pri'},
      e2:{type:'eq',x:470,y:255,s:28,text:'3 × 36° = 108°'}, n:{type:'text',x:470,y:300,s:20,text:'the whole circle is 360°',hand:true} },
    beats:[
      { say:'A pie chart shows parts of a whole; the full circle is one hundred percent. This one has ten slices.', show:['p0'] },
      { say:'In this family budget, food takes three slices of ten: thirty percent.', hide:['p0'], show:['p3','l'] },
      { say:'If the budget is eight thousand riyals, food gets two thousand four hundred.', show:['e1'] },
      { say:'A circle is three hundred and sixty degrees, so each slice is thirty-six, and food is one hundred and eight.', show:['e2','n'] },
    ]},
  { t:'Your turn: from the table',
    items:Object.assign({}, tb, { r:{type:'box',x:100,y:186,w:440,h:64,c:'n0',text:'(30 − 15) ÷ 30 = 50%',s:30,cls:'t-note',ltr:true}, ck:{type:'check',x:320,y:292} }),
    beats:[
      { say:'Your turn. This table shows the same sales, in thousands.', show:tk, gap:.06 },
      { say:'What is the percent decrease from Sunday to Monday?', hl:['v2','v3'] },
    ],
    ask:{ opts:['50%','15%','100%','33%'], a:0,
      right:'Correct! The drop is fifteen. Divide by the old value, thirty, to get one half: fifty percent.',
      wrong:'The drop is thirty minus fifteen, fifteen. Divide by the old value, thirty: one half, fifty percent.',
      show:['r','ck'] } },
  ],
  quiz:[
    {q:'A pie chart shows 600 students. The math slice has an angle of 90°. How many students prefer math?', o:['90','150','200','240'], a:1, e:'90° is a quarter of the circle, and a quarter of 600 = 150.'},
    {q:'Sales rose from 40 thousand to 50 thousand. What is the percent increase?', o:['20%','10%','25%','50%'], a:2, e:'The change is 10; divide by the old value 40: 10 out of 40 = 25%.'},
    {q:'Table: class A has 18 students, B has 22, C has 20. About what percent of all students are in class B?', o:['22%','33%','37%','44%'], a:2, e:'The total is 60, and 22 out of 60 ≈ 36.7%, about 37%.'},
  ] });
})();
