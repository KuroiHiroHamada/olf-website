// Small QR code generator (byte mode, error correction M, versions 1 to 10). No external libraries.
const QR=(()=>{
const EC={1:[10,[16]],2:[16,[28]],3:[26,[44]],4:[18,[32,32]],5:[24,[43,43]],6:[16,[27,27,27,27]],7:[18,[31,31,31,31]],8:[22,[38,38,39,39]],9:[22,[36,36,36,37,37]],10:[26,[43,43,43,43,44]]};
const mul=(x,y)=>{let z=0;for(let i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11d);z^=((y>>>i)&1)*x}return z};
const rs=(data,deg)=>{let g=Array(deg).fill(0);g[deg-1]=1;let r=1;for(let i=0;i<deg;i++){for(let j=0;j<deg;j++){g[j]=mul(g[j],r);if(j+1<deg)g[j]^=g[j+1]}r=mul(r,2)}
 const out=Array(deg).fill(0);for(const b of data){const f=b^out.shift();out.push(0);g.forEach((c,i)=>out[i]^=mul(c,f))}return out};
const bit=(n,i)=>((n>>>i)&1)!=0;
function make(text){
 const bytes=[...new TextEncoder().encode(text)];let ver=0;
 for(let v=1;v<=10;v++){const cap=EC[v][1].reduce((a,b)=>a+b,0)*8;if(4+(v<10?8:16)+bytes.length*8<=cap){ver=v;break}}
 if(!ver)throw new Error("Text is too long for this QR code");
 const bits=[],put=(val,len)=>{for(let i=len-1;i>=0;i--)bits.push((val>>>i)&1)};
 put(4,4);put(bytes.length,ver<10?8:16);bytes.forEach(b=>put(b,8));
 const cap=EC[ver][1].reduce((a,b)=>a+b,0)*8;put(0,Math.min(4,cap-bits.length));put(0,(8-bits.length%8)%8);
 for(let pad=0xec;bits.length<cap;pad^=0xec^0x11)put(pad,8);
 const cw=[];for(let i=0;i<bits.length;i+=8){let v=0;for(let j=0;j<8;j++)v=v<<1|bits[i+j];cw.push(v)}
 const [ecl,blocks]=EC[ver],dbs=[],ebs=[];let k=0;
 blocks.forEach(n=>{const d=cw.slice(k,k+n);k+=n;dbs.push(d);ebs.push(rs(d,ecl))});
 const all=[],maxd=Math.max(...blocks);
 for(let i=0;i<maxd;i++)dbs.forEach(d=>{if(i<d.length)all.push(d[i])});
 for(let i=0;i<ecl;i++)ebs.forEach(e=>all.push(e[i]));
 const size=ver*4+17,M=Array.from({length:size},()=>Array(size).fill(false)),F=Array.from({length:size},()=>Array(size).fill(false));
 const set=(x,y,d)=>{M[y][x]=d;F[y][x]=true};
 for(let i=0;i<size;i++){set(6,i,i%2==0);set(i,6,i%2==0)}
 const finder=(cx,cy)=>{for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const d=Math.max(Math.abs(dx),Math.abs(dy)),x=cx+dx,y=cy+dy;if(x>=0&&x<size&&y>=0&&y<size)set(x,y,d!=2&&d!=4)}};
 finder(3,3);finder(size-4,3);finder(3,size-4);
 const na=ver==1?0:Math.floor(ver/7)+2,step=ver==1?0:Math.ceil((ver*4+4)/(na*2-2))*2,ap=[6];
 for(let pos=size-7;ap.length<na;pos-=step)ap.splice(1,0,pos);
 ap.forEach((ax,i)=>ap.forEach((ay,j)=>{if(i==0&&j==0||i==0&&j==na-1||i==na-1&&j==0)return;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)set(ax+dx,ay+dy,Math.max(Math.abs(dx),Math.abs(dy))!=1)}));
 const fmt=mask=>{let d=mask,r=d;for(let i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);const b=((d<<10)|r)^0x5412;
  for(let i=0;i<=5;i++)set(8,i,bit(b,i));set(8,7,bit(b,6));set(8,8,bit(b,7));set(7,8,bit(b,8));for(let i=9;i<15;i++)set(14-i,8,bit(b,i));
  for(let i=0;i<8;i++)set(size-1-i,8,bit(b,i));for(let i=8;i<15;i++)set(8,size-15+i,bit(b,i));set(8,size-8,true)};
 fmt(0);
 if(ver>=7){let r=ver;for(let i=0;i<12;i++)r=(r<<1)^((r>>>11)*0x1f25);const b=ver<<12|r;for(let i=0;i<18;i++){const a=size-11+i%3,c=Math.floor(i/3);set(a,c,bit(b,i));set(c,a,bit(b,i))}}
 let i=0;
 for(let right=size-1;right>=1;right-=2){if(right==6)right=5;for(let v=0;v<size;v++)for(let j=0;j<2;j++){const x=right-j,up=((right+1)&2)==0,y=up?size-1-v:v;if(!F[y][x]&&i<all.length*8){M[y][x]=bit(all[i>>>3],7-(i&7));i++}}}
 const masks=[(x,y)=>(x+y)%2==0,(x,y)=>y%2==0,(x,y)=>x%3==0,(x,y)=>(x+y)%3==0,(x,y)=>(Math.floor(x/3)+Math.floor(y/2))%2==0,(x,y)=>x*y%2+x*y%3==0,(x,y)=>(x*y%2+x*y%3)%2==0,(x,y)=>((x+y)%2+x*y%3)%2==0];
 const apply=m=>{for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!F[y][x]&&masks[m](x,y))M[y][x]=!M[y][x]};
 const penalty=()=>{let p=0;const line=a=>{let run=1;for(let i=1;i<=size;i++){if(i<size&&a[i]==a[i-1])run++;else{if(run>=5)p+=run-2;run=1}}
   const s=a.map(v=>v?1:0).join("");const m=s.match(/(?=(00001011101|10111010000))/g);if(m)p+=40*m.length};
  for(let y=0;y<size;y++){line(M[y]);line(M.map(r=>r[y]))}
  for(let y=0;y<size-1;y++)for(let x=0;x<size-1;x++){const c=M[y][x];if(c==M[y][x+1]&&c==M[y+1][x]&&c==M[y+1][x+1])p+=3}
  let dark=0;M.forEach(r=>r.forEach(v=>{if(v)dark++}));p+=Math.floor(Math.abs(dark*20-size*size*10)/(size*size))*10;return p};
 let best=0,bp=1e9;for(let m=0;m<8;m++){apply(m);fmt(m);const p=penalty();if(p<bp){bp=p;best=m}apply(m)}
 apply(best);fmt(best);return M}
function draw(canvas,text,px){const M=make(text),n=M.length,q=4,s=Math.max(2,Math.floor(px/(n+q*2))),dim=s*(n+q*2);canvas.width=canvas.height=dim;
 const g=canvas.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,dim,dim);g.fillStyle="#000";for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(M[y][x])g.fillRect((x+q)*s,(y+q)*s,s,s);return canvas}
return{make,draw}})();
