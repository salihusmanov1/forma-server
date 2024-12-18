const express = require("express");
const { createTemplate, getTemplates } = require("../controller/templateController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/templates")
  .post(protect, createTemplate)
  .get(protect, getTemplates);

module.exports = router;