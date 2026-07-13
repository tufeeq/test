const $=id=>document.getElementById(id);
const els={welcome:$("welcome"),messages:$("messages"),load:$("loadModelBtn"),progressWrap:$("progressWrap"),progressBar:$("progressBar"),progressLabel:$("progressLabel"),status:$("statusText"),input:$("promptInput"),send:$("sendBtn"),form:$("chatForm"),model:$("modelSelect"),settings:$("settingsDialog"),system:$("systemPrompt"),temperature:$("temperature"),tempValue:$("temperatureValue"),maxTokens:$("maxTokens"),knowledge:$("knowledgeToggle"),export:$("exportBtn"),exportMenu:$("exportMenu"),fileInput:$("fileInput"),contextBar:$("contextBar"),openAlexEmail:$("openAlexEmail"),title:$("workspaceTitle")};
let engine=null,isGenerating=false,mode="general",attachments=[];
let chat=JSON.parse(localStorage.getItem("nexus-chat")||"[]");
const saved=JSON.parse(localStorage.getItem("nexus-settings")||"{}");

const modePrompts={
 general:"Answer clearly and helpfully.",
 research:"Act as a rigorous research analyst. Search supplied evidence, compare sources, identify uncertainty, and cite every material factual claim using [n].",
 document:"Create a polished executive document with a strong title, executive summary, numbered sections, actionable recommendations, and a concise conclusion.",
 presentation:"Create a presentation-ready narrative. Use a title followed by slide sections formatted as '## Slide N: Title', concise bullets, and 'Speaker notes:' for each slide.",
 analysis:"Use a structured decision method: define the problem, assumptions, evidence, options, trade-offs, risks, recommendation, and next actions."
};
const modeTitles={general:"General assistant",research:"Deep research",document:"Structured document",presentation:"Presentation builder",analysis:"Analysis & planning"};

const fallbackModels=[
  {model_id:"Qwen2.5-1.5B-Instruct-q4f16_1-MLC"},
  {model_id:"Phi-3.5-mini-instruct-q4f16_1-MLC"},
  {model_id:"Llama-3.2-3B-Instruct-q4f16_1-MLC"}
];
let webllmModule=null;
const choices=[...fallbackModels];
choices.forEach(m=>{const o=document.createElement("option");o.value=m.model_id;o.textContent=m.model_id.replace(/-MLC$/," ");els.model.append(o)});
if(saved.model&&choices.some(x=>x.model_id===saved.model))els.model.value=saved.model;
if(saved.system)els.system.value=saved.system;if(saved.temperature!=null)els.temperature.value=saved.temperature;if(saved.maxTokens)els.maxTokens.value=saved.maxTokens;if(saved.openAlexEmail)els.openAlexEmail.value=saved.openAlexEmail;if(saved.knowledge===false)els.knowledge.checked=false;els.tempValue.textContent=els.temperature.value;

function save(){localStorage.setItem("nexus-chat",JSON.stringify(chat));}
function escapeHtml(s){return s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));}
function formatMarkdown(text){let h=escapeHtml(text);h=h.replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/^[-•] (.*)$/gm,"<div>• $1</div>").replace(/\n/g,"<br>");return h;}
function renderMessage(role,content,sources=[]){
  els.welcome.classList.add("hidden");
  els.messages.classList.remove("hidden");
  const node=document.createElement("article");
  node.className=`message ${role}`;
  node.innerHTML=`<div class="avatar">${role==="user"?"You":"N"}</div><div><div class="bubble"></div><div class="message-tools"></div></div>`;
  const bubble=node.querySelector(".bubble");
  bubble.innerHTML=formatMarkdown(content);
  if(sources.length){
    const box=document.createElement("div");
    box.className="sources";
    box.innerHTML="<strong>Sources used</strong>"+sources.map((s,i)=>`<a href="${s.url}" target="_blank" rel="noopener">[${i+1}] ${escapeHtml(s.title)}</a>`).join("");
    bubble.after(box);
  }
  const tools=node.querySelector(".message-tools");
  if(role==="assistant"){
    tools.innerHTML='<button data-action="copy">Copy</button><button data-action="use">Use as document</button>';
    tools.onclick=e=>{
      if(e.target.dataset.action==="copy") navigator.clipboard.writeText(content);
      if(e.target.dataset.action==="use"){
        chat=[{role:"assistant",content,sources}];
        save();
        alert("This response is now the active export document.");
      }
    };
  }
  els.messages.append(node);
  els.messages.scrollTop=els.messages.scrollHeight;
  els.export.disabled=!chat.length;
  return bubble;
}

chat.forEach(m=>renderMessage(m.role,m.content,m.sources||[]));

async function loadModel(){
  if(location.protocol==="file:"){alert("The AI engine cannot run reliably when index.html is opened directly. Start the included local server, then open http://localhost:8080.");return}
  if(!navigator.gpu){alert("WebGPU is unavailable. Use an updated Chrome or Edge browser and ensure hardware acceleration is enabled.");return}
  els.load.disabled=true;els.progressWrap.classList.remove("hidden");els.status.textContent="Connecting to the free local AI engine…";
  try{
    if(!webllmModule){webllmModule=await import("https://esm.run/@mlc-ai/web-llm");}
    engine=await webllmModule.CreateMLCEngine(els.model.value,{initProgressCallback:p=>{const v=Math.round((p.progress||0)*100);els.progressBar.style.width=`${v}%`;els.progressLabel.textContent=p.text||`Loading ${v}%`}});
    els.status.textContent="Ready • local model active • public research available";els.progressLabel.textContent="Model ready";els.input.disabled=false;els.send.disabled=false;els.input.focus();
  }catch(e){console.error(e);els.load.disabled=false;els.status.textContent="Model failed to load";els.progressLabel.textContent=`Could not load the model: ${e?.message||"network or browser error"}`;alert("The interface is working, but the AI model could not load. Check the internet connection for the first download, use Chrome/Edge, and try the smaller Qwen model.");}
}

async function fetchJSON(url,timeout=12000){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeout);try{const r=await fetch(url,{signal:controller.signal,headers:{Accept:"application/json"}});if(!r.ok)throw new Error(r.status);return await r.json()}finally{clearTimeout(timer)}}
async function searchKnowledge(query){const sources=[];const snippets=[];const q=encodeURIComponent(query.slice(0,220));
 const jobs=[
  (async()=>{const d=await fetchJSON(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=4&prop=extracts|info&exintro=1&explaintext=1&inprop=url&format=json&origin=*`);for(const p of Object.values(d.query?.pages||{})){sources.push({title:p.title,url:p.fullurl||`https://en.wikipedia.org/wiki/${encodeURIComponent(p.title)}`});snippets.push(`${p.title}: ${(p.extract||"").slice(0,900)}`)}})(),
  (async()=>{let url=`https://api.crossref.org/works?query=${q}&rows=4&select=title,abstract,URL,published,author`;const d=await fetchJSON(url);for(const x of d.message?.items||[]){const title=x.title?.[0]||"Crossref work";sources.push({title,url:x.URL});snippets.push(`${title}: ${(x.abstract||"").replace(/<[^>]+>/g,"").slice(0,700)}`)}})(),
  (async()=>{let url=`https://api.openalex.org/works?search=${q}&per-page=4`;if(els.openAlexEmail.value)url+=`&mailto=${encodeURIComponent(els.openAlexEmail.value)}`;const d=await fetchJSON(url);for(const x of d.results||[]){sources.push({title:x.display_name,url:x.doi||x.id});snippets.push(`${x.display_name}. Year: ${x.publication_year||"unknown"}. Cited by: ${x.cited_by_count||0}. ${(x.primary_location?.source?.display_name||"")}`)}})(),
  (async()=>{const d=await fetchJSON(`https://api.worldbank.org/v2/country/all/indicator?format=json&per_page=5`);void d;})()
 ];await Promise.allSettled(jobs);return{sources:sources.slice(0,10),context:snippets.slice(0,10).map((s,i)=>`[${i+1}] ${s}`).join("\n\n")};}

async function submitPrompt(raw){const text=raw.trim();if(!engine||isGenerating||!text)return;isGenerating=true;els.send.disabled=true;els.input.value="";autoResize();chat.push({role:"user",content:text});renderMessage("user",text);let research={sources:[],context:""};if(els.knowledge.checked&&(mode==="research"||/research|latest|evidence|source|data|study|statistics|current/i.test(text))){els.status.textContent="Searching open knowledge sources…";research=await searchKnowledge(text);els.status.textContent=`Found ${research.sources.length} public sources • synthesizing locally`;}
 const attachmentContext=attachments.length?`\n\nUSER ATTACHMENTS:\n${attachments.map(a=>`--- ${a.name} ---\n${a.content.slice(0,12000)}`).join("\n")}`:"";
 const evidence=research.context?`\n\nPUBLIC SOURCE EXCERPTS:\n${research.context}\nUse only the numbered citations above and do not invent references.`:"";
 const system=`${els.system.value.trim()}\n\nCURRENT MODE: ${modePrompts[mode]}${attachmentContext}${evidence}`;
 const output=renderMessage("assistant","");try{const history=chat.slice(-12).map(x=>({role:x.role,content:x.content}));const stream=await engine.chat.completions.create({messages:[{role:"system",content:system},...history],temperature:Number(els.temperature.value),max_tokens:Number(els.maxTokens.value),stream:true});let answer="";for await(const chunk of stream){answer+=chunk.choices?.[0]?.delta?.content||"";output.innerHTML=formatMarkdown(answer);els.messages.scrollTop=els.messages.scrollHeight}chat.push({role:"assistant",content:answer,sources:research.sources});save();if(research.sources.length){const box=document.createElement("div");box.className="sources";box.innerHTML="<strong>Sources used</strong>"+research.sources.map((s,i)=>`<a href="${s.url}" target="_blank" rel="noopener">[${i+1}] ${escapeHtml(s.title)}</a>`).join("");output.after(box)}els.export.disabled=false;els.status.textContent="Ready • local model active"}catch(e){console.error(e);output.textContent="Generation failed. Try a shorter request, a smaller context, or a model with more capacity."}finally{isGenerating=false;els.send.disabled=false;els.input.focus()}}

function activeContent(){return [...chat].reverse().find(x=>x.role==="assistant")?.content||chat.map(x=>`${x.role.toUpperCase()}: ${x.content}`).join("\n\n")||"Nexus AI document";}
function titleFrom(text){return (text.split("\n").find(x=>x.trim())||"Nexus AI Output").replace(/^#+\s*/,"").slice(0,80)}
function downloadBlob(blob,name){const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function sections(text){const lines=text.split("\n");const out=[];let cur={title:titleFrom(text),body:[]};for(const line of lines){if(/^#{1,3}\s+/.test(line)||/^Slide \d+:/i.test(line)){if(cur.body.length)out.push(cur);cur={title:line.replace(/^#+\s*/,""),body:[]}}else cur.body.push(line)}if(cur.body.length||!out.length)out.push(cur);return out;}
async function exportDocx(){
 const {Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType}=await import("https://esm.run/docx@9.7.1");
 const text=activeContent();const children=[];for(const line of text.split("\n")){if(/^# /.test(line))children.push(new Paragraph({text:line.slice(2),heading:HeadingLevel.TITLE,alignment:AlignmentType.CENTER}));else if(/^## /.test(line))children.push(new Paragraph({text:line.slice(3),heading:HeadingLevel.HEADING_1}));else if(/^### /.test(line))children.push(new Paragraph({text:line.slice(4),heading:HeadingLevel.HEADING_2}));else children.push(new Paragraph({children:[new TextRun({text:line.replace(/^[-•]\s*/,"")})],bullet:/^[-•]/.test(line)?{level:0}:undefined,spacing:{after:120}}))}const doc=new Document({sections:[{properties:{},children}]});downloadBlob(await Packer.toBlob(doc),`${titleFrom(text)}.docx`)}
async function exportPdf(){const {jsPDF}=await import("https://esm.run/jspdf@3.0.1");const text=activeContent();const pdf=new jsPDF({unit:"pt",format:"a4"});pdf.setFont("helvetica","normal");pdf.setFontSize(12);const margin=54,width=487;const lines=pdf.splitTextToSize(text.replace(/[#*]/g,""),width);let y=64;for(const line of lines){if(y>780){pdf.addPage();y=64}pdf.text(line,margin,y);y+=17}pdf.save(`${titleFrom(text)}.pdf`)}
async function exportPptx(){if(!window.PptxGenJS){alert("PowerPoint library did not load.");return}const text=activeContent(),pptx=new window.PptxGenJS();pptx.layout="LAYOUT_WIDE";pptx.author="Nexus AI";pptx.subject=titleFrom(text);pptx.title=titleFrom(text);pptx.company="Nexus AI Workspace";pptx.lang="en-US";const cover=pptx.addSlide();cover.background={color:"0B1020"};cover.addText(titleFrom(text),{x:.8,y:1.7,w:11.7,h:1.2,fontFace:"Aptos Display",fontSize:30,bold:true,color:"FFFFFF",margin:0});cover.addText("Generated with Nexus AI Workspace",{x:.82,y:3.05,w:8,h:.4,fontSize:13,color:"9FAED0",margin:0});for(const s of sections(text).slice(0,15)){const slide=pptx.addSlide();slide.background={color:"F7F8FC"};slide.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:.18,line:{color:"6D7CFF"},fill:{color:"6D7CFF"}});slide.addText(s.title,{x:.65,y:.5,w:12,h:.65,fontFace:"Aptos Display",fontSize:24,bold:true,color:"17203A",margin:0});const body=s.body.filter(Boolean).slice(0,10).map(x=>({text:x.replace(/^[-•]\s*/,"").slice(0,220),options:{bullet:/^[-•]/.test(x)?{indent:16}:undefined,breakLine:true}}));slide.addText(body.length?body:[{text:"",options:{}}],{x:.8,y:1.45,w:11.7,h:5.3,fontFace:"Aptos",fontSize:16,color:"33415C",breakLine:true,margin:.08,valign:"top",paraSpaceAfterPt:10});slide.addText("NEXUS AI",{x:11.5,y:7.05,w:1.1,h:.2,fontSize:8,color:"8290AA",align:"right",margin:0})}await pptx.writeFile({fileName:`${titleFrom(text)}.pptx`})}
function exportText(ext){const text=activeContent();downloadBlob(new Blob([text],{type:ext==="md"?"text/markdown":"text/plain"}),`${titleFrom(text)}.${ext}`)}

function autoResize(){els.input.style.height="auto";els.input.style.height=`${Math.min(els.input.scrollHeight,190)}px`}
els.load.onclick=loadModel;els.form.onsubmit=e=>{e.preventDefault();submitPrompt(els.input.value)};els.input.oninput=autoResize;els.input.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();els.form.requestSubmit()}};
document.querySelectorAll(".suggestion").forEach(b=>b.onclick=()=>{els.input.value=b.dataset.prompt;autoResize();els.input.focus()});
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{document.querySelectorAll(".mode").forEach(x=>x.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;els.title.textContent=modeTitles[mode];els.input.placeholder=`Ask Nexus AI to ${mode==="presentation"?"build a presentation":mode==="research"?"research with sources":mode==="document"?"write a structured document":"solve this task"}…`});
$("settingsBtn").onclick=()=>els.settings.showModal();els.temperature.oninput=()=>els.tempValue.textContent=els.temperature.value;
$("saveSettingsBtn").onclick=()=>{localStorage.setItem("nexus-settings",JSON.stringify({model:els.model.value,system:els.system.value,temperature:els.temperature.value,maxTokens:els.maxTokens.value,openAlexEmail:els.openAlexEmail.value,knowledge:els.knowledge.checked}));if(engine)els.status.textContent="Settings saved. Reload to switch the loaded model."};
function reset(){chat=[];attachments=[];save();els.messages.innerHTML="";els.messages.classList.add("hidden");els.welcome.classList.remove("hidden");els.export.disabled=true;els.contextBar.classList.add("hidden")}
$("clearDataBtn").onclick=reset;$("newChatBtn").onclick=reset;$("attachBtn").onclick=()=>els.fileInput.click();els.fileInput.onchange=async()=>{for(const f of els.fileInput.files){attachments.push({name:f.name,content:await f.text()})}els.contextBar.textContent=`Attached: ${attachments.map(x=>x.name).join(", ")}`;els.contextBar.classList.remove("hidden")};
els.export.onclick=e=>{e.stopPropagation();els.exportMenu.classList.toggle("hidden")};document.onclick=()=>els.exportMenu.classList.add("hidden");els.exportMenu.onclick=async e=>{e.stopPropagation();const type=e.target.dataset.export;if(!type)return;els.exportMenu.classList.add("hidden");if(type==="docx")await exportDocx();else if(type==="pptx")await exportPptx();else if(type==="pdf")await exportPdf();else exportText(type)};
