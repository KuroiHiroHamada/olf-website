const TOURS=CONTENT.tours,DESTS=CONTENT.destinations||[];
const $=i=>document.getElementById(i),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pic=o=>o.img?`<img src="${esc(o.img)}" alt="${esc(o.n)}">`:esc(o.e||"");
const dn=id=>(DESTS.find(d=>d.id==id)||{}).n||"";
const tile=(href,bg,icon,name,desc,n)=>`<a class="house" href="${href}"><div class="pic" style="background:${esc(bg)}">${icon}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(name)}</h3><p style="margin-top:6px">${esc(desc||"")}</p><span class="tag">${n} tour${n==1?"":"s"}</span><p style="color:var(--blue);margin-top:6px">Browse →</p></div></a>`;
function route(){const h=decodeURIComponent(location.hash.slice(1)),d=DESTS.find(x=>x.id==h);
 $("dests").hidden=!!h;$("catalog").hidden=!h;
 if(!h){$("crumbs").innerHTML="";$("dests").innerHTML=DESTS.map(x=>tile("#"+encodeURIComponent(x.id),x.c,pic(x),x.n,x.d,TOURS.filter(t=>t.region==x.id).length)).join("")+tile("#all","#e3d9f7","🧭","All tours","See every tour in one list",TOURS.length);return}
 const title=d?d.n:"All tours";$("crumbs").innerHTML=`<a href="#">Destinations</a> › ${esc(title)}`;$("ct").textContent=title;$("cd").textContent=d?d.d||"":"Every tour we offer.";
 $("tours").innerHTML=TOURS.filter(t=>!d||t.region==d.id).map(t=>`<div class="house" onclick="tour('${t.id}')"><div class="pic" style="background:${esc(t.c)}">${pic(t)}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(t.n)}</h3><span class="tag">${esc(dn(t.region))}</span><span class="tag">${esc(t.days)}</span><p style="margin-top:8px">${esc(t.d)}</p><p class="price">${esc(t.price)}</p></div></div>`).join("")||"<p>No tours here yet.</p>";scrollTo(0,0)}
function tour(id){const t=TOURS.find(x=>x.id==id);
 document.getElementById("imc").innerHTML=`<div class="pic" style="height:150px;border-radius:10px;background:${esc(t.c)};display:flex;align-items:center;justify-content:center;font-size:70px;overflow:hidden">${pic(t)}</div><h2>${esc(t.n)}</h2><p>${esc(t.d)}</p><p><b>${esc(t.days)}</b> · <span class="price">${esc(t.price)}</span></p><ul>${(t.hl||[]).map(h=>`<li>${esc(h)}</li>`).join("")}</ul><a class="btn" href="book.html?s=travel&note=${encodeURIComponent("Tour enquiry: "+t.n)}">Enquire about this tour</a>`;
 im.classList.add("open")}
addEventListener("hashchange",route);route();
