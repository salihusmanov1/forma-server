const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { createResponse, getResponse, updateResponse, getResponses } = require("../controller/responseController");

router.route("/response")
  .post(protect, createResponse)

router.route("/response/:form_id/:respondent_id")
  .get(protect, getResponse)

router.route("/response/:id")
  .put(protect, updateResponse)



module.exports = router;