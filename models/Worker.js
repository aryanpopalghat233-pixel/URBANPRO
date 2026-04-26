const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  skills: String,
  experience: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model("Worker", WorkerSchema);
