
/////
const express = require('express')

// controller functions
// const { loginUser } = require('../controllers/UserController')

const { loginUser, signupUser } = require('../controllers/UserController')



const  router = express.Router();
router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router