const { Templates } = require("../models");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createTemplate = asyncErrorHandler(async (req, res, next) => {
  const newTemplate = await Templates.create(req.body);
  res.status(201).json({
    message: 'New template has been created successfully',
    data: newTemplate
  });
})

module.exports = { createTemplate }