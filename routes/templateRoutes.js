const express = require("express");
const { createTemplate, getTemplates, getTemplate, getUserTemplates } = require("../controller/templateController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.route("/templates")
  .post(protect, upload.single('template_image'), createTemplate)
  .get(getTemplates);

router.route("/template/:id")
  .get(getTemplate)

router.route("/templates/:userId")
  .get(getUserTemplates)

module.exports = router;