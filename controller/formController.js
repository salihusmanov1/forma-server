
const { Forms, Templates,
  Questions, Options,
  AllowedUsers, Users,
  Responses, SingleLineAnswers,
  MultiLineAnswers, NumericAnswers,
  CheckboxAnswers } = require("../models");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createForm = asyncErrorHandler(async (req, res, next) => {
  const newForm = await Forms.create(req.body);
  res.status(201).json({
    message: 'New form has been created successfully',
    data: newForm,
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
    }, { model: AllowedUsers, as: "allowed_users", attributes: ["user_email"] },
    {
      model: Responses, as: "responses",
      include: [
        { model: Users, as: 'respondent', attributes: ["email"] }
      ]
    }],
    order: [
      [
        { model: Templates, as: 'template' },
        { model: Questions, as: 'questions' },
        'order',
        'ASC',
      ],
    ],
  });
  res.status(200).json({
    data: form,
  })
})

const getForms = asyncErrorHandler(async (req, res, next) => {
  const forms = await Forms.findAll({
    where:
      { user_id: req.params.userId }
  });
  res.status(200).json({
    data: forms,
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

const removeForm = asyncErrorHandler(async (req, res, next) => {
  await Forms.destroy({ where: { id: req.params.id } }),

    res.status(200).json({
      message: "Form has been deleted successfully",
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

const getFormAnalytics = async (req, res, next) => {
  const responses = await Responses.findAll({ where: { form_id: req.params.formId } })
  const questions = await Questions.findAll({
    where: { template_id: req.params.templateId },
    include: [
      {
        model: SingleLineAnswers, attributes: ['answer'],
        include: [{ model: Responses, where: { form_id: req.params.formId }, attributes: ["respondent_id"] }]
      },
      {
        model: MultiLineAnswers,
        attributes: ['answer'], include: [{ model: Responses, where: { form_id: req.params.formId }, attributes: ["respondent_id"] }]
      },
      {
        model: NumericAnswers,
        attributes: ['answer'], include: [{ model: Responses, where: { form_id: req.params.formId }, attributes: ["respondent_id"] }]
      },
      {
        model: Options, as: 'options',
        include: [
          {
            model: CheckboxAnswers, attributes: ['answer'],
            include: { model: Responses, where: { form_id: req.params.formId }, attributes: ["respondent_id"] },
          }
        ]
      }
    ]
  })

  const data = questions.map(({ id, question, type, order, SingleLineAnswers, MultiLineAnswers, NumericAnswers, options }) => {
    return {
      id,
      question,
      type,
      order,
      answers: [
        ...SingleLineAnswers,
        ...MultiLineAnswers,
        ...NumericAnswers,
        ...(options?.map(option => ({
          id: option.id,
          name: option.name,
          count: option.CheckboxAnswers.filter(answer => answer.answer === true).length
        })))],
    }
  });

  res.json({ questions: data, responsesCount: responses.length })
}



module.exports = { createForm, getForm, getForms, updateForm, removeForm, getFormAnalytics }