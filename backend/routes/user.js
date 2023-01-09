
/////
const express = require('express')

// controller functions
// const { loginUser } = require('../controllers/UserController')

const { loginUser, signupUser, forgotPassword , resetPassword} = require('../controllers/UserController')



const  router = express.Router();
router.post('/login', loginUser)
router.post('/signup', signupUser)

router.put('/forgotPassword', forgotPassword)
router.put('/resetPassword', resetPassword)

module.exports = router