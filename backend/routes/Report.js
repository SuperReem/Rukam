const mongoose = require("mongoose");
const express = require("express");
const {
  createReport,
  getReport,
  getReports,
  updateReport,
  deleteReport,
} = require("../controllers/Reportcontroller");

const router = express.Router();
router.get("/", getReports);
router.get("/:id", getReport);
router.post("/", createReport);
router.delete("/:id", deleteReport);
router.patch("/:id", updateReport);

module.exports = router;
