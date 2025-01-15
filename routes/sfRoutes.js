const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createContact } = require("../controller/sfController");
const { sfLogin } = require("../middleware/sfAuth");
const router = express.Router();

router.route("/salesforce/contact")
  .post(protect, sfLogin, createContact)

module.exports = router;