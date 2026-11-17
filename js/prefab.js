// DEMO DATA: replace with real houses later
const HOUSES=CONTENT.houses;
const NAMES={living:"Living room",kitchen:"Kitchen",bedroom:"Bedroom",bath:"Bathroom"};
document.getElementById("houses").innerHTML=HOUSES.map((h,i)=>`<div class="house" onclick="openHouse(${i})"><div class="pic" style="background:${h.c}">${h.img?`<img src="${h.img}" alt="">`:h.e}</div><div class="in"><h3>${h.n}</h3><span class="tag">${h.size}</span><span class="tag">${h.rooms.length} rooms</span><p style="margin-top:8px">${h.price}</p><p style="color:#2a52be;margin-top:6px">Click to explore in 3D →</p></div></div>`).join("");
let R,S,C,G,yaw=0,pitch=0,fov=70,cur=null,room=0;
function init(){const el=document.getElementById("view");
 R=new THREE.WebGLRenderer({antialias:true});el.appendChild(R.domElement);
 S=new THREE.Scene();C=new THREE.PerspectiveCamera(fov,1,.1,50);C.position.set(0,1.6,0);
 S.add(new THREE.AmbientLight(0xffffff,.7));const p=new THREE.PointLight(0xffffff,.8);p.position.set(0,2.8,0);S.add(p);
 let d=0,x=0,y=0;
 el.onpointerdown=e=>{d=1;x=e.clientX;y=e.clientY};
 addEventListener("pointerup",()=>d=0);
 addEventListener("pointermove",e=>{if(!d)return;yaw+=(e.clientX-x)*.005;pitch=Math.max(-1,Math.min(1,pitch+(e.clientY-y)*.005));x=e.clientX;y=e.clientY});
 el.onwheel=e=>{e.preventDefault();fov=Math.max(35,Math.min(95,fov+e.deltaY*.05));C.fov=fov;C.updateProjectionMatrix()};
 new ResizeObserver(()=>{R.setSize(el.clientWidth,el.clientHeight);C.aspect=el.clientWidth/el.clientHeight;C.updateProjectionMatrix()}).observe(el);
 (function loop(){requestAnimationFrame(loop);if(!document.getElementById("modal").classList.contains("open"))return;
  C.rotation.order="YXZ";C.rotation.set(-pitch,-yaw,0);R.render(S,C)})()}
function build(type,wallColor){if(G)S.remove(G);G=new THREE.Group();
 const m=(c)=>new THREE.MeshStandardMaterial({color:c});
 const b=(w,h,d,x,z,c,y=0)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m(c));o.position.set(x,y+h/2,z);G.add(o)};
 const walls=new THREE.Mesh(new THREE.BoxGeometry(8,3,6),new THREE.MeshStandardMaterial({color:wallColor,side:THREE.BackSide}));walls.position.y=1.5;G.add(walls);
 b(8,.02,6,0,0,type=="bath"?0xbfd8e0:0x9c7a54);
 b(2.4,.01,1.6,0,0,0xb4c424,.02);// rug accent
 if(type=="living"){b(3,.8,1,0,2.3,0x2a52be);b(3,.5,.3,0,2.7,0x1b2b48,.8);b(1.4,.4,.8,0,.8,0x6b4a2b);b(2,1,.1,0,-2.9,0x111111,.8)}
 if(type=="bedroom"){b(2,.5,2.4,0,-1.6,0xffffff);b(2,.8,.2,0,-2.8,0x6b4a2b);b(.5,.5,.5,-1.5,-2.6,0x6b4a2b);b(1.6,2.2,.7,3,0,0x8a6a45)}
 if(type=="kitchen"){b(7,.9,.7,0,-2.6,0xf0f0f0);b(7,.9,.3,0,-2.8,0x2a52be,1.7);b(2.4,.95,1,0,.6,0x1b2b48);b(.9,.9,.9,3.4,-1.5,0xcccccc)}
 if(type=="bath"){b(.9,.6,2.2,3.1,-1.6,0xffffff);b(1.2,.9,.5,-2.5,-2.6,0xffffff);b(.5,.4,.7,0,-2.6,0xffffff);b(.05,1.8,1.4,-3.9,.8,0xcfeeff)}
 S.add(G)}
function show(i){room=i;const h=HOUSES[cur],t=h.rooms[i];yaw=0;pitch=0;build(t,h.wall);
 document.getElementById("rn").textContent=NAMES[t]+" · "+h.n;
 document.querySelectorAll(".rooms button").forEach((b,j)=>b.classList.toggle("on",j==i))}
function openHouse(i){if(!R)init();cur=i;const h=HOUSES[i];
 document.getElementById("rooms").innerHTML=h.rooms.map((t,j)=>`<button onclick="show(${j})">${NAMES[t]}${t=="bedroom"?" "+(h.rooms.slice(0,j+1).filter(r=>r=="bedroom").length):""}</button>`).join("");
 document.getElementById("info").textContent=`${h.size} · ${h.price}`;
 document.getElementById("book").href="book.html?s=prefab";
 document.getElementById("modal").classList.add("open");R.setSize(0,0);setTimeout(()=>show(0),30)}
function closeM(){document.getElementById("modal").classList.remove("open")}
