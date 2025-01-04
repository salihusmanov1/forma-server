const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { createResponse } = require("../controller/responseController");

router.route("/response")
  .post(protect, createResponse)

// router.route("/form/:id")
//   .get(protect, checkFormAccess, getForm)
//   .put(protect, updateForm)


module.exports = router;