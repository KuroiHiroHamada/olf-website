const TOURS=CONTENT.tours;
let reg="All";
const pic=t=>t.img?`<img src="${t.img}" alt="${t.n}">`:t.e;
function draw(){const regs=["All",...new Set(TOURS.map(t=>t.region))];
 document.getElementById("chips").innerHTML=regs.map(r=>`<button class="${r==reg?"on":""}" onclick="reg='${r}';draw()">${r}</button>`).join("");
 document.getElementById("tours").innerHTML=TOURS.filter(t=>reg=="All"||t.region==reg).map(t=>`<div class="house" onclick="tour('${t.id}')"><div class="pic" style="background:${t.c}">${pic(t)}</div><div class="in"><h3 style="text-align:left;margin:0">${t.n}</h3><span class="tag">${t.region}</span><span class="tag">${t.days}</span><p style="margin-top:8px">${t.d}</p><p class="price">${t.price}</p></div></div>`).join("")}
function tour(id){const t=TOURS.find(x=>x.id==id);
 document.getElementById("imc").innerHTML=`<div class="pic" style="height:150px;border-radius:10px;background:${t.c};display:flex;align-items:center;justify-content:center;font-size:70px">${pic(t)}</div><h2>${t.n}</h2><p>${t.d}</p><p><b>${t.days}</b> · <span class="price">${t.price}</span></p><ul>${t.hl.map(h=>`<li>${h}</li>`).join("")}</ul><a class="btn" href="book.html?s=travel&note=${encodeURIComponent("Tour enquiry: "+t.n)}">Enquire about this tour</a>`;
 im.classList.add("open")}
draw();