const mongoose = require("mongoose");
const express = require("express");
const {
  createReport,
  getReport,
  getReports,
  updateReport,
  deleteReport,
  deleteReportByName,
} = require("../controllers/Reportcontroller");

// const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
// router.use(requireAuth);
router.get("/report", getReports);
router.get("/:id", getReport);
router.post("/", createReport);
router.delete("/:id", deleteReport);
router.patch("/:id", updateReport);
router.delete("/R/:image", deleteReportByName);
module.exports = router;
