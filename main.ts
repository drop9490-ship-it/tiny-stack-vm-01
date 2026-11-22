import f from"node:fs";
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
f.readdirSync(I).forEach(d=>{
 const a=I+"/"+d,b=O+"/"+d,r=R(f.readFileSync(a+"/program.bin"),f.readFileSync(a+"/input.bin"));
 f.mkdirSync(b,{recursive:!0});
 f.writeFileSync(b+"/stdout.bin",r[0]);
 f.writeFileSync(b+"/exit.txt",""+r[1]);
});
function R(g,q){
 const D=new Int32Array(512),C=[];
 let s=0,i=0,n=g.length,k=0,t=0,o="";
 const P=()=>D[--s]??T(2),U=v=>s>255?T(3):D[s++]=v,T=x=>{throw x};
 try{for(;;){
  const y=g[k],m=+"014"[y]||(y>47&&y<52?2:0);
  if(k+m>=n|k>>>0>=n)T(9);
  k+=1+m;
  if(y<8){
   if(!y)T(0);
   else if(y==1)U(g.readInt8(k-1));
   else if(y==2)U(g.readInt32LE(k-4));
   else if(y==3)P();
   else if(y==4)U(D[s-1]??T(2));
   else if(y==5){const b=P(),a=P();U(b);U(a)}
   else if(y==6)U(D[s-2]??T(2));
   else{const c=P(),b=P(),a=P();U(b);U(c);U(a)}
  }else if(y>15&&y<35&&y!=31){
   if(y==23)U(-P());
   else if(y==27)U(~P());
   else{const b=P(),a=P(),A=a>>>0,B=b>>>0;let r;
    if(y<19)r=y-16?y-17?Math.imul(a,b):a-b:a+b;
    else if(y<23){if(!b)T(4);r=y-19?y-20?y-21?A%B:A/B:a%b:a/b}
    else if(y<27)r=y-24?y-25?a^b:a|b:a&b;
    else if(y<31)r=y-28?y-29?a>>>b:a>>b:a<<b;
    else r=+(y-32?y-33?A<B:a<b:a==b);
    U(r)}
  }else if(y>47&&y<51){
   const r=g.readInt16LE(k-2),v=y==48?0:P();
   if(y==48||y==49?!v:v)k+=r
  }else if(y==51){if(C.length==64)T(7);C.push(k);k=g[k-2]|g[k-1]<<8}
  else if(y==52)k=C.pop()??T(8);
  else if(y==64){const a=P();U(a>>>0>255?T(6):D[256+a])}
  else if(y==65){const a=P(),v=P();a>>>0>255?T(6):D[256+a]=v}
  else if(y==80){const s=""+P();o.length+s.length>65536?T(11):o+=s}
  else if(y==81){const v=P();o.length>65535?T(11):o+=String.fromCharCode(v&255)}
  else if(y==82)U(q[i++]??-1);
  else if(y==83)T(P()&255);
  else T(5);
  ++t==1e6&&T(10);
 }}catch(x){return[Buffer.from(o,"latin1"),x]}
}
