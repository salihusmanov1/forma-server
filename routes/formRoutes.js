const express = require("express");
const { createForm, getForm, updateForm, getForms, removeForm } = require("../controller/formController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const checkFormAccess = require("../middleware/formMiddleware");

router.route("/form")
  .post(protect, createForm)

router.route("/form/:id")
  .get(protect, checkFormAccess, getForm)
  .put(protect, updateForm)
  .delete(protect, removeForm)

router.route("/forms/:userId")
  .get(protect, getForms)


module.exports = router;