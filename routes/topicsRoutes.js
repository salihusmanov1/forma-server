const express = require("express");
const { getTopics } = require("../controller/topicsController");
const router = express.Router();

router.route("/topics")
  .get(getTopics);

module.exports = router;