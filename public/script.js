const API = "http://localhost:3000";

/* BOOKING */
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

alert("Booking Successful!");
};
}

/* WORKER FORM */
if(document.getElementById("workerForm")){
document.getElementById("workerForm").onsubmit = async (e)=>{
e.preventDefault();

await fetch(API+"/apply-worker",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:wname.value,
phone:wphone.value,
skills:skills.value,
experience:experience.value,
lat:parseFloat(lat.value),
lng:parseFloat(lng.value)
})
});

alert("Application Submitted!");
};
}

/* MAP */
if(document.getElementById("map")){
const map = L.map('map').setView([20.5937,78.9629],5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function loadWorkers(){
const res = await fetch(API+"/workers-location");
const data = await res.json();

data.forEach(w=>{
L.marker([w.lat,w.lng]).addTo(map)
.bindPopup(w.name + " - " + w.skills);
});
}

loadWorkers();
setInterval(loadWorkers,5000);
}
