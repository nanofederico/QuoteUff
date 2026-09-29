Papa.parse("data/immatricolato.csv", {
download: true,
header: true,
 
complete: function(results) {
 
const data = results.data;
 
document.getElementById("tiv").innerHTML = data.length;
 
const ivecoRows = data.filter(
r => r["Make Central B"] === "IVECO"
);
 
document.getElementById("iveco").innerHTML = ivecoRows.length;
 
const ms = (ivecoRows.length / data.length) * 100;
 
document.getElementById("ms").innerHTML =
ms.toFixed(2) + "%";
 
const brandCounts = {};
 
data.forEach(row => {
 
const brand = row["Make Central B"];
 
if (!brand) return;
 
if (!brandCounts[brand]) {
brandCounts[brand] = 0;
}
 
brandCounts[brand]++;
});
 
const labels = Object.keys(brandCounts);
const values = Object.values(brandCounts);
 
new Chart(
document.getElementById("brandChart"),
{
type: "bar",
 
data: {
labels: labels,
datasets: [{
label: "Immatricolazioni",
data: values
}]
},
 
options: {
responsive: true
}
}
);
}
});
