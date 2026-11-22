import f from"fs"
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env
let r=p=>f.existsSync(p)?f.readFileSync(p):0
let R=(p,i)=>{
let D=[],C=[],M=[],o="",s=0,c=0,q=0,t=0,g=0,a,y,v,r,L=p.length
for(;;){
if(++t>1e6||q<0|q>=L)return[o,9+(t>1e6)]
let b=p[q];v=`!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%"%`.charCodeAt(b)-33
if(!(v>=0))return[o,5]
let m=v>>4,po=v/4&3,pu=v&3
if((q+=1+m)>L)return[o,9]
if(s<po|s+pu>256+po)return[o,s<po?2:3]
if(b%83<1)return[o,b?D[--s]&255:0]
else if(b<3)D[s++]=p.readIntLE(q-m,m)
else if(b<4)s--
else if(b==4|b==6)D[s]=D[s-2+(b<5)],s++
else if(b<6)[D[s-1],D[s-2]]=[D[s-2],D[s-1]]
else if(b<8)[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]]
else if(b==23|b==27)D[s-1]=~D[s-1]+(b<24)|0
else if(b>47&b<51){if(b<49||b<50==!D[--s])q+=p.readInt16LE(q-2)}
else if(b==51){if(c>63)return[o,7];C[c++]=q,q=p[q-2]|p[q-1]<<8}
else if(b==52){if(!c)return[o,8];q=C[--c]}
else if(b>63&b<66){a=D[s-1];if(a>>>8)return[o,6];b<65?D[s-1]=M[a]|0:M[a]=D[s-=2]}
else if(b>79&b<82){v=b<81?D[--s]:String.fromCharCode(D[--s]);if(o.length+(v+"").length>65536)return[o,11];o+=v}
else if(b>81)D[s++]=i[g++]??-1
else{
y=D[s-1],a=D[s-2]
if(b<19)r=[a+y|0,a-y|0,Math.imul(a,y)][b-16]
else if(b<23){if(!y)return[o,4];r=b<21?b<20?a/y|0:a%y|0:(a>>>=0,y>>>=0,(b<22?a/y:a%y)|0)}
else if(b>27&b<31)r=(y&=31,[a<<y,a>>y,a>>>y|0][b-28])
else if(b>31)r=+(b<33?a==y:b<34?a<y:(a>>>0)<(y>>>0))
else r=[a&y,a|y,a^y][b-24]
D[s-2]=r,s--}
}
}
f.readdirSync(I).map(id=>{
let P=I+"/"+id,J=r(P+"/program.bin")
if(!J)return
let N=r(P+"/input.bin")||[]
let [W,e]=R(J,N),Y=O+"/"+id
f.mkdirSync(Y,{recursive:!0})
f.writeFileSync(Y+"/stdout.bin",W,"latin1")
f.writeFileSync(Y+"/exit.txt",e+"")
})
