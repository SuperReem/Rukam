const express = require("express");

const {
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/UserController");

const router = express.Router();
router.post("/login", loginUser);

router.put("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);

module.exports = router;
