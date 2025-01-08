const express = require("express");
const { getTags } = require("../controller/tagsController");
const router = express.Router();

router.route("/tags")
  .get(getTags);

module.exports = router;