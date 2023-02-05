const detectionModel = require("../DetectionModel");
const mongoose = require("mongoose");

// get all detection
const getDetections = async (req, res) => {
  const PAGE_SIZE = 8;
  var start = req.query.start || "All";
  var end = req.query.end || "All";
  const page = parseInt(req.query.page || "0");
  if ((start == "All") & (end == "All")) {
    const detections = await detectionModel
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d %H:%M",
                date: "$createdAt",
              },
            },
            doc: {
              $first: "$$ROOT",
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: "$doc",
          },
        },
      ])
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(detections.length / PAGE_SIZE),
      detections,
    });
    console.log(detections.length);
  } else {
    const detections = await detectionModel
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d %H:%M",
                date: "$createdAt",
              },
            },
            doc: {
              $first: "$$ROOT",
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: "$doc",
          },
        },
        {
          $match: {
            filter: {
              $gte: start,
              $lte: end,
            },
          },
        },
      ])
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    res.json({
      totalPages: Math.ceil(detections.length / PAGE_SIZE),
      detections,
    });
    console.log(detections.length);
  }
};

//get highest region detection

const getHighest = async (req, res) => {
  const detections = await detectionModel.aggregate([
    { $unwind: "$region" },
    {
      $group: {
        _id: "$region",
        count: { $sum: 1 }, // get the count
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  res.json({
    detections,
  });
};

//get number of detection in this week

const getWeekdetections = async (req, res) => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay();
  var firstdayOb = new Date(curr.setDate(first));
  var firstday = firstdayOb.toISOString().slice(0, 10);
  var firstdayTemp = firstdayOb;
  var lastday = new Date(firstdayTemp.setDate(firstdayTemp.getDate() + 6))
    .toISOString()
    .slice(0, 10);
  const total = await detectionModel.countDocuments({
    filter: { $gte: firstday, $lte: lastday },
  });
  res.json({
    total,
    firstday,
    lastday,
  });
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
  const { droneName, location, region, image, filter } = req.body;

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
      droneName,
      location,
      region,
      image,
      filter,
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
  getHighest,
  getWeekdetections,
};
