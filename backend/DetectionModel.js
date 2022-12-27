const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const detectionSchema = new Schema(
  {
    timestamp: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Detections", detectionSchema);
