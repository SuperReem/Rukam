const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
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
    image: {
      type: String,
    },
    notes: {
      type: String,
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
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

module.exports = mongoose.model("Reports", reportSchema);
