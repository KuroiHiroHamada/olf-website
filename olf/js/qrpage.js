const $=i=>document.getElementById(i),base=new URL(".",location.href).href;
const PRE=[["Website home",base,"Scan to visit our website"],["Book now",base+"book.html","Scan to book a service"],["Shop",base+"shop.html","Scan to browse our shop"],["Prefab homes",base+"prefab.html","Scan to explore our homes in 3D"],["Travel and tours",base+"travel.html","Scan to plan your trip"],["Freight quote",base+"freight.html","Scan to estimate your shipping cost"],["WhatsApp chat","https://wa.me/"+CONFIG.whatsapp,"Scan to chat with us on WhatsApp"],["Custom link","","Scan to learn more"]];
$("qpre").innerHTML=PRE.map((p,i)=>`<option value="${i}">${p[0]}</option>`).join("");
$("qbrand").innerHTML=`<span class="mark">${SITE.logo}</span><span class="bn">${SITE.name.split(",")[0]}</span>`;
function draw(){const u=$("qurl").value.trim()||base;try{QR.draw($("qc"),u,+$("qsz").value);$("qc").style.width=Math.min(+$("qsz").value,320)+"px";$("qc").style.height="auto";$("qlink").textContent=u;$("qtext").textContent=$("qcap").value}catch(e){$("qlink").textContent="That link is too long for a QR code."}}
function pick(){const p=PRE[+$("qpre").value];if(p[1])$("qurl").value=p[1];$("qcap").value=p[2];draw()}
$("qpre").onchange=pick;$("qurl").oninput=()=>{$("qpre").value=PRE.length-1;draw()};$("qcap").oninput=draw;$("qsz").onchange=draw;
$("qdl").onclick=()=>{draw();$("qc").toBlob(b=>{const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="olf-qr-code.png";a.click()})};
$("qpr").onclick=()=>print();pick();
