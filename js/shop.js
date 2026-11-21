const PRODUCTS=CONTENT.products,CATS=CONTENT.categories||[],SECTIONS=CONTENT.sections||[],INFO=CONTENT.shopInfo||{};
const KEY="olf_cart";let cart=[],cur={},q="",GP=[];
try{cart=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){}
const $=i=>document.getElementById(i),money=n=>"$"+n,find=id=>PRODUCTS.find(p=>p.id==id),priced=p=>+p.price>0;
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const itemUrl=p=>location.href.split("#")[0]+"#item/"+encodeURIComponent(p.id);
const catName=id=>(CATS.find(c=>c.id==id)||{}).n||"";
const photos=o=>o.imgs&&o.imgs.length?o.imgs:(o.img?[o.img]:[]);
const pic=(o,k)=>{const u=photos(o)[0];return u?`<img src="${esc(u)}" alt="${esc(o.n)}">`:esc(o[k||"e"]||"")};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}drawCart()};
const tile=(href,bg,icon,name,desc,note)=>`<a class="house" href="${href}"><div class="pic" style="background:${esc(bg)}">${icon}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(name)}</h3><p style="margin-top:6px">${esc(desc||"")}</p><span class="tag">${note}</span><p style="color:var(--blue);margin-top:6px">Browse →</p></div></a>`;
const cnt=(n,w,pl)=>n+" "+(n==1?w:pl||w+"s");
function route(){let h=decodeURIComponent(location.hash.slice(1)),openId=null;if(h.startsWith("item/")){const p=find(h.slice(5));if(p){const c=CATS.find(x=>x.id==p.cat);h=c?c.sec+"/"+c.id:"all";openId=p.id}else h=""}
 const [a,b]=h.split("/"),secA=SECTIONS.find(s=>s.id==a),catX=CATS.find(c=>c.id==(b||a)&&(!secA||c.sec==secA.id));
 const sec=secA||(catX&&SECTIONS.find(s=>s.id==catX.sec)),lvl=!h?0:(secA&&!b)?1:2;
 $("cats").hidden=lvl==2;$("catalog").hidden=lvl<2;
 const title=catX?catX.n:sec?(sec.allN||"All "+sec.n):"All items",cr=[["Shop","#"]];if(sec)cr.push([sec.n,"#"+encodeURIComponent(sec.id)]);if(lvl==2)cr.push([title,""]);
 $("crumbs").innerHTML=lvl?cr.map(([t,u])=>u?`<a href="${u}">${esc(t)}</a>`:esc(t)).join(" › "):"";
 if(lvl==0)$("cats").innerHTML=SECTIONS.map(s=>tile("#"+encodeURIComponent(s.id),s.c||"#e3d9f7",pic(s),s.n,s.d,cnt(CATS.filter(c=>c.sec==s.id).length,"category","categories"))).join("")||"<p>The shop is being set up. Please check back soon.</p>";
 else if(lvl==1){const cs=CATS.filter(c=>c.sec==sec.id);$("cats").innerHTML=cs.map(c=>tile("#"+encodeURIComponent(sec.id)+"/"+encodeURIComponent(c.id),c.c,pic(c),c.n,c.d,cnt(PRODUCTS.filter(p=>p.cat==c.id).length,"item"))).join("")+tile("#"+encodeURIComponent(sec.id)+"/all","#e3d9f7",sec.allImg?`<img src="${esc(sec.allImg)}" alt="">`:"🛍️",sec.allN||"All "+sec.n,sec.allD||"See everything in this section",cnt(PRODUCTS.filter(p=>cs.some(c=>c.id==p.cat)).length,"item"))}
 else{cur={sec:sec&&sec.id,cat:catX&&b!="all"?catX.id:null};q="";$("s").value="";$("ct").textContent=title;$("cd").textContent=catX?catX.d||"":sec?sec.d||"":"Everything in the shop.";drawList();scrollTo(0,0)}
 if(openId)product(openId)}
function drawList(){const ok=p=>cur.cat?p.cat==cur.cat:cur.sec?CATS.some(c=>c.id==p.cat&&c.sec==cur.sec):true;
 const items=PRODUCTS.filter(p=>ok(p)&&p.n.toLowerCase().includes(q.toLowerCase()));
 $("prods").innerHTML=items.map(p=>`<div class="house prod" onclick="product('${p.id}')"><div class="pic" style="background:${esc(p.c)}">${pic(p)}${photos(p).length>1?`<span class="pcnt">📷 ${photos(p).length}</span>`:""}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(p.n)}</h3><span class="tag">${esc(catName(p.cat))}</span><p style="margin-top:6px">${esc(p.d)}</p><p class="price">${priced(p)?money(p.price):"Price on request"}</p><p style="color:var(--blue);font-size:14px;margin-top:4px">Photos, details and specifications →</p>${p.sizes&&p.sizes.length?`<select id="sz${p.id}" onclick="event.stopPropagation()">${p.sizes.map(z=>`<option>${esc(z)}</option>`).join("")}</select>`:""}<button class="btn" onclick="event.stopPropagation();add('${p.id}')">${priced(p)?"Add to cart":"Request a quote"}</button></div></div>`).join("")||"<p>No items found.</p>"}
$("st").textContent=INFO.title||"Shop";$("si").textContent=INFO.intro||"Choose a section to browse, then order or ask for a quote on WhatsApp.";
$("s").oninput=e=>{q=e.target.value;drawList()};
addEventListener("hashchange",route);
function add(id,sz){const p=find(id);if(sz===undefined)sz=p.sizes&&p.sizes.length?$("sz"+id).value:"";const l=cart.find(c=>c.id==id&&c.sz==sz);l?l.q++:cart.push({id,sz,q:1});save();openCart()}
// ----- product pop-up with swipeable photos -----
const gi=()=>{const t=$("gt");return t&&t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0};
function galTo(i){const t=$("gt");t.scrollTo({left:i*t.clientWidth,behavior:"smooth"})}
function gal(d){galTo(Math.max(0,Math.min(GP.length-1,gi()+d)))}
function gdot(){const i=gi(),c=$("gcn"),th=$("gth");if(c)c.textContent=(i+1)+" / "+GP.length;document.querySelectorAll("#gd i").forEach((e,k)=>e.classList.toggle("on",k==i));document.querySelectorAll("#gth img").forEach((e,k)=>{e.classList.toggle("on",k==i);if(k==i&&th)th.scrollTo({left:e.offsetLeft-(th.clientWidth-e.clientWidth)/2,behavior:"smooth"})})}
function product(id){const p=find(id),ph=photos(p),sp=(p.specs||[]).map(l=>{const i=l.indexOf(":");return i>0?`<tr><td>${esc(l.slice(0,i))}</td><td>${esc(l.slice(i+1).trim())}</td></tr>`:`<tr><td colspan="2">${esc(l)}</td></tr>`}).join("");GP=ph;
 document.getElementById("imc").innerHTML=`<div class="pwrap"><div><div class="gal"><div class="gtrack" id="gt" onscroll="gdot()">${ph.length?ph.map((u,i)=>`<img src="${esc(u)}" alt="${esc(p.n)}, photo ${i+1}" onclick="lightbox(${i})">`).join(""):`<div class="gph" style="background:${esc(p.c)}">${esc(p.e||"")}</div>`}</div>${ph.length>1?`<button class="gnav prev" onclick="gal(-1)" aria-label="Previous photo">‹</button><button class="gnav next" onclick="gal(1)" aria-label="Next photo">›</button>${ph.length>8?`<div class="gcount" id="gcn">1 / ${ph.length}</div>`:`<div class="gdots" id="gd">${ph.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`}`:""}</div>${ph.length>1?`<div class="gthumbs" id="gth">${ph.map((u,i)=>`<img src="${esc(u)}" class="${i?"":"on"}" alt="" onclick="galTo(${i})">`).join("")}</div>`:""}${ph.length?`<p class="ghint">${ph.length>1?"Swipe or use the arrows for more photos. ":""}Tap a photo to enlarge it.</p>`:""}</div>
 <div class="pinfo"><h2>${esc(p.n)}</h2><p><span class="tag" style="margin-top:0">${esc(catName(p.cat))}</span> <span class="price" style="font-size:22px">${priced(p)?money(p.price):"Price on request"}</span></p><p>${esc(p.more||p.d)}</p>${sp?`<h3 style="text-align:left;margin:14px 0 4px">Specifications</h3><table class="spec">${sp}</table>`:""}${p.sizes&&p.sizes.length?`<label style="font-size:13px">Size<br><select id="psz" style="padding:9px;border:1px solid #cfd6e4;border-radius:8px;margin:4px 0 12px;font:inherit">${p.sizes.map(z=>`<option>${esc(z)}</option>`).join("")}</select></label><br>`:""}<button class="btn" style="width:100%" onclick="addP('${p.id}')">${priced(p)?"Add to cart":"Request a quote"}</button></div></div>`;
 im.querySelector(".imb").classList.add("big");im.classList.add("open")}
function addP(id){const p=find(id);add(id,p.sizes&&p.sizes.length?$("psz").value:"");closeInfo()}
// ----- full-screen photo viewer -----
function lbi(){const t=$("lbt");return t&&t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0}
function lbCount(){$("lbc").textContent=GP.length>1?(lbi()+1)+" / "+GP.length:""}
function lbGo(d){const t=$("lbt"),i=Math.max(0,Math.min(GP.length-1,lbi()+d));t.scrollTo({left:i*t.clientWidth,behavior:"smooth"})}
function closeLb(){const l=$("lb");if(l)l.classList.remove("open")}
function lightbox(i){let lb=$("lb");if(!lb){document.body.insertAdjacentHTML("beforeend",'<div id="lb"><button class="x" aria-label="Close" onclick="closeLb()">×</button><span class="lbc" id="lbc"></span><button class="gnav prev" id="lbp" onclick="lbGo(-1)" aria-label="Previous photo">‹</button><button class="gnav next" id="lbn" onclick="lbGo(1)" aria-label="Next photo">›</button><div class="lbt" id="lbt" onscroll="lbCount()"></div></div>');lb=$("lb");lb.addEventListener("click",e=>{if(e.target.tagName=="DIV")closeLb()})}
 $("lbt").innerHTML=GP.map(u=>`<div><img src="${esc(u)}" alt=""></div>`).join("");$("lbp").hidden=$("lbn").hidden=GP.length<2;lb.classList.add("open");$("lbt").scrollLeft=i*$("lbt").clientWidth;lbCount()}
addEventListener("keydown",e=>{const l=$("lb");if(!l||!l.classList.contains("open"))return;if(e.key=="Escape"){e.stopImmediatePropagation();closeLb()}if(e.key=="ArrowRight")lbGo(1);if(e.key=="ArrowLeft")lbGo(-1)},true);
function chg(i,d){cart[i].q+=d;if(cart[i].q<1)cart.splice(i,1);save()}
function drawCart(){$("cn").textContent=cart.reduce((a,c)=>a+c.q,0);
 $("lines").innerHTML=cart.map((c,i)=>{const p=find(c.id);return p?`<div class="line"><span>${esc(p.n)}${c.sz?" ("+esc(c.sz)+")":""}<br>${priced(p)?money(p.price):"Price on request"}</span><span><button onclick="chg(${i},-1)">−</button> ${c.q} <button onclick="chg(${i},1)">+</button></span></div>`:""}).join("")||"<p>Your cart is empty.</p>";
 $("tot").textContent=money(cart.reduce((a,c)=>{const p=find(c.id);return a+(p&&priced(p)?p.price*c.q:0)},0))}
function openCart(){$("cart").classList.add("open")}function closeCart(){$("cart").classList.remove("open")}
$("co").onsubmit=e=>{e.preventDefault();cart=cart.filter(c=>find(c.id));if(!cart.length)return alert("Your cart is empty.");const v=Object.fromEntries(new FormData(e.target));
 const lines=cart.map(c=>{const p=find(c.id);return `${c.q} x ${p.n}${c.sz?" ("+c.sz+")":""} - ${priced(p)?money(p.price*c.q):"price on request"}\n   View item: ${itemUrl(p)}`}).join("\n");
 const msg=`New order / quote request\n${lines}\nTotal (priced items): ${$("tot").textContent}\nName: ${v.name}\nPhone: ${v.phone}\nAddress: ${v.addr}`;
 window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank")};
route();drawCart();
