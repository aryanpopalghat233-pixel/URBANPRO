const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  service: String,
  subservice: String,
  datetime: String
});

module.exports = mongoose.model("Booking", BookingSchema);
