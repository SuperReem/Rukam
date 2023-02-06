const droneModel = require("../DronesModel");

const mongoose = require("mongoose");

const getDrones = async (req, res) => {
  const PAGE_SIZE = 8;
  const page = parseInt(req.query.page || "0");
  const total = await droneModel.countDocuments({});
  const drones = await droneModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);

  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    drones,
  });
};

const getAllDrones = async (req, res) => {
  const drones = await droneModel.find({});
  res.json({
    drones,
  });
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

//get only active drones list
const getActiveList = async (req, res) => {
  const drones = await droneModel
    .find({ active: true })
    .sort({ createdAt: -1 })
    .limit(2);
  res.json(drones);
};
// create a new drone
const createDrone = async (req, res) => {
  const { droneName, image, region } = req.body;
  
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

  var found = true;
  
   
    const Dr = await droneModel.findOne({ droneName: droneName.toLowerCase() });
   
    if (!Dr) {
      found = false;
    } else{
    return res
      .status(401)
      .json({ error: "name already exist" });
  }
  // add drone to the database
  if(!found){
  try {
    const drone = await droneModel.create({ droneName, region, image });
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }}
};

//get active drones
const activeDrone = async (req, res) => {
  const drones = await droneModel.find({ active: true });
  const total = await droneModel.countDocuments({ active: true });
  res.json({
    drones,
    total,
  });
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
  activeDrone,
  getActiveList,
  getAllDrones,
};
