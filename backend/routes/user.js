
const express = require('express')

const { loginUser, signupUser, forgotPassword, resetPassword, changePassword } = require('../controllers/UserController')

//


const  router = express.Router();

router.post('/login', loginUser)
router.post('/signup', signupUser)
//
// router.put('/forgotPassword', forgotPassword)
// router.put('/resetPassword', resetPassword)


// send email Link For reset Password
router.post('/forgotPassword',forgotPassword);
// verify user for forgot password time
router.get("/resetPassword/:id/:token",resetPassword);


// change password
router.post("/:id/:token",changePassword)





module.exports = router