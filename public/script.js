const API = "http://localhost:3000";

if(document.getElementById("bookingForm")){
document.getElementById("bookingForm").onsubmit = async (e)=>{
e.preventDefault();

await fetch(API+"/book-service",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:name.value,
phone:phone.value,
address:address.value,
service:service.value,
subservice:subservice.value,
datetime:datetime.value
})
});

alert("Booked!");
};
}

if(document.getElementById("map")){
const map = L.map('map').setView([20.5937,78.9629],5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function loadWorkers(){
const res = await fetch(API+"/workers-location");
const data = await res.json();

data.forEach(w=>{
L.marker([w.lat,w.lng]).addTo(map)
.bindPopup(w.name);
});
}

loadWorkers();
setInterval(loadWorkers,5000);
}

function login(){
if(user.value=="admin" && pass.value=="1234"){
dashboard.style.display="block";
loadAdmin();
}
}

async function loadAdmin(){
let b = await fetch(API+"/admin/bookings").then(r=>r.json());
let w = await fetch(API+"/admin/workers").then(r=>r.json());

bookings.innerHTML = b.map(x=>`<li>${x.name} <button onclick="delB('${x._id}')">X</button></li>`).join("");

workers.innerHTML = w.map(x=>`<li>${x.name} <button onclick="delW('${x._id}')">X</button></li>`).join("");
}

function delB(id){
fetch(API+"/admin/delete-booking/"+id,{method:"DELETE"}).then(loadAdmin);
}

function delW(id){
fetch(API+"/admin/delete-worker/"+id,{method:"DELETE"}).then(loadAdmin);
}
