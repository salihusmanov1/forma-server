const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { Templates, Questions, Users, Options, Tags } = require("../models");;
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const s3 = require("../config/aws");
const resizeTemplateImage = require("../utils/imageResizer");
const CustomError = require("../utils/customError");
require('dotenv').config();

async function uploadTemplateImage(file) {
  const buffer = await resizeTemplateImage(file.buffer);
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: buffer,
    ContentType: file.mimetype,
  };
  const command = new PutObjectCommand(param);
  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${file.originalname}`;
}

async function createTags(template, tags) {
  const tagInstances = await Promise.all(
    tags.map((tag) => Tags.findOrCreate({ where: { name: tag.name } }))
  );
  const tagIds = tagInstances.map(([tag]) => tag.id);
  await template.addTags(tagIds);
}

const createTemplate = asyncErrorHandler(async (req, res, next) => {
  let data = req.body
  data.questions = JSON.parse(req.body.questions);
  data.tags = JSON.parse(req.body.tags)

  let objUrl = null;
  if (req.file) {
    objUrl = await uploadTemplateImage(req.file);
  }
  const newTemplate = await Templates.create({ ...data, image_url: objUrl }, {
    include: [{
      model: Questions, as: 'questions',
      include: [{ model: Options, as: 'options' }]
    }]
  });
  await createTags(newTemplate, data.tags)

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
  const template = await Templates.findOne({
    where: { id: req.params.id },
    include: [{
      model: Questions, as: 'questions',
      include: [{ model: Options, as: 'options' }]
    }, { model: Tags, as: 'tags' }]
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