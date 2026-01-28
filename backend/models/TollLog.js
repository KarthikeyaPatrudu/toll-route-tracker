const mongoose = require("mongoose");

const TollLogSchema = new mongoose.Schema({
  vehicleRegNo: String,
  readerReadTime: Date,
  latitude: Number,
  longitude: Number,
  tollPlazaName: String,
  laneDirection: String,
  vehicleType: String,
});

module.exports = mongoose.model("TollLog", TollLogSchema);
