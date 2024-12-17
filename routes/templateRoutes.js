const express = require("express");
const { createTemplate } = require("../controller/templateController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/template-create", protect, createTemplate);


module.exports = router;