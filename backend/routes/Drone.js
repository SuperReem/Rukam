const mongoose = require("mongoose");
const express = require("express");
const {
    createDrone,
    getDrone,
    getDrones,
    deleteDrone,
    updateDrone,
} = require("../controllers/DroneController");

const requireAuth = require('../middleware/requireAuth')


const  router = express.Router();

router.use(requireAuth);
router.get('/' ,getDrones);
router.get('/:id' ,getDrone);
router.post('/' ,createDrone);
router.delete('/:id' ,deleteDrone);
router.patch('/:id' ,updateDrone);

module.exports =router