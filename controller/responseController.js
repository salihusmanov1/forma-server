
const { Responses, Answers, SingleLineAnswers, MultiLineAnswers, NumericAnswers, CheckboxAnswers } = require("../models");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const createResponse = asyncErrorHandler(async (req, res, next) => {
  const newResponse = await Responses.create(req.body)
  for (const answer of req.body.answers) {
    if (answer.type === 'single_line')
      SingleLineAnswers.create({ ...answer, response_id: newResponse.id })
    else if (answer.type === 'multi_line')
      MultiLineAnswers.create({ ...answer, response_id: newResponse.id })
    else if (answer.type === 'numeric')
      NumericAnswers.create({ ...answer, response_id: newResponse.id })
    else if (answer.type === 'checkbox')
      for (const option of answer.options)
        CheckboxAnswers.create({ ...option, question_id: answer.question_id, response_id: newResponse.id })
  }
  res.status(201).json({
    message: 'Your response has been submitted successfully',
    data: newResponse,
  });
})

const getResponse = asyncErrorHandler(async (req, res, next) => {
  const response = await Responses.findOne({
    where: req.params,
    include: [
      { model: SingleLineAnswers, },
      { model: MultiLineAnswers, },
      { model: NumericAnswers, },
      { model: CheckboxAnswers, },
    ],
  })
  res.status(200).json({
    data: response,
  })
})

const updateResponse = asyncErrorHandler(async (req, res, next) => {
  const update = async (model, responseId, answers) => {
    const existingAnswers = await model.findAll({ where: { response_id: responseId } });
    if (existingAnswers.length) {
      await Promise.all(
        existingAnswers.map(async (answer) => {
          const found = answers.find((ans) =>
            ans.question_id === answer.question_id
          );
          if (found) {
            if (found.options) {
              const foundOption = found.options.find((ans) => ans.option_id === answer.option_id)
              await answer.update(foundOption)
            } else
              await answer.update(found);
          }
        })
      );
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