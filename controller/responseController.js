
const { Responses, Answers, SingleLineAnswers, MultiLineAnswers, NumericAnswers, CheckboxAnswers } = require("../models");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const createResponse = asyncErrorHandler(async (req, res, next) => {
  req.body = {
    ...req.body,
    'single_line_answers': req.body.answers.filter(answer => answer.type === 'single_line'),
    'multi_line_answers': req.body.answers.filter(answer => answer.type === 'multi_line'),
    'numeric_answers': req.body.answers.filter(answer => answer.type === 'numeric'),
    'checkbox_answers': req.body.answers.filter(answer => answer.type === 'checkbox')
  }
  const newResponse = await Responses.create(req.body,
    {
      include: [
        { model: SingleLineAnswers, as: 'single_line_answers' },
        { model: MultiLineAnswers, as: 'multi_line_answers' },
        { model: NumericAnswers, as: 'numeric_answers' },
        { model: CheckboxAnswers, as: 'checkbox_answers' },
      ],
    });
  res.status(201).json({
    message: 'Your response has been submitted successfully',
    data: newResponse,
  });
})

const getResponse = asyncErrorHandler(async (req, res, next) => {
  const response = await Responses.findOne({
    where: req.params,
    include: [
      { model: SingleLineAnswers, as: 'single_line_answers' },
      { model: MultiLineAnswers, as: 'multi_line_answers' },
      { model: NumericAnswers, as: 'numeric_answers' },
      { model: CheckboxAnswers, as: 'checkbox_answers' },
    ],
  })
  let data
  if (response) {
    data = {
      id: response.id, form_id: response.form_id, respondent_id: response.respondent_id,
      answers: [...response.single_line_answers,
      ...response.multi_line_answers,
      ...response.numeric_answers,
      ...response.checkbox_answers]
    }
  } else {
    data = null
  }

  res.status(200).json({
    data: data,
  })
})

const updateResponse = asyncErrorHandler(async (req, res, next) => {

  const update = async (model, responseId, answers) => {
    const existingAnswers = await model.findAll({ where: { response_id: responseId } });
    if (existingAnswers.length) {
      await Promise.all(
        existingAnswers.map(async (answer) => {
          const found = answers.find((ans) =>
            ans.question_id === answer.question_id &&
            (!answer.option_id || ans.option_id === answer.option_id)
          );
          if (found) {
            await answer.update(found);
          }
        })
      );
    } else {
      if (answers.length)
        await model.bulkCreate(answers)
    }
  };

  const { id } = req.params;
  const { answers } = req.body;

  await Promise.all([
    update(SingleLineAnswers, id, answers.filter(answer => answer.type === 'single_line')),
    update(MultiLineAnswers, id, answers.filter(answer => answer.type === 'multi_line')),
    update(NumericAnswers, id, answers.filter(answer => answer.type === 'numeric')),
    update(CheckboxAnswers, id, answers.filter(answer => answer.type === 'checkbox')),
  ]);

  res.status(200).json({
    message: 'Your response has been updated successfully',
  })
})


module.exports = { createResponse, getResponse, updateResponse }