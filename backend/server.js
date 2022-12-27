const url = `mongodb+srv://Reem:aC42mnneZgxPksaf@cluster0.cgkke2f.mongodb.net/?retryWrites=true&w=majority`;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ReportRoutes = require("./routes/Report");
const DetectionRoute = require("./routes/Detection");

const connection_string = `mongodb+srv://Nailah:0UUXTrBNuiKanCcC@cluster0.cgkke2f.mongodb.net/Rukam?retryWrites=true&w=majority`;
//const port = process.env.PORT || 80

mongoose.set("strictQuery", true);
// middlewar
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/Report", ReportRoutes);
app.use("/api/Detection", DetectionRoute);

mongoose
  .connect(connection_string)
  .then(() => {
    console.log("MongoDB connection established.");
    app.listen(4000, () => {
      console.log("Server running on port 4000.");
    });
  })
  .catch((error) => console.error("MongoDB connection failed:", error.message));
