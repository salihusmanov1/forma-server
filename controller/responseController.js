
const { Responses } = require("../models");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createResponse = asyncErrorHandler(async (req, res, next) => {
  const newResponse = await Responses.create(req.body);
  res.status(201).json({
    message: 'Your response has been submitted successfully',
    data: newResponse,
  });
})

const getForm = asyncErrorHandler(async (req, res, next) => {
  const form = await Forms.findByPk(req.params.id, {
    include: [{
      model: Templates, as: 'template',
      include: [{
        model: Questions, as: 'questions',
        include: [{ model: Options, as: 'options' }]
      }]
    }, { model: AllowedUsers, as: "allowed_users", attributes: ["user_email"] }]
  });
  res.status(200).json({
    data: form,
  })
})

const updateForm = asyncErrorHandler(async (req, res, next) => {
  await Forms.update({ is_public: req.body.is_public },
    { where: { id: req.params.id } })
  await setAllowedUsers(req, res, next)

  res.status(200).json({
    message: "Form has been updated successfully",
  })
})

const setAllowedUsers = async (req, res, next) => {
  const users = await AllowedUsers.findAll({
    where: { form_id: req.params.id },
  });
  const existingUserEmails = users.map(user => user.user_email);
  const usersToAdd = req.body.allowedEmails
    .map(user => user.user_email)
    .filter(email => !existingUserEmails.includes(email));
  const usersToRemove = existingUserEmails.filter(
    email => !req.body.allowedEmails.some(obj => obj.user_email === email)
  );


  if (usersToAdd.length > 0) {
    await AllowedUsers.bulkCreate(
      usersToAdd.map(email => ({ form_id: req.params.id, user_email: email })),
      { ignoreDuplicates: true }
    );
  }

  if (usersToRemove.length > 0) {
    await AllowedUsers.destroy({
      where: {
        form_id: req.params.id,
        user_email: usersToRemove,
      }
    });
  }
}

module.exports = { createResponse }