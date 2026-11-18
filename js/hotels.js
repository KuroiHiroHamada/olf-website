const HOTELS=CONTENT.hotels||[],DESTS=CONTENT.destinations||[];
const $=i=>document.getElementById(i),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pic=o=>o.img?`<img src="${esc(o.img)}" alt="${esc(o.n)}">`:esc(o.e||"");
const dn=id=>(DESTS.find(d=>d.id==id)||{}).n||"",stars=n=>"★".repeat(Math.max(0,Math.min(5,+n||0)));
const rooms=h=>{const r=(h.rooms||[]).map(x=>{const[n,p]=x.split("|").map(s=>s.trim());return{n,p:+p||+h.price||0}});return r.length?r:[{n:"Standard room",p:+h.price||0}]};
const tile=(href,bg,icon,name,desc,n)=>`<a class="house" href="${href}"><div class="pic" style="background:${esc(bg)}">${icon}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(name)}</h3><p style="margin-top:6px">${esc(desc||"")}</p><span class="tag">${n} hotel${n==1?"":"s"}</span><p style="color:var(--blue);margin-top:6px">Browse →</p></div></a>`;
const base='<a href="travel.html">Travel</a> › ';
function route(){const h=decodeURIComponent(location.hash.slice(1)),d=DESTS.find(x=>x.id==h);
 $("dests").hidden=!!h;$("catalog").hidden=!h;
 if(!h){$("crumbs").innerHTML=base+"Hotel booking";$("dests").innerHTML=DESTS.map(x=>tile("#"+encodeURIComponent(x.id),x.c,pic(x),x.n,x.d,HOTELS.filter(t=>t.dest==x.id).length)).join("")+tile("#all","#e3d9f7","🏨","All hotels","See every hotel in one list",HOTELS.length);return}
 const title=d?d.n:"All hotels";$("crumbs").innerHTML=base+`<a href="#">Hotel booking</a> › ${esc(title)}`;$("ct").textContent=title;$("cd").textContent=d?d.d||"":"Every hotel we offer.";
 $("hotels").innerHTML=HOTELS.filter(t=>!d||t.dest==d.id).map(t=>`<div class="house" onclick="hotel('${t.id}')"><div class="pic" style="background:${esc(t.c)}">${pic(t)}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(t.n)}</h3><span class="tag">${esc(dn(t.dest))}</span>${t.stars?`<span class="tag">${stars(t.stars)}</span>`:""}<p style="margin-top:8px">${esc(t.d)}</p><p class="price">${+t.price>0?"From $"+t.price+" / night":"Price on request"}</p><p style="color:var(--blue);margin-top:6px">View and book →</p></div></div>`).join("")||"<p>No hotels here yet.</p>";scrollTo(0,0)}
function hotel(id){const t=HOTELS.find(x=>x.id==id),today=new Date().toISOString().slice(0,10);
 document.getElementById("imc").innerHTML=`<div class="pic" style="height:150px;border-radius:10px;background:${esc(t.c)};display:flex;align-items:center;justify-content:center;font-size:70px;overflow:hidden">${pic(t)}</div><h2>${esc(t.n)}</h2><p>${stars(t.stars)} ${esc(dn(t.dest))}</p><p>${esc(t.d)}</p>${(t.amen||[]).length?`<ul>${t.amen.map(a=>`<li>${esc(a)}</li>`).join("")}</ul>`:""}
 <form class="hform" onsubmit="bookHotel(event,'${t.id}')"><h3 style="margin:8px 0;text-align:left">Send a booking request</h3>
 <input name="name" placeholder="Full name" required><input name="phone" placeholder="Phone / WhatsApp" required>
 <label>Check-in<input name="cin" type="date" min="${today}" required onchange="this.form.cout.min=this.value"></label><label>Check-out<input name="cout" type="date" min="${today}" required></label>
 <label>Guests<input name="guests" type="number" min="1" value="2" required></label>
 <label>Room type<select name="room">${rooms(t).map((r,i)=>`<option value="${i}">${esc(r.n)}${r.p?" ($"+r.p+" / night)":""}</option>`).join("")}</select></label>
 <textarea name="note" rows="2" placeholder="Special requests (optional)"></textarea><button class="btn" style="width:100%">Send request on WhatsApp</button></form>`;
 im.classList.add("open")}
function bookHotel(e,id){e.preventDefault();const t=HOTELS.find(x=>x.id==id),v=Object.fromEntries(new FormData(e.target)),n=Math.round((new Date(v.cout)-new Date(v.cin))/864e5);
 if(!(n>0))return alert("Check-out must be after check-in.");
 const r=rooms(t)[+v.room]||rooms(t)[0],s=n>1?"s":"",tot=r.p>0?`\nEstimated total: $${r.p*n} (${n} night${s} x $${r.p}), to be confirmed`:"";
 const msg=`Hotel booking request\nHotel: ${t.n} (${dn(t.dest)})\nRoom: ${r.n}\nCheck-in: ${v.cin}\nCheck-out: ${v.cout} (${n} night${s})\nGuests: ${v.guests}${tot}\nName: ${v.name}\nPhone: ${v.phone}\nRequests: ${v.note||"-"}`;
 window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank")}
addEventListener("hashchange",route);route();
