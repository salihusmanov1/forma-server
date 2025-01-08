const { Tags } = require("../models")
const asyncErrorHandler = require("../utils/asyncErrorHandler")


const getTags = asyncErrorHandler(async (req, res, next) => {
  const tags = await Tags.findAll()
  res.status(200).json({
    data: tags
  })
})

module.exports = { getTags }