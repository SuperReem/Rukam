const detectionModel = require("../DetectionModel");
const mongoose = require("mongoose");

// get all detection
const getDetections = async (req, res) => {
  const detections = await detectionModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(detections);
};

// get a single detection
const getDetection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such detection" });
  }

  const detection = await detectionModel.findById(id);

  if (!detection) {
    return res.status(404).json({ error: "No such detection" });
  }

  res.status(200).json(detection);
};

// create a new detection
const createDetection = async (req, res) => {
  const { droneId, location, region, time, image } = req.body;

  let emptyFields = [];

  if (!image) {
    emptyFields.push("image");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const detection = await detectionModel.create({
      droneId,
      location,
      region,
      time,
      image,
    });
    res.status(200).json(detection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a detection
const deleteDetection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such detection" });
  }

  const detection = await detectionModel.findOneAndDelete({ _id: id });

  if (!detection) {
    return res.status(400).json({ error: "No such detection" });
  }

  res.status(200).json(detection);
};

// update a detection
const updateDetection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such detection" });
  }

  const detection = await detectionModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!detection) {
    return res.status(400).json({ error: "No such detection" });
  }

  res.status(200).json(detection);
};

module.exports = {
  createDetection,
  getDetection,
  getDetections,
  deleteDetection,
  updateDetection,
};
