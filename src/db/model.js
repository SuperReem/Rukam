// Requiring module
const mongoose = require("mongoose");

// Course Modal Schema
const courseSchema = new mongoose.Schema({
  _id: Number,
  name: String,
});

// Creating model objects
const Course = mongoose.model("course", courseSchema);

// Exporting our model objects
module.exports = {
  Course,
};
