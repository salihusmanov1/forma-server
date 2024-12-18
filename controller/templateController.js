const { Templates } = require("../models");
const { Users } = require("../models");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


const createTemplate = asyncErrorHandler(async (req, res, next) => {
  const newTemplate = await Templates.create(req.body);
  res.status(201).json({
    message: 'New template has been created successfully',
    data: newTemplate
  });
})

const getTemplates = asyncErrorHandler(async (req, res, next) => {
  const templates = await Templates.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [{
      model: Users,
      as: "author"
    }]
  })
  res.status(200).json({
    data: templates
  })
})

module.exports = { createTemplate, getTemplates }