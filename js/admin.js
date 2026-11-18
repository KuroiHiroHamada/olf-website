const LS="olf_admin",DR="olf_draft",$=i=>document.getElementById(i);
let D=JSON.parse(JSON.stringify(CONTENT)),tab="site",dirty=false,G={};
try{G=JSON.parse(localStorage.getItem(LS))||{};const d=localStorage.getItem(DR);if(d){D=JSON.parse(d);dirty=true}}catch(e){}
const F={
 site:{t:"Site",one:1,f:[["logo","Logo text"],["name","Business name (footer)"],["heroTitle","Home headline"],["heroText","Home subtitle","area"],["blue","Main colour","color"],["lime","Accent colour","color"],["navy","Dark colour","color"],["cream","Page background","color"]]},
 config:{t:"Contact",one:1,f:[["whatsapp","WhatsApp number for orders and bookings (digits only, with country code)"],["email","Email"],["turkey","Turkey phone"],["ghana","Ghana phone"]]},
 services:{t:"Services",f:[["ic","Emoji"],["n","Title"],["d","Short text"],["more","Popup text","area"],["pts","Popup bullets (one per line)","lines"],["link","Opens a page instead of booking (optional, e.g. tours.html)"],["act","Button text for that page"]]},
 reasons:{t:"Why us",f:[["ic","Emoji"],["n","Title"],["d","Short text"],["more","Popup text","area"],["pts","Popup bullets (one per line)","lines"]]},
 houses:{t:"Prefab houses",f:[["n","Name (e.g. RH 204)"],["e","Emoji"],["c","Card colour","bg"],["img","Photo","img"],["type","Type (e.g. 3+1+K)"],["size","Size (e.g. 105 m²)"],["price","Price text"],["wall","Wall colour (outside, 3D)","color"],["roof","Roof colour (3D)","color"]]},
 tours:{t:"Tours",f:[["n","Name"],["region","Region"],["e","Emoji"],["c","Card colour","bg"],["img","Photo","img"],["days","Duration"],["price","Price text"],["d","Description","area"],["hl","Highlights (one per line)","lines"]]},
 products:{t:"Shop",f:[["n","Name"],["cat","Category"],["e","Emoji"],["c","Card colour","bg"],["img","Photo","img"],["price","Price in USD (number)","num"],["sizes","Sizes, comma separated (blank if none)","csv"],["d","Description"]]}};
const T={services:{ic:"⭐",n:"New service",d:"",more:"",pts:[],link:"",act:""},reasons:{ic:"⭐",n:"New reason",d:"",more:"",pts:[]},houses:{n:"New house",e:"🏠",c:"#cfe8ff",type:"",size:"",price:"Request a quote",wall:"#f0dc82",roof:"#c0272d"},tours:{n:"New tour",region:"Istanbul",e:"🏞️",c:"#d6e4f7",days:"",price:"",d:"",hl:[]},products:{n:"New product",cat:"Shoes",e:"👟",c:"#e8d5c0",price:0,sizes:[],d:""}};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const msg=t=>$("st").textContent=t;
const st=()=>msg(dirty?"● Unpublished changes (saved in this browser)":"All changes published");
const target=(c,i)=>i<0?D[c]:D[c][i];
function save(){dirty=true;try{localStorage.setItem(DR,JSON.stringify(D))}catch(e){}st()}
function set(c,i,k,el,t){let v=el.value;if(t=="lines")v=v.split("\n").map(x=>x.trim()).filter(Boolean);else if(t=="csv")v=v.split(",").map(x=>x.trim()).filter(Boolean);else if(t=="num")v=+v||0;target(c,i)[k]=v;save()}
function fld(c,i,[k,l,t],o){const v=o[k];let val=t=="lines"?(v||[]).join("\n"):t=="csv"?(v||[]).join(", "):v??"";
 const a=`oninput="set('${c}',${i},'${k}',this,'${t||""}')"`;
 const inp=t=="area"||t=="lines"?`<textarea rows="${t=="lines"?4:3}" ${a}>${esc(val)}</textarea>`
 :t=="color"?`<input type="color" value="${esc(val)}" ${a}>`
 :t=="bg"?`<input value="${esc(val)}" ${a}> <input type="color" value="${/^#[0-9a-f]{6}$/i.test(val)?val:"#cccccc"}" oninput="const p=this.previousElementSibling;p.value=this.value;p.dispatchEvent(new Event('input'))">`
 :t=="img"?`<input value="${esc(val)}" placeholder="img/photo.jpg (or upload below)" ${a}><input type="file" accept="image/*" onchange="up('${c}',${i},'${k}',this)">`
 :`<input value="${esc(val)}" ${a}>`;
 return `<label class="f"><span>${l}</span>${inp}</label>`}
function draw(){$("tabs").innerHTML=Object.entries(F).map(([k,v])=>`<button class="${k==tab?"on":""}" onclick="tab='${k}';draw()">${v.t}</button>`).join("");
 const s=F[tab];let h=`<h2>${s.t}</h2>`;
 if(s.one)h+=s.f.map(f=>fld(tab,-1,f,D[tab])).join("");
 else h+=D[tab].map((o,i)=>`<details class="it"><summary><span>${esc(o.ic||o.e||"")} ${esc(o.n)}</span><span class="ac"><button onclick="mv(event,${i},-1)">↑</button><button onclick="mv(event,${i},1)">↓</button><button onclick="rm(event,${i})">🗑</button></span></summary>${s.f.map(f=>fld(tab,i,f,o)).join("")}</details>`).join("")+`<button class="b p" onclick="add()">+ Add new</button>`;
 $("ed").innerHTML=h;st()}
function mv(e,i,d){e.preventDefault();const a=D[tab],j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];save();draw()}
function rm(e,i){e.preventDefault();if(confirm("Delete this item?")){D[tab].splice(i,1);save();draw()}}
function add(){D[tab].push({...T[tab],id:"x"+Date.now().toString(36)});save();draw();const l=[...document.querySelectorAll("details")].pop();l.open=true;l.scrollIntoView()}
// ---- publishing ----
const out=()=>{let s=JSON.stringify(D,null,1);for(let i=0;i<3;i++)s=s.replace(/\[\s*([^\[\]{}]*?)\s*\]/g,(m,x)=>"["+x.replace(/\s*\n\s*/g," ")+"]");return "const CONTENT = "+s+";\n"};
const API=()=>`https://api.github.com/repos/${G.o}/${G.r}/contents/`;
const H=()=>({Authorization:"Bearer "+G.t,Accept:"application/vnd.github+json"});
const b64=s=>btoa(unescape(encodeURIComponent(s)));
const ready=()=>{if(G.o&&G.r&&G.t)return true;gh();return false};
const cl=()=>$("dlg").innerHTML="";
function gh(){$("dlg").innerHTML=`<div class="im open"><div class="imb"><button class="x" onclick="cl()">×</button><h2>GitHub connection</h2><p style="font-size:13px">Publishing saves your changes to your GitHub repository, and your free host updates itself. The token stays in this browser only. Use a fine-grained token limited to this one repository with Contents: Read and write.</p>
<label class="f"><span>GitHub username</span><input id="go" value="${esc(G.o)}"></label><label class="f"><span>Repository name</span><input id="gr" value="${esc(G.r)}"></label><label class="f"><span>Branch</span><input id="gb" value="${esc(G.b||"main")}"></label><label class="f"><span>Token</span><input id="gt" type="password" value="${esc(G.t)}"></label><button class="b p" onclick="gsave()">Save</button></div></div>`}
function gsave(){G={o:$("go").value.trim(),r:$("gr").value.trim(),b:$("gb").value.trim()||"main",t:$("gt").value.trim()};try{localStorage.setItem(LS,JSON.stringify(G))}catch(e){}cl();msg("GitHub details saved")}
async function put(path,c64,m){let sha;const r=await fetch(API()+path+"?ref="+G.b,{headers:H()});if(r.ok)sha=(await r.json()).sha;
 const w=await fetch(API()+path,{method:"PUT",headers:H(),body:JSON.stringify({message:m,content:c64,sha,branch:G.b})});if(!w.ok)throw new Error((await w.json()).message)}
async function pub(){if(!ready())return;try{msg("Publishing...");await put("js/content.js",b64(out()),"Update site content from admin");dirty=false;try{localStorage.removeItem(DR)}catch(e){}msg("Published. The live site updates in about a minute.")}catch(e){msg("Publish failed");alert("Publish failed: "+e.message)}}
async function pull(){if(!ready())return;if(dirty&&!confirm("This replaces your unpublished changes. Continue?"))return;
 try{const r=await fetch(API()+"js/content.js?ref="+G.b,{headers:{...H(),Accept:"application/vnd.github.raw"}});if(!r.ok)throw new Error("Not found");
 D=JSON.parse((await r.text()).replace(/^[^{]*/,"").replace(/;\s*$/,""));dirty=false;try{localStorage.removeItem(DR)}catch(e){}draw();msg("Loaded latest published version")}catch(e){alert("Could not load: "+e.message)}}
function dl(){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([out()],{type:"text/javascript"}));a.download="content.js";a.click()}
async function up(c,i,k,el){const f=el.files[0];if(!f||!ready())return;
 try{msg("Uploading photo...");const im=await createImageBitmap(f),s=Math.min(1,1000/Math.max(im.width,im.height)),cv=document.createElement("canvas");cv.width=im.width*s;cv.height=im.height*s;cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);
 const p="img/"+Date.now()+".jpg";await put(p,cv.toDataURL("image/jpeg",.8).split(",")[1],"Add photo from admin");target(c,i)[k]=p;el.previousElementSibling.value=p;save();msg("Photo uploaded. Press Publish to attach it.")}catch(e){alert("Upload failed: "+e.message)}}
draw();
