/* Legacy hand-built explainers (percent, balance, analogy) */
(function(){ if(!window.XP||!XP.ready) return;
const {el,note,txt,drawIn,checkMark,crossMark,arrow,tl,AD,tlDone}=XP.h;
/* 10×10 grid used by the percent lesson */
function hundredGrid(p,x0,y0,cell=22,gap=2){ const cells=[]; for(let r=0;r<10;r++) for(let c=0;c<10;c++){ const x=x0+c*(cell+gap), y=y0+r*(cell+gap); const g=el('g',{},p);
  el('rect',{x,y,width:cell,height:cell,rx:4,class:'f-surface2',stroke:'var(--line)','stroke-width':1},g); const f=el('rect',{x,y,width:cell,height:cell,rx:4,class:'f-pri',opacity:0},g); cells.push({g,f,r,c}); } return cells; }

/* balance scale used by the equations lesson */
function makeScale(p){
  const g=el('g',{},p);
  el('path',{d:'M270 332 L370 332 L338 312 L302 312 Z',class:'f-ink'},g);
  el('rect',{x:315,y:120,width:10,height:194,rx:4,class:'f-ink'},g);
  const beam=el('g',{},g); el('rect',{x:150,y:114,width:340,height:12,rx:6,class:'f-ink'},beam); el('circle',{cx:320,cy:120,r:10,class:'f-butter',stroke:'var(--edge)','stroke-width':2},beam);
  const pan=()=>{ const pg=el('g',{},g); el('path',{d:'M0 0 L-62 78 M0 0 L62 78',class:'s-ink'},pg); el('path',{d:'M-72 78 Q0 104 72 78 Z',class:'f-surface',stroke:'var(--edge)','stroke-width':2.5},pg); const c=el('g',{},pg); gsap.set(c,{y:78}); return {g:pg,c,items:[]}; };
  const L=pan(), R=pan(); const st={a:0};
  const setA=a=>{ gsap.set(beam,{rotation:a,svgOrigin:'320 120'}); const r=a*Math.PI/180; gsap.set(L.g,{x:320-165*Math.cos(r),y:120-165*Math.sin(r)}); gsap.set(R.g,{x:320+165*Math.cos(r),y:120+165*Math.sin(r)}); };
  setA(0);
  return { g, L, R, tilt:(a,d=1.1,ease='elastic.out(1,0.45)')=>gsap.to(st,{a,duration:d,ease,onUpdate:()=>setA(st.a)}) };
}
function weight(pan){ const g=el('g',{},pan.c); el('rect',{x:-11,y:-22,width:22,height:22,rx:5,class:'f-butter',stroke:'var(--edge)','stroke-width':2},g); pan.items.push(g); return g; }
function xbox(pan,label='س'){ const g=el('g',{},pan.c); el('rect',{x:-19,y:-38,width:38,height:38,rx:6,class:'f-pri',stroke:'var(--edge)','stroke-width':2},g); el('text',{x:0,y:-12,'text-anchor':'middle','font-size':22,'font-weight':800,class:'t-inv',text:label},g); pan.items.push(g); return g; }
function layout(pan){ // boxes side by side, then weights beside them (3 per row next to a box, 5 per row alone)
  const boxes=pan.items.filter(i=>i.querySelector('text')), ws=pan.items.filter(i=>!i.querySelector('text'));
  const per=boxes.length?3:5, cols=Math.min(per,ws.length), W=boxes.length*42+cols*24+(boxes.length&&cols?6:0), x0=-W/2;
  boxes.forEach((b,i)=>gsap.set(b,{x:x0+21+i*42,y:-2}));
  const wx0=x0+boxes.length*42+(boxes.length&&cols?6:0)+12;
  ws.forEach((w,i)=>{ const row=Math.floor(i/per), col=i%per; gsap.set(w,{x:wx0+col*24,y:-2-row*24}); });
}

/* =================== LESSONS =================== */
const LESSONS={
/* ---------------- 1. percent ---------------- */
percent:{ key:'percent', sk:'arith', ord:40, area:'q', title:'النسبة المئوية من الصفر', min:'٤ دقائق', level:'تأسيس',
  goals:['تفهم معنى النسبة المئوية بصريًا','تحوّل النسبة إلى كسر مألوف','تحسب ١٠٪ و٥٪ و٢٠٪ ذهنيًا','تتجنب فخ الزيادة ثم النقص'],
  scenes:[
  { t:'كم من كل مئة؟', setup(s){ const cells=hundredGrid(s,40,60); const title=txt(s,{x:470,y:120,s:30,text:'النسبة المئوية'}); const sub=txt(s,{x:470,y:160,s:22,cls:'t-hand',text:'= كم من كل ١٠٠؟'}); const cnt=txt(s,{x:470,y:240,s:64,cls:'t-pri',text:'٠'}); const big=note(s,{x:470,y:250,w:170,h:96,c:'n0',text:'٢٥٪',size:52,rot:-4}); gsap.set([title,sub,cnt,big],{opacity:0}); return {cells,title,sub,cnt,big}; },
    beats:[
      { say:'النسبة المئوية سؤال واحد فقط: كم من كل مئة؟', run:c=>tl().from(c.cells.map(x=>x.g),{scale:0,opacity:0,transformOrigin:'50% 50%',duration:.35,stagger:{each:.006,grid:[10,10],from:'start'}}).to([c.title,c.sub],{opacity:1,duration:.5,stagger:.25},'-=.6') },
      { say:'أمامك مئة مربع. سنلوّن منها خمسة وعشرين.', run:c=>{ const o={v:0}; return tl().set(c.cnt,{opacity:1}).to(c.cells.slice(0,25).map(x=>x.f),{opacity:1,duration:.25,stagger:.07}).to(o,{v:25,duration:25*.07,ease:'none',onUpdate:()=>c.cnt.textContent=AD(Math.round(o.v))},'<'); } },
      { say:'خمسة وعشرون من مئة نكتبها خمسة وعشرين في المئة.', run:c=>tl().to(c.cnt,{opacity:0,duration:.2}).fromTo(c.big,{opacity:0,scale:.2},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.7,ease:'back.out(2)'}) },
    ]},
  { t:'النسبة كسرٌ متنكّر', setup(s){ const eq=txt(s,{x:320,y:70,s:34,text:'٢٥٪ = ٢٥ ÷ ١٠٠ = ¼'}); gsap.set(eq,{opacity:0});
      const pie=el('g',{},s); el('circle',{cx:320,cy:200,r:80,class:'f-surface2',stroke:'var(--edge)','stroke-width':2.5},pie); const w=el('circle',{cx:320,cy:200,r:40,fill:'none',stroke:'var(--pink)','stroke-width':80,transform:'rotate(-90 320 200)'},pie); const C=2*Math.PI*40; gsap.set(w,{strokeDasharray:`0 ${C}`}); gsap.set(pie,{opacity:0});
      const notes=[['٥٠٪','½','n1',150],['٢٥٪','¼','n0',320],['١٠٪','⅒','n3',490]].map(([a,b,c,x],i)=>{ const n=note(s,{x,y:190,w:130,h:110,c,text:a,size:36,rot:[-4,3,-2][i]}); gsap.set(n._t,{attr:{y:180}}); el('text',{x,y:228,'text-anchor':'middle','font-size':30,'font-weight':800,class:'t-note',text:'= '+b},n); gsap.set(n,{opacity:0}); return n; });
      return {eq,pie,w,C,notes}; },
    beats:[
      { say:'كل نسبة مئوية هي كسرٌ مقامه مئة.', run:c=>tl().fromTo(c.eq,{opacity:0,y:10},{opacity:1,y:0,duration:.6}) },
      { say:'وخمسة وعشرون من مئة هي الربع تمامًا.', run:c=>tl().to(c.pie,{opacity:1,duration:.3}).to(c.w,{strokeDasharray:`${c.C/4} ${c.C}`,duration:1.1,ease:'power2.out'}) },
      { say:'احفظ هذه الثلاث: خمسون في المئة نصف، وخمسة وعشرون ربع، وعشرة في المئة عُشر.', run:c=>tl().to([c.pie,c.eq],{opacity:0,duration:.3}).fromTo(c.notes,{opacity:0,y:-120},{opacity:1,y:0,duration:.6,ease:'bounce.out',stagger:.6}) },
    ]},
  { t:'حيلة العشرة', setup(s){ const q=txt(s,{x:320,y:66,s:28,text:'١٠٪ من ٢٤٠ = ؟'});
      const digits=['٢','٤','٠'].map((d,i)=>txt(s,{x:250+i*54,y:175,s:84,cls:'t-ink',text:d}));
      const unit=txt(s,{x:430,y:175,s:26,cls:'t-ink2',text:'ريال'}); const res=note(s,{x:320,y:170,w:150,h:90,c:'n0',text:'٢٤',size:52,rot:-3}); gsap.set(res,{opacity:0});
      const ch1=note(s,{x:190,y:290,w:210,h:62,c:'n2',text:'٢٠٪ = ٢ × ٢٤ = ٤٨',size:22,rot:-2}), ch2=note(s,{x:450,y:290,w:210,h:62,c:'n1',text:'٥٪ = ٢٤ ÷ ٢ = ١٢',size:22,rot:2}); gsap.set([ch1,ch2],{opacity:0});
      return {q,digits,unit,res,ch1,ch2}; },
    beats:[
      { say:'لتحسب عشرة في المئة من أي عدد، اقسمه على عشرة.', run:c=>tl().from(c.q,{opacity:0,y:-20,duration:.5}).from(c.digits,{opacity:0,y:30,stagger:.12,duration:.4},'<.2').from(c.unit,{opacity:0,duration:.3}) },
      { say:'أي احذف صفرًا واحدًا، فمئتان وأربعون تصبح أربعة وعشرين.', run:c=>tl().to(c.digits[2],{y:80,opacity:0,rotation:25,transformOrigin:'50% 50%',duration:.7,ease:'power2.in'}).to([c.digits[0],c.digits[1],c.unit],{opacity:0,duration:.3}).fromTo(c.res,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'}) },
      { say:'ومنها تبني الباقي: عشرون في المئة ضعفها، ثمانية وأربعون. وخمسة في المئة نصفها، اثنا عشر.', run:c=>tl().fromTo(c.ch1,{opacity:0,y:30},{opacity:1,y:0,duration:.5}).fromTo(c.ch2,{opacity:0,y:30},{opacity:1,y:0,duration:.5},'+=1.8') },
    ]},
  { t:'دورك: لوّن ٤٠٪', interactive:true, setup(s){ const cols=[]; const x0=110,y0=62,cell=19,gap=2;
      for(let c=0;c<10;c++){ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-pressed':'false','aria-label':'العمود '+AD(c+1)},s); const ring=el('rect',{x:x0+c*(cell+gap)-2,y:y0-2,width:cell+4,height:10*(cell+gap)+2,rx:6,fill:'transparent',class:'hot-ring',stroke:'transparent'},g); const fs=[];
        for(let r=0;r<10;r++){ const y=y0+r*(cell+gap); el('rect',{x:x0+c*(cell+gap),y,width:cell,height:cell,rx:3,class:'f-surface2',stroke:'var(--line)','stroke-width':1},g); fs.push(el('rect',{x:x0+c*(cell+gap),y,width:cell,height:cell,rx:3,class:'f-pink',opacity:0},g)); }
        cols.push({g,fs,on:false}); }
      const pct=txt(s,{x:470,y:150,s:60,cls:'t-pri',text:'٠٪'}); txt(s,{x:470,y:188,s:18,cls:'t-ink2',text:'اضغط الأعمدة لتلوينها'});
      const btn=el('g',{class:'hot',tabindex:0,role:'button','aria-label':'تحقّق'},s); el('rect',{x:405,y:230,width:130,height:50,rx:12,class:'f-edge'},btn); el('rect',{x:401,y:226,width:130,height:50,rx:12,class:'f-pri',stroke:'var(--edge)','stroke-width':2},btn); txt(btn,{x:466,y:259,s:22,cls:'t-inv',text:'تحقّق'});
      gsap.set(btn,{opacity:.45}); return {cols,pct,btn}; },
    beats:[
      { say:'دورك الآن. كل عمود فيه عشرة مربعات. اضغط الأعمدة لتلوّن أربعين في المئة، ثم اضغط تحقّق.', run:c=>tl().from(c.cols.map(x=>x.g),{opacity:0,y:20,stagger:.05,duration:.3}),
        wait:c=>new Promise(res=>{ const upd=()=>{ const n=c.cols.filter(x=>x.on).length; c.pct.textContent=AD(n*10)+'٪'; gsap.to(c.btn,{opacity:n?1:.45,duration:.2}); };
          c.cols.forEach(col=>{ const tog=()=>{ col.on=!col.on; col.g.setAttribute('aria-pressed',String(col.on)); gsap.to(col.fs,{opacity:col.on?1:0,duration:.18,stagger:{each:.02,from:col.on?'end':'start'}}); upd(); };
            col.g.addEventListener('click',tog); col.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); tog(); } }); });
          const chk=()=>{ const n=c.cols.filter(x=>x.on).length; if(!n) return; c.cols.forEach(x=>x.g.style.pointerEvents='none'); res(n===4); };
          c.btn.addEventListener('click',chk); c.btn.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); chk(); } }); }),
        right:'ممتاز! أربعة أعمدة من عشرة، أي أربعون مربعًا من مئة.', wrong:'قريب! أربعون في المئة تعني أربعين مربعًا من مئة، أي أربعة أعمدة كاملة. هكذا.',
        after:(c,ok)=>{ const t=tl(); if(!ok){ c.cols.forEach((col,i)=>{ col.on=i<4; t.to(col.fs,{opacity:col.on?1:0,duration:.15},'<.05'); }); t.call(()=>c.pct.textContent='٤٠٪'); } const m=checkMark(c.pct.parentNode,560,125); t.from(m.g,{scale:0,transformOrigin:'50% 50%',duration:.4,ease:'back.out(2)'}).add(drawIn(m.pa,.4)); return t; } },
    ]},
  { t:'الخصم وفخ الرجوع', setup(s){ const bar=el('rect',{x:120,y:80,width:400,height:46,rx:10,class:'f-n3',stroke:'var(--edge)','stroke-width':2},s); const seg=el('rect',{x:420,y:80,width:100,height:46,rx:10,class:'f-pink',opacity:0},s);
      const lab=txt(s,{x:320,y:112,s:24,cls:'t-note',text:'٢٠٠ ريال'}); const tag=note(s,{x:560,y:60,w:110,h:48,c:'n1',text:'خصم ٢٥٪',size:20,rot:10}); const after=txt(s,{x:270,y:160,s:24,cls:'t-pri',text:'بعد الخصم: ١٥٠ ريال'});
      const g2=el('g',{},s); const vals=[['١٠٠',140],['١٢٠',320],['٩٦',500]].map(([v,x])=>note(g2,{x,y:262,w:110,h:64,c:'n0',text:v,size:32}));
      const a1=arrow(g2,200,236,262,236,'s-pri',-26), a2=arrow(g2,380,236,442,236,'s-pink',-26); const l1=txt(g2,{x:230,y:208,s:18,cls:'t-pri',text:'+٢٠٪'}), l2=txt(g2,{x:410,y:208,s:18,cls:'t-hand',text:'−٢٠٪ من ١٢٠'});
      const ring=el('ellipse',{cx:500,cy:262,rx:72,ry:44,class:'s-pink'},g2);
      gsap.set([bar,lab,tag,after,g2],{opacity:0}); gsap.set(ring,{opacity:0}); return {bar,seg,lab,tag,after,g2,vals,a1,a2,l1,l2,ring}; },
    beats:[
      { say:'قميص سعره مئتا ريال، وعليه خصم خمسة وعشرين في المئة.', run:c=>tl().to([c.bar,c.lab],{opacity:1,duration:.4}).fromTo(c.bar,{attr:{width:0}},{attr:{width:400},duration:.8,ease:'power2.out'},'<').fromTo(c.tag,{opacity:0,rotation:-30},{opacity:1,rotation:10,duration:.7,ease:'elastic.out(1,.5)'}) },
      { say:'ربع المئتين خمسون، نقطعها من السعر، فيبقى مئة وخمسون.', run:c=>tl().to(c.seg,{opacity:1,duration:.3}).to(c.seg,{x:40,y:40,rotation:12,opacity:0,transformOrigin:'50% 50%',duration:.9,ease:'power2.in'},'+=.4').to(c.bar,{attr:{width:300},duration:.5},'<.3').to(c.lab,{attr:{x:270},duration:.5},'<').call(()=>c.lab.textContent='١٥٠ ريال').to(c.after,{opacity:1,duration:.4}) },
      { say:'وانتبه لفخ شهير: زيادة عشرين في المئة ثم نقص عشرين في المئة لا يعيدك للأصل.', run:c=>{ const t=tl().to(c.g2,{opacity:1,duration:.2}); c.vals.forEach((v,i)=>{ t.fromTo(v,{opacity:0,y:20},{opacity:1,y:0,duration:.4},i?'+=.5':'<'); if(i<2){ const a=i?c.a2:c.a1; t.add(drawIn(a.pa,.5)).fromTo(a.hp,{opacity:0},{opacity:1,duration:.1}).fromTo(i?c.l2:c.l1,{opacity:0},{opacity:1,duration:.3}); } }); return t; } },
      { say:'لأن النقص يُحسب من المئة والعشرين لا من المئة، فالنتيجة ستة وتسعون.', run:c=>tl().set(c.ring,{opacity:1}).add(drawIn(c.ring,.9)).to(c.vals[2],{scale:1.12,transformOrigin:'50% 50%',yoyo:true,repeat:1,duration:.25}) },
    ]},
  ],
  quiz:[
    {q:'كم ١٥٪ من ٤٠٠؟', o:['٤٠','٦٠','٧٥','١٥'], a:1, e:'١٠٪ من ٤٠٠ = ٤٠، و٥٪ نصفها = ٢٠، والمجموع ٦٠.'},
    {q:'سعر ٨٠ ريالًا بعد خصم ٢٥٪ يصبح:', o:['٥٥ ريالًا','٦٠ ريالًا','٢٠ ريالًا','٦٥ ريالًا'], a:1, e:'ربع ٨٠ = ٢٠، و٨٠ − ٢٠ = ٦٠.'},
    {q:'زاد عددٌ ١٠٪ ثم نقص ١٠٪. النتيجة مقارنة بالأصل:', o:['تساويه','أكثر منه بـ ١٪','أقل منه بـ ١٪','أقل منه بـ ١٠٪'], a:2, e:'١٠٠ ← ١١٠ ← ٩٩، أي أقل بـ ١٪ لأن النقص من ١١٠.'},
  ]},

/* ---------------- 2. equations as a balance ---------------- */
balance:{ key:'balance', sk:'algebra', ord:10, area:'q', title:'المعادلة ميزان', min:'٤ دقائق', level:'تأسيس',
  goals:['ترى المعادلة كميزان متوازن','تطبّق قاعدة: ما تفعله في طرف افعله في الآخر','تحل معادلة من خطوتين','تتحقق من الحل بالتعويض'],
  scenes:[
  { t:'المعادلة ميزان', setup(s){ const sc=makeScale(s); const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'س + ٣ = ٧'}); gsap.set(eq,{opacity:0}); gsap.set(sc.g,{opacity:0}); return {sc,eq}; },
    beats:[
      { say:'المعادلة ميزانٌ متوازن: الطرفان متساويان دائمًا.', run:c=>tl().to(c.sc.g,{opacity:1,duration:.4}).add(c.sc.tilt(9,.5,'power2.out')).add(c.sc.tilt(0,1.4)) },
      { say:'في الكفة اليسرى صندوقٌ مجهول نسمّيه سين ومعه ثلاثة أوزان، وفي اليمنى سبعة أوزان.', run:c=>{ const L=c.sc.L,R=c.sc.R; const b=xbox(L); const w1=[1,2,3].map(()=>weight(L)); const w2=[1,2,3,4,5,6,7].map(()=>weight(R)); layout(L); layout(R);
          return tl().from(b,{y:'-=180',opacity:0,duration:.6,ease:'bounce.out'}).from(w1,{y:'-=160',opacity:0,stagger:.12,duration:.45,ease:'bounce.out'}).from(w2,{y:'-=160',opacity:0,stagger:.1,duration:.45,ease:'bounce.out'},'<.3').to(c.eq,{opacity:1,duration:.5}); } },
    ]},
  { t:'ما تفعله هنا افعله هناك', setup(s){ const sc=makeScale(s); const b=xbox(sc.L); const lw=[1,2,3].map(()=>weight(sc.L)); const rw=[1,2,3,4,5,6,7].map(()=>weight(sc.R)); layout(sc.L); layout(sc.R);
      const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'س + ٣ = ٧'}); const ne=txt(s,{x:320,y:96,s:26,cls:'t-bad',text:'اختلّ التوازن!'}); gsap.set(ne,{opacity:0});
      const res=note(s,{x:320,y:60,w:170,h:64,c:'n0',text:'س = ٤',size:34,rot:-3}); gsap.set(res,{opacity:0}); return {sc,b,lw,rw,eq,ne,res}; },
    beats:[
      { say:'نريد أن يبقى الصندوق وحده، فلنرفع الأوزان الثلاثة من اليسار.', run:c=>tl().to(c.lw,{y:'-=140',opacity:0,stagger:.12,duration:.5,ease:'power2.in'}).add(c.sc.tilt(14),'-=.1') },
      { say:'اختلّ الميزان! لأننا غيّرنا طرفًا واحدًا فقط.', run:c=>tl().to(c.ne,{opacity:1,duration:.3}).to(c.sc.g,{x:6,duration:.07,yoyo:true,repeat:5}) },
      { say:'نرفع ثلاثة من اليمين أيضًا، فيعود التوازن: سين يساوي أربعة.', run:c=>tl().to(c.ne,{opacity:0,duration:.2}).to(c.rw.slice(4),{y:'-=140',opacity:0,stagger:.12,duration:.5,ease:'power2.in'}).add(c.sc.tilt(0)).to(c.eq,{opacity:0,duration:.3},'<').fromTo(c.res,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'}) },
    ]},
  { t:'القسمة على الطرفين', setup(s){ const sc=makeScale(s); const bs=[xbox(sc.L),xbox(sc.L)]; const rw=Array.from({length:10},()=>weight(sc.R)); layout(sc.L); layout(sc.R);
      const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'٢س = ١٠'}); const res=note(s,{x:320,y:60,w:170,h:64,c:'n2',text:'س = ٥',size:34,rot:3}); gsap.set(res,{opacity:0}); return {sc,bs,rw,eq,res}; },
    beats:[
      { say:'هنا صندوقان متماثلان يوازنان عشرة أوزان.', run:c=>tl().from(c.bs,{opacity:0,y:'-=160',stagger:.2,duration:.5,ease:'bounce.out'}).from(c.rw,{opacity:0,y:'-=160',stagger:.07,duration:.4,ease:'bounce.out'},'<.2') },
      { say:'نقسم الطرفين على اثنين: نُبقي صندوقًا واحدًا، ونصف الأوزان، أي خمسة.', run:c=>tl().to(c.bs[1],{x:'-=60',y:'-=120',opacity:0,duration:.6,ease:'power2.in'}).to(c.rw.slice(5),{y:'-=140',opacity:0,stagger:.08,duration:.45,ease:'power2.in'},'<').add(c.sc.tilt(0)).to(c.eq,{opacity:0,duration:.3}).fromTo(c.res,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'}) },
    ]},
  { t:'دورك: الخطوة الأولى', interactive:true, setup(s){ const eq=txt(s,{x:320,y:72,s:40,dir:'ltr',text:'٣س + ٢ = ١٤'}); const ask=txt(s,{x:320,y:112,s:20,cls:'t-ink2',text:'ما الخطوة الأولى الصحيحة؟'});
      const opts=['اطرح ٢ من الطرفين','اقسم الطرف الأيسر فقط على ٣','اطرح ٢ من الطرف الأيسر فقط'].map((t,i)=>{ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-label':t},s); const y=140+i*62; el('rect',{x:124,y:y+4,width:400,height:50,rx:12,class:'f-edge'},g); const r=el('rect',{x:120,y,width:400,height:50,rx:12,class:'f-surface hot-ring',stroke:'var(--edge)','stroke-width':2},g); txt(g,{x:320,y:y+33,s:21,text:t}); return {g,r}; });
      const steps=el('g',{},s); const s1=txt(steps,{x:320,y:170,s:34,dir:'ltr',cls:'t-ink',text:'٣س = ١٢'}), s2=note(steps,{x:320,y:250,w:170,h:64,c:'n0',text:'س = ٤',size:34,rot:-3}); gsap.set([s1,s2],{opacity:0});
      return {eq,ask,opts,steps,s1,s2}; },
    beats:[
      { say:'دورك. في المعادلة ثلاثة سين زائد اثنين يساوي أربعة عشر، ما الخطوة الأولى الصحيحة؟', run:c=>tl().from(c.eq,{opacity:0,y:-20,duration:.4}).from(c.opts.map(o=>o.g),{opacity:0,x:40,stagger:.15,duration:.35}),
        wait:c=>new Promise(res=>{ c.opts.forEach((o,i)=>{ const pick=()=>{ c.opts.forEach(x=>x.g.style.pointerEvents='none'); o.r.setAttribute('class',(i===0?'f-oksoft':'f-badsoft')+' hot-ring'); if(i!==0) c.opts[0].r.setAttribute('class','f-oksoft hot-ring'); res(i===0); }; o.g.addEventListener('click',pick); o.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); }); }),
        right:'صحيح. نطرح اثنين من الطرفين فيصبح ثلاثة سين يساوي اثني عشر، ثم نقسم على ثلاثة: سين يساوي أربعة.',
        wrong:'هذه الخطوة تغيّر طرفًا واحدًا فتكسر التوازن. الصحيح أن نطرح اثنين من الطرفين، ثم نقسم على ثلاثة، فيكون سين أربعة.',
        after:c=>tl().to([c.ask,...c.opts.map(o=>o.g)],{opacity:0,duration:.4,delay:.8}).to(c.s1,{opacity:1,duration:.5}).fromTo(c.s2,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'},'+=1.2') },
    ]},
  { t:'تحقّق بالتعويض', setup(s){ const a=txt(s,{x:320,y:110,s:40,dir:'ltr',text:'٣ × ٤ + ٢'}); const b=txt(s,{x:320,y:180,s:40,dir:'ltr',cls:'t-pri',text:'= ١٤'}); const m=checkMark(s,440,168,1.2);
      const tip=note(s,{x:320,y:275,w:420,h:70,c:'n3',text:'في الاختيار من متعدد: جرّب التعويض بالخيارات',size:19,rot:-1.5}); gsap.set([a,b,m.g,tip],{opacity:0}); return {a,b,m,tip}; },
    beats:[
      { say:'بعد الحل عوّض لتتأكد: ثلاثة في أربعة زائد اثنين.', run:c=>tl().fromTo(c.a,{opacity:0,y:20},{opacity:1,y:0,duration:.5}) },
      { say:'يساوي أربعة عشر، والطرفان متساويان، فالحل صحيح.', run:c=>tl().to(c.b,{opacity:1,duration:.4}).set(c.m.g,{opacity:1}).from(c.m.g,{scale:0,transformOrigin:'50% 50%',duration:.4,ease:'back.out(2)'}).add(drawIn(c.m.pa,.4)) },
      { say:'وفي الاختيار من متعدد، التعويض بالخيارات أحيانًا أسرع من الحل نفسه.', run:c=>tl().fromTo(c.tip,{opacity:0,y:40},{opacity:1,y:0,duration:.6,ease:'back.out(1.6)'}) },
    ]},
  ],
  quiz:[
    {q:'إذا كان س − ٥ = ٩ فإن س =', o:['٤','١٤','٤٥','−٤'], a:1, e:'نضيف ٥ للطرفين: سين = ٩ + ٥ = ١٤.'},
    {q:'إذا كان ٤س = ٢٨ فإن س =', o:['٢٤','٣٢','٧','١١٢'], a:2, e:'نقسم الطرفين على ٤: سين = ٧.'},
    {q:'إذا كان ٢س + ٦ = ٢٠ فإن س =', o:['٧','١٣','١٠','٤'], a:0, e:'نطرح ٦: ٢س = ١٤، ثم نقسم على ٢: سين = ٧.'},
  ]},

/* ---------------- 3. verbal analogy ---------------- */
analogy:{ key:'analogy', sk:'analogy', ord:10, area:'v', title:'التناظر اللفظي: ابنِ الجسر', min:'٤ دقائق', level:'تأسيس',
  goals:['تفهم أن التناظر سؤال عن العلاقة لا عن الكلمات','تبني جملة جسر قصيرة','تختبر كل خيار بالجسر نفسه','تنتبه لاتجاه العلاقة'],
  scenes:[
  { t:'ما هو التناظر؟', setup(s){ const a=note(s,{x:200,y:170,w:150,h:90,c:'n0',text:'قلم',size:40,rot:-4}), b=note(s,{x:440,y:170,w:150,h:90,c:'n3',text:'كتابة',size:36,rot:3});
      const col=txt(s,{x:320,y:186,s:48,text:':'}); const ar=arrow(s,405,120,235,120,'s-pink',-70); const lab=txt(s,{x:320,y:52,s:26,cls:'t-hand',text:'ما العلاقة؟'}); gsap.set([a,b,col,ar.hp,lab],{opacity:0}); gsap.set(ar.pa,{opacity:0}); return {a,b,col,ar,lab}; },
    beats:[
      { say:'في سؤال التناظر تُعطى كلمتين بينهما علاقة، والمطلوب زوجٌ آخر بينهما العلاقة نفسها.', run:c=>tl().fromTo(c.a,{opacity:0,y:-140,rotation:-25},{opacity:1,y:0,rotation:-4,duration:.8,ease:'bounce.out'}).to(c.col,{opacity:1,duration:.3}).fromTo(c.b,{opacity:0,y:-140,rotation:25},{opacity:1,y:0,rotation:3,duration:.8,ease:'bounce.out'},'<') },
      { say:'والسر: لا تنظر للكلمات نفسها، بل للعلاقة بينها.', run:c=>tl().set(c.ar.pa,{opacity:1}).add(drawIn(c.ar.pa,.8)).to(c.ar.hp,{opacity:1,duration:.1}).fromTo(c.lab,{opacity:0,scale:.6},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.5,ease:'back.out(2)'}) },
    ]},
  { t:'ابنِ الجملة الجسر', setup(s){ const words=['القلم','أداةٌ','تُستخدم','لـ','الكتابة']; const xs=[520,420,315,232,160]; const ws=words.map((w,i)=>txt(s,{x:xs[i],y:150,s:38,cls:i===0||i===4?'t-pri':'t-ink',text:w}));
      const ul=el('path',{d:'M580 172 Q340 190 110 172',class:'s-pink'},s); const chip=note(s,{x:320,y:250,w:240,h:62,c:'n2',text:'أداة ← وظيفتها',size:26,rot:-2}); gsap.set([...ws,chip],{opacity:0}); gsap.set(ul,{opacity:0}); return {ws,ul,chip}; },
    beats:[
      { say:'حوّل العلاقة إلى جملة قصيرة واضحة نسمّيها: الجسر.', run:c=>tl().fromTo(c.ws,{opacity:0,y:24},{opacity:1,y:0,stagger:.35,duration:.4,ease:'back.out(2)'}) },
      { say:'القلم أداةٌ تُستخدم للكتابة. إذن العلاقة: أداة ووظيفتها.', run:c=>tl().set(c.ul,{opacity:1}).add(drawIn(c.ul,.7)).fromTo(c.chip,{opacity:0,y:30},{opacity:1,y:0,duration:.5,ease:'back.out(2)'}) },
    ]},
  { t:'اختبر الخيارات بالجسر', setup(s){ txt(s,{x:320,y:60,s:22,cls:'t-ink2',text:'الـ ____ أداةٌ تُستخدم لـ ____'});
      const slotA=el('rect',{x:360,y:84,width:120,height:48,rx:10,fill:'transparent',stroke:'var(--pri)','stroke-width':2.5,'stroke-dasharray':'6 6'},s), slotB=el('rect',{x:150,y:84,width:120,height:48,rx:10,fill:'transparent',stroke:'var(--pri)','stroke-width':2.5,'stroke-dasharray':'6 6'},s);
      txt(s,{x:315,y:116,s:20,cls:'t-ink2',text:'تُستخدم لـ'});
      const pairs=[['مقص','قص','n0',true],['كتاب','مكتبة','n1',false],['شجرة','ورقة','n3',false]].map(([a,b,col,ok],i)=>{ const g=el('g',{},s); const x=[500,320,140][i];
        const na=note(g,{x:x+42,y:280,w:80,h:52,c:col,text:a,size:22}), nb=note(g,{x:x-42,y:280,w:80,h:52,c:col,text:b,size:22}); txt(g,{x,y:287,s:22,text:':'}); return {g,na,nb,ok,x}; });
      return {pairs,slotA,slotB}; },
    beats:[0,1,2].map(i=>({
      say:['نضع كل خيار في الجسر نفسه. مقص وقص: المقص أداةٌ تُستخدم للقص. يصلح.','كتاب ومكتبة: الكتاب أداةٌ تُستخدم للمكتبة؟ لا يستقيم.','شجرة وورقة: علاقة كلٍّ وجزء، لا أداة ووظيفة. نستبعدها.'][i],
      run:c=>{ const p=c.pairs[i]; const t=tl(); const dxA=420-(p.x+42), dxB=210-(p.x-42);
        t.to(p.na,{x:dxA,y:-172,duration:.6,ease:'power2.inOut'}).to(p.nb,{x:dxB,y:-172,duration:.6,ease:'power2.inOut'},'<.1');
        if(p.ok){ const m=checkMark(c.pairs[0].g.parentNode,560,108); t.from(m.g,{scale:0,transformOrigin:'50% 50%',duration:.35,ease:'back.out(2)'}).add(drawIn(m.pa,.35)).to(m.g,{opacity:0,duration:.3,delay:1}); t.to([p.na,p.nb],{x:0,y:0,duration:.5}).call(()=>el('rect',{x:p.x-86,y:250,width:172,height:62,rx:12,fill:'none',stroke:'var(--ok)','stroke-width':4},p.g)); }
        else { const m=crossMark(c.pairs[0].g.parentNode,560,108); t.to([p.na,p.nb],{x:'+=8',duration:.06,yoyo:true,repeat:5}).from(m.g,{scale:0,transformOrigin:'50% 50%',duration:.3},'<').to(m.g,{opacity:0,duration:.3,delay:.9}).to([p.na,p.nb],{x:0,y:0,duration:.5}).to(p.g,{opacity:.35,duration:.3}); }
        return t; } })) },
  { t:'دورك: طبيب ومستشفى', interactive:true, setup(s){ const a=note(s,{x:230,y:62,w:130,h:58,c:'n0',text:'مستشفى',size:24,rot:2}), b=note(s,{x:410,y:62,w:130,h:58,c:'n0',text:'طبيب',size:26,rot:-3}); txt(s,{x:320,y:72,s:32,text:':'});
      const hint=txt(s,{x:320,y:128,s:20,cls:'t-hand',text:'الجسر: يعمل الطبيب في المستشفى'});
      const opts=[['معلّم','مدرسة'],['كتاب','قارئ'],['ماء','عطش'],['قلم','حبر']].map(([x,y],i)=>{ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-label':x+' : '+y},s); const cx=[455,185][i%2], cy=[178,258][Math.floor(i/2)];
        el('rect',{x:cx-118,y:cy-26,width:236,height:56,rx:12,class:'f-edge'},g); const r=el('rect',{x:cx-122,y:cy-30,width:236,height:56,rx:12,class:'f-surface hot-ring',stroke:'var(--edge)','stroke-width':2},g); txt(g,{x:cx-4,y:cy+6,s:23,text:x+' : '+y}); return {g,r}; });
      return {opts,hint}; },
    beats:[
      { say:'دورك. طبيب ومستشفى. ابنِ الجسر في ذهنك: يعمل الطبيب في المستشفى. أيّ زوج يطابقه؟', run:c=>tl().from(c.hint,{opacity:0,duration:.4}).from(c.opts.map(o=>o.g),{opacity:0,y:20,stagger:.12,duration:.35}),
        wait:c=>new Promise(res=>{ c.opts.forEach((o,i)=>{ const pick=()=>{ c.opts.forEach(x=>x.g.style.pointerEvents='none'); o.r.setAttribute('class',(i===0?'f-oksoft':'f-badsoft')+' hot-ring'); if(i) c.opts[0].r.setAttribute('class','f-oksoft hot-ring'); res(i===0); }; o.g.addEventListener('click',pick); o.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); }); }),
        right:'أحسنت. يعمل المعلم في المدرسة: العلاقة نفسها، شخصٌ ومكان عمله.',
        wrong:'جرّب الجسر: يعمل الكتاب في القارئ؟ لا. الزوج الوحيد الذي يصلح: يعمل المعلم في المدرسة.',
        after:c=>tl().to(c.opts[0].g,{scale:1.06,transformOrigin:'50% 50%',yoyo:true,repeat:1,duration:.25}) },
    ]},
  { t:'فخ الاتجاه', setup(s){ const p1=el('g',{},s), p2=el('g',{},s);
      note(p1,{x:240,y:110,w:120,h:60,c:'n2',text:'دجاجة',size:24,rot:2}); note(p1,{x:400,y:110,w:120,h:60,c:'n2',text:'بيضة',size:26,rot:-2}); txt(p1,{x:320,y:120,s:30,text:':'});
      const a2=note(p2,{x:400,y:250,w:120,h:60,c:'n1',text:'دجاجة',size:24,rot:-2}), b2=note(p2,{x:240,y:250,w:120,h:60,c:'n1',text:'بيضة',size:26,rot:2}); txt(p2,{x:320,y:260,s:30,text:':'});
      const lab1=txt(s,{x:320,y:58,s:20,cls:'t-hand',text:'البيضة تخرج من الدجاجة'}); const x=crossMark(s,540,250); const ar=arrow(s,470,190,170,190,'s-pri',-10);
      gsap.set([p1,p2,lab1,x.g,ar.hp],{opacity:0}); gsap.set(ar.pa,{opacity:0}); return {p1,p2,a2,b2,lab1,x,ar}; },
    beats:[
      { say:'انتبه لترتيب الكلمتين. بيضة ودجاجة: البيضة تخرج من الدجاجة.', run:c=>tl().fromTo(c.p1,{opacity:0,y:-40},{opacity:1,y:0,duration:.5}).to(c.lab1,{opacity:1,duration:.4}) },
      { say:'فإذا جاء الخيار دجاجة وبيضة، فالعلاقة معكوسة، وهذا خطأ شائع.', run:c=>tl().to(c.p2,{opacity:1,duration:.3}).to(c.a2,{x:-160,duration:.6,ease:'power2.inOut'}).to(c.b2,{x:160,duration:.6,ease:'power2.inOut'},'<').to(c.x.g,{opacity:1,duration:.2}).from(c.x.g,{scale:0,transformOrigin:'50% 50%',duration:.35,ease:'back.out(2)'},'<') },
      { say:'اقرأ الجسر دائمًا بالترتيب نفسه: الكلمة الأولى ثم الثانية.', run:c=>tl().set(c.ar.pa,{opacity:1}).add(drawIn(c.ar.pa,.8)).to(c.ar.hp,{opacity:1,duration:.1}) },
    ]},
  ],
  quiz:[
    {q:'مِشرط : جرّاح', o:['كتاب : مكتبة','فرشاة : رسّام','سيارة : طريق','بحر : سمك'], a:1, e:'الجسر: المشرط أداة يستخدمها الجرّاح، والفرشاة أداة يستخدمها الرسّام.'},
    {q:'عطش : ماء', o:['نار : دخان','مطر : غيم','جوع : طعام','نوم : سرير'], a:2, e:'الجسر: العطش يزول بالماء، والجوع يزول بالطعام.'},
    {q:'غصن : شجرة', o:['يد : إصبع','إصبع : يد','قلم : دفتر','باب : مفتاح'], a:1, e:'الغصن جزء من الشجرة، والإصبع جزء من اليد. «يد : إصبع» العلاقة نفسها لكن معكوسة.'},
  ]},
};

['percent','balance','analogy'].forEach(k=>XP.add(LESSONS[k]));
})();
