const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const { validateLogin } = require("../utils/authValidator");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;