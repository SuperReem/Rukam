const { Binary } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    droneId: {
      type: String,
    },
    reportId: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    status: {
      type: String,
    },
    region: {
      type: String,
    },
    image: { contentType: String },
    notes: {
      type: String,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    filter: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reports", reportSchema);
