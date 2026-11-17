const PRODUCTS=CONTENT.products;
const KEY="olf_cart";let cart=[],cat="All",q="";
try{cart=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){}
const $=i=>document.getElementById(i),money=n=>"$"+n;
const find=id=>PRODUCTS.find(p=>p.id==id);
function save(){try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}drawCart()}
function drawShop(){const cats=["All",...new Set(PRODUCTS.map(p=>p.cat))];
 $("chips").innerHTML=cats.map(c=>`<button class="${c==cat?"on":""}" onclick="cat='${c}';drawShop()">${c}</button>`).join("")+`<input id="s" placeholder="Search..." value="${q}" oninput="q=this.value;drawList()">`;drawList();
 const s=$("s");s.onfocus=()=>{}}
function drawList(){$("prods").innerHTML=PRODUCTS.filter(p=>(cat=="All"||p.cat==cat)&&p.n.toLowerCase().includes(q.toLowerCase())).map(p=>`<div class="house prod" style="cursor:default"><div class="pic" style="background:${p.c}">${p.img?`<img src="${p.img}" alt="${p.n}">`:p.e}</div><div class="in"><h3 style="text-align:left;margin:0">${p.n}</h3><span class="tag">${p.cat}</span><p style="margin-top:6px">${p.d}</p><p class="price">${money(p.price)}</p>${p.sizes?`<select id="sz${p.id}">${p.sizes.map(z=>`<option>${z}</option>`).join("")}</select>`:""}<button class="btn" onclick="add('${p.id}')">Add to cart</button></div></div>`).join("")||"<p>No items found.</p>"}
function add(id){const p=find(id),sz=p.sizes?$("sz"+id).value:"",l=cart.find(c=>c.id==id&&c.sz==sz);l?l.q++:cart.push({id,sz,q:1});save();openCart()}
function chg(i,d){cart[i].q+=d;if(cart[i].q<1)cart.splice(i,1);save()}
function drawCart(){$("cn").textContent=cart.reduce((a,c)=>a+c.q,0);
 $("lines").innerHTML=cart.map((c,i)=>{const p=find(c.id);return `<div class="line"><span>${p.n}${c.sz?" ("+c.sz+")":""}<br>${money(p.price)}</span><span><button onclick="chg(${i},-1)">−</button> ${c.q} <button onclick="chg(${i},1)">+</button></span></div>`}).join("")||"<p>Your cart is empty.</p>";
 $("tot").textContent=money(cart.reduce((a,c)=>a+find(c.id).price*c.q,0))}
function openCart(){$("cart").classList.add("open")}function closeCart(){$("cart").classList.remove("open")}
$("co").onsubmit=e=>{e.preventDefault();if(!cart.length)return alert("Your cart is empty.");const v=Object.fromEntries(new FormData(e.target));
 const lines=cart.map(c=>{const p=find(c.id);return `${c.q} x ${p.n}${c.sz?" ("+c.sz+")":""} - ${money(p.price*c.q)}`}).join("\n");
 const msg=`New shop order\n${lines}\nTotal: ${$("tot").textContent}\nName: ${v.name}\nPhone: ${v.phone}\nAddress: ${v.addr}`;
 window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank")};
drawShop();drawCart();