const CALC=CONTENT.calc||{},LANES=CONTENT.lanes||[];
const $=i=>document.getElementById(i),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sym=CALC.sym||"$",fmt=n=>Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),money=n=>sym+fmt(n),whole=n=>sym+Math.round(n).toLocaleString("en-US");
const MODE={air:["✈️","Air freight"],sea:["🚢","Sea freight"],road:["🚚","Road freight"]};
let rows=[{q:1,w:10,l:40,wd:30,h:30}],cur=[];
const routes=[...new Set(LANES.map(l=>l.route))];
function drawRows(){$("rows").innerHTML=rows.map((r,i)=>`<div class="prow">${["q","w","l","wd","h"].map(k=>`<input type="number" min="0" step="any" value="${r[k]}" oninput="rows[${i}].${k}=+this.value;calc()">`).join("")}${rows.length>1?`<button type="button" class="rm" aria-label="Remove" onclick="rows.splice(${i},1);drawRows();calc()">✕</button>`:"<span></span>"}</div>`).join("")}
function quote(lane,o){const act=o.rows.reduce((a,r)=>a+r.q*r.w,0),cbm=o.rows.reduce((a,r)=>a+r.q*r.l*r.wd*r.h/1e6,0);let units,label;
 if(lane.mode=="sea"){units=Math.max(cbm,act/1000);label=units.toFixed(2)+" m³"}
 else{const div=lane.mode=="air"?(+CALC.divAir||6000):(+CALC.divRoad||3000),vol=o.rows.reduce((a,r)=>a+r.q*r.l*r.wd*r.h/div,0);units=Math.max(act,vol);label=units.toFixed(1)+" kg"}
 const raw=units*(+lane.rate||0),min=+lane.min||0,base=Math.max(min,raw),lines=[[raw<min?`Minimum charge`:`Freight: ${label} x ${money(lane.rate)}`,base]];
 const fuel=base*(+CALC.fuel||0)/100;if(fuel)lines.push([`Fuel and handling (${CALC.fuel}%)`,fuel]);
 const fr=o.fragile&&+CALC.fragile?base*CALC.fragile/100:0;if(fr)lines.push([`Special handling (${CALC.fragile}%)`,fr]);
 let dd=0;if(o.door){if(+CALC.pickup){lines.push(["Door pickup",+CALC.pickup]);dd+=+CALC.pickup}if(+CALC.delivery){lines.push(["Door delivery",+CALC.delivery]);dd+=+CALC.delivery}}
 const ins=o.value>0&&+CALC.ins?o.value*CALC.ins/100:0;if(ins)lines.push([`Insurance (${CALC.ins}% of declared value)`,ins]);
 return{act,cbm,units,label,lines,total:base+fuel+fr+dd+ins}}
function opts(){return{rows:rows.map(r=>({q:+r.q||0,w:+r.w||0,l:+r.l||0,wd:+r.wd||0,h:+r.h||0})),fragile:$("fragile").checked,door:$("door").checked,value:+$("value").value||0}}
function calc(){const o=opts(),lanes=LANES.filter(l=>l.route==$("route").value),act=o.rows.reduce((a,r)=>a+r.q*r.w,0),cbm=o.rows.reduce((a,r)=>a+r.q*r.l*r.wd*r.h/1e6,0);
 if(!lanes.length){$("res").innerHTML="<p>Rates for this route are being set up. Please contact us for a quote.</p>";$("sum").innerHTML="";return}
 if(!(act>0)){$("sum").innerHTML="";$("res").innerHTML='<div class="res"><p>Enter the quantity and weight of your goods to see an estimate.</p></div>';cur=[];return}
 $("sum").innerHTML=`<b>Your cargo</b><span>Weight: ${act.toFixed(1)} kg</span><span>Volume: ${cbm.toFixed(2)} m³</span>`;
 cur=lanes.map(l=>({l,q:quote(l,o)}));
 $("res").innerHTML=cur.map((x,i)=>{const m=MODE[x.l.mode]||["📦",x.l.mode];return `<div class="res"><div class="rh"><span class="ric">${m[0]}</span><div><b>${m[1]}</b><small>${x.l.days?"Transit: "+esc(x.l.days):""}</small></div><div class="rp"><small>estimate</small>${whole(x.q.total)}</div></div>
 <details><summary>See how this is worked out</summary><table class="spec">${x.q.lines.map(l=>`<tr><td>${esc(l[0])}</td><td style="text-align:right">${money(l[1])}</td></tr>`).join("")}<tr><td><b>Estimated total</b></td><td style="text-align:right"><b>${money(x.q.total)}</b></td></tr></table></details>
 <button class="btn" type="button" onclick="req(${i})">Request this quote on WhatsApp</button></div>`}).join("")}
function req(i){const x=cur[i],o=opts(),m=(MODE[x.l.mode]||[,x.l.mode])[1];
 const pk=o.rows.filter(r=>r.q>0).map(r=>`${r.q} x ${r.w} kg (${r.l}x${r.wd}x${r.h} cm)`).join("; ");
 const msg=`Freight quote request\nRoute: ${x.l.route}\nMode: ${m}\nPackages: ${pk}\nTotal weight: ${x.q.act.toFixed(1)} kg, volume: ${x.q.cbm.toFixed(2)} m3\nChargeable: ${x.q.label}\nOptions: ${[o.fragile?"fragile or special handling":"",o.door?"door pickup and delivery":""].filter(Boolean).join(", ")||"none"}\nDeclared value: ${o.value?money(o.value):"not given"}\nEstimate shown: about ${whole(x.q.total)} (estimate only)\nName: ${$("nm").value||"-"}\nPhone: ${$("ph").value||"-"}`;
 window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank")}
$("ft").textContent=CALC.title||"Freight cost estimator";$("fi").textContent=CALC.intro||"";$("note").textContent=CALC.note||"";$("fs").hidden=!CALC.sample;
$("route").innerHTML=routes.map(r=>`<option>${esc(r)}</option>`).join("");$("route").onchange=calc;
["fragile","door"].forEach(k=>$(k).onchange=calc);$("value").oninput=calc;
$("addrow").onclick=()=>{rows.push({q:1,w:10,l:40,wd:30,h:30});drawRows();calc()};
drawRows();calc();
