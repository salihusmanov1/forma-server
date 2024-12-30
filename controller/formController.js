const { Forms, Templates, Questions, Options } = require("../models");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createForm = asyncErrorHandler(async (req, res, next) => {
  const newForm = await Forms.create(req.body);
  res.status(201).json({
    message: 'New form has been created successfully',
    data: newForm,

  });
})

const getForm = asyncErrorHandler(async (req, res, next) => {
  const form = await Forms.findOne({
    where: { id: req.params.id },
    include: [{
      model: Templates, as: 'template',
      include: [{
        model: Questions, as: 'questions',
        include: [{ model: Options, as: 'options' }]
      }]
    }]
  });

  res.status(200).json({
    data: form,
  })
})

module.exports = { createForm, getForm }