// ===== EDIT THESE (verify against your flyer) =====
const CONFIG=CONTENT.config,SITE=CONTENT.site;
for(const k of["blue","lime","navy","cream"])document.documentElement.style.setProperty("--"+k,SITE[k]);
const SERVICES=CONTENT.services;
const REASONS=CONTENT.reasons;
const page=location.pathname.split("/").pop()||"index.html";
const L=[["index.html","Home"],["index.html#services","Services"],["prefab.html","Prefab Homes"],["travel.html","Travel"],["shop.html","Shop"],["book.html","Book now"]];
document.body.insertAdjacentHTML("afterbegin",`<nav><a class="logo" href="index.html">${SITE.logo}</a><ul>${L.map(([h,t])=>`<li><a href="${h}" class="${h==page||(h=="travel.html"&&["tours.html","hotels.html"].includes(page))?"on":""}">${t}</a></li>`).join("")}</ul></nav>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="big">${SITE.logo}</div><p>${SITE.name}</p><p>Turkey: ${CONFIG.turkey} · Ghana: ${CONFIG.ghana}</p><p>${CONFIG.email}</p><p><a href="faq.html">FAQ</a> · <a href="legal.html">Privacy &amp; terms</a></p></footer>`);
const card=(s,k)=>`<div class="card" data-k="${k}" tabindex="0" role="button"${s.img?` style="background:linear-gradient(rgba(27,43,72,.5),rgba(27,43,72,.9)),url('${encodeURI(s.img).replace(/'/g,"%27")}') center/cover"`:""}><div><div class="ic">${s.ic}</div><h3>${s.n}</h3><p>${s.d}</p></div><span class="more">Tap for more info</span></div>`;
const sv=document.getElementById("svc"),wy=document.getElementById("why");
if(sv)sv.innerHTML=SERVICES.map((s,i)=>card(s,"s"+i)).join("");
if(wy)wy.innerHTML=REASONS.map((s,i)=>card(s,"r"+i)).join("");
document.querySelectorAll(".scroller").forEach(s=>{let d=0,x=0,l=0;window.moved=0;
 s.onpointerdown=e=>{window.moved=0;if(e.pointerType!=="mouse")return;d=1;x=e.clientX;l=s.scrollLeft;s.classList.add("drag")};
 addEventListener("pointermove",e=>{if(d){s.scrollLeft=l-(e.clientX-x);if(Math.abs(e.clientX-x)>5)window.moved=1}});
 addEventListener("pointerup",()=>{d=0;s.classList.remove("drag")})});
// booking form
const f=document.getElementById("bookForm");
if(f){const box=document.getElementById("checks"),pre=new URLSearchParams(location.search).get("s");
 box.innerHTML=SERVICES.map(s=>`<label class="ck"><input type="checkbox" value="${s.n}" ${s.id==pre?"checked":""}>${s.n}</label>`).join("");
 const nt=new URLSearchParams(location.search).get("note");if(nt)f.note.value=nt;
 f.onsubmit=e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f)),sel=[...box.querySelectorAll(":checked")].map(c=>c.value);
  if(!sel.length)return alert("Please pick at least one service.");
  const msg=`New booking\nName: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\nServices: ${sel.join(", ")}\nDetails: ${v.note||"-"}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank");
  document.getElementById("mailAlt").href=`mailto:${CONFIG.email}?subject=Booking&body=${encodeURIComponent(msg)}`;
  document.getElementById("done").hidden=false}}

// info modal for service and reason cards
document.body.insertAdjacentHTML("beforeend",'<div class="im" id="im"><div class="imb"><button class="x" aria-label="Close" onclick="closeInfo()">×</button><div id="imc"></div></div></div>');
const im=document.getElementById("im");
const svcLink=s=>s.link||(s.shop?"shop.html#"+s.id:"book.html?s="+s.id);
function openInfo(k){const isS=k[0]=="s",it=(isS?SERVICES:REASONS)[k.slice(1)],go=isS&&(it.link||it.shop);
 const act=isS?`<a class="btn" href="${svcLink(it)}">${it.act||(it.shop?"Browse products":"Book this service")}</a>${go?` <a class="btn" href="book.html?s=${it.id}" style="font-size:15px;padding:12px 18px">Book / enquire</a>`:""}`:`<a class="btn" href="book.html">Book now</a>`;
 document.getElementById("imc").innerHTML=`${it.img?`<img class="mimg" src="${encodeURI(it.img)}" alt="">`:""}<div class="ic">${it.ic}</div><h2>${it.n}</h2><p>${it.more}</p><ul>${(it.pts||[]).map(p=>`<li>${p}</li>`).join("")}</ul>${act}`;
 im.classList.add("open")}
function closeInfo(){im.classList.remove("open")}
im.onclick=e=>{if(e.target==im)closeInfo()};
addEventListener("keydown",e=>{if(e.key=="Escape")closeInfo();if((e.key=="Enter"||e.key==" ")&&e.target.dataset&&e.target.dataset.k){e.preventDefault();openInfo(e.target.dataset.k)}});
document.addEventListener("click",e=>{const c=e.target.closest(".card[data-k]");if(c&&!window.moved)openInfo(c.dataset.k)});

{const a=document.getElementById("heroTitle"),b=document.getElementById("heroText");if(a)a.textContent=SITE.heroTitle;if(b)b.textContent=SITE.heroText}

const ld=o=>{const s=document.createElement("script");s.type="application/ld+json";s.textContent=JSON.stringify(o);document.head.appendChild(s)};
const fq=document.getElementById("faq");
if(fq&&CONTENT.faq){fq.innerHTML=CONTENT.faq.map(q=>`<details class="faq"><summary>${q.n}</summary><p>${q.a}</p></details>`).join("");
 ld({"@context":"https://schema.org","@type":"FAQPage",mainEntity:CONTENT.faq.map(q=>({"@type":"Question",name:q.n,acceptedAnswer:{"@type":"Answer",text:q.a}}))})}
if(page=="index.html"||page=="")ld({"@context":"https://schema.org","@type":"LocalBusiness",name:SITE.name,telephone:CONFIG.turkey,email:CONFIG.email,areaServed:["Turkey","Ghana"]});

const tv=document.getElementById("travel");
if(tv)tv.innerHTML=(CONTENT.travel||[]).map(s=>`<a class="house" href="${s.link||"#"}"><div class="pic" style="background:${s.c}">${s.img?`<img src="${encodeURI(s.img)}" alt="">`:s.e}</div><div class="in"><h3 style="text-align:left;margin:0">${s.n}</h3><p style="margin-top:6px">${s.d||""}</p><p style="color:var(--blue);margin-top:6px">Open →</p></div></a>`).join("");
