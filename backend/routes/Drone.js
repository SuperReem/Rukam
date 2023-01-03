const mongoose = require("mongoose");
const express = require("express");
const {
    createDrone,
    getDrone,
    getDrones,
    deleteDrone,
    updateDrone,
} = require("../controllers/DroneController");



const  router = express.Router();
router.get('/' ,getDrones);
router.get('/:id' ,getDrone);
router.post('/' ,createDrone);
router.delete('/:id' ,deleteDrone);
router.patch('/:id' ,updateDrone);

module.exports =router