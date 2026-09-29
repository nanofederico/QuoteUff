Papa.parse("IMMATRICOLATO.csv", {
 
download: true,
header: true,
skipEmptyLines: true,
 
complete: function(res) {
 
const data = res.data;
 
const currentYear =
Math.max(
...data.map(r =>
new Date(r["Tape Date"]).getFullYear()
)
);
 
const previousYear =
currentYear - 1;
 
const currentMonth =
new Date().getMonth();
 
function getYTD(year){
 
return data.filter(r => {
 
const d = new Date(r["Tape Date"]);
 
return d.getFullYear() === year
&& d.getMonth() <= currentMonth;
 
});
 
}
 
const cy = getYTD(currentYear);
const py = getYTD(previousYear);
 
const tivCY = cy.length;
const tivPY = py.length;
 
const ivecoCY =
cy.filter(r =>
r["Make Central b"] === "IVECO"
).length;
 
const ivecoPY =
py.filter(r =>
r["Make Central b"] === "IVECO"
).length;
 
const msCY =
(ivecoCY / tivCY) * 100;
 
const msPY =
(ivecoPY / tivPY) * 100;
 
document.getElementById("tivCY").innerHTML =
tivCY;
 
document.getElementById("tivPY").innerHTML =
tivPY;
 
document.getElementById("msCY").innerHTML =
msCY.toFixed(1) + "%";
 
document.getElementById("msPY").innerHTML =
msPY.toFixed(1) + "%";
 
document.getElementById("deltaMS").innerHTML =
(msCY-msPY).toFixed(1)+" pt";
 
buildDistrictTable(cy,py);
 
buildCompetitorChart(cy);
 
}
 
});
 
function buildDistrictTable(cy,py){
 
const tbody =
document.querySelector("#districtTable tbody");
 
const districts =
[...new Set(cy.map(x=>x["District"]))];
 
districts.forEach(district=>{
 
const cyRows =
cy.filter(r=>r["District"]===district);
 
const pyRows =
py.filter(r=>r["District"]===district);
 
const tivCY =
cyRows.length;
 
const tivPY =
pyRows.length;
 
const msCY =
cyRows.filter(
r=>r["Make Central b"]==="IVECO"
).length/tivCY*100;
 
const msPY =
pyRows.filter(
r=>r["Make Central b"]==="IVECO"
).length/(tivPY||1)*100;
 
const tr =
document.createElement("tr");
 
tr.innerHTML=`
<td>${district}</td>
<td>${tivCY}</td>
<td>${tivPY}</td>
<td>${((tivCY-tivPY)/(tivPY||1)*100).toFixed(1)}%</td>
<td>${msCY.toFixed(1)}%</td>
<td>${msPY.toFixed(1)}%</td>
<td>${(msCY-msPY).toFixed(1)}</td>
`;
 
tbody.appendChild(tr);
 
});
 
}
 
function buildCompetitorChart(cy){
 
const brandCounts={};
 
cy.forEach(r=>{
 
const brand=r["Make Central b"];
 
if(!brand) return;
 
brandCounts[brand] =
(brandCounts[brand] || 0)+1;
 
});
 
new Chart(
 
document.getElementById("brandChart"),
 
{
type:"bar",
 
data:{
labels:Object.keys(brandCounts),
 
datasets:[{
label:"TIV YTD",
data:Object.values(brandCounts)
}]
}
});
 
}
