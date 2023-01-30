const mongoose = require("mongoose");
const express = require("express");
const {
  createDrone,
  getDrone,
  getDrones,
  deleteDrone,
  updateDrone,
  activeDrone,
  getActiveList,
} = require("../controllers/DroneController");

const router = express.Router();

router.get("/drones", getDrones);
router.get("/active", activeDrone);
router.get("/activeList", getActiveList);
router.get("/:id", getDrone);
router.post("/", createDrone);
router.delete("/:id", deleteDrone);
router.patch("/:id", updateDrone);

module.exports = router;
