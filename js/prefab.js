const HOUSES=CONTENT.houses,FH=2.8,WH=2.7,T=.12,$=i=>document.getElementById(i);
const DEF=[[["l",0,0,5,4],["h",5,0,1.5,7.5],["k",6.5,0,3,3.5],["t",6.5,3.5,3,1.5],["b",0,4,5,3.5],["b",6.5,5,3,2.5]]];
const pl=h=>h.plan&&h.plan.length?h.plan:DEF;
const NAMES={l:"Living room",k:"Kitchen",b:"Bedroom",t:"Bathroom",h:"Hall",s:"Stairs",o:"Terrace",n:"Balcony"};
const FC={b:"#b78b5a",l:"#c19a6b",k:"#e6e2d8",t:"#cfe0e6",h:"#c19a6b",s:"#c19a6b",o:"#b8b8b4",n:"#b8b8b4"};
$("houses").innerHTML=HOUSES.map((h,i)=>`<div class="house" onclick="openHouse(${i})"><div class="pic" style="background:${h.c}">${h.img?`<img src="${h.img}" alt="">`:h.e}</div><div class="in"><h3 style="text-align:left;margin:0">${h.n}</h3><span class="tag">${h.size||""}</span>${h.type?`<span class="tag">${h.type}</span>`:""}<span class="tag">${pl(h).length} floor${pl(h).length>1?"s":""}</span><p style="margin-top:8px">${h.price||""}</p><p style="color:var(--blue);margin-top:6px">Click to explore in 3D →</p></div></div>`).join("");
let R,S,C,G,WM,WMAT,GLASS,COL=[],H0,ctr={x:0,z:0},top=3,mode="out",fl=0,cur=0,P={x:0,z:0},ry=0,rx=0,az=.8,oe=.45,dist=16,fov=75,drag=0,mv={f:0,s:0,t:0};
const mat=c=>new THREE.MeshStandardMaterial({color:c});
const box=(w,h,d,x,y,z,c,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m||mat(c));o.position.set(x,y+h/2,z);G.add(o);return o};
const inr=(r,x,z)=>x>r[1]&&x<r[1]+r[3]&&z>r[2]&&z<r[2]+r[4];
function share(A,B){for(const[p,q]of[[A,B],[B,A]]){
 if(Math.abs(p[1]+p[3]-q[1])<.06){const a=Math.max(p[2],q[2]),b=Math.min(p[2]+p[4],q[2]+q[4]);if(b-a>=.9)return{o:"v",c:q[1],a:(a+b)/2,l:b-a}}
 if(Math.abs(p[2]+p[4]-q[2])<.06){const a=Math.max(p[1],q[1]),b=Math.min(p[1]+p[3],q[1]+q[3]);if(b-a>=.9)return{o:"h",c:q[2],a:(a+b)/2,l:b-a}}}return null}
function doors(rooms,h,f){const D=[],PR={b:"hl",t:"hl",k:"hl",l:"hl",o:"hl",n:"bh"};
 rooms.forEach(r=>{const t=r[0];for(const k of PR[t]||""){let best=null;rooms.forEach(q=>{if(q!==r&&q[0]==k){const s=share(r,q);if(s&&(!best||s.l>best.l))best=s}});
  if(best){D.push({...best,w:(t=="l"||k=="l")&&t!="o"?1.5:.9,y0:0,y1:2.1,leaf:t=="o"});break}}});
 const on=(r,p)=>p.o=="h"?(Math.abs(p.c-r[2])<.1||Math.abs(p.c-r[2]-r[4])<.1)&&p.a>r[1]&&p.a<r[1]+r[3]:(Math.abs(p.c-r[1])<.1||Math.abs(p.c-r[1]-r[3])<.1)&&p.a>r[2]&&p.a<r[2]+r[4];
 rooms.forEach(r=>{if(r[0]!="h"||D.some(p=>on(r,p)))return;let best=null;rooms.forEach(q=>{if(q!==r&&"hl".includes(q[0])){const s=share(r,q);if(s&&(!best||s.l>best.l))best=s}});if(best)D.push({...best,w:1.5,y0:0,y1:2.1})});
 if(f==0){const e=h.door;if(e)D.push({o:e[2],c:e[2]=="h"?e[1]:e[0],a:e[2]=="h"?e[0]:e[1],w:.9,y0:0,y1:2.1,leaf:1});
  else if(!rooms.some(r=>r[0]=="o")){const r=rooms.find(r=>r[0]=="h")||rooms.find(r=>r[0]=="l");if(r)D.push({o:"h",c:r[2]+r[4],a:r[1]+r[3]/2,w:.9,y0:0,y1:2.1,leaf:1})}}
 return D}
function wins(rooms,D){const W=[];
 rooms.forEach(r=>{const[t,x,z,w,d]=r;if(!"bklt".includes(t))return;
  [["h",z,x,x+w,0,-1],["h",z+d,x,x+w,0,1],["v",x,z,z+d,-1,0],["v",x+w,z,z+d,1,0]].forEach(([o,c,a0,a1,nx,nz])=>{
   const m=(a0+a1)/2,px=o=="h"?m:c+nx*.3,pz=o=="h"?c+nz*.3:m;
   if(rooms.some(q=>q[0]!="o"&&q[0]!="n"&&inr(q,px,pz))||a1-a0<1.6||D.some(p=>p.o==o&&Math.abs(p.c-c)<.1&&Math.abs(p.a-m)<1.1))return;
   const bt=t=="t";W.push({o,c,a:m,w:bt?.6:Math.min(1.5,a1-a0-.9),y0:bt?1.3:.9,y1:2,glass:1})})});return W}
function wall(o,c,a0,a1,OP,y,f){const ops=OP.filter(p=>p.o==o&&Math.abs(p.c-c)<.1&&p.a+p.w/2>a0&&p.a-p.w/2<a1).sort((p,q)=>p.a-q.a);let cur=a0;
 const seg=(s,e,y0,y1)=>{if(e-s<.03||y1-y0<.03)return;const L=e-s+T,m=(s+e)/2;
  box(o=="h"?L:T,y1-y0,o=="h"?T:L,o=="h"?m:c,y+y0,o=="h"?c:m,0,WMAT);
  if(y0==0)COL.push(o=="h"?[s,e,c-T/2,c+T/2,f]:[c-T/2,c+T/2,s,e,f])};
 for(const p of ops){const s=Math.max(a0,p.a-p.w/2),e=Math.min(a1,p.a+p.w/2);seg(cur,s,0,WH);if(p.y0>0)seg(s,e,0,p.y0);seg(s,e,p.y1,WH);
  const px=o=="h"?(s+e)/2:c,pz=o=="h"?c:(s+e)/2;
  if(p.glass)box(o=="h"?e-s:.03,p.y1-p.y0,o=="h"?.03:e-s,px,y+p.y0,pz,0,GLASS);
  if(p.leaf)box(o=="h"?e-s:.05,2.05,o=="h"?.05:e-s,px,y,pz,"#6b3f1d");cur=e}
 seg(cur,a1,0,WH)}
function stairs(r,y){const[t,x,z,w,d,dr="s"]=r,N=14;for(let i=0;i<N;i++){const hh=.2*(i+1),a=dr=="s"||dr=="e"?i:N-1-i;
 if(dr=="s"||dr=="n")box(w,hh,d/N,x+w/2,y,z+(a+.5)*d/N,"#b08a60");else box(w/N,hh,d,x+(a+.5)*w/N,y,z+d/2,"#b08a60")}}
function rail(r,rooms,y){const[t,x,z,w,d]=r;[["h",z,x,x+w,0,-1],["h",z+d,x,x+w,0,1],["v",x,z,z+d,-1,0],["v",x+w,z,z+d,1,0]].forEach(([o,c,a0,a1,nx,nz])=>{const m=(a0+a1)/2;
 if(rooms.some(q=>q!==r&&inr(q,o=="h"?m:c+nx*.3,o=="h"?c+nz*.3:m)))return;box(o=="h"?a1-a0:.05,.95,o=="h"?.05:a1-a0,o=="h"?m:c,y,o=="h"?c:m,"#3b4252")})}
function furn(r,y){const[t,x,z,w,d]=r,cx=x+w/2,cz=z+d/2,b=(a,h,e,px,py,pz,c)=>box(a,h,e,px,y+py,pz,c);
 if(t=="b"){b(1.6,.4,2,cx,0,cz,"#8a6a45");b(1.5,.15,1.9,cx,.4,cz,"#fff");b(1.2,.12,.4,cx,.55,cz-.75,"#e8d9c5");b(.9,1.9,.5,x+w-.4,0,z+.35,"#8a6a45")}
 if(t=="l"){b(2,.45,.9,cx,0,z+d*.3,"#2a52be");b(2,.5,.2,cx,.45,z+d*.3-.4,"#1b2b48");b(1,.4,.6,cx,0,cz,"#6b4a2b");if(w*d>16)b(1.6,.75,.9,cx,0,z+d*.78,"#8a6a45")}
 if(t=="k"){b(w-.4,.9,.6,cx,0,z+.35,"#eeeeee");b(w-.4,.7,.3,cx,1.5,z+.2,"#2a52be");if(d>2.8)b(.9,.75,.9,cx,0,cz+.4,"#8a6a45")}
 if(t=="t"){b(.4,.4,.6,x+.4,0,z+d-.5,"#fff");b(.5,.85,.4,x+w-.45,0,z+.3,"#fff");b(.9,.06,.9,x+.5,0,z+.5,"#cfe8f0")}
 if(t=="o"&&w>2)b(.9,.75,.9,cx,0,cz,"#8a6a45")}
function roof(h,x0,z0,x1,z1,n){const w=x1-x0+1,d=z1-z0+1,al=w>=d,span=al?d:w,L=al?w:d,rh=Math.min(2.8,span*.28),sh=new THREE.Shape();
 sh.moveTo(-span/2,0);sh.lineTo(span/2,0);sh.lineTo(0,rh);sh.closePath();
 const g=new THREE.ExtrudeGeometry(sh,{depth:L,bevelEnabled:false});g.translate(0,0,-L/2);
 const m=new THREE.Mesh(g,[mat("#f4f4f0"),new THREE.MeshStandardMaterial({color:h.roof||"#c0272d",side:THREE.DoubleSide})]);
 m.position.set((x0+x1)/2,(n-1)*FH+WH+.08,(z0+z1)/2);if(al)m.rotation.y=Math.PI/2;G.add(m)}
function build(h){if(G)S.remove(G);G=new THREE.Group();COL=[];WMAT=mat("#f3ece0");GLASS=new THREE.MeshStandardMaterial({color:"#9fd3ff",transparent:true,opacity:.35});
 const p=pl(h);top=p.length*FH;let x0=1e9,z0=1e9,x1=-1e9,z1=-1e9;
 p.forEach(rs=>rs.forEach(r=>{if(r[0]!="o"&&r[0]!="n"){x0=Math.min(x0,r[1]);z0=Math.min(z0,r[2]);x1=Math.max(x1,r[1]+r[3]);z1=Math.max(z1,r[2]+r[4])}}));
 ctr={x:(x0+x1)/2,z:(z0+z1)/2};dist=Math.max(x1-x0,z1-z0)*1.5+7;
 box(140,.2,140,ctr.x,-.3,ctr.z,"#6fae4f");
 p.forEach((rooms,f)=>{const y=f*FH,D=doors(rooms,h,f),OP=D.concat(wins(rooms,D)),seen=new Set(),nx=p[f+1];
  rooms.forEach(r=>{const[t,x,z,w,d]=r,cx=x+w/2,cz=z+d/2;
   if(!(t=="s"&&f>0)){box(w,.1,d,cx,y-.1,cz,"#fafafa");box(w-.02,.012,d-.02,cx,y,cz,FC[t])}
   if(t!="o"&&t!="n"&&!(nx&&nx.some(q=>inr(q,cx,cz))))box(w,.08,d,cx,y+WH,cz,"#fafafa");
   if(t=="s"){COL.push([x,x+w,z,z+d,f]);if(f<p.length-1)stairs(r,y)}
   if(t=="n")rail(r,rooms,y);furn(r,y)});
  rooms.forEach(r=>{const[t,x,z,w,d]=r;if(t=="o"||t=="n")return;
   [["h",z,x,x+w],["h",z+d,x,x+w],["v",x,z,z+d],["v",x+w,z,z+d]].forEach(([o,c,a0,a1])=>{const k=o+c.toFixed(1)+a0.toFixed(1)+a1.toFixed(1);if(seen.has(k))return;seen.add(k);wall(o,c,a0,a1,OP,y,f)})})});
 roof(h,x0,z0,x1,z1,p.length);S.add(G)}
const hit=(x,z)=>COL.some(b=>b[4]==fl&&x>b[0]-.22&&x<b[1]+.22&&z>b[2]-.22&&z<b[3]+.22);
function ui(){const p=pl(H0),cnt={},tot={};p[fl].forEach(r=>tot[r[0]]=(tot[r[0]]||0)+1);
 $("modes").innerHTML=`<button class="${mode=="out"?"on":""}" onclick="setMode('out')">🏠 Outside</button>`+p.map((_,f)=>`<button class="${mode=="in"&&fl==f?"on":""}" onclick="goto(${f})">🚶 ${f?"Upper":"Ground"} floor</button>`).join("");
 $("rooms").innerHTML=mode=="in"?p[fl].map((r,j)=>{cnt[r[0]]=(cnt[r[0]]||0)+1;return r[0]=="s"?"":`<button onclick="jump(${j})">${NAMES[r[0]]}${tot[r[0]]>1?" "+cnt[r[0]]:""}</button>`}).join(""):"";
 $("pad").style.display=mode=="in"?"grid":"none";
 $("hint").textContent=mode=="in"?"Drag to look around. Walk with W A S D or the arrow keys, or use the buttons.":"Drag to rotate, scroll to zoom. Choose a floor to walk inside."}
function setMode(m){mode=m;WMAT.color.set(m=="out"?H0.wall||"#e8d9b0":"#f3ece0");C.fov=m=="out"?45:fov;C.updateProjectionMatrix();ui()}
function goto(f){fl=f;const p=pl(H0)[f],r=p.find(r=>r[0]=="h")||p.find(r=>r[0]!="s");P={x:r[1]+r[3]/2,z:r[2]+r[4]/2};ry=0;rx=0;setMode("in")}
function jump(j){const r=pl(H0)[fl][j];P={x:r[1]+r[3]/2,z:r[2]+r[4]/2};ry=0;rx=0;ui()}
function init(){const el=$("view");R=new THREE.WebGLRenderer({antialias:true});el.appendChild(R.domElement);S=new THREE.Scene();S.background=new THREE.Color("#bfe3ff");C=new THREE.PerspectiveCamera(45,1,.1,300);
 S.add(new THREE.HemisphereLight(0xffffff,0x88aa77,.95));const dl=new THREE.DirectionalLight(0xffffff,.5);dl.position.set(8,15,6);S.add(dl);
 let lx,ly;el.onpointerdown=e=>{drag=1;lx=e.clientX;ly=e.clientY;el.setPointerCapture(e.pointerId)};el.onpointerup=el.onpointercancel=()=>drag=0;
 el.onpointermove=e=>{if(!drag)return;const dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;
  if(mode=="in"){ry-=dx*.005;rx=Math.max(-1.2,Math.min(1.2,rx-dy*.005))}else{az-=dx*.008;oe=Math.max(.05,Math.min(1.4,oe+dy*.006))}};
 el.onwheel=e=>{e.preventDefault();if(mode=="out")dist=Math.max(5,Math.min(70,dist+e.deltaY*.03));else{fov=Math.max(40,Math.min(95,fov+e.deltaY*.05));C.fov=fov;C.updateProjectionMatrix()}};
 const K={w:["f",1],arrowup:["f",1],s:["f",-1],arrowdown:["f",-1],d:["s",1],a:["s",-1],arrowleft:["t",1],arrowright:["t",-1]};
 addEventListener("keydown",e=>{const k=K[e.key.toLowerCase()];if(k&&$("modal").classList.contains("open")){mv[k[0]]=k[1];e.preventDefault()}});
 addEventListener("keyup",e=>{const k=K[e.key.toLowerCase()];if(k)mv[k[0]]=0});
 document.querySelectorAll("#pad button").forEach(b=>{const k=b.dataset.k,set=v=>{if(k=="f")mv.f=v;if(k=="b")mv.f=-v;if(k=="l")mv.t=v;if(k=="r")mv.t=-v};
  b.onpointerdown=e=>{e.preventDefault();set(1)};b.onpointerup=b.onpointerleave=b.onpointercancel=()=>set(0)});
 new ResizeObserver(()=>{R.setSize(el.clientWidth,el.clientHeight);C.aspect=el.clientWidth/el.clientHeight;C.updateProjectionMatrix()}).observe(el);
 (function loop(){requestAnimationFrame(loop);if(!$("modal").classList.contains("open")||!G)return;
  if(mode=="in"){ry+=mv.t*.03;const nx=P.x+(-Math.sin(ry)*mv.f+Math.cos(ry)*mv.s)*.06,nz=P.z+(-Math.cos(ry)*mv.f-Math.sin(ry)*mv.s)*.06;
   if(!hit(nx,P.z))P.x=nx;if(!hit(P.x,nz))P.z=nz;C.position.set(P.x,fl*FH+1.6,P.z);C.rotation.set(rx,ry,0,"YXZ")}
  else{if(!drag)az+=.003;C.position.set(ctr.x+Math.sin(az)*Math.cos(oe)*dist,top*.5+Math.sin(oe)*dist,ctr.z+Math.cos(az)*Math.cos(oe)*dist);C.lookAt(ctr.x,top*.4,ctr.z)}
  R.render(S,C)})()}
function openHouse(i){if(!R)init();cur=i;H0=HOUSES[i];build(H0);fl=0;az=.8;oe=.45;
 $("rn").textContent=`${H0.n}${H0.size?" · "+H0.size:""}${H0.type?" · "+H0.type:""}`;
 $("info").textContent=H0.price||"";$("book").href="book.html?s=prefab&note="+encodeURIComponent(`Interested in ${H0.n}${H0.size?" ("+H0.size+")":""}`);
 $("modal").classList.add("open");setMode("out")}
function closeM(){$("modal").classList.remove("open");mv.f=mv.s=mv.t=0}
