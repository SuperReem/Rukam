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
    filter: {
      type: String,
    },
    // user_id: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Detections", detectionSchema);
