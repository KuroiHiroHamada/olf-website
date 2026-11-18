const PRODUCTS=CONTENT.products,CATS=CONTENT.categories||[];
const KEY="olf_cart";let cart=[],cur="",q="";
try{cart=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){}
const $=i=>document.getElementById(i),money=n=>"$"+n,find=id=>PRODUCTS.find(p=>p.id==id);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const catName=id=>(CATS.find(c=>c.id==id)||{}).n||"";
const pic=o=>o.img?`<img src="${esc(o.img)}" alt="${esc(o.n)}">`:esc(o.e||"");
function save(){try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}drawCart()}
function tile(href,bg,icon,name,desc,n){return `<a class="house" href="${href}"><div class="pic" style="background:${esc(bg)}">${icon}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(name)}</h3><p style="margin-top:6px">${esc(desc||"")}</p><span class="tag">${n} item${n==1?"":"s"}</span><p style="color:var(--blue);margin-top:6px">Browse →</p></div></a>`}
function drawCats(){$("cats").innerHTML=CATS.map(c=>tile("#"+encodeURIComponent(c.id),c.c,pic(c),c.n,c.d,PRODUCTS.filter(p=>p.cat==c.id).length)).join("")+tile("#all","#e3d9f7","🛍️","All items","See everything in one list",PRODUCTS.length)}
function drawList(){const items=PRODUCTS.filter(p=>(cur=="all"||p.cat==cur)&&p.n.toLowerCase().includes(q.toLowerCase()));
 $("prods").innerHTML=items.map(p=>`<div class="house prod" style="cursor:default"><div class="pic" style="background:${esc(p.c)}">${pic(p)}</div><div class="in"><h3 style="text-align:left;margin:0">${esc(p.n)}</h3><span class="tag">${esc(catName(p.cat))}</span><p style="margin-top:6px">${esc(p.d)}</p><p class="price">${money(p.price)}</p>${p.sizes&&p.sizes.length?`<select id="sz${p.id}">${p.sizes.map(z=>`<option>${esc(z)}</option>`).join("")}</select>`:""}<button class="btn" onclick="add('${p.id}')">Add to cart</button></div></div>`).join("")||"<p>No items found.</p>"}
function route(){const h=decodeURIComponent(location.hash.slice(1));
 if(!h){$("cats").hidden=false;$("catalog").hidden=true;drawCats();return}
 $("cats").hidden=true;$("catalog").hidden=false;cur=h;q="";$("s").value="";
 const c=CATS.find(x=>x.id==h);$("ct").textContent=c?c.n:"All items";$("cd").textContent=c?(c.d||""):"Everything in the shop.";drawList();scrollTo(0,0)}
$("s").oninput=e=>{q=e.target.value;drawList()};
addEventListener("hashchange",route);
function add(id){const p=find(id),sz=p.sizes&&p.sizes.length?$("sz"+id).value:"",l=cart.find(c=>c.id==id&&c.sz==sz);l?l.q++:cart.push({id,sz,q:1});save();openCart()}
function chg(i,d){cart[i].q+=d;if(cart[i].q<1)cart.splice(i,1);save()}
function drawCart(){$("cn").textContent=cart.reduce((a,c)=>a+c.q,0);
 $("lines").innerHTML=cart.map((c,i)=>{const p=find(c.id);return p?`<div class="line"><span>${esc(p.n)}${c.sz?" ("+esc(c.sz)+")":""}<br>${money(p.price)}</span><span><button onclick="chg(${i},-1)">−</button> ${c.q} <button onclick="chg(${i},1)">+</button></span></div>`:""}).join("")||"<p>Your cart is empty.</p>";
 $("tot").textContent=money(cart.reduce((a,c)=>a+(find(c.id)?find(c.id).price*c.q:0),0))}
function openCart(){$("cart").classList.add("open")}function closeCart(){$("cart").classList.remove("open")}
$("co").onsubmit=e=>{e.preventDefault();cart=cart.filter(c=>find(c.id));if(!cart.length)return alert("Your cart is empty.");const v=Object.fromEntries(new FormData(e.target));
 const lines=cart.map(c=>{const p=find(c.id);return `${c.q} x ${p.n}${c.sz?" ("+c.sz+")":""} - ${money(p.price*c.q)}`}).join("\n");
 const msg=`New shop order\n${lines}\nTotal: ${$("tot").textContent}\nName: ${v.name}\nPhone: ${v.phone}\nAddress: ${v.addr}`;
 window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank")};
route();drawCart();
