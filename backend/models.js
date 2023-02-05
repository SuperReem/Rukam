const { Binary } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    reportId: {
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
    street: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reports", reportSchema);
