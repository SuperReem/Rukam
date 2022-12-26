const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    timestamp:{
        type:String,
    },
    image: {
        type: String,
    },

  

},{timestamps: true});


module.exports = mongoose.model('Reports',reportSchema);;

