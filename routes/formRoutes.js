const express = require("express");
const { createForm, getForm, updateForm } = require("../controller/formController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const checkFormResponseAccess = require("../middleware/formMiddleware");

router.route("/form")
  .post(protect, createForm)

router.route("/form/:id")
  .get(protect, checkFormResponseAccess, getForm)
  .put(protect, updateForm)


module.exports = router;