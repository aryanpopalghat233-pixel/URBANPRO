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

{category:"Cleaning", name:"Home Cleaning", price:999, img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952"},
{category:"Cleaning", name:"Deep Cleaning", price:1499, img:"https://images.unsplash.com/photo-1603712725038-e9334ae8f39f"},
{category:"Cleaning", name:"Sofa Cleaning", price:799, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc"},

{category:"Plumbing", name:"Leak Fix", price:299, img:"https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8"},
{category:"Plumbing", name:"Pipe Install", price:599, img:"https://images.unsplash.com/photo-1607472586893-edb57bdc0e39"},
{category:"Plumbing", name:"Drain Cleaning", price:399, img:"https://images.unsplash.com/photo-1621905251918-48416bd8575a"},

{category:"Electrician", name:"Wiring", price:699, img:"https://images.unsplash.com/photo-1581091215367-59ab6b6a3d72"},
{category:"Electrician", name:"Fan Repair", price:249, img:"https://images.unsplash.com/photo-1593941707882-a5bac6861d75"},
{category:"Electrician", name:"Light Install", price:199, img:"https://images.unsplash.com/photo-1509395176047-4a66953fd231"},

{category:"Beauty", name:"Facial", price:499, img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348"},
{category:"Beauty", name:"Haircut", price:299, img:"https://images.unsplash.com/photo-1517832606299-7ae9b720a186"},
{category:"Beauty", name:"Makeup", price:999, img:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"},

{category:"AC Repair", name:"AC Service", price:599, img:"https://images.unsplash.com/photo-1581093458791-9f3c3900dfad"},
{category:"AC Repair", name:"Gas Refill", price:1499, img:"https://images.unsplash.com/photo-1581093588401-22f3d6f0b1f6"},
{category:"AC Repair", name:"Installation", price:1299, img:"https://images.unsplash.com/photo-1604147706283-1f84a0a0c8f2"}

];

/* LOAD SERVICES */
if(document.getElementById("serviceList")){
renderServices(servicesData);

searchService.oninput = filterServices;
categoryFilter.onchange = filterServices;
}

function renderServices(data){
serviceList.innerHTML = data.map(s=>`
<div class="service-card" onclick="openService('${s.name}','${s.category}')">

<img src="${s.img}" class="service-img"/>

<div class="service-info">
<h3>${s.name}</h3>
<p>${s.category}</p>

<div class="price-row">
<span class="price">₹${s.price}</span>
<button class="btn small">View</button>
</div>

</div>

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
/* SEARCH DATA */
const searchData = [
"Home Cleaning","Deep Cleaning","Sofa Cleaning",
"Plumbing","Leak Fix","Pipe Install",
"Electrician","Fan Repair","Light Install",
"Beauty","Facial","Haircut",
"AC Repair","Gas Refill","Installation"
];

/* SEARCH LOGIC */
if(document.getElementById("searchInput")){
searchInput.oninput = function(){
let value = this.value.toLowerCase();

if(!value){
suggestions.style.display = "none";
return;
}

let filtered = searchData.filter(s=>s.toLowerCase().includes(value));

suggestions.innerHTML = filtered.map(s=>`
<div onclick="selectService('${s}')">${s}</div>
`).join("");

suggestions.style.display = "block";
};
}

function selectService(name){
localStorage.setItem("serviceName", name);
window.location.href = "service-detail.html";
}

/* CATEGORY CLICK */
function goService(service){
localStorage.setItem("selectedCategory", service);
window.location.href = "services.html";
}

/* BANNER SLIDER */
const banners = [
"https://images.unsplash.com/photo-1581578731548-c64695cc6952",
"https://images.unsplash.com/photo-1603712725038-e9334ae8f39f",
"https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
];

let i = 0;
setInterval(()=>{
if(document.getElementById("bannerImg")){
i = (i+1)%banners.length;
bannerImg.src = banners[i];
}
},3000);
