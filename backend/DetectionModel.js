const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const detectionSchema = new Schema(
  {
    droneId: {
      type: String,
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    region: {
      type: String,
    },
    time: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Detections", detectionSchema);
