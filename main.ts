import f from"node:fs";
let E=process.env,I=E.MAKEFUN_INPUT_DIR||"/input",O=E.MAKEFUN_OUTPUT_DIR||"/output";
let K="!\"#$%&'(123456789:;<=>?ABCQRSTUabqrst",V="!2R%'+,0*******&***&******AEEA!&)%%\"%";
let R=(p,i)=>{
let D=[],C=[],M=new Int32Array(256),o="",s=0,c=0,q=0,t=0,g=0;
let d=x=>[Buffer.from(o,"latin1"),x];
for(;;){
if(t==1e6||(q>>>0)>=p.length)return d(t==1e6?10:9);
let b=p[q],k=K.indexOf(String.fromCharCode(b+33));
if(k<0)return d(5);
let v=V.charCodeAt(k)-33,m=[0,1,2,4][v>>4],po=v>>2&3,pu=v&3;
if(q+m>=p.length)return d(9);
t++;
let x=q+1+m;
if(s<po||s-po+pu>256)return d(s<po?2:3);
q=x;
switch(b){
case 0:return d(0);
case 1:case 2:D[s++]=b==1?p.readInt8(x-1):p.readInt32LE(x-4);break;
case 3:s--;break;
case 4:case 6:D[s]=D[s-(b==4?1:2)];s++;break;
case 5:[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
case 7:[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
case 23:case 27:D[s-1]=b==23?-D[s-1]|0:~D[s-1];break;
case 48:case 49:case 50:if(b==48||(b==49)==!D[--s])q=x+p.readInt16LE(x-2);break;
case 51:
if(c==64)return d(7);
C[c++]=x;q=p[x-2]|p[x-1]<<8;break;
case 52:
if(!c)return d(8);
q=C[--c];break;
case 64:case 65:let a=D[s-1];if((a>>>0)>255)return d(6);b==64?D[s-1]=M[a]:(s-=2,M[a]=D[s]);break;
case 80:let v=String(D[--s]);if(o.length+v.length>65536)return d(11);o+=v;break;
case 81:
if(o.length>65535)return d(11);
o+=String.fromCharCode(D[--s]&255);break;
case 82:D[s++]=g<i.length?i[g++]:-1;break;
case 83:return d(D[--s]&255);
default:{
let y=D[s-1],a=D[s-2],r;
if(b<19)r=b==18?Math.imul(a,y):a+(b==16?y:-y)|0;
else if(b<21){if(!y)return d(4);r=b==19?a==-2147483648&&y==-1?a:a/y|0:y==-1?0:a%y|0}
else if(b<23){if(!y)return d(4);r=b==21?Math.floor((a>>>0)/(y>>>0))|0:(a>>>0)%(y>>>0)|0}
else if(b>27&&b<31)r=[a<<(y&31),a>>(y&31),a>>>(y&31)|0][b-28];
else if(b>31)r=b==32?a==y?1:0:b==33?a<y?1:0:(a>>>0)<(y>>>0)?1:0;
else r=[a&y,a|y,a^y][b-24];
s-=2;D[s++]=r;break}
}
}
};
for(let id of f.readdirSync(I)){
let J;
try{J=f.readFileSync(I+"/"+id+"/program.bin")}catch{continue}
let N;
try{N=f.readFileSync(I+"/"+id+"/input.bin")}catch{N=[]}
let [W,e]=R(J,N),Y=O+"/"+id;
f.mkdirSync(Y,{recursive:true});
f.writeFileSync(Y+"/stdout.bin",W);
f.writeFileSync(Y+"/exit.txt",e+"");
}
