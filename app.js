Papa.parse("IMMATRICOLATO.csv", {
 
download: true,
header: true,
skipEmptyLines: true,
 
complete: function(results) {
 
const data = results.data;
 
document.getElementById("totale").innerHTML =
"<h2>Record caricati: " + data.length + "</h2>";
 
const colonne = Object.keys(data[0]);
 
const thead = document.querySelector("#tabella thead");
const tbody = document.querySelector("#tabella tbody");
 
let headerHtml = "<tr>";
 
colonne.forEach(c => {
headerHtml += "<th>" + c + "</th>";
});
 
headerHtml += "</tr>";
 
thead.innerHTML = headerHtml;
 
let righe = "";
 
data.slice(0,20).forEach(r => {
 
righe += "<tr>";
 
colonne.forEach(c => {
righe += "<td>" + (r[c] || "") + "</td>";
});
 
righe += "</tr>";
 
});
 
tbody.innerHTML = righe;
 
},
 
error: function(err){
alert("Errore CSV: " + err);
}
 
});
