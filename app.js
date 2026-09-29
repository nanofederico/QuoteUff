Papa.parse("data/immatricolato.csv",{
 
download:true,
header:true,
 
complete:function(results){
 
let data=results.data;
 
const currentYear=new Date().getFullYear();
const currentMonth=new Date().getMonth();
 
const ytd=data.filter(r=>{
 
const d=new Date(r["Tape Date"]);
 
return d.getFullYear()===currentYear &&
d.getMonth()<=currentMonth;
 
});
 
document.getElementById("tiv").innerHTML=ytd.length;
 
const iveco=ytd.filter(
r=>r["Make Central B"]==="IVECO"
).length;
 
const ms=(iveco/ytd.length)*100;
 
document.getElementById("ms").innerHTML=
ms.toFixed(2)+"%";
 
const makeCounts={};
 
ytd.forEach(r=>{
 
const make=r["Make Central B"];
 
if(!makeCounts[make])
makeCounts[make]=0;
 
makeCounts[make]++;
 
});
 
new Chart(
 
document.getElementById('brandChart'),
 
{
type:'bar',
 
data:{
labels:Object.keys(makeCounts),
datasets:[{
label:'Volume',
data:Object.values(makeCounts)
}]
}
}
 
);
 
}
 
});
