const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const Booking = require("./models/Booking");
const Worker = require("./models/Worker");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.post("/book-service", async (req,res)=>{
  const data = await Booking.create(req.body);
  res.json(data);
});

app.post("/apply-worker", async (req,res)=>{
  const data = await Worker.create(req.body);
  res.json(data);
});

app.get("/admin/bookings", async (req,res)=>{
  const data = await Booking.find();
  res.json(data);
});

app.get("/admin/workers", async (req,res)=>{
  const data = await Worker.find();
  res.json(data);
});

app.delete("/admin/delete-booking/:id", async (req,res)=>{
  await Booking.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.delete("/admin/delete-worker/:id", async (req,res)=>{
  await Worker.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.get("/workers-location", async (req,res)=>{
  const workers = await Worker.find();
  res.json(workers);
});

app.listen(3000, ()=>console.log("Server running on 3000"));
