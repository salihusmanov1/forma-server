const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { Templates, Questions, Users, Options } = require("../models");;
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const s3 = require("../config/aws");
const resizeTemlateImage = require("../utils/imageResizer");
const CustomError = require("../utils/customError");

const createTemplate = asyncErrorHandler(async (req, res, next) => {
  let data = req.body
  data.questions = JSON.parse(req.body.questions);

  let objUrl = null;
  if (req.file) {
    const buffer = await resizeTemlateImage(req.file.buffer)

    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: buffer,
      ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(param)
    await s3.send(command)
    objUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${req.file.originalname}`;
  }

  const newTemplate = await Templates.create({ ...data, image_url: objUrl }, {
    include: [{
      model: Questions, as: 'questions',
      include: [{ model: Options, as: 'options' }]
    }]
  });
  res.status(201).json({
    message: 'New template has been created successfully',
    data: newTemplate,
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

const getTemplate = asyncErrorHandler(async (req, res, next) => {
  console.log(req);

  const template = await Templates.findOne({
    where: { id: req.params.id },
    include: [{
      model: Questions, as: 'questions',
      include: [{ model: Options, as: 'options' }]
    }]
  });
  if (!template) {
    const error = new CustomError("Template not found!", 404)
    return next(error)
  }
  res.status(200).json({
    data: template,
  })
})

module.exports = { createTemplate, getTemplates, getTemplate }