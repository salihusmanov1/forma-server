const { AllowedUsers, Forms } = require('../models');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/customError');

const checkFormAccess = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const userEmail = req.user.email;

  const form = await Forms.findByPk(id) //check if author
  if (req.user.id == form.user_id) {
    return next()
  }
  const allowedUser = await AllowedUsers.findOne({
    where: {
      form_id: id,
      email: userEmail,
    },
  });

  if (!allowedUser) {
    const error = new CustomError('Access denied. You do not have permission to access this form.', 403)
    return next(error)
  }
})

module.exports = checkFormAccess;
