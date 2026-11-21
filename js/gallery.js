let GP=[];
// Swipeable photo gallery and full-screen viewer, shared by the shop and the hotels.

const gi=()=>{const t=$("gt");return t&&t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0};
function galTo(i){const t=$("gt");t.scrollTo({left:i*t.clientWidth,behavior:"smooth"})}
function gal(d){galTo(Math.max(0,Math.min(GP.length-1,gi()+d)))}
function gdot(){const i=gi(),c=$("gcn"),th=$("gth");if(c)c.textContent=(i+1)+" / "+GP.length;document.querySelectorAll("#gd i").forEach((e,k)=>e.classList.toggle("on",k==i));document.querySelectorAll("#gth img").forEach((e,k)=>{e.classList.toggle("on",k==i);if(k==i&&th)th.scrollTo({left:e.offsetLeft-(th.clientWidth-e.clientWidth)/2,behavior:"smooth"})})}
function galleryHTML(ph,alt,empty){GP=ph;return `<div class="gal"><div class="gtrack" id="gt" onscroll="gdot()">${ph.length?ph.map((u,i)=>`<img src="${esc(u)}" alt="${esc(alt)}, photo ${i+1}" onclick="lightbox(${i})">`).join(""):empty}</div>${ph.length>1?`<button class="gnav prev" onclick="gal(-1)" aria-label="Previous photo">‹</button><button class="gnav next" onclick="gal(1)" aria-label="Next photo">›</button>${ph.length>8?`<div class="gcount" id="gcn">1 / ${ph.length}</div>`:`<div class="gdots" id="gd">${ph.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`}`:""}</div>${ph.length>1?`<div class="gthumbs" id="gth">${ph.map((u,i)=>`<img src="${esc(u)}" class="${i?"":"on"}" alt="" onclick="galTo(${i})">`).join("")}</div>`:""}${ph.length?`<p class="ghint">${ph.length>1?"Swipe or use the arrows for more photos. ":""}Tap a photo to enlarge it.</p>`:""}`}
// ----- full-screen photo viewer -----
function lbi(){const t=$("lbt");return t&&t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0}
function lbCount(){$("lbc").textContent=GP.length>1?(lbi()+1)+" / "+GP.length:""}
function lbGo(d){const t=$("lbt"),i=Math.max(0,Math.min(GP.length-1,lbi()+d));t.scrollTo({left:i*t.clientWidth,behavior:"smooth"})}
function closeLb(){const l=$("lb");if(l)l.classList.remove("open")}
function lightbox(i){let lb=$("lb");if(!lb){document.body.insertAdjacentHTML("beforeend",'<div id="lb"><button class="x" aria-label="Close" onclick="closeLb()">×</button><span class="lbc" id="lbc"></span><button class="gnav prev" id="lbp" onclick="lbGo(-1)" aria-label="Previous photo">‹</button><button class="gnav next" id="lbn" onclick="lbGo(1)" aria-label="Next photo">›</button><div class="lbt" id="lbt" onscroll="lbCount()"></div></div>');lb=$("lb");lb.addEventListener("click",e=>{if(e.target.tagName=="DIV")closeLb()})}
 $("lbt").innerHTML=GP.map(u=>`<div><img src="${esc(u)}" alt=""></div>`).join("");$("lbp").hidden=$("lbn").hidden=GP.length<2;lb.classList.add("open");$("lbt").scrollLeft=i*$("lbt").clientWidth;lbCount()}
addEventListener("keydown",e=>{const l=$("lb");if(!l||!l.classList.contains("open"))return;if(e.key=="Escape"){e.stopImmediatePropagation();closeLb()}if(e.key=="ArrowRight")lbGo(1);if(e.key=="ArrowLeft")lbGo(-1)},true);
