const { Topics } = require("../models")
const asyncErrorHandler = require("../utils/asyncErrorHandler")


const getTopics = asyncErrorHandler(async (req, res, next) => {
  const topics = await Topics.findAll()
  res.status(200).json({
    data: topics
  })
})

module.exports = { getTopics }