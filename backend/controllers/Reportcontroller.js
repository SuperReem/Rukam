const reportModel = require("../models");
const mongoose = require("mongoose");

const getReports = async (req, res) => {
  const user_id = req.user._id; ///////check this
  const PAGE_SIZE = 3;
  var start = req.query.start || "All";
  var end = req.query.end || "All";
  const page = parseInt(req.query.page || "0");
  if ((start == "All") & (end == "All")) {
    const total = await reportModel.countDocuments({});
    const reports = await reportModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    // const total = await reportModel.countDocuments({});
    // const reports = await reportModel
    //   .find({user_id}) ///////check this
    //   .sort({ createdAt: -1 })
    //   .limit(PAGE_SIZE)
    //   .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      reports,
    });
  } else {
    const total = await reportModel.countDocuments({
      filter: { $gte: start },
      filter: { $lte: end },
    });

    const reports = await reportModel
      .find({})
      .where("filter")
      .gte(start)
      .lte(end)
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      reports,
    });
  }
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

  const report = await reportModel.findOneAndDelete({ image: image });
  if (!report) {
    return res.status(404).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

// create a new report
const createReport = async (req, res) => {
  const {
    reportId,
    timestamp,
    status,
    region,
    image,
    notes,
    location,
    filter,
  } = req.body;

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
    const user_id = req.user._id; ///////check this
    const report = await reportModel.create({
      reportId,
      timestamp,
      status,
      region,
      image,
      notes,
      location,
      filter,
      user_id, ///////check this
    });
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
