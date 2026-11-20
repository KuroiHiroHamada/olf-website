const LS="olf_admin",DR="olf_draft",$=i=>document.getElementById(i);
let D=JSON.parse(JSON.stringify(CONTENT)),tab="site",dirty=false,G={};
try{G=JSON.parse(localStorage.getItem(LS))||{};const d=localStorage.getItem(DR);if(d){D=JSON.parse(d);dirty=true}}catch(e){}
function norm(){const cl=x=>JSON.parse(JSON.stringify(x)),S=CONTENT;
 ["categories","destinations","travel","hotels","partners","lanes","calc"].forEach(k=>{if(!D[k]&&S[k])D[k]=cl(S[k])});(D.services||[]).forEach(s=>{if(s.id=="travel"&&s.link=="tours.html"){s.link="travel.html";s.act="Explore travel"}});D.faq=D.faq||[];if(D.site)Object.keys(S.site).forEach(k=>{if(D.site[k]===undefined)D.site[k]=S.site[k]});
 (D.services||[]).forEach(s=>{if(s.shop===undefined)s.shop=s.id=="apparel";if(s.img===undefined)s.img=""});
 (D.reasons||[]).forEach(r=>{if(r.img===undefined)r.img=""});
 (D.categories||[]).forEach(c=>{if(!c.svc)c.svc="apparel"});
 if(S.services&&D.services&&!D.services.some(s=>s.id=="building")){const b=S.services.find(s=>s.id=="building");
  if(b){D.services.push(cl(b));S.categories.filter(c=>c.svc=="building").forEach(c=>D.categories.push(cl(c)));S.products.filter(p=>S.categories.some(c=>c.id==p.cat&&c.svc=="building")).forEach(p=>(D.products=D.products||[]).push(cl(p)))}}
 (D.products||[]).forEach(p=>{const c=(D.categories||[]).find(c=>c.n==p.cat);if(c)p.cat=c.id});
 (D.tours||[]).forEach(t=>{const d=(D.destinations||[]).find(d=>d.n==t.region);if(d)t.region=d.id})}
const F={
 site:{t:"Site",one:1,f:[["logo","Logo text"],["name","Business name (footer)"],["heroTitle","Home headline"],["heroText","Home subtitle","area"],["heroImg","Home banner photo (optional)","img"],["trust","Trust strip under the banner (one per line)","lines"],["ctaTitle","Bottom banner headline"],["ctaText","Bottom banner text","area"],["tagline","Footer tagline"],["showQr","Show the 'scan to open on your phone' box on the home page","bool"],["partnersTitle","Partners heading"],["blue","Main colour","color"],["lime","Accent colour","color"],["navy","Dark colour","color"],["cream","Page background","color"]]},
 config:{t:"Contact",one:1,f:[["whatsapp","WhatsApp number for orders and bookings (digits only, with country code)"],["email","Email"],["turkey","Turkey phone"],["ghana","Ghana phone"]]},
 services:{t:"Services",f:[["ic","Emoji"],["n","Title"],["img","Photo","img"],["d","Short text"],["more","Popup text","area"],["pts","Popup bullets (one per line)","lines"],["shop","Sell products from this service in the shop","bool"],["link","Opens a page instead (optional, e.g. tours.html)"],["act","Button text (optional)"]]},
 reasons:{t:"Why us",f:[["ic","Emoji"],["n","Title"],["img","Photo","img"],["d","Short text"],["more","Popup text","area"],["pts","Popup bullets (one per line)","lines"],["href","Button link (optional, e.g. book.html)"],["cta","Button text"]]},
 partners:{t:"Partners",f:[["n","Name"],["img","Logo","img"]]},
 lanes:{t:"Freight rates",f:[["route","Route (for example Istanbul to Accra)"],["mode","Mode","opt:air|sea|road"],["rate","Rate in USD: per kg for air and road, per cubic metre for sea","num"],["min","Minimum charge in USD","num"],["days","Transit time (for example 5 to 8 days)"]]},
 calc:{t:"Freight settings",one:1,f:[["title","Page title"],["intro","Intro text","area"],["sym","Currency symbol"],["fuel","Fuel and handling surcharge, percent","num"],["fragile","Extra for fragile or special handling, percent","num"],["pickup","Door pickup fee, per shipment","num"],["delivery","Door delivery fee, per shipment","num"],["ins","Insurance, percent of declared value","num"],["divAir","Air volume divisor (cubic cm per kg)","num"],["divRoad","Road volume divisor (cubic cm per kg)","num"],["note","Note shown under the estimate","area"],["sample","Show the 'sample rates' warning on the page","bool"]]},
 faq:{t:"FAQ",f:[["n","Question"],["a","Answer","area"]]},
 houses:{t:"Prefab houses",f:[["n","Name (e.g. RH 204)"],["e","Emoji"],["c","Card colour","bg"],["img","Photo","img"],["type","Type (e.g. 3+1+K)"],["size","Size (e.g. 105 m²)"],["price","Price text"],["wall","Wall colour (outside, 3D)","color"],["roof","Roof colour (3D)","color"]]},
 travel:{t:"Travel sections",f:[["n","Section name"],["e","Emoji"],["c","Tile colour","bg"],["img","Photo","img"],["d","Short description"],["link","Opens page (e.g. tours.html or hotels.html)"]]},
 destinations:{t:"Tour destinations",f:[["n","Destination name"],["e","Emoji"],["c","Tile colour","bg"],["img","Photo","img"],["d","Short description"]]},
 hotels:{t:"Hotels",f:[["n","Hotel name"],["dest","Destination","sel:destinations"],["stars","Stars (1 to 5)","num"],["e","Emoji"],["c","Card colour","bg"],["img","Photo","img"],["price","From price per night in USD (number)","num"],["d","Description","area"],["amen","Amenities (comma separated)","csv"],["rooms","Room types, one per line: name | price per night","lines"]]},
 tours:{t:"Tours",f:[["n","Name"],["region","Destination","sel:destinations"],["e","Emoji"],["c","Card colour","bg"],["img","Photo","img"],["days","Duration"],["price","Price text"],["d","Description","area"],["hl","Highlights (one per line)","lines"]]},
 categories:{t:"Shop categories",f:[["n","Category name"],["svc","Belongs to service","sel:services"],["e","Emoji"],["c","Tile colour","bg"],["img","Photo","img"],["d","Short description"]]},
 products:{t:"Shop products",f:[["n","Name"],["cat","Category","sel:categories"],["e","Emoji"],["c","Card colour","bg"],["img","Photo","img"],["price","Price in USD (number)","num"],["sizes","Sizes, comma separated (blank if none)","csv"],["d","Short description (shown on the card)"],["more","Full description (shown when the product is opened)","area"],["specs","Specifications, one per line, written Label: value","lines"]]}};
const T={lanes:{route:"",mode:"air",rate:0,min:0,days:""},partners:{n:"New partner",img:""},travel:{n:"New section",e:"📍",c:"#d6e4f7",img:"",d:"",link:""},hotels:{n:"New hotel",stars:4,e:"🏨",c:"#a6c1ee",img:"",price:0,d:"",amen:[],rooms:[]},destinations:{n:"New destination",e:"📍",c:"#d6e4f7",img:"",d:""},categories:{n:"New category",e:"🧥",c:"#d6e4f7",img:"",d:""},faq:{n:"New question",a:""},services:{ic:"⭐",n:"New service",img:"",d:"",more:"",pts:[],shop:false,link:"",act:""},reasons:{ic:"⭐",n:"New reason",img:"",d:"",more:"",pts:[]},houses:{n:"New house",e:"🏠",c:"#cfe8ff",type:"",size:"",price:"Request a quote",wall:"#f0dc82",roof:"#c0272d"},tours:{n:"New tour",region:"Istanbul",e:"🏞️",c:"#d6e4f7",days:"",price:"",d:"",hl:[]},products:{n:"New product",e:"🛍️",c:"#e8d5c0",img:"",price:0,sizes:[],d:"",more:"",specs:[]}};
norm();
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const msg=t=>$("st").textContent=t;
const st=()=>msg(dirty?"● Unpublished changes (saved in this browser)":"All changes published");
const target=(c,i)=>i<0?D[c]:D[c][i];
function save(){dirty=true;try{localStorage.setItem(DR,JSON.stringify(D))}catch(e){}st()}
function set(c,i,k,el,t){let v=el.value;if(t=="lines")v=v.split("\n").map(x=>x.trim()).filter(Boolean);else if(t=="csv")v=v.split(",").map(x=>x.trim()).filter(Boolean);else if(t=="num")v=+v||0;target(c,i)[k]=v;save()}
const lbl=(col,x)=>col=="categories"?(((D.services||[]).find(s=>s.id==x.svc)||{}).n||"?")+" › "+x.n:x.n;
const opts=(col,val)=>(D[col]||[]).map(x=>`<option value="${esc(x.id)}" ${x.id==val?"selected":""}>${esc(lbl(col,x))}</option>`).join("");
function fld(c,i,[k,l,t],o){const v=o[k];let val=t=="lines"?(v||[]).join("\n"):t=="csv"?(v||[]).join(", "):v??"";
 const a=`oninput="set('${c}',${i},'${k}',this,'${t||""}')"`;
 const inp=t=="area"||t=="lines"?`<textarea rows="${t=="lines"?4:3}" ${a}>${esc(val)}</textarea>`
 :t=="color"?`<input type="color" value="${esc(val)}" ${a}>`
 :t=="bg"?`<input value="${esc(val)}" ${a}> <input type="color" value="${/^#[0-9a-f]{6}$/i.test(val)?val:"#cccccc"}" oninput="const p=this.previousElementSibling;p.value=this.value;p.dispatchEvent(new Event('input'))">`
   :(t||"").startsWith("opt:")?`<select onchange="set('${c}',${i},'${k}',this,'')">${t.slice(4).split("|").map(o=>`<option ${o==val?"selected":""}>${o}</option>`).join("")}</select>`
 :(t||"").startsWith("sel:")?`<select onchange="set('${c}',${i},'${k}',this,'')"><option value="">Choose...</option>${opts(t.slice(4),val)}</select>`
 :t=="bool"?`<input type="checkbox" ${val?"checked":""} onchange="set('${c}',${i},'${k}',{value:this.checked},'bool')">`
 :t=="img"?`<div class="imgf"><input value="${esc(val)}" placeholder="img/photo.jpg (or choose a photo)" ${a}><label class="b upl">📷 Choose photo<input type="file" accept="image/*" hidden onchange="up('${c}',${i},'${k}',this)"></label>${val?`<img class="th" src="${esc(val)}" alt="" onerror="this.style.display='none'">`:""}<span class="us"></span></div>`
 :`<input value="${esc(val)}" ${a}>`;
 const g=t=="img"?"div":"label";return `<${g} class="f"><span>${l}</span>${inp}</${g}>`}
function draw(){$("tabs").innerHTML=Object.entries(F).map(([k,v])=>`<button class="${k==tab?"on":""}" onclick="tab='${k}';draw()">${v.t}</button>`).join("");
 const s=F[tab];if(!s.one)D[tab]=D[tab]||[];let h=`<h2>${s.t}</h2>`;
 if(s.one)h+=s.f.map(f=>fld(tab,-1,f,D[tab])).join("");
 else h+=D[tab].map((o,i)=>`<details class="it"><summary><span>${esc(o.ic||o.e||"")} ${esc(o.n)}</span><span class="ac"><button onclick="mv(event,${i},-1)">↑</button><button onclick="mv(event,${i},1)">↓</button><button onclick="rm(event,${i})">🗑</button></span></summary>${s.f.map(f=>fld(tab,i,f,o)).join("")}</details>`).join("")+`<button class="b p" onclick="add()">+ Add new</button>`;
 $("ed").innerHTML=h;st()}
function mv(e,i,d){e.preventDefault();const a=D[tab],j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];save();draw()}
function rm(e,i){e.preventDefault();if(confirm("Delete this item?")){D[tab].splice(i,1);save();draw()}}
function add(){const o={...T[tab],id:"x"+Date.now().toString(36)};F[tab].f.forEach(([k,,t])=>{if((t||"").startsWith("sel:")){const L=D[t.slice(4)]||[];o[k]=(L.find(x=>x.shop)||L[0]||{}).id||""}});D[tab].push(o);save();draw();const l=[...document.querySelectorAll("details")].pop();l.open=true;l.scrollIntoView()}
// ---- publishing ----
const out=()=>{let s=JSON.stringify(D,null,1);for(let i=0;i<3;i++)s=s.replace(/\[\s*([^\[\]{}]*?)\s*\]/g,(m,x)=>"["+x.replace(/\s*\n\s*/g," ")+"]");return "const CONTENT = "+s+";\n"};
const API=()=>`https://api.github.com/repos/${G.o}/${G.r}/contents/`;
const H=()=>({Authorization:"Bearer "+G.t,Accept:"application/vnd.github+json"});
const b64=s=>btoa(unescape(encodeURIComponent(s)));
const ready=()=>{if(G.o&&G.r&&G.t)return true;gh();return false};
const cl=()=>$("dlg").innerHTML="";
function gh(){$("dlg").innerHTML=`<div class="im open"><div class="imb"><button class="x" onclick="cl()">×</button><h2>GitHub connection</h2><p style="font-size:13px">Publishing saves your changes to your GitHub repository, and your free host updates itself. The token stays in this browser only. Use a fine-grained token limited to this one repository with Contents: Read and write.</p>
<label class="f"><span>GitHub username</span><input id="go" value="${esc(G.o)}"></label><label class="f"><span>Repository name</span><input id="gr" value="${esc(G.r)}"></label><label class="f"><span>Branch</span><input id="gb" value="${esc(G.b||"main")}"></label><label class="f"><span>Token</span><input id="gt" type="password" value="${esc(G.t)}"></label><button class="b p" onclick="gsave()">Save</button></div></div>`}
async function gsave(){G={o:$("go").value.trim(),r:$("gr").value.trim(),b:$("gb").value.trim()||"main",t:$("gt").value.trim()};await saveG();cl();msg("GitHub details saved")}
async function put(path,c64,m){let sha;const r=await fetch(API()+path+"?ref="+G.b,{headers:H()});if(r.ok)sha=(await r.json()).sha;
 const w=await fetch(API()+path,{method:"PUT",headers:H(),body:JSON.stringify({message:m,content:c64,sha,branch:G.b})});if(!w.ok)throw new Error((await w.json()).message)}
async function pub(){if(!ready())return;try{msg("Publishing...");await put("js/content.js",b64(out()),"Update site content from admin");dirty=false;try{localStorage.removeItem(DR)}catch(e){}msg("Published. The live site updates in about a minute.")}catch(e){msg("Publish failed");alert("Publish failed: "+explain(e.message))}}
async function pull(){if(!ready())return;if(dirty&&!confirm("This replaces your unpublished changes. Continue?"))return;
 try{const r=await fetch(API()+"js/content.js?ref="+G.b,{headers:{...H(),Accept:"application/vnd.github.raw"}});if(!r.ok)throw new Error("Not found");
 D=JSON.parse((await r.text()).replace(/^[^{]*/,"").replace(/;\s*$/,""));norm();dirty=false;try{localStorage.removeItem(DR)}catch(e){}draw();msg("Loaded latest published version")}catch(e){alert("Could not load: "+explain(e.message))}}
function dl(){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([out()],{type:"text/javascript"}));a.download="content.js";a.click()}
const explain=m=>/bad credentials/i.test(m)?"GitHub rejected the token. Click ⚙ GitHub and enter the token again.":/not found/i.test(m)?"GitHub could not find the repository, or the token has no access to it. Check the username, repository name and that the token has Contents: Read and write.":/not accessible|forbidden|permission/i.test(m)?"The token does not have permission. Create it for this repository with Contents: Read and write.":m;
async function shrink(f){let im;try{im=await createImageBitmap(f)}catch(e){im=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>no(new Error("This photo format is not supported. Please use a JPG or PNG photo."));i.src=URL.createObjectURL(f)})}
 const w=im.width||im.naturalWidth,h=im.height||im.naturalHeight,s=Math.min(1,1000/Math.max(w,h)),cv=document.createElement("canvas");cv.width=Math.round(w*s);cv.height=Math.round(h*s);cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);return cv.toDataURL("image/jpeg",.8).split(",")[1]}
async function up(c,i,k,el){const f=el.files[0],box=el.closest(".f"),us=box.querySelector(".us"),say=(t,bad)=>{us.textContent=t;us.style.color=bad?"#901b3a":"#2a6b2a"};
 if(!f)return;
 if(!(G.o&&G.r&&G.t)){say("Connect GitHub first: click the ⚙ GitHub button at the top, save your details, then choose the photo again.",1);el.value="";gh();return}
 try{say("Uploading, please wait...");const data=await shrink(f),p="img/"+Date.now()+".jpg";await put(p,data,"Add photo from admin");
  target(c,i)[k]=p;const t=box.querySelector("input:not([type=file])");t.value=p;let im=box.querySelector(".th");if(!im){im=document.createElement("img");im.className="th";t.parentNode.insertBefore(im,us)}im.style.display="";im.src=p;save();say("Photo uploaded. Now click Publish at the top to put it on the site.")}
 catch(e){say("Upload failed: "+explain(e.message||String(e)),1)}
 el.value=""}
// ---- passcode lock: protects the GitHub token stored in this browser ----
const enc=new TextEncoder(),dec=new TextDecoder(),b2s=b=>btoa(String.fromCharCode(...new Uint8Array(b))),s2b=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
let KEY;
async function mk(pw,salt){const m=await crypto.subtle.importKey("raw",enc.encode(pw),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:200000,hash:"SHA-256"},m,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function seal(t){const iv=crypto.getRandomValues(new Uint8Array(12));return b2s(iv)+"."+b2s(await crypto.subtle.encrypt({name:"AES-GCM",iv},KEY,enc.encode(t)))}
async function unseal(s){const[i,c]=s.split(".");return dec.decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:s2b(i)},KEY,s2b(c)))}
async function saveG(){const o={o:G.o,r:G.r,b:G.b,tk:G.t?await seal(G.t):""};try{localStorage.setItem(LS,JSON.stringify(o))}catch(e){}}
async function lock(){let L=null;try{L=JSON.parse(localStorage.getItem("olf_lock"))}catch(e){}const has=!!L;
 $("dlg").innerHTML=`<div class="im open" style="z-index:300;background:#1b2b48"><div class="imb"><h2>${has?"Admin passcode":"Create an admin passcode"}</h2><p style="font-size:13px">${has?"Enter your passcode to continue.":"Choose a passcode for this device. It locks the admin page and protects your GitHub token in this browser. If you forget it, you will need to enter the token again."}</p><label class="f"><span>Passcode (6+ characters)</span><input id="pw" type="password"></label><p id="pe" style="color:#901b3a;min-height:20px"></p><button class="b p" id="pb">${has?"Unlock":"Save passcode"}</button>${has?'<button class="b" id="pr">Forgot passcode</button>':""}</div></div>`;
 const go=async()=>{const pw=$("pw").value;if(pw.length<6){$("pe").textContent="Use at least 6 characters.";return}
  try{if(has){KEY=await mk(pw,s2b(L.salt));if(await unseal(L.check)!=="ok")throw 0}else{const salt=crypto.getRandomValues(new Uint8Array(16));KEY=await mk(pw,salt);localStorage.setItem("olf_lock",JSON.stringify({salt:b2s(salt),check:await seal("ok")}))}
   if(G.tk)G.t=await unseal(G.tk);else if(G.t)await saveG();
   cl();draw()}catch(e){$("pe").textContent="Wrong passcode."}};
 $("pb").onclick=go;$("pw").onkeydown=e=>{if(e.key=="Enter")go()};$("pw").focus();
 if(has)$("pr").onclick=()=>{if(confirm("This removes the passcode and the saved GitHub token from this browser. Unpublished drafts are kept. Continue?")){localStorage.removeItem("olf_lock");localStorage.removeItem(LS);G={};lock()}}}
lock();
