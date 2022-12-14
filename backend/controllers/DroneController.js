const droneModel = require("../DronesModel");

const mongoose = require("mongoose");

const getDrones = async (req, res) => {
  const drones = await droneModel.find({});
  res.status(200).json(drones);
};

// get a single drone
const getDrone = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such drone" });
  }

  const drone = await droneModel.findById(id);

  if (!drone) {
    return res.status(404).json({ error: "No such drone" });
  }

  res.status(200).json(drone);
};



// create a new drone
const createDrone = async (req, res) => {
  const { droneName,image,region } = req.body;

  let emptyFields = [];

  if (!droneName) {
    emptyFields.push("droneName");
  }
  if (!image) {
    emptyFields.push("image");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add drone to the database
  try {
    const drone = await droneModel.create({ droneName,region,image});
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a drone
const deleteDrone = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Drone" });
  }

  const drone = await droneModel.findOneAndDelete({ _id: id });

  if (!drone) {
    return res.status(400).json({ error: "No such drone" });
  }

  res.status(200).json(drone);
};

// update a drone
const updateDrone = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such drone" });
  }

  const drone = await droneModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!drone) {
    return res.status(400).json({ error: "No such drone" });
  }

  res.status(200).json(drone);
};

module.exports = {
  createDrone,
  getDrone,
  getDrones,
  deleteDrone,
  updateDrone,
  
};
