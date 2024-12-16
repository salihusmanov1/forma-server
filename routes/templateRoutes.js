const express = require("express");
const { createTemplate } = require("../controller/templateController");
const router = express.Router();

router.post("/template-create", createTemplate);


module.exports = router;