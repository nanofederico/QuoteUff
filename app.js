Papa.parse("IMMATRICOLATO.csv", {
download: true,
header: true,
skipEmptyLines: true,
 
complete: function(results) {
 
const data = results.data;
 
document.getElementById("totale").innerHTML =
"<h2>Record caricati: " + data.length + "</h2>";
 
if(data.length === 0){
return;
}
 
const colonne = Object.keys(data[0]);
 
let headerHtml = "<tr>";
 
colonne.forEach(col => {
headerHtml += "<th>" + col + "</th>";
});
 
headerHtml += "</tr>";
 
document.querySelector("#tabella thead").innerHTML = headerHtml;
 
let bodyHtml = "";
 
data.slice(0,20).forEach(riga => {
 
bodyHtml += "<tr>";
 
colonne.forEach(col => {
bodyHtml += "<td>" + (riga[col] || "") + "</td>";
});
 
bodyHtml += "</tr>";
});
 
document.querySelector("#tabella tbody").innerHTML = bodyHtml;
}
});
