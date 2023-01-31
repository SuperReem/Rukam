const reportModel = require("../models");
const mongoose = require("mongoose");

const getReports = async (req, res) => {
  const PAGE_SIZE = 3;
  var start = req.query.start || "All";
  var end = req.query.end || "All";
  const page = parseInt(req.query.page || "0");
  if ((start == "All") & (end == "All")) {
    const totalUnsent = await reportModel.countDocuments({ status: "unsent" });
    const totalClosed = await reportModel.countDocuments({ status: "closed" });
    const totalPending = await reportModel.countDocuments({
      status: "pending",
    });
    const totalUnderproc = await reportModel.countDocuments({
      status: "under_processing",
    });

    const total = await reportModel.countDocuments({});
    const reports = await reportModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      reports,
      totalClosed,
      totalPending,
      totalUnderproc,
      totalUnsent,
    });
  } else {
    const total = await reportModel.countDocuments({
      filter: { $gte: start, $lte: end },
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

//get dashboared employee

const getDashEmp = async (req, res) => {
  var region = req.query.region;
  const total = await reportModel.countDocuments({
    region: region,
    status: { $in: ["closed", "pending", "under_processing"] },
  });
  const reports = await reportModel
    .find({
      region: region,
      status: { $in: ["closed", "pending", "under_processing"] },
    })
    .sort({ createdAt: -1 })
    .limit(3);

  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay();
  var firstdayOb = new Date(curr.setDate(first));
  var firstday = firstdayOb.toISOString().slice(0, 10);
  var firstdayTemp = firstdayOb;
  var lastday = new Date(firstdayTemp.setDate(firstdayTemp.getDate() + 6))
    .toISOString()
    .slice(0, 10);
  const totalWeek = await reportModel.countDocuments({
    region: region,
    filter: { $gte: firstday, $lte: lastday },
  });

  const totalClosed = await reportModel.countDocuments({
    region: region,
    status: "closed",
  });
  const totalPending = await reportModel.countDocuments({
    region: region,
    status: "pending",
  });
  const totalUnderproc = await reportModel.countDocuments({
    region: region,
    status: "under_processing",
  });
  res.json({
    reports,
    total,
    totalWeek,
    totalClosed,
    totalPending,
    totalUnderproc,
  });
};

const getReportsEmployee = async (req, res) => {
  const PAGE_SIZE = 3;
  var start = req.query.start || "All";
  var end = req.query.end || "All";
  var region = req.query.region;
  const page = parseInt(req.query.page || "0");
  if ((start == "All") & (end == "All")) {
    const total = await reportModel.countDocuments({
      region: region,
      status: { $in: ["closed", "pending", "under_processing"] },
    });
    const reports = await reportModel
      .find({
        region: region,
        status: { $in: ["closed", "pending", "under_processing"] },
      })
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      reports,
    });
  } else {
    const total = await reportModel.countDocuments({
      filter: { $gte: start, $lte: end },
      region: region,
      status: { $in: ["closed", "pending", "under_processing"] },
    });

    const reports = await reportModel
      .find({
        region: region,
        status: { $in: ["closed", "pending", "under_processing"] },
      })
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
    // const user_id = req.user._id; ///////check this
    const report = await reportModel.create({
      reportId,
      timestamp,
      status,
      region,
      image,
      notes,
      location,
      filter,
      // user_id, ///////check this
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

//get number of reports in this week

const getWeekreports = async (req, res) => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay();
  var firstdayOb = new Date(curr.setDate(first));
  var firstday = firstdayOb.toISOString().slice(0, 10);
  var firstdayTemp = firstdayOb;
  var lastday = new Date(firstdayTemp.setDate(firstdayTemp.getDate() + 6))
    .toISOString()
    .slice(0, 10);
  const total = await reportModel.countDocuments({
    filter: { $gte: firstday, $lte: lastday },
  });
  res.json({
    total,
    firstday,
    lastday,
  });
};

// update a report
const updateReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such report" });
  }

  const report = await reportModel.findOneAndUpdate(
    { _id: id },

    req.body,
    { new: true }
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
  getReportsEmployee,
  getWeekreports,
  getDashEmp,
};
