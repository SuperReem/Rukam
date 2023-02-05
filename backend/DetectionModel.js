const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const detectionSchema = new Schema(
  {
    droneName: {
      type: String,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    region: {
      type: String,
    },
    image: {
      type: String,
    },
    filter: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Detections", detectionSchema);
