const mongoose = require("mongoose");
const express = require("express");
const {
  createDetection,
  getDetection,
  getDetections,
  deleteDetection,
  updateDetection,
} = require("../controllers/DetectionController");



const requireAuth = require('../middleware/requireAuth')


const  router = express.Router();
router.use(requireAuth);
router.post("/", createDetection);
router.get("/detection", getDetections);
router.get("/:id", getDetection);
router.delete("/:id", deleteDetection);
router.patch("/:id", updateDetection);

module.exports = router;
