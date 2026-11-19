// ===== EDIT THESE (verify against your flyer) =====
const CONFIG=CONTENT.config,SITE=CONTENT.site;
for(const k of["blue","lime","navy","cream"])document.documentElement.style.setProperty("--"+k,SITE[k]);
const SERVICES=CONTENT.services;
const REASONS=CONTENT.reasons;
const page=location.pathname.split("/").pop()||"index.html";
const svcLink=s=>s.link||(s.shop?"shop.html#"+s.id:"book.html?s="+s.id);
const L=[["index.html","Home"],["index.html#services","Services"],["prefab.html","Prefab Homes"],["travel.html","Travel"],["shop.html","Shop"],["faq.html","FAQ"]];
const onp=h=>h==page||(h=="travel.html"&&["tours.html","hotels.html"].includes(page));
const short=SITE.name.split(",")[0];
document.body.insertAdjacentHTML("afterbegin",`<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="wrap"><a class="brand" href="index.html"><span class="mark">${SITE.logo}</span><span class="bn">${short}</span></a><button class="burger" aria-label="Menu" aria-expanded="false" onclick="this.setAttribute('aria-expanded',document.getElementById('nav').classList.toggle('open'))">☰</button><nav id="nav"><ul>${L.map(([h,t])=>`<li><a class="l ${onp(h)?"on":""}" href="${h}">${t}</a></li>`).join("")}</ul><a class="btn btn-accent" href="book.html">Book now</a></nav></div></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer class="site-footer"><div class="foot"><div><div class="brand"><span class="mark" style="background:var(--lime);color:var(--navy)">${SITE.logo}</span><span class="bn" style="color:#fff">${short}</span></div><p style="margin-top:12px;font-size:14.5px">${SITE.tagline||""}</p></div><div><h4>Explore</h4><ul>${L.map(([h,t])=>`<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="book.html">Book now</a></li></ul></div><div><h4>Services</h4><ul>${SERVICES.map(s=>`<li><a href="${svcLink(s)}">${s.n}</a></li>`).join("")}</ul></div><div><h4>Contact</h4><ul><li>Turkey: ${CONFIG.turkey}</li><li>Ghana: ${CONFIG.ghana}</li><li>${CONFIG.email}</li></ul></div></div><div class="foot-bar">© ${new Date().getFullYear()} ${SITE.name} · <a href="legal.html">Privacy &amp; terms</a> · <a href="faq.html">FAQ</a></div></footer>`);
const card=(s,k)=>`<div class="card${s.img?" hasimg":""}" data-k="${k}" tabindex="0" role="button"${s.img?` style="background-image:linear-gradient(rgba(27,43,72,.55),rgba(27,43,72,.92)),url('${encodeURI(s.img).replace(/'/g,"%27")}');background-size:cover;background-position:center"`:""}><div class="ic">${s.ic}</div><h3>${s.n}</h3><p>${s.d}</p>${s.href?`<a class="cta" href="${s.href}">${s.cta||"Learn more"} ›</a>`:`<span class="more">Learn more →</span>`}</div>`;
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
function openInfo(k){const isS=k[0]=="s",it=(isS?SERVICES:REASONS)[k.slice(1)],go=isS&&(it.link||it.shop);
 const act=isS?`<a class="btn" href="${svcLink(it)}">${it.act||(it.shop?"Browse products":"Book this service")}</a>${go?` <a class="btn" href="book.html?s=${it.id}" style="font-size:15px;padding:12px 18px">Book / enquire</a>`:""}`:`<a class="btn" href="book.html">Book now</a>`;
 document.getElementById("imc").innerHTML=`${it.img?`<img class="mimg" src="${encodeURI(it.img)}" alt="">`:""}<div class="ic">${it.ic}</div><h2>${it.n}</h2><p>${it.more}</p><ul>${(it.pts||[]).map(p=>`<li>${p}</li>`).join("")}</ul>${act}`;
 im.classList.add("open")}
function closeInfo(){im.classList.remove("open")}
im.onclick=e=>{if(e.target==im)closeInfo()};
addEventListener("keydown",e=>{if(e.key=="Escape")closeInfo();if((e.key=="Enter"||e.key==" ")&&e.target.dataset&&e.target.dataset.k){e.preventDefault();openInfo(e.target.dataset.k)}});
document.addEventListener("click",e=>{if(e.target.closest("a"))return;const c=e.target.closest(".card[data-k]");if(c&&!window.moved)openInfo(c.dataset.k)});

{const a=document.getElementById("heroTitle"),b=document.getElementById("heroText");if(a)a.textContent=SITE.heroTitle;if(b)b.textContent=SITE.heroText}

const ld=o=>{const s=document.createElement("script");s.type="application/ld+json";s.textContent=JSON.stringify(o);document.head.appendChild(s)};
const fq=document.getElementById("faq");
if(fq&&CONTENT.faq){fq.innerHTML=CONTENT.faq.map(q=>`<details class="faq"><summary>${q.n}</summary><p>${q.a}</p></details>`).join("");
 ld({"@context":"https://schema.org","@type":"FAQPage",mainEntity:CONTENT.faq.map(q=>({"@type":"Question",name:q.n,acceptedAnswer:{"@type":"Answer",text:q.a}}))})}
if(page=="index.html"||page=="")ld({"@context":"https://schema.org","@type":"LocalBusiness",name:SITE.name,telephone:CONFIG.turkey,email:CONFIG.email,areaServed:["Turkey","Ghana"]});

const tv=document.getElementById("travel");
if(tv)tv.innerHTML=(CONTENT.travel||[]).map(s=>`<a class="house" href="${s.link||"#"}"><div class="pic" style="background:${s.c}">${s.img?`<img src="${encodeURI(s.img)}" alt="">`:s.e}</div><div class="in"><h3 style="text-align:left;margin:0">${s.n}</h3><p style="margin-top:6px">${s.d||""}</p><p style="color:var(--blue);margin-top:6px">Open →</p></div></a>`).join("");

{const g=id=>document.getElementById(id),t=g("trust"),tr=SITE.trust||[];
 if(t){t.innerHTML=tr.map(x=>`<span>${x}</span>`).join("");if(!tr.length)t.parentElement.hidden=true}
 const a=g("ctaTitle"),b=g("ctaText");if(a)a.textContent=SITE.ctaTitle||"Ready to get started?";if(b)b.textContent=SITE.ctaText||"";
 const hh=document.querySelector(".hero.home");if(hh&&SITE.heroImg)hh.style.backgroundImage=`linear-gradient(105deg,rgba(27,43,72,.92),rgba(27,43,72,.5)),url('${encodeURI(SITE.heroImg).replace(/'/g,"%27")}')`;
 const p=g("partners"),P=CONTENT.partners||[];
 if(p&&P.length){const it=P.map(x=>x.img?`<img src="${encodeURI(x.img)}" alt="${x.n||""}">`:`<span>${x.n}</span>`).join("");p.innerHTML=`<div class="logos"><span class="eyebrow">${SITE.partnersTitle||"Brands and partners"}</span><div class="track">${it}${it}</div></div>`}
 const mn=document.querySelector("section");if(mn&&!mn.id)mn.id="main"}
