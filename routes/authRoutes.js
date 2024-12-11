const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const { validateLogin, validateRegister } = require("../services/authValidator");
const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;