const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    timestamp: {
      type: String,
    },
    status:{
        type: String,  
    },
    image: {
      type: String,
    },
    notes: {
        type: String,
      },
      location:{

            type: String,

      }
  },

);

module.exports = mongoose.model("Reports", reportSchema);
