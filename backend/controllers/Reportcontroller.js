const reportModel = require("../models");
const mongoose = require("mongoose");

const getReports = async (req, res) => {
  res.json({ mssg: "GET all reports" });
  const reports = reportModel.find({});
  res.status(200).json(reports);
};

// get a single report
const getReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such report" });
  }

  const report = await reportModel.findById(id);

  if (!report) {
    return res.status(404).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

const deleteReportByName = async (req, res) => {
  const { image } = req.params;
 

  const report = await reportModel.findOneAndDelete({ image:image});
  if (!report) {
    return res.status(404).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

// create a new report
const createReport = async (req, res) => {
  const { timestamp,status,image,notes,location } = req.body;

  let emptyFields = [];

  if (!timestamp) {
    emptyFields.push("timestamp");
  }
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
    const report = await reportModel.create({ timestamp,status,image,notes,location });
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a report
const deleteReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Report" });
  }

  const report = await reportModel.findOneAndDelete({ _id: id });

  if (!report) {
    return res.status(400).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

// update a report
const updateReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such report" });
  }

  const report = await reportModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!report) {
    return res.status(400).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

module.exports = {
  createReport,
  getReport,
  getReports,
  deleteReport,
  updateReport,
  deleteReportByName,
};
