import f from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const d of f.readdirSync(I)){
 const a=I+"/"+d,b=O+"/"+d,r=R(f.readFileSync(a+"/program.bin"),f.readFileSync(a+"/input.bin"));
 f.mkdirSync(b,{recursive:!0});
 f.writeFileSync(b+"/stdout.bin",r.o);
 f.writeFileSync(b+"/exit.txt",r.c+"\n");
}
function R(g,q){
 const D=new Int32Array(576),o=new Uint8Array(65536);
 let s=0,u=0,l=0,i=0,n=g.length,k=0,t=0;
 const P=()=>{if(!s)throw 2;return D[--s]},U=v=>{if(s>255)throw 3;D[s++]=v},T=x=>{throw x};
 try{for(;;){
  if(t==1e6)T(10);
  if(k<0||k>=n)T(9);
  const y=g[k],m=y==1?1:y==2?4:y>47&&y<52?2:0;
  if(k+m>=n)T(9);
  t++;
  const w=k+1+m;k=w;
  if(y<8){
   if(!y)T(0);
   else if(y==1)U(g.readInt8(w-1));
   else if(y==2)U(g.readInt32LE(w-4));
   else if(y==3)P();
   else if(y==4)s?U(D[s-1]):T(2);
   else if(y==5){const b=P(),a=P();U(b);U(a)}
   else if(y==6)s>1?U(D[s-2]):T(2);
   else{const c=P(),b=P(),a=P();U(b);U(c);U(a)}
  }else if(y>15&&y<35&&y!=31){
   if(y==23){if(!s)T(2);D[s-1]=-D[s-1]|0}
   else if(y==27){if(!s)T(2);D[s-1]=~D[s-1]}
   else{const b=P(),a=P(),A=a>>>0,B=b>>>0;let r;
    if(y<19)r=y==16?a+b|0:y==17?a-b|0:Math.imul(a,b);
    else if(y<23){if(!b)T(4);r=y==19?(a/b)|0:y==20?a%b|0:y==21?A/B|0:A%B|0}
    else if(y<27)r=y==24?a&b:y==25?a|b:a^b;
    else if(y<31)r=y==28?a<<b:y==29?a>>b:(a>>>b)|0;
    else r=(y==32?a==b:y==33?a<b:A<B)?1:0;
    U(r)}
  }else if(y>47&&y<51){
   const r=g.readInt16LE(w-2);
   if(y==48)k=w+r;else{const v=P();if(y==49?v==0:v!=0)k=w+r}
  }else if(y==51){if(u==64)T(7);D[256+u++]=w;k=g[w-2]|g[w-1]<<8}
  else if(y==52){if(!u)T(8);k=D[256+--u]}
  else if(y==64){const a=P();if(a<0||a>255)T(6);U(D[320+a])}
  else if(y==65){const a=P(),v=P();if(a<0||a>255)T(6);D[320+a]=v}
  else if(y==80){const v=P(),b=Buffer.from(""+v);if(l+b.length>65536)T(11);o.set(b,l);l+=b.length}
  else if(y==81){const v=P();if(l>65535)T(11);o[l++]=v&255}
  else if(y==82)U(i<q.length?q[i++]:-1);
  else if(y==83)T(P()&255);
  else T(5);
 }}catch(x){return{o:o.slice(0,l),c:x}}
}
