const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dronesSchema = new Schema(
  {
    droneName: {
      type: String,
    },
    region: {
      type: String,
    },
    image: new mongoose.Schema({
      myFile : String
  }),

    active: {
      type: Boolean,
    },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
     visitedLocations: [{ lat: { type: Number }, lng: { type: Number } }],
  },

  { timestamps: true }
);
module.exports = mongoose.model("Drones", dronesSchema);
