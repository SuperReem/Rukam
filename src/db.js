const url = `mongodb+srv://Reem:aC42mnneZgxPksaf@cluster0.cgkke2f.mongodb.net/?retryWrites=true&w=majority`;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const connection_string = `mongodb+srv://Nailah:0UUXTrBNuiKanCcC@cluster0.cgkke2f.mongodb.net/?retryWrites=true&w=majority`;
//const port = process.env.PORT || 80
mongoose.set("strictQuery", true);
app.get("/", (req, res) => {
  res.send("Welcome to our ToDo");
});

app.listen(80, () => {
  console.log("Server running on port 80.");
});

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
