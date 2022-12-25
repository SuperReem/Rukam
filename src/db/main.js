const mongoose = require("mongoose");
const { Course } = require("./model.js");
mongoose.set("strictQuery", true);
// Connecting to database
mongoose
  .connect(
    "mongodb+srv://Nailah:0UUXTrBNuiKanCcC@cluster0.cgkke2f.mongodb.net/Rukam?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// Creating array of course data object
const courseData = [
  {
    name: "maha",
  },
];

// Inserting course data
Course.insertMany(courseData)
  .then((value) => {
    console.log("Saved Successfully");
  })
  .catch((error) => {
    console.log(error);
  });
