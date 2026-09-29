
/* =================== utilities =================== */
const $=s=>document.querySelector(s);
const AD=s=>String(s).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]).replace(/\./g,'٫');
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},parent){ const e=document.createElementNS(NS,tag); for(const k in attrs){ if(k==='text') e.textContent=attrs[k]; else e.setAttribute(k,attrs[k]); } if(parent) parent.appendChild(e); return e; }
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={ get(k,d){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} } };
const IC={
  play:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
  pause:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" stroke-width="3.2"/></svg>',
  next:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
  prev:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  replay:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/></svg>',
  vol:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  cc:'<svg class="ui-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 10.5a2.5 2.5 0 1 0 0 3M17 10.5a2.5 2.5 0 1 0 0 3"/></svg>',
  motion:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M4 17c3-8 6-8 8-4s5 4 8-4"/><circle cx="20" cy="9" r="1.6" fill="currentColor"/></svg>',
  tap:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11l4.6.9a2 2 0 0 1 1.6 2.3l-.8 4.3A3 3 0 0 1 14.5 21H11a3 3 0 0 1-2.3-1.1L5.5 16a1.5 1.5 0 0 1 2.2-2L9 15.3"/></svg>',
  check:'<svg class="ui-icon" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
};

/* =================== narration (browser Arabic voice, with timed-caption fallback) =================== */
const TTS={ ok:'speechSynthesis' in window, voice:null, on:true, rate:1, cur:null, wordCb:null,
  pick(){ if(!this.ok) return; const vs=speechSynthesis.getVoices()||[]; this.voice=vs.find(v=>/^ar[-_]SA/i.test(v.lang))||vs.find(v=>/^ar/i.test(v.lang))||null; renderVoiceBadge(); },
  usable(){ return this.on&&this.ok&&!!this.voice; },
  // Resolves only when the sentence finishes naturally; pause() stops it and resume() replays the same sentence.
  say(text,id){ return new Promise(resolve=>{ const job={text,id,resolve,stopped:false,timers:[]}; this.cur=job; this._run(job); }); },
  _clip(job){ const src=this.on&&job.id&&AUDIO[job.id]; if(!src) return false;
    const words=job.text.split(/\s+/); captionWords(words);
    const a=job.audio||(job.audio=new Audio(src)); a.playbackRate=this.rate; a.preservesPitch=true;
    const tick=()=>{ if(this.cur!==job||job.stopped) return; if(a.duration) captionIdx(Math.min(words.length-1,Math.floor(a.currentTime/a.duration*words.length))); job.raf=requestAnimationFrame(tick); };
    a.onended=()=>{ if(this.cur===job&&!job.stopped){ cancelAnimationFrame(job.raf); captionAll(); this.cur=null; job.resolve(); } };
    a.onerror=()=>{ if(this.cur===job){ job.audio=null; delete AUDIO[job.id]; this._run(job); } };
    a.play().then(()=>{ job.raf=requestAnimationFrame(tick); }).catch(()=>{ if(this.cur===job){ job.audio=null; delete AUDIO[job.id]; this._run(job); } });
    return true; },
  _run(job){
    if(this._clip(job)) return;
    const words=job.text.split(/\s+/); captionWords(words);
    if(this.usable()){
      try{ speechSynthesis.cancel(); }catch(e){}
      const u=new SpeechSynthesisUtterance(job.text); u.voice=this.voice; u.lang=this.voice.lang; u.rate=Math.min(1.6,this.rate*0.95);
      job.u=u; let bounded=false;
      u.onboundary=e=>{ if(e.name&&e.name!=='word') return; bounded=true; captionAt(job.text,e.charIndex); };
      u.onend=()=>{ if(this.cur===job&&!job.stopped){ captionAll(); this.cur=null; job.resolve(); } };
      u.onerror=()=>{ if(this.cur===job&&!job.stopped){ this.cur=null; job.resolve(); } };
      speechSynthesis.speak(u);
      // Some voices never fire boundary events: fall back to timed highlighting after a moment.
      const est=this._est(job.text); job.timers.push(setTimeout(()=>{ if(!bounded) this._timedWords(job,est); },500));
    } else {
      const est=this._est(job.text); this._timedWords(job,est);
      job.timers.push(setTimeout(()=>{ if(this.cur===job&&!job.stopped){ captionAll(); this.cur=null; job.resolve(); } },est+250));
    }
  },
  _est(t){ return Math.max(1500,(t.length/13)*1000/this.rate); },
  _timedWords(job,ms){ const n=job.text.split(/\s+/).length; for(let i=0;i<n;i++) job.timers.push(setTimeout(()=>{ if(this.cur===job&&!job.stopped) captionIdx(i); },(ms*i)/n)); },
  pause(){ const j=this.cur; if(!j) return; j.stopped=true; j.timers.forEach(clearTimeout); j.timers=[]; if(j.audio){ j.audio.pause(); cancelAnimationFrame(j.raf); return; } try{ speechSynthesis.cancel(); }catch(e){} },
  // a recorded clip continues from where it stopped; a browser voice restarts the sentence
  resume(){ const j=this.cur; if(!j) return; j.stopped=false; if(j.audio&&this.on){ j.audio.playbackRate=this.rate; j.audio.play().then(()=>{ const w=j.text.split(/\s+/); const tick=()=>{ if(this.cur!==j||j.stopped) return; if(j.audio.duration) captionIdx(Math.min(w.length-1,Math.floor(j.audio.currentTime/j.audio.duration*w.length))); j.raf=requestAnimationFrame(tick); }; j.raf=requestAnimationFrame(tick); }).catch(()=>{}); return; } j.audio=null; this._run(j); },
  stop(){ const j=this.cur; if(j){ j.stopped=true; j.timers.forEach(clearTimeout); if(j.audio) j.audio.pause(); cancelAnimationFrame(j.raf); } this.cur=null; try{ speechSynthesis.cancel(); }catch(e){} }
};
if(TTS.ok){ TTS.pick(); speechSynthesis.onvoiceschanged=()=>TTS.pick(); }

/* captions */
let CAPW=[];
function captionWords(words){ const c=$('#cap'); if(!c) return; CAPW=words; c.innerHTML=words.map((w,i)=>`<span class="w fut" data-i="${i}">${esc(w)}</span>`).join(' '); }
function captionIdx(i){ const c=$('#cap'); if(!c) return; c.querySelectorAll('.w').forEach((s,j)=>{ s.className='w '+(j<i?'past':j===i?'on':'fut'); }); }
function captionAt(text,ci){ const before=text.slice(0,ci).trim(); const i=before?before.split(/\s+/).length:0; captionIdx(i); }
function captionAll(){ const c=$('#cap'); if(!c) return; c.querySelectorAll('.w').forEach(s=>s.className='w past'); }
function captionText(t){ const c=$('#cap'); if(c) c.innerHTML=esc(t); }

/* =================== SVG building blocks =================== */
function note(p,{x,y,w=120,h=70,c='n0',text='',size=28,rot=0,cls='t-note'}){
  const g=el('g',{},p); el('rect',{x:x-w/2+4,y:y-h/2+4,width:w,height:h,rx:6,class:'f-edge'},g); el('rect',{x:x-w/2,y:y-h/2,width:w,height:h,rx:6,class:'f-'+c,stroke:'var(--edge)','stroke-width':2},g);
  const t=el('text',{x,y:y+size*0.36,'text-anchor':'middle','font-size':size,'font-weight':800,class:cls,text},g);
  gsap.set(g,{rotation:rot,transformOrigin:'50% 50%'}); g._t=t; return g; }
function txt(p,{x,y,s=24,cls='t-ink',text='',w=800,anchor='middle',font,dir}){ const a={x,y,'font-size':s,'font-weight':w,'text-anchor':anchor,class:cls,text}; if(font) a['font-family']=font; if(dir) a.direction=dir; return el('text',a,p); }
function drawIn(path,d=0.8){ const L=path.getTotalLength?path.getTotalLength():300; gsap.set(path,{strokeDasharray:L,strokeDashoffset:L}); return gsap.to(path,{strokeDashoffset:0,duration:d,ease:'power2.inOut'}); }
function checkMark(p,x,y,s=1){ const g=el('g',{},p); el('circle',{cx:x,cy:y,r:22*s,class:'f-oksoft'},g); const pa=el('path',{d:`M${x-10*s} ${y} l${7*s} ${8*s} l${14*s} -${16*s}`,class:'s-ok'},g); return {g,pa}; }
function crossMark(p,x,y,s=1){ const g=el('g',{},p); el('circle',{cx:x,cy:y,r:22*s,class:'f-badsoft'},g); const a=el('path',{d:`M${x-9*s} ${y-9*s} L${x+9*s} ${y+9*s} M${x+9*s} ${y-9*s} L${x-9*s} ${y+9*s}`,class:'s-bad'},g); return {g,pa:a}; }
function arrow(p,x1,y1,x2,y2,cls='s-pri',bend=-40){ const mx=(x1+x2)/2, my=Math.min(y1,y2)+bend; const d=`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`; const pa=el('path',{d,class:cls},p);
  const ang=Math.atan2(y2-my,x2-mx), h=12; const hd=`M${x2-h*Math.cos(ang-0.5)} ${y2-h*Math.sin(ang-0.5)} L${x2} ${y2} L${x2-h*Math.cos(ang+0.5)} ${y2-h*Math.sin(ang+0.5)}`; const hp=el('path',{d:hd,class:cls},p); return {pa,hp}; }
function tl(){ return gsap.timeline(); }

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
percent:{ key:'percent', area:'q', title:'النسبة المئوية من الصفر', min:'٤ دقائق', level:'تأسيس',
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
balance:{ key:'balance', area:'q', title:'المعادلة ميزان', min:'٤ دقائق', level:'تأسيس',
  goals:['ترى المعادلة كميزان متوازن','تطبّق قاعدة: ما تفعله في طرف افعله في الآخر','تحل معادلة من خطوتين','تتحقق من الحل بالتعويض'],
  scenes:[
  { t:'المعادلة ميزان', setup(s){ const sc=makeScale(s); const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'س + ٣ = ٧'}); gsap.set(eq,{opacity:0}); gsap.set(sc.g,{opacity:0}); return {sc,eq}; },
    beats:[
      { say:'المعادلة ميزانٌ متوازن: الطرفان متساويان دائمًا.', run:c=>tl().to(c.sc.g,{opacity:1,duration:.4}).add(c.sc.tilt(9,.5,'power2.out')).add(c.sc.tilt(0,1.4)) },
      { say:'في الكفة اليسرى صندوقٌ مجهول نسمّيه س ومعه ثلاثة أوزان، وفي اليمنى سبعة أوزان.', run:c=>{ const L=c.sc.L,R=c.sc.R; const b=xbox(L); const w1=[1,2,3].map(()=>weight(L)); const w2=[1,2,3,4,5,6,7].map(()=>weight(R)); layout(L); layout(R);
          return tl().from(b,{y:'-=180',opacity:0,duration:.6,ease:'bounce.out'}).from(w1,{y:'-=160',opacity:0,stagger:.12,duration:.45,ease:'bounce.out'}).from(w2,{y:'-=160',opacity:0,stagger:.1,duration:.45,ease:'bounce.out'},'<.3').to(c.eq,{opacity:1,duration:.5}); } },
    ]},
  { t:'ما تفعله هنا افعله هناك', setup(s){ const sc=makeScale(s); const b=xbox(sc.L); const lw=[1,2,3].map(()=>weight(sc.L)); const rw=[1,2,3,4,5,6,7].map(()=>weight(sc.R)); layout(sc.L); layout(sc.R);
      const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'س + ٣ = ٧'}); const ne=txt(s,{x:320,y:96,s:26,cls:'t-bad',text:'اختلّ التوازن!'}); gsap.set(ne,{opacity:0});
      const res=note(s,{x:320,y:60,w:170,h:64,c:'n0',text:'س = ٤',size:34,rot:-3}); gsap.set(res,{opacity:0}); return {sc,b,lw,rw,eq,ne,res}; },
    beats:[
      { say:'نريد أن يبقى الصندوق وحده، فلنرفع الأوزان الثلاثة من اليسار.', run:c=>tl().to(c.lw,{y:'-=140',opacity:0,stagger:.12,duration:.5,ease:'power2.in'}).add(c.sc.tilt(14),'-=.1') },
      { say:'اختلّ الميزان! لأننا غيّرنا طرفًا واحدًا فقط.', run:c=>tl().to(c.ne,{opacity:1,duration:.3}).to(c.sc.g,{x:6,duration:.07,yoyo:true,repeat:5}) },
      { say:'نرفع ثلاثة من اليمين أيضًا، فيعود التوازن: س يساوي أربعة.', run:c=>tl().to(c.ne,{opacity:0,duration:.2}).to(c.rw.slice(4),{y:'-=140',opacity:0,stagger:.12,duration:.5,ease:'power2.in'}).add(c.sc.tilt(0)).to(c.eq,{opacity:0,duration:.3},'<').fromTo(c.res,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'}) },
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
      { say:'دورك. في المعادلة ثلاثة س زائد اثنين يساوي أربعة عشر، ما الخطوة الأولى الصحيحة؟', run:c=>tl().from(c.eq,{opacity:0,y:-20,duration:.4}).from(c.opts.map(o=>o.g),{opacity:0,x:40,stagger:.15,duration:.35}),
        wait:c=>new Promise(res=>{ c.opts.forEach((o,i)=>{ const pick=()=>{ c.opts.forEach(x=>x.g.style.pointerEvents='none'); o.r.setAttribute('class',(i===0?'f-oksoft':'f-badsoft')+' hot-ring'); if(i!==0) c.opts[0].r.setAttribute('class','f-oksoft hot-ring'); res(i===0); }; o.g.addEventListener('click',pick); o.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); }); }),
        right:'صحيح. نطرح اثنين من الطرفين فيصبح ثلاثة س يساوي اثني عشر، ثم نقسم على ثلاثة: س يساوي أربعة.',
        wrong:'هذه الخطوة تغيّر طرفًا واحدًا فتكسر التوازن. الصحيح أن نطرح اثنين من الطرفين، ثم نقسم على ثلاثة، فيكون س أربعة.',
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
    {q:'إذا كان س − ٥ = ٩ فإن س =', o:['٤','١٤','٤٥','−٤'], a:1, e:'نضيف ٥ للطرفين: س = ٩ + ٥ = ١٤.'},
    {q:'إذا كان ٤س = ٢٨ فإن س =', o:['٢٤','٣٢','٧','١١٢'], a:2, e:'نقسم الطرفين على ٤: س = ٧.'},
    {q:'إذا كان ٢س + ٦ = ٢٠ فإن س =', o:['٧','١٣','١٠','٤'], a:0, e:'نطرح ٦: ٢س = ١٤، ثم نقسم على ٢: س = ٧.'},
  ]},

/* ---------------- 3. verbal analogy ---------------- */
analogy:{ key:'analogy', area:'v', title:'التناظر اللفظي: ابنِ الجسر', min:'٤ دقائق', level:'تأسيس',
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
const ORDER=['percent','balance','analogy'];
for(const k of ORDER) LESSONS[k].scenes.forEach((sc,si)=>sc.beats.forEach((b,bi)=>{ b.id=`${k}-s${si+1}-b${bi+1}`; }));
/* recorded narration (NAMAA-Saudi-TTS clips), filled in when the audio files are added: id -> url */
const AUDIO={};
function narrationManifest(){ const out=[]; for(const k of ORDER) LESSONS[k].scenes.forEach(sc=>sc.beats.forEach(b=>{ out.push({id:b.id,text:b.say}); if(b.right) out.push({id:b.id+'-ok',text:b.right}); if(b.wrong) out.push({id:b.id+'-no',text:b.wrong}); })); return out; }

/* library catalogue: the three built lessons plus the planned foundation track */
const CATALOG={
  q:[['أساسيات الأعداد والعمليات',null],['الكسور والأعداد العشرية',null],['النسبة المئوية من الصفر','percent'],['النسبة والتناسب',null],['المعادلة ميزان','balance'],['الأسس والجذور',null],['الزوايا والمثلثات',null],['المتوسط والوسيط',null]],
  v:[['التناظر اللفظي: ابنِ الجسر','analogy'],['إكمال الجمل: اقرأ الإشارة',null],['الخطأ السياقي: الكلمة الغريبة',null],['المفردة الشاذة: ابحث عن الرابط',null],['الاستيعاب المقروء: الفكرة قبل التفاصيل',null]],
};
const QUICK=[
  {t:'حيلة ١٠٪ في ٣٠ ثانية', d:'احذف صفرًا، ثم ضاعف أو نصّف.', l:'percent', s:2},
  {t:'ما تفعله في طرف افعله في الآخر', d:'لماذا يختلّ الميزان إذا غيّرت طرفًا واحدًا.', l:'balance', s:1},
  {t:'فخ الاتجاه في التناظر', d:'بيضة : دجاجة ليست دجاجة : بيضة.', l:'analogy', s:4},
  {t:'زيادة ثم نقص بالنسبة نفسها', d:'لماذا ١٠٠ ← ١٢٠ ← ٩٦.', l:'percent', s:4},
];

/* thumbnails */
function thumb(key){ const m={
  percent:'<svg viewBox="0 0 160 80"><g>'+Array.from({length:40},(_,i)=>`<rect x="${20+(i%10)*9}" y="${12+Math.floor(i/10)*14}" width="7" height="11" rx="2" style="fill:${i<14?'var(--pri)':'var(--surface)'}"/>`).join('')+'</g><text x="135" y="50" text-anchor="middle" font-size="22" font-weight="800" style="fill:var(--pink-t)">٪</text></svg>',
  balance:'<svg viewBox="0 0 160 80"><rect x="78" y="22" width="4" height="46" style="fill:var(--ink)"/><rect x="30" y="20" width="100" height="5" rx="2" style="fill:var(--ink)"/><path d="M28 52 Q42 58 56 52 Z M104 52 Q118 58 132 52 Z" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.5"/><rect x="34" y="38" width="14" height="14" rx="2" style="fill:var(--pri)"/><rect x="110" y="42" width="9" height="9" rx="2" style="fill:var(--butter)"/><rect x="120" y="42" width="9" height="9" rx="2" style="fill:var(--butter)"/><path d="M62 70 L98 70 L80 64 Z" style="fill:var(--ink)"/></svg>',
  analogy:'<svg viewBox="0 0 160 80"><rect x="18" y="26" width="46" height="30" rx="4" transform="rotate(-4 41 41)" style="fill:var(--n0);stroke:var(--edge)"/><rect x="96" y="26" width="46" height="30" rx="4" transform="rotate(3 119 41)" style="fill:var(--n3);stroke:var(--edge)"/><path d="M100 18 Q80 2 60 18" style="fill:none;stroke:var(--pink);stroke-width:3;stroke-linecap:round"/><text x="80" y="48" text-anchor="middle" font-size="18" font-weight="800" style="fill:var(--ink)">:</text></svg>',
  soonq:'<svg viewBox="0 0 160 80"><text x="80" y="52" text-anchor="middle" font-size="30" font-weight="800" style="fill:var(--muted)">١ ٢ ٣</text></svg>',
  soonv:'<svg viewBox="0 0 160 80"><text x="80" y="52" text-anchor="middle" font-size="28" font-weight="800" style="fill:var(--muted)">أ ب ت</text></svg>' }; return m[key]||''; }

/* =================== views =================== */
let DONE=store.get('gat_explainers_done',{});
let TAB='lessons';
function renderVoiceBadge(){ const b=$('#vbadge'); if(!b) return; if(Object.keys(AUDIO).length){ b.className='voice-badge ok'; b.innerHTML=IC.vol+'<span>التعليق الصوتي مسجّل بصوت سعودي (ElevenLabs).</span>'; return; } const ok=TTS.ok&&TTS.voice; b.className='voice-badge'+(ok?' ok':''); b.innerHTML=IC.vol+(ok?`<span>التعليق الصوتي يعمل بصوت عربي من جهازك (${esc(TTS.voice.name)}).</span>`:'<span>لا يتوفر صوت عربي في هذا المتصفح، فيعمل الدرس بتعليق مكتوب متزامن. في النسخة النهائية يُسجَّل الصوت مسبقًا.</span>'); }

function lib(){
  stopPlayer();
  const doneN=ORDER.filter(k=>DONE[k]).length;
  const card=([title,key],area)=>{ if(key){ const L=LESSONS[key]; return `<button class="card ready" data-open="${key}"><div class="thumb">${thumb(key)}</div><div><h3>${esc(title)}</h3><p>${esc(L.goals[0])}، ثم ${esc(L.goals[1])}.</p></div><div class="meta"><span class="chip ${area}">${area==='q'?'كمي':'لفظي'}</span><span class="chip">${L.min}</span><span class="chip">${L.scenes.length} مشاهد + تحدٍّ</span>${DONE[key]?'<span class="chip done">مكتمل</span>':''}</div></button>`; }
    return `<div class="card soon" aria-disabled="true"><div class="thumb">${thumb(area==='q'?'soonq':'soonv')}</div><div><h3>${esc(title)}</h3></div><div class="meta"><span class="chip ${area}">${area==='q'?'كمي':'لفظي'}</span><span class="chip soon">قريبًا</span></div></div>`; };
  $('#app').innerHTML=`
  <div class="proto"><b>نموذج مستقل للمراجعة</b><span>معاينة للمشرف فقط: قسم «الشروحات» بالتعليق الصوتي المسجّل. لا يراها الطلاب حتى تعتمد النشر.</span></div>
  <section class="hero">
    <div><p class="eyebrow">دروس التأسيس</p><h1>افهم الفكرة وهي تتحرك أمامك</h1>
      <p>دروس قصيرة بصوت وحركة، تبدأ من الصفر وتقف عند كل فكرة لتجرّبها بيدك. كل درس أربع دقائق تقريبًا، وينتهي بتحدٍّ من ثلاثة أسئلة.</p></div>
    <div class="hero-card"><h3>كيف يعمل الدرس</h3>
      <div class="feat">${IC.vol}<span>تعليق صوتي عربي مع نص يُظلَّل كلمة بكلمة.</span>${IC.motion}<span>رسوم متحركة تبني الفكرة خطوة بخطوة.</span>${IC.tap}<span>وقفات تفاعلية: تلوّن، تختار، وتصحّح.</span>${IC.check}<span>تحدٍّ ختامي يسجّل إتمام الدرس.</span></div>
      <div id="vbadge" class="voice-badge"></div></div>
  </section>
  <div class="tabs" role="tablist"><button role="tab" aria-selected="${TAB==='lessons'}" class="${TAB==='lessons'?'on':''}" data-tab="lessons">دروس التأسيس</button><button role="tab" aria-selected="${TAB==='quick'}" class="${TAB==='quick'?'on':''}" data-tab="quick">شروحات سريعة</button></div>
  ${TAB==='lessons'?`
    <div class="sec-h"><h2>التأسيس الكمي</h2><small>${CATALOG.q.length} دروس · جاهز منها ٢ للتجربة</small></div><div class="grid">${CATALOG.q.map(x=>card(x,'q')).join('')}</div>
    <div class="sec-h"><h2>التأسيس اللفظي</h2><small>${CATALOG.v.length} دروس · جاهز منها ١ للتجربة</small></div><div class="grid">${CATALOG.v.map(x=>card(x,'v')).join('')}</div>
    <p class="sec-h"><small>أنجزت ${doneN} من ${ORDER.length} دروس جاهزة.</small></p>`
  :`<div class="sec-h"><h2>شروحات سريعة</h2><small>مقطع واحد يركّز على فكرة أو فخ</small></div>
    <div class="grid">${QUICK.map((q,i)=>`<button class="card ready" data-quick="${i}"><div class="thumb">${thumb(q.l)}</div><div><h3>${esc(q.t)}</h3><p>${esc(q.d)}</p></div><div class="meta"><span class="chip ${LESSONS[q.l].area}">${LESSONS[q.l].area==='q'?'كمي':'لفظي'}</span><span class="chip">أقل من دقيقة</span><span class="chip">من درس «${esc(LESSONS[q.l].title)}»</span></div></button>`).join('')}</div>`}
  `;
  renderVoiceBadge();
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{ TAB=b.dataset.tab; lib(); });
  document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{ location.hash=b.dataset.open; });
  document.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>{ const q=QUICK[+b.dataset.quick]; openLesson(q.l,{only:q.s,title:q.t}); });
}

/* =================== player =================== */
let P=null, RUN=0;
function stopPlayer(){ RUN++; TTS.stop(); if(P&&P.tl){ P.tl.kill(); } gsap.killTweensOf('*'); P=null; }

function openLesson(key,opt={}){
  stopPlayer(); const L=LESSONS[key]; if(!L) return lib();
  const only=opt.only; const scenes=only!=null?[only]:L.scenes.map((_,i)=>i);
  P={L,key,scenes,idx:0,playing:false,started:false,only,tl:null,cc:true,waiting:false};
  $('#app').innerHTML=`
  <div class="lesson-top"><button class="back" id="back">→ الشروحات</button><h1>${esc(opt.title||L.title)}</h1><span class="chip ${L.area}">${L.area==='q'?'كمي':'لفظي'} · ${L.level}</span></div>
  <div class="player">
    <div>
      <div class="stage-wrap" id="sw">
        <div class="segs" id="segs">${scenes.map(()=>'<i><b></b></i>').join('')}</div>
        <svg id="stage" viewBox="0 0 640 360" role="img" aria-label="لوحة الشرح المتحركة"></svg>
        <div class="scene-t" id="scene-t"></div>
        <div class="stage-cover" id="cover"><button class="big-play" id="start"><span class="c">${IC.play}</span><b>${only!=null?'شغّل الشرح':'ابدأ الدرس'}</b><small>شغّل الصوت. يتوقف الدرس عند الوقفات التفاعلية حتى تجرّب بنفسك.</small></button></div>
      </div>
      <div class="caption" id="cap" aria-live="polite">اضغط «${only!=null?'شغّل الشرح':'ابدأ الدرس'}».</div>
      <div class="controls">
        <button class="ib main" id="pp" aria-label="تشغيل">${IC.play}</button>
        <button class="ib" id="prev" aria-label="المشهد السابق">${IC.prev}</button>
        <button class="ib" id="rep" aria-label="أعد المشهد">${IC.replay}</button>
        <button class="ib" id="nxt" aria-label="المشهد التالي">${IC.next}</button>
        <span class="sp"></span>
        <div class="speed" role="group" aria-label="السرعة">${[0.85,1,1.25].map(r=>`<button data-rate="${r}" class="${TTS.rate===r?'on':''}">${r===1?'١×':r<1?'٠٫٨٥×':'١٫٢٥×'}</button>`).join('')}</div>
        <button class="ib" id="vo" aria-pressed="${TTS.on}" aria-label="الصوت">${IC.vol}</button>
        <button class="ib" id="ccb" aria-pressed="true" aria-label="النص المكتوب">${IC.cc}</button>
      </div>
    </div>
    <aside class="side">
      <div class="panel"><h3>المشاهد</h3><ol class="chapters" id="chap"></ol></div>
      ${only==null?`<div class="panel"><h3>بعد هذا الدرس</h3><ul class="goals">${L.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></div>`:''}
      <div class="panel"><div id="vbadge" class="voice-badge"></div></div>
    </aside>
  </div>`;
  renderVoiceBadge(); renderChapters(); setSceneTitle();
  $('#back').onclick=()=>{ if(location.hash==='#lib') route(); else location.hash='lib'; };
  $('#start').onclick=()=>{ $('#cover').hidden=true; P.started=true; playScene(0); };
  $('#pp').onclick=()=>{ if(!P.started){ $('#start').click(); return; } P.playing?pause():resume(); };
  $('#nxt').onclick=()=>go(P.idx+1); $('#prev').onclick=()=>go(P.idx-1); $('#rep').onclick=()=>go(P.idx);
  $('#vo').onclick=()=>{ TTS.on=!TTS.on; $('#vo').setAttribute('aria-pressed',String(TTS.on)); if(TTS.cur&&P.playing){ TTS.pause(); TTS.resume(); } };
  $('#ccb').onclick=()=>{ P.cc=!P.cc; $('#ccb').setAttribute('aria-pressed',String(P.cc)); $('#cap').classList.toggle('off',!P.cc); };
  document.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ TTS.rate=+b.dataset.rate; document.querySelectorAll('[data-rate]').forEach(x=>x.classList.toggle('on',x===b)); gsap.globalTimeline.timeScale((RM?2.5:1)*TTS.rate); });
  gsap.globalTimeline.timeScale((RM?2.5:1)*TTS.rate);
}
function renderChapters(){ const L=P.L; $('#chap').innerHTML=P.scenes.map((si,i)=>{ const sc=L.scenes[si]; const st=i<P.idx?'done':i===P.idx?'cur':''; return `<li class="${st}"><button data-go="${i}"><span class="n">${AD(i+1)}</span><span>${esc(sc.t)}</span>${sc.interactive?'<span class="k">تفاعلي</span>':''}</button></li>`; }).join('')+(P.only==null?`<li class="${P.idx>=P.scenes.length?'cur':''}"><button data-go="quiz"><span class="n">${IC.check}</span><span>التحدي الختامي</span></button></li>`:'');
  document.querySelectorAll('#chap [data-go]').forEach(b=>b.onclick=()=>{ if(!P.started){ $('#cover').hidden=true; P.started=true; } b.dataset.go==='quiz'?showQuiz():go(+b.dataset.go); }); }
function setSceneTitle(){ const sc=P.L.scenes[P.scenes[P.idx]]; $('#scene-t').textContent=sc?sc.t:''; }
function setPlaying(v){ P.playing=v; const b=$('#pp'); if(b){ b.innerHTML=v?IC.pause:IC.play; b.setAttribute('aria-label',v?'إيقاف مؤقت':'تشغيل'); } }
function pause(){ if(!P) return; setPlaying(false); TTS.pause(); if(P.tl) P.tl.pause(); }
function resume(){ if(!P) return; setPlaying(true); if(P.tl) P.tl.resume(); TTS.resume(); }
function go(i){ if(!P) return; if(i<0) i=0; if(i>=P.scenes.length){ P.only!=null?finishQuick():showQuiz(); return; } playScene(i); }
function segProgress(i,frac){ const segs=document.querySelectorAll('#segs i'); segs.forEach((s,j)=>{ s.classList.toggle('done',j<i); const b=s.querySelector('b'); if(j===i) b.style.inlineSize=Math.round(frac*100)+'%'; else if(j>i) b.style.inlineSize='0'; else b.style.inlineSize=''; }); }
function tlDone(t){ return new Promise(r=>{ if(!t){ r(); return; } t.eventCallback('onComplete',r); }); }

async function playScene(i){
  const my=++RUN; TTS.stop(); if(P.tl) P.tl.kill(); gsap.killTweensOf('*');
  const q=$('#quiz'); if(q) q.remove();
  P.idx=i; renderChapters(); setSceneTitle(); setPlaying(true);
  const sc=P.L.scenes[P.scenes[i]]; const stage=$('#stage'); stage.innerHTML='';
  const ctx=sc.setup(stage); gsap.fromTo(stage,{opacity:0},{opacity:1,duration:.25});
  const n=sc.beats.length;
  for(let b=0;b<n;b++){
    if(my!==RUN) return; const beat=sc.beats[b]; segProgress(i,b/n);
    const t=beat.run?beat.run(ctx):null; P.tl=t;
    await Promise.all([TTS.say(beat.say,beat.id),tlDone(t)]); if(my!==RUN) return;
    if(beat.wait){ P.waiting=true; setPlaying(false); captionText('⟵ دورك: جرّب على اللوحة.'); const ok=await beat.wait(ctx); P.waiting=false; if(my!==RUN) return; setPlaying(true);
      const t2=beat.after?beat.after(ctx,ok):null; P.tl=t2; await Promise.all([TTS.say(ok?beat.right:beat.wrong,beat.id+(ok?'-ok':'-no')),tlDone(t2)]); if(my!==RUN) return; }
    await sleep(450); if(my!==RUN) return;
    while(P&&!P.playing&&my===RUN) await sleep(120);
  }
  segProgress(i+1,0); await sleep(500); if(my!==RUN) return;
  go(i+1);
}
function finishQuick(){ RUN++; TTS.stop(); setPlaying(false); segProgress(P.scenes.length,0); captionText('انتهى الشرح السريع.');
  const sw=$('#sw'); const d=document.createElement('div'); d.className='quiz'; d.id='quiz';
  d.innerHTML=`<p class="qn">انتهى الشرح</p><h3>تريد الفكرة كاملة مع التحدي؟</h3><p class="why">هذا المقطع جزء من درس «${esc(P.L.title)}». الدرس الكامل فيه ${AD(P.L.scenes.length)} مشاهد ووقفات تفاعلية وتحدٍّ ختامي.</p><div class="row"><button class="btn pri" id="full">افتح الدرس الكامل</button><button class="btn" id="again">أعد المقطع</button><button class="btn" id="bk">عودة للشروحات</button></div>`;
  sw.appendChild(d); $('#full').onclick=()=>{ const k=P.key; if(location.hash==='#'+k) route(); else location.hash=k; }; $('#again').onclick=()=>playScene(0); $('#bk').onclick=()=>{ if(location.hash==='#lib') route(); else location.hash='lib'; }; }

function showQuiz(){
  RUN++; TTS.stop(); if(P.tl) P.tl.kill(); setPlaying(false); P.idx=P.scenes.length; renderChapters(); segProgress(P.scenes.length,0); $('#scene-t').textContent='';
  const Q=P.L.quiz; let k=0, score=0; const sw=$('#sw'); let d=$('#quiz'); if(!d){ d=document.createElement('div'); d.className='quiz'; d.id='quiz'; sw.appendChild(d); }
  captionText('التحدي الختامي: ثلاثة أسئلة سريعة.');
  const show=()=>{ const it=Q[k]; d.innerHTML=`<p class="qn">التحدي ${AD(k+1)} من ${AD(Q.length)}</p><h3>${esc(it.q)}</h3><div class="opts">${it.o.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div><div id="fb"></div>`;
    d.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i, ok=i===it.a; if(ok) score++; d.querySelectorAll('.opt').forEach((x,j)=>{ x.disabled=true; if(j===it.a) x.classList.add('right'); else if(j===i) x.classList.add('wrong'); });
      $('#fb').innerHTML=`<p class="why"><b>${ok?'صحيح.':'ليس هذا.'}</b> ${esc(it.e)}</p><div class="row" style="margin-top:10px"><button class="btn pri" id="qn">${k<Q.length-1?'التالي':'النتيجة'}</button></div>`; $('#qn').focus(); $('#qn').onclick=()=>{ k++; k<Q.length?show():end(); }; }); };
  const end=()=>{ const pass=score>=2; if(pass){ DONE[P.key]=true; store.set('gat_explainers_done',DONE); }
    const nextKey=ORDER[(ORDER.indexOf(P.key)+1)%ORDER.length];
    d.innerHTML=`<p class="qn">النتيجة</p><div class="score num">${AD(score)} / ${AD(Q.length)}</div><h3>${pass?'أتممت الدرس. أُضيف إلى إنجازاتك.':'تحتاج مراجعة سريعة قبل أن نعدّ الدرس مكتملًا.'}</h3>
      <p class="why">${pass?'في الموقع الكامل تنتقل مباشرة إلى تدريب من عشرة أسئلة على المهارة نفسها، ويُحدَّث مستوى إتقانك.':'أعد المشهد الذي أخطأت فيه، ثم جرّب التحدي مرة أخرى.'}</p>
      <div class="row"><button class="btn pri" id="nx">${pass?'الدرس التالي: '+esc(LESSONS[nextKey].title):'أعد التحدي'}</button><button class="btn" id="rw">أعد الدرس</button><button class="btn" id="bk">عودة للشروحات</button></div>`;
    captionText(pass?'أحسنت!':'راجع ثم أعد المحاولة.');
    $('#nx').onclick=()=>{ if(pass){ if(location.hash==='#'+nextKey) route(); else location.hash=nextKey; } else showQuiz(); }; $('#rw').onclick=()=>playScene(0); $('#bk').onclick=()=>{ if(location.hash==='#lib') route(); else location.hash='lib'; }; };
  show();
}

/* =================== routing =================== */
function route(){ const h=(location.hash||'').slice(1); if(LESSONS[h]) openLesson(h); else lib(); window.scrollTo(0,0); }
window.addEventListener('hashchange',route);
document.addEventListener('keydown',e=>{ if(!P||!P.started||e.target.closest('input,textarea')) return; if(e.key===' '&&!e.target.closest('button')){ e.preventDefault(); $('#pp').click(); } });
route();

/* live site: load the recorded narration list from the server */
fetch('/audio/index.json',{credentials:'same-origin'}).then(r=>r.ok?r.json():[]).then(ids=>{ ids.forEach(id=>{ AUDIO[id]='/audio/'+encodeURIComponent(id)+'.mp3'; }); renderVoiceBadge(); }).catch(()=>{});
