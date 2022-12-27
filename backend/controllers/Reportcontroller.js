const Report = require('../models');
const mongoose = require("mongoose");

const getReports = async (req,res) => {
    res.json({mssg: 'GET all reports'})
    const reports = Report.find({})
    res.status(200).json(reports)
}



// get a single report
const getReport = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such report'})
    }
  
    const report = await Report.findById(id)
  
    if (!report) {
      return res.status(404).json({error: 'No such report'})
    }
  
    res.status(200).json(report)
  }
  
  // create a new report
  const createReport = async (req, res) => {
    const {timestamp,image,} = req.body
  
    let emptyFields = []
  
    if (!timestamp) {
      emptyFields.push('timestamp')
    }
    if (!image) {
      emptyFields.push('image')
    }
   
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    // add to the database
    try {
      const report = await Report.create({ timestamp, image })
      res.status(200).json(report)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  
  // delete a report
  const deleteReport = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such Report'})
    }
  
    const report = await Report.findOneAndDelete({_id: id})
  
    if(!report) {
      return res.status(400).json({error: 'No such report'})
    }
  
    res.status(200).json(report)
  }
  
  // update a report
  const updateReport = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such report'})
    }
  
    const report = await Report.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!report) {
      return res.status(400).json({error: 'No such report'})
    }
  
    res.status(200).json(report)
  }
  
 

module.exports = {
    createReport,
    getReport,
    getReports,
    deleteReport,
    updateReport,

}