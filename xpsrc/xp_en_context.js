/* English explainers: context */
(function(){ if(!window.XP||!XP.ready) return;

/* Lays out an English sentence word by word (left to right, centered on x=320).
   Words starting with '*' are underlined with a line item.
   Adds to `items`: highlight boxes <id>g<k> (oksoft) and <id>r<k> (badsoft) behind each underlined word,
   words <id>w<l>_<i>, underlines <id>u<k>. Returns {words:[keys], lines:[keys], pos:[{x,y,w}]} per underlined word. */
/* approximate bold advance widths (em) for a wide sans; narrower web fonts only widen the gaps */
const CW={a:.68,b:.72,c:.59,d:.72,e:.68,f:.44,g:.72,h:.71,i:.34,j:.34,k:.67,l:.34,m:1.04,n:.71,o:.69,p:.72,q:.72,r:.49,s:.6,t:.48,u:.71,v:.65,w:.92,x:.65,y:.65,z:.58,I:.37,T:.68,',':.38,'.':.38,'-':.42,"'":.33,':':.4};
function sentence(items,id,lines,{y0=110,lh=66,s=24,gap}={}){
  const G=gap??s*.4, est=w=>Math.max(1,[...w].reduce((a,ch)=>a+(CW[ch]??(/[A-Z]/.test(ch)?.77:.66)),0))*s;
  const out={words:[],lines:[],pos:[]}, words=[], k={n:0};
  lines.forEach((ln,li)=>{ const y=y0+li*lh; const ws=ln.map(w=>{ const u=w[0]==='*', t=u?w.slice(1):w; return {t,u,w:est(t)}; });
    const W=ws.reduce((a,b)=>a+b.w,0)+G*(ws.length-1); let x=320-W/2;
    ws.forEach((o,i)=>{ const cx=x+o.w/2; x+=o.w+G; words.push({key:`${id}w${li}_${i}`,t:o.t,cx,y});
      if(o.u){ const n=k.n++; const hw=o.w/2+4; out.pos.push({x:cx,y,w:o.w});
        items[`${id}g${n}`]={type:'box',x:cx-hw,y:y-s*1.02,w:hw*2,h:s*1.45,c:'oksoft',stroke:false,rx:8};
        items[`${id}r${n}`]={type:'box',x:cx-hw,y:y-s*1.02,w:hw*2,h:s*1.45,c:'badsoft',stroke:false,rx:8}; } }); });
  words.forEach(w=>{ items[w.key]={type:'text',x:w.cx,y:w.y,s,text:w.t}; out.words.push(w.key); });
  out.pos.forEach((p,n)=>{ const key=`${id}u${n}`; items[key]={type:'line',x1:p.x-p.w*.45,y1:p.y+9,x2:p.x+p.w*.45,y2:p.y+9,cls:'s-pri'}; out.lines.push(key); });
  return out;
}
const mark=(items,key,type,p,dy=40,s=.62)=>{ items[key]={type,x:p.x,y:p.y+dy,s}; };

/* ================= Lesson 1: what a contextual error is ================= */
const PLAYER=[['The','player','*trained','*hard','all','week,'],['so','his','form','*slipped','and','he','*starred.']];
const A1={}, a1=sentence(A1,'a',PLAYER,{y0:115,lh:74});
A1.tag={type:'note',x:320,y:292,w:480,h:62,c:'n1',text:'An error of meaning, not grammar',size:21,rot:-1};

const A2={}, a2=sentence(A2,'b',PLAYER,{y0:115,lh:74});
Object.assign(A2,{ idea:{type:'note',x:190,y:290,w:260,h:62,c:'n3',text:'The idea: hard work',size:21,rot:-1.5},
  ar:{type:'arrow',x1:326,y1:280,x2:400,y2:280,cls:'s-pink',bend:-26},
  idea2:{type:'note',x:480,y:290,w:140,h:62,c:'n3',text:'success',size:23,rot:1.5} });

const A3={}, a3=sentence(A3,'c',PLAYER,{y0:100,lh:92});
a3.pos.forEach((p,i)=>mark(A3,'m'+i,i===2?'cross':'check',p,42));
A3.fix={type:'note',x:320,y:318,w:290,h:54,c:'n0',text:'slipped → improved',size:23,rot:-1.5};

const A4={}, a4=sentence(A4,'d',[['Ice','*melts','when','the','temperature','*falls,'],['*turning','it','into','liquid','*water.']],{y0:74,lh:52,s:22});
A4.ans={type:'note',x:320,y:230,w:260,h:64,c:'n0',text:'falls → rises',size:26,rot:-1.5};

const A5={ s1:{type:'note',x:130,y:170,w:176,h:90,c:'n0',text:'1 The idea',size:23,rot:-2},
  s2:{type:'note',x:320,y:170,w:176,h:90,c:'n1',text:'2 Anchors',size:23,rot:1.5},
  s3:{type:'note',x:510,y:170,w:176,h:90,c:'n3',text:'3 Test each',size:22,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'Try the opposite: if it fits, you found it'} };

XP.add({ key:'en-cx-what', lang:'en', sk:'context', ord:10, title:'What is a contextual error?', min:'3 min',
  goals:['Know that a contextual error is one word that breaks the meaning','Find the main idea before looking at single words','Test each underlined word against the idea','Confirm the error by trying its opposite'],
  scenes:[
  { t:'One word breaks it', items:A1, beats:[
    { say:'A contextual error question gives you a sentence with correct grammar and four underlined words.', show:a1.words, gap:.08 },
    { say:'Only one of those four words breaks the meaning. That is your answer.', show:a1.lines, gap:.3 },
    { say:'So the error is not in grammar or spelling. It is in the meaning.', show:['tag'] } ]},
  { t:'Start with the idea', items:A2, beats:[
    { say:'Don\'t start word by word. Read the whole sentence and ask: what is its main idea?', show:a2.words, gap:.05 },
    { say:'A player trained hard all week, and then starred. That is the idea.', show:['bg1','bg3','idea','ar','idea2'] },
    { say:'Hard work and starring are the anchors of the meaning, and they point the same way.', show:a2.lines, hl:['idea','idea2'] } ]},
  { t:'Test each word', items:A3, beats:[
    { say:'Now test each underlined word against the idea. Trained fits. Hard fits.', show:[...a3.words,...a3.lines,'cg0','cg1','m0','m1'], gap:.03 },
    { say:'His form slipped? Someone who trains hard doesn\'t slip and then star. This word contradicts the idea.', show:['cr2','m2'] },
    { say:'Starred fits. Now try the opposite: his form improved. The sentence makes sense.', show:['cg3','m3','fix'] } ]},
  { t:'Your turn: ice', items:A4, beats:[
    { say:'Your turn. Find the idea of the sentence first, then test the four words.', show:[...a4.words,...a4.lines], gap:.06 },
    { say:'Ice melts when the temperature falls, turning it into liquid water. Which word breaks the meaning?', hl:a4.lines } ],
    ask:{ opts:['melts','falls','turning','water'], a:1, show:['ans'],
      right:'Well done. Ice melts when the temperature rises, not when it falls. The error is falls.',
      wrong:'Check the science. Ice melts when the temperature rises, so the error is falls.' } },
  { t:'Your steps', items:A5, beats:[
    { say:'So your steps: find the idea, spot the anchors, then test each word.', show:['s1','s2','s3'], gap:.45 },
    { say:'Suspect a word? Try its opposite. If the meaning works, you have found the error.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'Find the contextual error: "The traveler was so thirsty that he drank water until he was hungry."', o:['thirsty','drank','water','hungry'], a:3, e:'Drinking water ends thirst, not hunger; the right word would be "satisfied".'},
    {q:'Find the contextual error: "The sun rises in the west every morning, filling the land with light."', o:['rises','west','morning','light'], a:1, e:'The sun rises in the east, so "west" breaks the meaning.'},
    {q:'What is the first step in a contextual error question?', o:['Pick the hardest word','Find the main idea of the sentence','Read only the options','Look for a grammar mistake'], a:1, e:'The main idea is the measure you test every underlined word against.'},
  ] });

/* ================= Lesson 2: strategies and traps ================= */
const B1={}, b1=sentence(B1,'a',[['The','*wise','leader','makes','his','decisions'],['*recklessly,','after','*careful','*study.']],{y0:105,lh:70});
Object.assign(B1,{ x:{type:'cross',x:b1.pos[1].x,y:b1.pos[1].y+42,s:.62},
  fix:{type:'note',x:320,y:292,w:380,h:62,c:'n0',text:'recklessly → thoughtfully',size:22,rot:-1.5} });

const B2={}, b2=sentence(B2,'b',[['She','woke','up','*early','and','*caught','the','bus,'],['*but','she','reached','school','*before','everyone.']],{y0:95,lh:62});
Object.assign(B2,{ c1:{type:'box',x:45,y:230,w:220,h:52,c:'surface2',text:'woke up early',s:21},
  ar:{type:'arrow',x1:270,y1:246,x2:370,y2:246,cls:'s-pink',bend:-30,text:'result'},
  c2:{type:'box',x:375,y:230,w:220,h:52,c:'surface2',text:'arrived first',s:21},
  x:{type:'cross',x:b2.pos[2].x,y:b2.pos[2].y+40,s:.6},
  fix:{type:'note',x:320,y:318,w:220,h:50,c:'n0',text:'but → so',size:25,rot:-1.5} });

const B3={}, b3=sentence(B3,'c',[['The','*diligent','scientist','spent','*years'],['*ignoring','his','tests','before','his','*discovery.']],{y0:96,lh:92});
Object.assign(B3,{ ok:{type:'check',x:b3.pos[0].x,y:b3.pos[0].y+40,s:.6}, x:{type:'cross',x:b3.pos[2].x,y:b3.pos[2].y+40,s:.6},
  n1:{type:'note',x:170,y:292,w:300,h:58,c:'n3',text:'diligent = hard-working',size:20,rot:-1.5},
  n2:{type:'note',x:480,y:292,w:280,h:58,c:'n1',text:'ignoring → repeating',size:21,rot:1.5} });

const B4={}, b4=sentence(B4,'d',[['The','weather','was','*cold,','so','the','children','*wore'],['*light','clothes','before','*going','out.']],{y0:74,lh:52,s:22});
B4.ans={type:'note',x:320,y:230,w:250,h:64,c:'n0',text:'light → warm',size:26,rot:-1.5};

const B5={ r1:{type:'note',x:130,y:160,w:170,h:90,c:'n0',text:'Opposite',size:27,rot:-1.5},
  r2:{type:'note',x:320,y:160,w:170,h:90,c:'n3',text:'Link',size:30,rot:1.5},
  r3:{type:'note',x:510,y:160,w:170,h:90,c:'n1',text:'Difficulty',size:24,rot:-1.5},
  k1:{type:'text',x:130,y:245,s:24,hand:true,text:'try it'}, k2:{type:'text',x:320,y:245,s:24,hand:true,text:'check it'}, k3:{type:'text',x:510,y:245,s:24,hand:true,text:'don\'t judge by it'},
  foot:{type:'text',x:320,y:312,s:26,text:'The error clashes with the idea'} };

XP.add({ key:'en-cx-traps', lang:'en', sk:'context', ord:20, title:'Contextual errors: strategies and traps', min:'4 min',
  goals:['Expose the error by trying the opposite word','Check the link between the two halves: result or contrast','Never judge a word by how hard it is','Apply the steps to a full question'],
  scenes:[
  { t:'The error is the opposite', items:B1, beats:[
    { say:'In most questions, the wrong word is the exact opposite of the right one.', show:[...b1.words,...b1.lines], gap:.05 },
    { say:'A wise leader makes his decisions recklessly? Wisdom and recklessness don\'t go together.', show:['ar1','x'] },
    { say:'Try the opposite: thoughtfully. Now the meaning works, so that is the error.', show:['ag0','ag2','ag3','fix'] } ]},
  { t:'Check the linking word', items:B2, beats:[
    { say:'Check the link between the two halves. Is the second a result of the first, or its opposite?', show:[...b2.words,...b2.lines], gap:.05 },
    { say:'She woke up early and caught the bus, so arriving first is the natural result.', show:['c1','ar','c2'] },
    { say:'So the contrast word but doesn\'t fit here. The right word is so.', show:['br2','x','fix'] } ]},
  { t:'Don\'t judge by difficulty', items:B3, beats:[
    { say:'A hard word is not always the error. It may be there just to distract you.', show:[...b3.words,...b3.lines], gap:.05 },
    { say:'Diligent means hard-working, and it fits with years of research.', show:['cg0','ok','n1'] },
    { say:'Ignoring is easy, but it breaks the meaning. A diligent scientist repeats his tests.', show:['cr2','x','n2'] } ]},
  { t:'Your turn: cold weather', items:B4, beats:[
    { say:'Your turn. Find the idea, check the link, then try the opposite.', show:[...b4.words,...b4.lines], gap:.06 },
    { say:'The weather was cold, so the children wore light clothes before going out. Where is the error?', hl:b4.lines } ],
    ask:{ opts:['cold','wore','light','going'], a:2, show:['ans'],
      right:'Well done. So links a cause to its result, and cold weather calls for warm clothes.',
      wrong:'Look at so: it links cause and result. Cold weather calls for warm clothes, so the error is light.' } },
  { t:'Three rules', items:B5, beats:[
    { say:'Remember three rules: try the opposite, check the link, and don\'t let a hard word fool you.', show:['r1','k1','r2','k2','r3','k3'], gap:.3 },
    { say:'A contextual error clashes with the sentence\'s idea, not with how hard the word is.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'Find the contextual error: "Omar studied hard, but he passed the exam with top marks."', o:['studied','hard','but','top'], a:2, e:'Passing is a result of studying hard, so the link should be "so", not the contrast word "but".'},
    {q:'Find the contextual error: "The speaker was known for his eloquence, so his words were clumsy and easy for everyone to follow."', o:['known','eloquence','clumsy','follow'], a:2, e:'"Clumsy" is the opposite of eloquent; the right word would be "graceful" or "clear".'},
    {q:'In a contextual error sentence, the hardest, least common word:', o:['is always the error','is not necessarily the error','is always a linking word','always comes first'], a:1, e:'You judge a word by whether it fits the idea, not by how hard it is.'},
  ] });
})();
