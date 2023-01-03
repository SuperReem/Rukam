const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dronesSchema = new Schema(
  {
    droneName: {
      type: String,
    },
    region: {
      type: String ,
      
    },
    image: {
      type: String,
    },
  },
  
);
module.exports = mongoose.model("Drones", dronesSchema);
