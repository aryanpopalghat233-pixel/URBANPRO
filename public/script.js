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

/* ADMIN LOGIN */
function login(){
if(user.value==="admin" && pass.value==="1234"){
loginBox.style.display="none";
document.getElementById("dashboard").classList.remove("hidden");
loadDashboard();
}
}

/* SWITCH SECTIONS */
function showSection(section){
document.querySelectorAll(".content").forEach(c=>c.classList.add("hidden"));
document.getElementById(section).classList.remove("hidden");
}

/* LOAD DASHBOARD */
async function loadDashboard(){
let bookings = await fetch(API+"/admin/bookings").then(r=>r.json());
let workers = await fetch(API+"/admin/workers").then(r=>r.json());

document.getElementById("totalBookings").innerText = bookings.length;
document.getElementById("totalWorkers").innerText = workers.length;

loadBookings();
loadWorkers();
}

/* LOAD BOOKINGS TABLE */
async function loadBookings(){
let data = await fetch(API+"/admin/bookings").then(r=>r.json());

bookingTable.innerHTML = data.map(x=>`
<tr>
<td>${x.name}</td>
<td>${x.service}</td>
<td>${x.phone}</td>
<td><button onclick="delB('${x._id}')">Delete</button></td>
</tr>
`).join("");
}

/* LOAD WORKERS TABLE */
async function loadWorkers(){
let data = await fetch(API+"/admin/workers").then(r=>r.json());

workerTable.innerHTML = data.map(x=>`
<tr>
<td>${x.name}</td>
<td>${x.skills}</td>
<td>${x.phone}</td>
<td><button onclick="delW('${x._id}')">Delete</button></td>
</tr>
`).join("");
}

/* DELETE */
function delB(id){
fetch(API+"/admin/delete-booking/"+id,{method:"DELETE"}).then(loadDashboard);
}

function delW(id){
fetch(API+"/admin/delete-worker/"+id,{method:"DELETE"}).then(loadDashboard);
}  

loadWorkers();
setInterval(loadWorkers,5000);
}
/* SERVICES DATA */
const servicesData = [
{category:"Cleaning", name:"Home Cleaning"},
{category:"Cleaning", name:"Deep Cleaning"},
{category:"Cleaning", name:"Sofa Cleaning"},

{category:"Plumbing", name:"Leak Fix"},
{category:"Plumbing", name:"Pipe Install"},
{category:"Plumbing", name:"Drain Cleaning"},

{category:"Electrician", name:"Wiring"},
{category:"Electrician", name:"Fan Repair"},
{category:"Electrician", name:"Light Install"},

{category:"Beauty", name:"Facial"},
{category:"Beauty", name:"Haircut"},
{category:"Beauty", name:"Makeup"},

{category:"AC Repair", name:"AC Service"},
{category:"AC Repair", name:"Gas Refill"},
{category:"AC Repair", name:"Installation"}
];

/* LOAD SERVICES */
if(document.getElementById("serviceList")){
renderServices(servicesData);

searchService.oninput = filterServices;
categoryFilter.onchange = filterServices;
}

function renderServices(data){
serviceList.innerHTML = data.map(s=>`
<div class="card">
<h3>${s.name}</h3>
<p>${s.category}</p>
<a href="booking.html" class="btn">Book</a>
</div>
`).join("");
}

/* FILTER LOGIC */
function filterServices(){
let search = searchService.value.toLowerCase();
let category = categoryFilter.value;

let filtered = servicesData.filter(s =>
(s.name.toLowerCase().includes(search)) &&
(category ? s.category === category : true)
);

renderServices(filtered);
}
/* SERVICES DATA */
const servicesData = [
{category:"Cleaning", name:"Home Cleaning"},
{category:"Cleaning", name:"Deep Cleaning"},
{category:"Cleaning", name:"Sofa Cleaning"},

{category:"Plumbing", name:"Leak Fix"},
{category:"Plumbing", name:"Pipe Install"},
{category:"Plumbing", name:"Drain Cleaning"},

{category:"Electrician", name:"Wiring"},
{category:"Electrician", name:"Fan Repair"},
{category:"Electrician", name:"Light Install"},

{category:"Beauty", name:"Facial"},
{category:"Beauty", name:"Haircut"},
{category:"Beauty", name:"Makeup"},

{category:"AC Repair", name:"AC Service"},
{category:"AC Repair", name:"Gas Refill"},
{category:"AC Repair", name:"Installation"}
];

/* LOAD SERVICES */
if(document.getElementById("serviceList")){
renderServices(servicesData);

searchService.oninput = filterServices;
categoryFilter.onchange = filterServices;
}

function renderServices(data){
serviceList.innerHTML = data.map(s=>`
<div class="card" onclick="openService('${s.name}','${s.category}')">
<h3>${s.name}</h3>
<p>${s.category}</p>
<button class="btn">View Details</button>
</div>
`).join("");
}

/* FILTER LOGIC */
function filterServices(){
let search = searchService.value.toLowerCase();
let category = categoryFilter.value;

let filtered = servicesData.filter(s =>
(s.name.toLowerCase().includes(search)) &&
(category ? s.category === category : true)
);

renderServices(filtered);
}
function openService(name, category){
localStorage.setItem("serviceName", name);
localStorage.setItem("serviceCategory", category);
window.location.href = "service-detail.html";
}
/* SERVICE DETAILS DATA */
const serviceDetails = {
"Home Cleaning": "Complete cleaning of your home including rooms, kitchen and bathroom.",
"Deep Cleaning": "Intensive cleaning with advanced tools and chemicals.",
"Sofa Cleaning": "Professional sofa shampooing and stain removal.",

"Leak Fix": "Fix all types of water leakage problems.",
"Pipe Install": "Installation of new pipes and fittings.",
"Drain Cleaning": "Remove blockages and clean drainage system.",

"Wiring": "Complete house wiring and repair.",
"Fan Repair": "Fix ceiling and table fans.",
"Light Install": "Installation of lights and fixtures.",

"Facial": "Professional skincare and facial treatment.",
"Haircut": "Stylish haircut at home.",
"Makeup": "Party and bridal makeup service.",

"AC Service": "Regular AC maintenance and cleaning.",
"Gas Refill": "Refill AC gas for cooling efficiency.",
"Installation": "AC installation service at home."
};

/* LOAD DETAIL PAGE */
if(document.getElementById("serviceTitle")){
let name = localStorage.getItem("serviceName");
let category = localStorage.getItem("serviceCategory");

serviceTitle.innerText = name;
serviceCategory.innerText = category;
serviceDesc.innerText = serviceDetails[name] || "High quality professional service.";
}
