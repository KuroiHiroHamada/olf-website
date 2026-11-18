const PRODUCTS=CONTENT.products,CATS=CONTENT.categories||[],SV=CONTENT.services.filter(s=>s.shop);
const KEY="olf_cart";let cart=[],cur={},q="";
try{cart=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){}
const $=i=>document.getElementById(i),money=n=>"$"+n,find=id=>PRODUCTS.find(p=>p.id==id),priced=p=>+p.price>0;
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const catName=id=>(CATS.find(c=>c.id==id)||{}).n||"";
const pic=(o,k)=>o.img?`<img src="${esc(o.img)}" alt="${esc(o.n)}">`:esc(o[k||"e"]||"");
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}drawCart()};
const tile=(href,bg,icon,name,desc,note)=>`<a class="house" href="${href}"><div class="pic" style="background:${esc(bg)}">${icon}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(name)}</h3><p style="margin-top:6px">${esc(desc||"")}</p><span class="tag">${note}</span><p style="color:var(--blue);margin-top:6px">Browse →</p></div></a>`;
const cnt=(n,w)=>n+" "+w+(n==1?"":"s");
function route(){const h=decodeURIComponent(location.hash.slice(1)),[a,b]=h.split("/"),svcA=SV.find(s=>s.id==a),catX=CATS.find(c=>c.id==(b||a)&&(!svcA||c.svc==svcA.id));
 const svc=svcA||(catX&&SV.find(s=>s.id==catX.svc)),lvl=!h?0:(svcA&&!b)?1:2;
 $("cats").hidden=lvl==2;$("catalog").hidden=lvl<2;
 const title=catX?catX.n:svc?"All "+svc.n:"All items",cr=[["Shop","#"]];if(svc)cr.push([svc.n,"#"+encodeURIComponent(svc.id)]);if(lvl==2)cr.push([title,""]);
 $("crumbs").innerHTML=lvl?cr.map(([t,u])=>u?`<a href="${u}">${esc(t)}</a>`:esc(t)).join(" › "):"";
 if(lvl==0)$("cats").innerHTML=SV.map(s=>tile("#"+encodeURIComponent(s.id),"#e3d9f7",pic(s,"ic"),s.n,s.d,cnt(CATS.filter(c=>c.svc==s.id).length,"category").replace("categorys","categories"))).join("")||"<p>The shop is being set up. Please check back soon.</p>";
 else if(lvl==1){const cs=CATS.filter(c=>c.svc==svc.id);$("cats").innerHTML=cs.map(c=>tile("#"+encodeURIComponent(svc.id)+"/"+encodeURIComponent(c.id),c.c,pic(c),c.n,c.d,cnt(PRODUCTS.filter(p=>p.cat==c.id).length,"item"))).join("")+tile("#"+encodeURIComponent(svc.id)+"/all","#e3d9f7","🛍️","All "+svc.n,"See everything in this section",cnt(PRODUCTS.filter(p=>cs.some(c=>c.id==p.cat)).length,"item"))}
 else{cur={svc:svc&&svc.id,cat:catX&&b!="all"?catX.id:null};q="";$("s").value="";$("ct").textContent=title;$("cd").textContent=catX?catX.d||"":svc?svc.d||"":"Everything in the shop.";drawList();scrollTo(0,0)}}
function drawList(){const ok=p=>cur.cat?p.cat==cur.cat:cur.svc?CATS.some(c=>c.id==p.cat&&c.svc==cur.svc):true;
 const items=PRODUCTS.filter(p=>ok(p)&&p.n.toLowerCase().includes(q.toLowerCase()));
 $("prods").innerHTML=items.map(p=>`<div class="house prod" style="cursor:default"><div class="pic" style="background:${esc(p.c)}">${pic(p)}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(p.n)}</h3><span class="tag">${esc(catName(p.cat))}</span><p style="margin-top:6px">${esc(p.d)}</p><p class="price">${priced(p)?money(p.price):"Price on request"}</p>${p.sizes&&p.sizes.length?`<select id="sz${p.id}">${p.sizes.map(z=>`<option>${esc(z)}</option>`).join("")}</select>`:""}<button class="btn" onclick="add('${p.id}')">${priced(p)?"Add to cart":"Request a quote"}</button></div></div>`).join("")||"<p>No items found.</p>"}
$("s").oninput=e=>{q=e.target.value;drawList()};
addEventListener("hashchange",route);
function add(id){const p=find(id),sz=p.sizes&&p.sizes.length?$("sz"+id).value:"",l=cart.find(c=>c.id==id&&c.sz==sz);l?l.q++:cart.push({id,sz,q:1});save();openCart()}
function chg(i,d){cart[i].q+=d;if(cart[i].q<1)cart.splice(i,1);save()}
function drawCart(){$("cn").textContent=cart.reduce((a,c)=>a+c.q,0);
 $("lines").innerHTML=cart.map((c,i)=>{const p=find(c.id);return p?`<div class="line"><span>${esc(p.n)}${c.sz?" ("+esc(c.sz)+")":""}<br>${priced(p)?money(p.price):"Price on request"}</span><span><button onclick="chg(${i},-1)">−</button> ${c.q} <button onclick="chg(${i},1)">+</button></span></div>`:""}).join("")||"<p>Your cart is empty.</p>";
 $("tot").textContent=money(cart.reduce((a,c)=>{const p=find(c.id);return a+(p&&priced(p)?p.price*c.q:0)},0))}
function openCart(){$("cart").classList.add("open")}function closeCart(){$("cart").classList.remove("open")}
$("co").onsubmit=e=>{e.preventDefault();cart=cart.filter(c=>find(c.id));if(!cart.length)return alert("Your cart is empty.");const v=Object.fromEntries(new FormData(e.target));
 const lines=cart.map(c=>{const p=find(c.id);return `${c.q} x ${p.n}${c.sz?" ("+c.sz+")":""} - ${priced(p)?money(p.price*c.q):"price on request"}`}).join("\n");
 const msg=`New order / quote request\n${lines}\nTotal (priced items): ${$("tot").textContent}\nName: ${v.name}\nPhone: ${v.phone}\nAddress: ${v.addr}`;
 window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank")};
route();drawCart();
