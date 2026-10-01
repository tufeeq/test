/* ============ EXPLAINERS (الشروحات): animated, narrated foundation lessons ============
   window.XP: add(lesson) · forSkill(sk) · all() · open(key) · setHooks({isDone,onDone,onClose})
   A lesson: {key, sk, title, min, goals[], scenes[], quiz[]}
   A scene is either hand-built {t, setup(stage)->ctx, beats:[{say, run(ctx)->timeline, wait?, right?, wrong?, after?}]}
   or declarative {t, items:{k:spec}, beats:[{say, show?, hide?, hl?, strike?, set?, move?}], ask?:{opts,a,right,wrong,show?,y?}}
   Narration: a recorded continuous track per lesson (TRACKS, from /audio/tracks.json); browser Arabic voice as fallback. */
(function(){
const HAS_GSAP=typeof gsap!=='undefined';
const NS='http://www.w3.org/2000/svg';
const $x=s=>document.querySelector(s);
let LG='ar';
const AD=s=>LG==='en'?String(s):String(s).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]).replace(/\./g,'٫');
const UI={
 ar:{close:'إغلاق',of:(a,b)=>`شرح ${a} من ${b}`,start:'ابدأ الشرح',startSub:'شغّل الصوت. يتوقف الشرح عند الوقفات التفاعلية حتى تجرّب بنفسك.',play:'تشغيل',pause:'إيقاف مؤقت',prev:'المشهد السابق',rep:'أعد المشهد',next:'المشهد التالي',speed:'السرعة',voice:'الصوت',cc:'النص المكتوب',scenes:'المشاهد',after:'بعد هذا الشرح',press:'اضغط «ابدأ الشرح».',inter:'تفاعلي',final:'التحدي الختامي',yourTurn:'دورك: جرّب على اللوحة.',clipEnd:'انتهى المقطع',fullQ:'تريد الشرح كاملًا مع التحدي؟',openFull:'افتح الشرح الكامل',again:'أعد المقطع',quizIntro:'التحدي الختامي: أسئلة سريعة على الفكرة نفسها.',qn:(a,b)=>`التحدي ${a} من ${b}`,right:'صحيح.',wrong:'ليس هذا.',nextQ:'التالي',result:'النتيجة',passed:'أتممت الشرح.',failed:'راجع الفكرة ثم أعد التحدي.',nextL:'الشرح التالي: ',done:'تم',retry:'أعد التحدي',rewatch:'أعد الشرح',bravo:'أحسنت!',retryCap:'أعد المحاولة بعد مراجعة المشهد الذي أخطأت فيه.',sp:['٠٫٨٥×','١×','١٫٢٥×']},
 en:{close:'Close',of:(a,b)=>`Explainer ${a} of ${b}`,start:'Start the explainer',startSub:'Turn your sound on. The explainer pauses at interactive stops so you can try it yourself.',play:'Play',pause:'Pause',prev:'Previous scene',rep:'Replay scene',next:'Next scene',speed:'Speed',voice:'Voice',cc:'Captions',scenes:'Scenes',after:'After this explainer',press:'Press “Start the explainer”.',inter:'Interactive',final:'Final challenge',yourTurn:'Your turn: try it on the board.',clipEnd:'Clip finished',fullQ:'Want the full explainer with the challenge?',openFull:'Open the full explainer',again:'Replay clip',quizIntro:'Final challenge: quick questions on the same idea.',qn:(a,b)=>`Challenge ${a} of ${b}`,right:'Correct.',wrong:'Not quite.',nextQ:'Next',result:'Result',passed:'Explainer complete.',failed:'Review the idea, then retry the challenge.',nextL:'Next explainer: ',done:'Done',retry:'Retry the challenge',rewatch:'Rewatch',bravo:'Well done!',retryCap:'Try again after reviewing the scene you missed.',sp:['0.85×','1×','1.25×']}};
const u=k=>UI[LG][k];
const escx=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function el(tag,attrs={},parent){ const e=document.createElementNS(NS,tag); for(const k in attrs){ if(k==='text') e.textContent=attrs[k]; else e.setAttribute(k,attrs[k]); } if(parent) parent.appendChild(e); return e; }
const tl=()=>gsap.timeline();
function note(p,{x,y,w=120,h=70,c='n0',text='',size=28,rot=0,cls='t-note'}){
  const g=el('g',{},p); el('rect',{x:x-w/2+4,y:y-h/2+4,width:w,height:h,rx:6,class:'f-edge'},g); el('rect',{x:x-w/2,y:y-h/2,width:w,height:h,rx:6,class:'f-'+c,stroke:'var(--edge)','stroke-width':2},g);
  const t=el('text',{x,y:y+size*0.36,'text-anchor':'middle','font-size':size,'font-weight':800,class:cls,text},g);
  gsap.set(g,{rotation:rot,transformOrigin:'50% 50%'}); g._t=t; return g; }
function txt(p,{x,y,s=24,cls='t-ink',text='',w=800,anchor='middle',font,dir}){ const a={x,y,'font-size':s,'font-weight':w,'text-anchor':anchor,class:cls,text}; if(font) a['font-family']=font; if(dir) a.direction=dir; return el('text',a,p); }
function drawIn(path,d=0.8){ const L=path.getTotalLength?path.getTotalLength():300; gsap.set(path,{strokeDasharray:L,strokeDashoffset:L,opacity:1}); return gsap.to(path,{strokeDashoffset:0,duration:d,ease:'power2.inOut'}); }
function checkMark(p,x,y,s=1){ const g=el('g',{},p); el('circle',{cx:x,cy:y,r:22*s,class:'f-oksoft'},g); const pa=el('path',{d:`M${x-10*s} ${y} l${7*s} ${8*s} l${14*s} -${16*s}`,class:'s-ok'},g); return {g,pa}; }
function crossMark(p,x,y,s=1){ const g=el('g',{},p); el('circle',{cx:x,cy:y,r:22*s,class:'f-badsoft'},g); const a=el('path',{d:`M${x-9*s} ${y-9*s} L${x+9*s} ${y+9*s} M${x+9*s} ${y-9*s} L${x-9*s} ${y+9*s}`,class:'s-bad'},g); return {g,pa:a}; }
function arrow(p,x1,y1,x2,y2,cls='s-pri',bend=-40){ const mx=(x1+x2)/2, my=Math.min(y1,y2)+bend; const d=`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`; const pa=el('path',{d,class:cls},p);
  const ang=Math.atan2(y2-my,x2-mx), h=12; const hp=el('path',{d:`M${x2-h*Math.cos(ang-0.5)} ${y2-h*Math.sin(ang-0.5)} L${x2} ${y2} L${x2-h*Math.cos(ang+0.5)} ${y2-h*Math.sin(ang+0.5)}`,class:cls},p); return {pa,hp}; }
function tlDone(t){ return new Promise(r=>{ if(!t||t.totalProgress()>=1){ r(); return; } t.eventCallback('onComplete',r); }); }

/* ---------- declarative items ---------- */
const POP=new Set(['note','box','circle','check','cross','poly','pie','dot']);
function draw(stage,spec){
  const T=spec.type, g=el('g',{},stage); let o={g,type:T,spec};
  if(T==='note'){ const n=note(g,spec); o.label=n._t; }
  else if(T==='text'||T==='eq'){ o.label=txt(g,{x:spec.x,y:spec.y,s:spec.s||26,cls:spec.cls||(T==='eq'?'t-ink':'t-ink'),text:spec.text,w:spec.w||800,anchor:spec.anchor||'middle',dir:T==='eq'?'ltr':(spec.dir||undefined),font:spec.hand?'var(--f-hand)':undefined}); if(spec.hand) o.label.setAttribute('class','t-hand'); }
  else if(T==='box'){ el('rect',{x:spec.x,y:spec.y,width:spec.w,height:spec.h,rx:spec.rx??10,class:'f-'+(spec.c||'surface'),stroke:spec.stroke===false?'none':'var(--edge)','stroke-width':spec.sw||2},g); if(spec.text!=null) o.label=txt(g,{x:spec.x+spec.w/2,y:spec.y+spec.h/2+(spec.s||22)*0.36,s:spec.s||22,cls:spec.cls||'t-ink',text:spec.text,dir:spec.ltr?'ltr':undefined}); }
  else if(T==='circle'){ el('circle',{cx:spec.cx,cy:spec.cy,r:spec.r,class:spec.c?'f-'+spec.c:'',fill:spec.c?undefined:'none',stroke:spec.stroke===false?'none':'var(--edge)','stroke-width':spec.sw||2.5},g); if(spec.text!=null) o.label=txt(g,{x:spec.cx,y:spec.cy+(spec.s||20)*0.36,s:spec.s||20,cls:spec.cls||'t-ink',text:spec.text}); }
  else if(T==='dot'){ el('circle',{cx:spec.x,cy:spec.y,r:spec.r||6,class:'f-'+(spec.c||'pri')},g); if(spec.text!=null) o.label=txt(g,{x:spec.x+(spec.dx??0),y:spec.y+(spec.dy??-14),s:spec.s||18,cls:spec.cls||'t-ink',text:spec.text}); }
  else if(T==='line'){ o.path=el('line',{x1:spec.x1,y1:spec.y1,x2:spec.x2,y2:spec.y2,class:spec.cls||'s-ink'},g); }
  else if(T==='path'){ o.path=el('path',{d:spec.d,class:spec.cls||'s-ink',fill:spec.fill?undefined:'none'},g); if(spec.fill) o.path.setAttribute('class',(spec.cls||'')+' f-'+spec.fill); }
  else if(T==='poly'){ el('polygon',{points:spec.points,class:'f-'+(spec.c||'prisoft'),stroke:'var(--edge)','stroke-width':spec.sw||2.5,'stroke-linejoin':'round'},g); (spec.labels||[]).forEach(l=>txt(g,{x:l[0],y:l[1],s:l[3]||20,cls:l[4]||'t-ink',text:l[2]})); }
  else if(T==='arrow'){ const a=arrow(g,spec.x1,spec.y1,spec.x2,spec.y2,spec.cls||'s-pri',spec.bend??-40); o.path=a.pa; o.head=a.hp; if(spec.text) o.label=txt(g,{x:(spec.x1+spec.x2)/2,y:Math.min(spec.y1,spec.y2)+(spec.bend??-40)/2-8,s:spec.s||18,cls:'t-hand',text:spec.text}); }
  else if(T==='check'){ const m=checkMark(g,spec.x,spec.y,spec.s||1); o.path=m.pa; }
  else if(T==='cross'){ const m=crossMark(g,spec.x,spec.y,spec.s||1); o.path=m.pa; }
  else if(T==='bars'){ const {x,y,w,h,values,labels=[],max=Math.max(...values),c='pri',vals=true}=spec; const n=values.length, gap=w/n, bw=gap*0.58;
    el('line',{x1:x-6,y1:y+h,x2:x+w+6,y2:y+h,class:'s-ink'},g); o.bars=[];
    values.forEach((v,i)=>{ const bh=h*v/max, bx=x+i*gap+(gap-bw)/2; const r=el('rect',{x:bx,y:y+h-bh,width:bw,height:bh,rx:4,class:'f-'+(Array.isArray(c)?c[i]:c),stroke:'var(--edge)','stroke-width':1.5},g); r._h=bh; r._y=y+h-bh; o.bars.push(r);
      if(labels[i]!=null) txt(g,{x:bx+bw/2,y:y+h+22,s:16,cls:'t-ink2',text:labels[i],w:700}); if(vals) txt(g,{x:bx+bw/2,y:y+h-bh-8,s:16,cls:'t-ink',text:AD(v)}); }); }
  else if(T==='nline'){ const {x1,x2,y,from,to,step=1,marks=true}=spec; el('line',{x1:x1-12,y1:y,x2:x2+12,y2:y,class:'s-ink'},g); const n=(to-from)/step;
    for(let i=0;i<=n;i++){ const v=from+i*step, x=x1+(x2-x1)*i/n; el('line',{x1:x,y1:y-8,x2:x,y2:y+8,class:'s-ink'},g); if(marks) txt(g,{x,y:y+30,s:17,cls:'t-ink2',text:(v<0?'−':'')+AD(Math.abs(v)),w:700,dir:'ltr'}); } o.xAt=v=>x1+(x2-x1)*(v-from)/(to-from); }
  else if(T==='pie'){ const {cx,cy,r,parts,fill=0,c='pink'}=spec; el('circle',{cx,cy,r,class:'f-surface2',stroke:'var(--edge)','stroke-width':2.5},g);
    for(let i=0;i<parts;i++){ const a0=-Math.PI/2+i*2*Math.PI/parts, a1=a0+2*Math.PI/parts; const p=el('path',{d:`M${cx} ${cy} L${cx+r*Math.cos(a0)} ${cy+r*Math.sin(a0)} A${r} ${r} 0 ${parts===1?1:0} 1 ${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)} Z`,class:i<fill?'f-'+c:'f-surface2',stroke:'var(--edge)','stroke-width':1.5},g); }
  }
  else if(T==='grid'){ const {x,y,rows,cols,cell=22,gap=2,fill=0,c='pri'}=spec; o.cells=[]; for(let r=0;r<rows;r++) for(let k=0;k<cols;k++){ const i=r*cols+k; o.cells.push(el('rect',{x:x+k*(cell+gap),y:y+r*(cell+gap),width:cell,height:cell,rx:3,class:i<fill?'f-'+c:'f-surface2',stroke:'var(--line)','stroke-width':1},g)); } }
  gsap.set(g,{transformOrigin:'50% 50%'}); if(spec.rot&&T!=='note') gsap.set(g,{rotation:spec.rot});
  return o;
}
function revealTl(o,t,at){
  const T=o.type;
  if(T==='line'||T==='path'||T==='arrow'||T==='check'||T==='cross'){ t.set(o.g,{opacity:1},at); if(T==='check'||T==='cross') t.fromTo(o.g,{scale:0},{scale:1,transformOrigin:'50% 50%',duration:.35,ease:'back.out(2)'},at);
    if(o.path) t.add(drawIn(o.path,.6),at); if(o.head) t.fromTo(o.head,{opacity:0},{opacity:1,duration:.15}); if(o.label) t.fromTo(o.label,{opacity:0},{opacity:1,duration:.3}); return; }
  if(T==='bars'){ t.set(o.g,{opacity:1},at); o.bars.forEach((r,i)=>t.fromTo(r,{attr:{height:0,y:r._y+r._h}},{attr:{height:r._h,y:r._y},duration:.5,ease:'power2.out'},i?'<.12':at)); return; }
  if(T==='grid'){ t.set(o.g,{opacity:1},at); t.from(o.cells,{scale:0,transformOrigin:'50% 50%',duration:.25,stagger:.01},at); return; }
  if(POP.has(T)) t.fromTo(o.g,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.5,ease:'back.out(1.8)'},at);
  else t.fromTo(o.g,{opacity:0,y:14},{opacity:1,y:0,duration:.45,ease:'power2.out'},at);
}
function compileScene(sc){
  if(sc.setup){ sc.interactive=sc.interactive||sc.beats.some(b=>b.wait); return sc; }
  const items=sc.items||{};
  const out={t:sc.t,interactive:!!sc.ask};
  out.setup=stage=>{ const ctx={}; for(const k in items){ ctx[k]=draw(stage,items[k]); if(!items[k].show0) gsap.set(ctx[k].g,{opacity:0}); } return ctx; };
  out.beats=(sc.beats||[]).map((b,bi,arr)=>{ const beat={say:b.say};
    beat.run=ctx=>{ const t=tl(); let at=0;
      (b.hide||[]).forEach(k=>ctx[k]&&t.to(ctx[k].g,{opacity:0,duration:.3},0));
      (b.set?Object.entries(b.set):[]).forEach(([k,v])=>{ const o=ctx[k]; if(!o||!o.label) return; t.to(o.label,{opacity:0,duration:.2},at).call(()=>{ o.label.textContent=v; },null,at+.2).to(o.label,{opacity:1,duration:.25},at+.2); });
      (b.move?Object.entries(b.move):[]).forEach(([k,[dx,dy]])=>ctx[k]&&t.to(ctx[k].g,{x:`+=${dx}`,y:`+=${dy}`,duration:.7,ease:'power2.inOut'},at));
      (b.show||[]).forEach((k,i)=>{ const o=ctx[k]; if(!o) return; revealTl(o,t,at+i*(b.gap??.45)); });
      (b.hl||[]).forEach(k=>ctx[k]&&t.to(ctx[k].g,{scale:1.1,transformOrigin:'50% 50%',duration:.22,yoyo:true,repeat:1},'>'));
      (b.strike||[]).forEach(k=>{ const o=ctx[k]; if(!o) return; t.call(()=>{ const bb=o.g.getBBox(); const ln=el('line',{x1:bb.x-6,y1:bb.y+bb.height/2,x2:bb.x+bb.width+6,y2:bb.y+bb.height/2,class:'s-bad'},o.g); drawIn(ln,.4); },null,'>'); });
      return t; };
    if(sc.ask&&bi===arr.length-1){ const A=sc.ask; beat.right=A.right; beat.wrong=A.wrong;
      beat.wait=ctx=>askChoice(ctx._stage,A);
      beat.after=(ctx,ok)=>{ const t=tl(); (A.show||[]).forEach((k,i)=>ctx[k]&&revealTl(ctx[k],t,.3+i*.4)); return t; }; }
    return beat; });
  return out;
}
/* option buttons drawn on the stage; resolves with true/false */
function askChoice(stage,A){ return new Promise(res=>{
  const opts=A.opts, n=opts.length, two=n===4&&!A.column, y0=A.y??(two?182:150);
  const gs=opts.map((t,i)=>{ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-label':t},stage);
    const w=two?250:420, h=two?54:48, cx=two?(LG==='en'?[170,470]:[470,170])[i%2]:320, cy=two?y0+Math.floor(i/2)*70:y0+i*58;
    el('rect',{x:cx-w/2+4,y:cy-h/2+4,width:w,height:h,rx:12,class:'f-edge'},g); const r=el('rect',{x:cx-w/2,y:cy-h/2,width:w,height:h,rx:12,class:'f-surface hot-ring',stroke:'var(--edge)','stroke-width':2},g);
    txt(g,{x:cx,y:cy+7,s:A.s||21,text:t,dir:(A.ltr||LG==='en')?'ltr':undefined}); return {g,r}; });
  gsap.from(gs.map(o=>o.g),{opacity:0,y:18,stagger:.1,duration:.3});
  gs.forEach((o,i)=>{ const pick=()=>{ gs.forEach(x=>x.g.style.pointerEvents='none'); o.r.setAttribute('class',(i===A.a?'f-oksoft':'f-badsoft')+' hot-ring'); if(i!==A.a) gs[A.a].r.setAttribute('class','f-oksoft hot-ring');
      gsap.to(gs.filter((x,j)=>j!==A.a&&j!==i).map(x=>x.g),{opacity:.35,duration:.3}); setTimeout(()=>{ if(A.show&&A.show.length) gsap.to(gs.map(x=>x.g),{opacity:0,duration:.4}); },1400); res(i===A.a); };
    o.g.addEventListener('click',pick); o.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); });
}); }

/* ---------- registry ---------- */
const LESSONS={}, ORDER=[];
let HOOKS={isDone:()=>false,onDone:()=>{},onClose:()=>{}};
let bid=0;
function add(L){ if(!L||!L.key||LESSONS[L.key]) return; L.lang=L.lang||'ar'; L.scenes=L.scenes.map(compileScene); L.scenes.forEach(sc=>{ const f=sc.setup; sc.setup=st=>{ LG=L.lang; return f(st); }; }); L.scenes.forEach((sc,si)=>sc.beats.forEach((b,bi)=>{ b.id=`${L.key}-s${si+1}-b${bi+1}`; })); LESSONS[L.key]=L; ORDER.push(L.key); }
const forSkill=(sk,lang)=>ORDER.filter(k=>LESSONS[k].sk===sk&&(!lang||LESSONS[k].lang===lang)).map(k=>LESSONS[k]).sort((a,b)=>(a.ord??50)-(b.ord??50));

/* ---------- narration ---------- */
const TRACKS={};
function loadTracks(){ if(!/^https?:/.test(location.protocol)) return Promise.resolve();
  return Promise.all([fetch('/audio/index.json').then(r=>r.ok?r.json():[]),fetch('/audio/tracks.json').then(r=>r.ok?r.json():{})]).then(([ids,tr])=>{ const have=new Set(ids); for(const k in tr){ const T=tr[k]; if(T.segs&&T.segs.every(g=>have.has(g.clip))) TRACKS[k]=T; } }).catch(()=>{}); }
let CAPW=[];
function captionWords(words){ const c=$x('#xp-cap'); if(!c) return; CAPW=words; c.innerHTML=words.map((w,i)=>`<span class="w fut" data-i="${i}">${escx(w)}</span>`).join(' '); }
function captionIdx(i){ const c=$x('#xp-cap'); if(!c) return; c.querySelectorAll('.w').forEach((s,j)=>{ s.className='w '+(j<i?'past':j===i?'on':'fut'); }); }
function captionAt(text,ci){ const before=text.slice(0,ci).trim(); captionIdx(before?before.split(/\s+/).length:0); }
function captionAll(){ const c=$x('#xp-cap'); if(!c) return; c.querySelectorAll('.w').forEach(s=>s.className='w past'); }
function captionText(t){ const c=$x('#xp-cap'); if(c) c.innerHTML=escx(t); }
const TTS={ ok:'speechSynthesis' in window, voice:null, on:true, rate:1, cur:null,
  pick(){ if(!this.ok) return; const vs=speechSynthesis.getVoices()||[]; this.voice=LG==='en'?(vs.find(v=>/^en[-_](US|GB)/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null):(vs.find(v=>/^ar[-_]SA/i.test(v.lang))||vs.find(v=>/^ar/i.test(v.lang))||null); },
  usable(){ return this.on&&this.ok&&!!this.voice; },
  say(text){ return new Promise(resolve=>{ const job={text,resolve,stopped:false,timers:[]}; this.cur=job; this._run(job); }); },
  _run(job){ const words=job.text.split(/\s+/); captionWords(words);
    if(this.usable()){ try{ speechSynthesis.cancel(); }catch(e){}
      const u=new SpeechSynthesisUtterance(job.text); u.voice=this.voice; u.lang=this.voice.lang; u.rate=Math.min(1.6,this.rate*0.95); let bounded=false;
      u.onboundary=e=>{ if(e.name&&e.name!=='word') return; bounded=true; captionAt(job.text,e.charIndex); };
      u.onend=()=>{ if(this.cur===job&&!job.stopped){ captionAll(); this.cur=null; job.resolve(); } };
      u.onerror=()=>{ if(this.cur===job&&!job.stopped){ this.cur=null; job.resolve(); } };
      speechSynthesis.speak(u); const est=this._est(job.text); job.timers.push(setTimeout(()=>{ if(!bounded) this._timedWords(job,est); },500)); }
    else { const est=this._est(job.text); this._timedWords(job,est); job.timers.push(setTimeout(()=>{ if(this.cur===job&&!job.stopped){ captionAll(); this.cur=null; job.resolve(); } },est+250)); } },
  _est(t){ return Math.max(1500,(t.length/(LG==='en'?15:13))*1000/this.rate); },
  _timedWords(job,ms){ const n=job.text.split(/\s+/).length; for(let i=0;i<n;i++) job.timers.push(setTimeout(()=>{ if(this.cur===job&&!job.stopped) captionIdx(i); },(ms*i)/n)); },
  pause(){ const j=this.cur; if(!j) return; j.stopped=true; j.timers.forEach(clearTimeout); j.timers=[]; try{ speechSynthesis.cancel(); }catch(e){} },
  resume(){ const j=this.cur; if(!j) return; j.stopped=false; this._run(j); },
  stop(){ const j=this.cur; if(j){ j.stopped=true; j.timers.forEach(clearTimeout); } this.cur=null; try{ speechSynthesis.cancel(); }catch(e){} } };
if(TTS.ok){ TTS.pick(); try{ speechSynthesis.addEventListener('voiceschanged',()=>TTS.pick()); }catch(e){} }

/* ---------- player ---------- */
const IC={
  play:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
  pause:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" stroke-width="3.2"/></svg>',
  next:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>', prev:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  replay:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/></svg>',
  vol:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  cc:'<svg class="xp-ic" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 10.5a2.5 2.5 0 1 0 0 3M17 10.5a2.5 2.5 0 1 0 0 3"/></svg>',
  x:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>' };
let P=null, RUN=0;
function stopTrack(){ const k=P&&P.trk; if(k){ k.dead=true; if(k.audio){ k.audio.pause(); k.audio.removeAttribute('src'); } cancelAnimationFrame(k.raf); } if(P) P.trk=null; }
function stopPlayer(){ RUN++; TTS.stop(); if(P){ stopTrack(); if(P.tl) P.tl.kill(); } if(HAS_GSAP){ gsap.killTweensOf('*'); gsap.globalTimeline.resume(); } P=null; }
function trackFor(key){ const T=TRACKS[key]; return T&&T.segs&&T.segs.length?T:null; }
function close(){ stopPlayer(); const o=$x('#xp'); if(o) o.remove(); document.body.classList.remove('xp-open'); document.removeEventListener('keydown',onKey); HOOKS.onClose(); }
function onKey(e){ if(!P) return; if(e.key==='Escape'){ close(); return; } if(e.key===' '&&!e.target.closest('button,input,textarea')){ e.preventDefault(); $x('#xp-pp').click(); } }
function open(key,opt={}){
  if(!HAS_GSAP) return; stopPlayer(); const L=LESSONS[key]; if(!L) return; LG=L.lang; TTS.pick();
  const only=opt.only; const scenes=only!=null?[only]:L.scenes.map((_,i)=>i);
  P={L,key,scenes,idx:0,playing:false,started:false,only,tl:null,cc:true,waiting:false};
  let o=$x('#xp'); if(!o){ o=document.createElement('div'); o.id='xp'; o.className='xp'; o.setAttribute('role','dialog'); o.setAttribute('aria-modal','true'); document.body.appendChild(o); }
  o.setAttribute('dir',LG==='en'?'ltr':'rtl'); o.setAttribute('lang',LG);
  document.body.classList.add('xp-open'); o.setAttribute('aria-label',L.title);
  const sibs=forSkill(L.sk,L.lang), ix=sibs.indexOf(L);
  o.innerHTML=`<div class="xp-in">
    <div class="xp-top"><button class="xp-ib" id="xp-x" aria-label="${u('close')}">${IC.x}</button><div class="xp-tt"><span class="xp-eyebrow"><span>${u('of')(AD(ix+1),AD(sibs.length))}</span>${L.min?`<span class="xp-dot">${L.min}</span>`:''}</span><h2>${escx(opt.title||L.title)}</h2></div></div>
    <div class="xp-grid">
      <div>
        <div class="xp-stage-wrap" id="xp-sw">
          <div class="xp-segs" id="xp-segs">${scenes.map(()=>'<i><b></b></i>').join('')}</div>
          <svg id="xp-stage" class="xp-stage" viewBox="0 0 640 360" role="img" aria-label="${escx(L.title)}"></svg>
          <div class="xp-scene-t" id="xp-scene-t"></div>
          <div class="xp-cover" id="xp-cover"><button class="xp-big" id="xp-start"><span class="c">${IC.play}</span><b>${u('start')}</b><small>${u('startSub')}</small></button></div>
        </div>
        <div class="xp-cap" id="xp-cap" aria-live="polite"></div>
        <div class="xp-ctl">
          <button class="xp-ib main" id="xp-pp" aria-label="${u('play')}">${IC.play}</button>
          <button class="xp-ib" id="xp-prev" aria-label="${u('prev')}">${LG==='en'?IC.next:IC.prev}</button>
          <button class="xp-ib" id="xp-rep" aria-label="${u('rep')}">${IC.replay}</button>
          <button class="xp-ib" id="xp-nxt" aria-label="${u('next')}">${LG==='en'?IC.prev:IC.next}</button>
          <span class="xp-sp"></span>
          <div class="xp-speed" role="group" aria-label="${u('speed')}">${[0.85,1,1.25].map((r,i)=>`<button data-rate="${r}" class="${TTS.rate===r?'on':''}">${u('sp')[i]}</button>`).join('')}</div>
          <button class="xp-ib" id="xp-vo" aria-pressed="${TTS.on}" aria-label="${u('voice')}">${IC.vol}</button>
          <button class="xp-ib" id="xp-ccb" aria-pressed="true" aria-label="${u('cc')}">${IC.cc}</button>
        </div>
      </div>
      <aside class="xp-side">
        <div class="xp-panel"><h3>${u('scenes')}</h3><ol class="xp-chap" id="xp-chap"></ol></div>
        ${only==null&&L.goals?`<div class="xp-panel"><h3>${u('after')}</h3><ul class="xp-goals">${L.goals.map(g=>`<li>${escx(g)}</li>`).join('')}</ul></div>`:''}
      </aside>
    </div></div>`;
  captionText(u('press'));
  renderChapters(); setSceneTitle(); document.addEventListener('keydown',onKey);
  $x('#xp-x').onclick=close;
  $x('#xp-start').onclick=()=>{ $x('#xp-cover').hidden=true; P.started=true; playScene(0); };
  $x('#xp-pp').onclick=()=>{ if(!P.started){ $x('#xp-start').click(); return; } P.playing?pause():resume(); };
  $x('#xp-nxt').onclick=()=>go(P.idx+1); $x('#xp-prev').onclick=()=>go(P.idx-1); $x('#xp-rep').onclick=()=>go(P.idx);
  $x('#xp-vo').onclick=()=>{ TTS.on=!TTS.on; $x('#xp-vo').setAttribute('aria-pressed',String(TTS.on)); if(P.started&&!P.waiting&&P.idx<P.scenes.length) playScene(P.idx); };
  $x('#xp-ccb').onclick=()=>{ P.cc=!P.cc; $x('#xp-ccb').setAttribute('aria-pressed',String(P.cc)); $x('#xp-cap').classList.toggle('off',!P.cc); };
  o.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ TTS.rate=+b.dataset.rate; if(P&&P.trk&&P.trk.audio) P.trk.audio.playbackRate=TTS.rate; o.querySelectorAll('[data-rate]').forEach(x=>x.classList.toggle('on',x===b)); gsap.globalTimeline.timeScale((RM?2.5:1)*TTS.rate); });
  gsap.globalTimeline.timeScale((RM?2.5:1)*TTS.rate);
  setTimeout(()=>$x('#xp-start')?.focus(),0);
}
function renderChapters(){ const L=P.L; $x('#xp-chap').innerHTML=P.scenes.map((si,i)=>{ const sc=L.scenes[si]; const st=i<P.idx?'done':i===P.idx?'cur':''; return `<li class="${st}"><button data-go="${i}"><span class="n">${AD(i+1)}</span><span>${escx(sc.t)}</span>${sc.interactive?`<span class="k">${u('inter')}</span>`:''}</button></li>`; }).join('')+(P.only==null&&L.quiz?`<li class="${P.idx>=P.scenes.length?'cur':''}"><button data-go="quiz"><span class="n">${IC.check}</span><span>${u('final')}</span></button></li>`:'');
  document.querySelectorAll('#xp-chap [data-go]').forEach(b=>b.onclick=()=>{ if(!P.started){ $x('#xp-cover').hidden=true; P.started=true; } b.dataset.go==='quiz'?showQuiz():go(+b.dataset.go); }); }
function setSceneTitle(){ const sc=P.L.scenes[P.scenes[P.idx]]; $x('#xp-scene-t').textContent=sc?sc.t:''; }
function setPlaying(v){ P.playing=v; const b=$x('#xp-pp'); if(b){ b.innerHTML=v?IC.pause:IC.play; b.setAttribute('aria-label',v?u('pause'):u('play')); } }
function pause(){ if(!P) return; setPlaying(false); if(P.trk&&P.trk.audio){ P.trk.audio.pause(); gsap.globalTimeline.pause(); return; } TTS.pause(); if(P.tl) P.tl.pause(); }
function resume(){ if(!P) return; setPlaying(true); if(P.trk&&P.trk.audio){ gsap.globalTimeline.resume(); if(!P.waiting) P.trk.audio.play().catch(()=>{}); return; } if(P.tl) P.tl.resume(); TTS.resume(); }
function go(i){ if(!P) return; if(i<0) i=0; if(i>=P.scenes.length){ P.only!=null?finishQuick():showQuiz(); return; } playScene(i); }
function segProgress(i,frac){ document.querySelectorAll('#xp-segs i').forEach((s,j)=>{ s.classList.toggle('done',j<i); const b=s.querySelector('b'); if(j===i) b.style.inlineSize=Math.round(frac*100)+'%'; else if(j>i) b.style.inlineSize='0'; else b.style.inlineSize=''; }); }
function setupSceneAt(pi){ if(P.tl) P.tl.kill(); gsap.killTweensOf('*'); gsap.globalTimeline.resume(); const q=$x('#xp-quiz'); if(q) q.remove();
  P.idx=pi; renderChapters(); setSceneTitle();
  const sc=P.L.scenes[P.scenes[pi]], stage=$x('#xp-stage'); stage.innerHTML=''; P.ctx=sc.setup(stage); P.ctx._stage=stage; P.ctxScene=P.scenes[pi]; gsap.fromTo(stage,{opacity:0},{opacity:1,duration:.25}); return P.ctx; }
async function playScene(i){
  if(TTS.on&&trackFor(P.key)) return playTrack(i);
  const my=++RUN; TTS.stop(); stopTrack();
  setPlaying(true); const ctx=setupSceneAt(i); const sc=P.L.scenes[P.scenes[i]]; const n=sc.beats.length;
  for(let b=0;b<n;b++){
    if(my!==RUN) return; const beat=sc.beats[b]; segProgress(i,b/n);
    const t=beat.run?beat.run(ctx):null; P.tl=t;
    await Promise.all([TTS.say(beat.say),tlDone(t)]); if(my!==RUN) return;
    if(beat.wait){ P.waiting=true; setPlaying(false); captionText(u('yourTurn')); const ok=await beat.wait(ctx); P.waiting=false; if(my!==RUN) return; setPlaying(true);
      const t2=beat.after?beat.after(ctx,ok):null; P.tl=t2; await Promise.all([TTS.say(ok?beat.right:beat.wrong),tlDone(t2)]); if(my!==RUN) return; }
    await sleep(450); if(my!==RUN) return;
    while(P&&!P.playing&&my===RUN) await sleep(120);
  }
  segProgress(i+1,0); await sleep(400); if(my!==RUN) return; go(i+1);
}
/* continuous track: beats fire at their time in the recording */
function beatById(L,id){ for(let si=0;si<L.scenes.length;si++){ const bi=L.scenes[si].beats.findIndex(b=>b.id===id); if(bi>=0) return {si,bi,beat:L.scenes[si].beats[bi]}; } return null; }
function playClip(src,onTick,start=0){ return new Promise((resolve,reject)=>{ const a=new Audio(); a.preload='auto'; a.src=src; a.playbackRate=TTS.rate; a.preservesPitch=true; P.trk.audio=a; const k=P.trk;
  a.onended=()=>{ cancelAnimationFrame(k.raf); resolve(); }; a.onerror=()=>reject(new Error('audio'));
  const tick=()=>{ if(k.dead) return; onTick&&onTick(a.currentTime); k.raf=requestAnimationFrame(tick); };
  const goPlay=()=>{ if(start) a.currentTime=start; a.play().then(()=>{ k.raf=requestAnimationFrame(tick); }).catch(reject); };
  if(a.readyState>=1) goPlay(); else a.addEventListener('loadedmetadata',goPlay,{once:true}); }); }
function capBeat(text,frac){ const w=text.split(/\s+/); if(CAPW.join(' ')!==w.join(' ')) captionWords(w); captionIdx(Math.min(w.length-1,Math.max(0,Math.floor(frac*w.length)))); }
async function playTrack(pi){
  const my=++RUN; TTS.stop(); stopTrack(); const T=trackFor(P.key), L=P.L, sceneIdx=P.scenes[pi];
  P.trk={dead:false}; P.ctx=null; P.ctxScene=null; setPlaying(true);
  let si=T.segs.findIndex(g=>g.beats.some(b=>{ const l=beatById(L,b.id); return l&&l.si===sceneIdx; }));
  if(si<0){ P.trk=null; TTS.on=false; return playScene(pi); }
  let startBeat=T.segs[si].beats.findIndex(b=>beatById(L,b.id).si===sceneIdx);
  const only=P.only!=null;
  try{
    for(;si<T.segs.length;si++){
      const seg=T.segs[si]; let next=startBeat; startBeat=0; const k=P.trk; if(my!==RUN) return;
      const firstT=seg.beats[next].t0; let cur=null, stopAt=null;
      if(only){ const end=seg.beats.findIndex(b=>beatById(L,b.id).si!==sceneIdx&&b.t0>firstT); stopAt=end>=0?seg.beats[end].t0:null; }
      const fire=b=>{ const loc=beatById(L,b.id); if(!loc) return; const pIdx=P.scenes.indexOf(loc.si); if(pIdx<0) return;
        if(pIdx!==P.idx||!P.ctx||P.ctxScene!==loc.si) setupSceneAt(pIdx);
        const sc=L.scenes[loc.si]; segProgress(pIdx,loc.bi/sc.beats.length); P.tl=loc.beat.run?loc.beat.run(P.ctx):null; cur={b,loc}; };
      const p=playClip(seg.src,t=>{
        if(stopAt!=null&&t>=stopAt){ k.audio.pause(); k.resolveStop&&k.resolveStop(); return; }
        while(next<seg.beats.length&&t+0.05>=seg.beats[next].t0){ fire(seg.beats[next]); next++; }
        if(cur) capBeat(cur.loc.beat.say,(t-cur.b.t0)/Math.max(.3,cur.b.t1-cur.b.t0));
      },firstT);
      await Promise.race([p,new Promise(r=>{ k.resolveStop=r; })]); if(my!==RUN) return;
      while(next<seg.beats.length){ fire(seg.beats[next]); next++; }
      if(only) break;
      const last=cur&&cur.loc;
      if(last&&last.beat.wait){ P.waiting=true; setPlaying(false); captionText(u('yourTurn'));
        const ok=await last.beat.wait(P.ctx); P.waiting=false; if(my!==RUN) return; setPlaying(true);
        P.tl=last.beat.after?last.beat.after(P.ctx,ok):null; const fb=T.fb&&T.fb[last.beat.id], text=ok?last.beat.right:last.beat.wrong;
        if(fb&&fb[ok?'ok':'no']){ captionWords(text.split(/\s+/)); await playClip(fb[ok?'ok':'no'],t=>{ const a=P.trk.audio; if(a.duration) capBeat(text,t/a.duration); }); }
        else { const was=TTS.on; TTS.on=false; await TTS.say(text); TTS.on=was; }  /* no recording: captions only, keep one voice per lesson */
        await tlDone(P.tl); if(my!==RUN) return; await sleep(300); }
      else await sleep(250);
      while(P&&!P.playing&&my===RUN) await sleep(120);
    }
  }catch(e){ if(my!==RUN) return; P.trk=null; TTS.on=false; $x('#xp-vo')?.setAttribute('aria-pressed','false'); return playScene(P.idx); }
  if(my!==RUN) return; P.trk=null; segProgress(P.scenes.length,0);
  only?finishQuick():showQuiz();
}
function finishQuick(){ RUN++; TTS.stop(); stopTrack(); setPlaying(false); segProgress(P.scenes.length,0); captionText(u('clipEnd'));
  const d=document.createElement('div'); d.className='xp-quiz'; d.id='xp-quiz';
  d.innerHTML=`<p class="xp-qn">${u('clipEnd')}</p><h3>${u('fullQ')}</h3><div class="xp-row"><button class="xp-btn pri" id="xp-full">${u('openFull')}</button><button class="xp-btn" id="xp-again">${u('again')}</button><button class="xp-btn" id="xp-bk">${u('close')}</button></div>`;
  $x('#xp-sw').appendChild(d); $x('#xp-full').onclick=()=>open(P.key); $x('#xp-again').onclick=()=>playScene(0); $x('#xp-bk').onclick=close; }
function showQuiz(){
  RUN++; TTS.stop(); stopTrack(); if(P.tl) P.tl.kill(); setPlaying(false); P.idx=P.scenes.length; renderChapters(); segProgress(P.scenes.length,0); $x('#xp-scene-t').textContent='';
  const Q=P.L.quiz||[]; if(!Q.length){ close(); return; } let k=0, score=0; let d=$x('#xp-quiz'); if(!d){ d=document.createElement('div'); d.className='xp-quiz'; d.id='xp-quiz'; $x('#xp-sw').appendChild(d); }
  captionText(u('quizIntro'));
  const show=()=>{ const it=Q[k]; d.innerHTML=`<p class="xp-qn">${u('qn')(AD(k+1),AD(Q.length))}</p><h3 ${it.ltr||LG==='en'?'dir="ltr"':''}>${escx(it.q)}</h3><div class="xp-opts">${it.o.map((o,i)=>`<button class="xp-opt" data-i="${i}">${escx(o)}</button>`).join('')}</div><div id="xp-fb"></div>`;
    d.querySelectorAll('.xp-opt').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i, ok=i===it.a; if(ok) score++; d.querySelectorAll('.xp-opt').forEach((x,j)=>{ x.disabled=true; if(j===it.a) x.classList.add('right'); else if(j===i) x.classList.add('wrong'); });
      $x('#xp-fb').innerHTML=`<p class="xp-why"><b>${ok?u('right'):u('wrong')}</b> ${escx(it.e)}</p><div class="xp-row"><button class="xp-btn pri" id="xp-qn">${k<Q.length-1?u('nextQ'):u('result')}</button></div>`; $x('#xp-qn').focus(); $x('#xp-qn').onclick=()=>{ k++; k<Q.length?show():end(); }; }); };
  const end=()=>{ const need=Math.ceil(Q.length*2/3), pass=score>=need; if(pass) HOOKS.onDone(P.key,score,Q.length);
    const sibs=forSkill(P.L.sk,P.L.lang), nx=sibs[sibs.indexOf(P.L)+1];
    d.innerHTML=`<p class="xp-qn">${u('result')}</p><div class="xp-score">${AD(score)} / ${AD(Q.length)}</div><h3>${pass?u('passed'):u('failed')}</h3>
      <div class="xp-row">${pass?(nx?`<button class="xp-btn pri" id="xp-nx">${u('nextL')}${escx(nx.title)}</button>`:`<button class="xp-btn pri" id="xp-done">${u('done')}</button>`):`<button class="xp-btn pri" id="xp-retry">${u('retry')}</button>`}<button class="xp-btn" id="xp-rw">${u('rewatch')}</button><button class="xp-btn" id="xp-bk">${u('close')}</button></div>`;
    captionText(pass?u('bravo'):u('retryCap'));
    const on=(id,f)=>{ const b=$x(id); if(b) b.onclick=f; }; on('#xp-nx',()=>open(nx.key)); on('#xp-done',close); on('#xp-retry',showQuiz); on('#xp-rw',()=>playScene(0)); on('#xp-bk',close); };
  show();
}

window.XP={ add, forSkill, all:()=>ORDER.map(k=>LESSONS[k]), get:k=>LESSONS[k], open, close, setHooks:h=>Object.assign(HOOKS,h), loadTracks, ready:HAS_GSAP,
  h:{el,note,txt,drawIn,checkMark,crossMark,arrow,tl,AD,tlDone} };
})();
