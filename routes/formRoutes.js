const express = require("express");
const { createForm, getForm } = require("../controller/formController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/form")
  .post(protect, createForm)

router.route("/form/:id")
  .get(protect, getForm)

module.exports = router;