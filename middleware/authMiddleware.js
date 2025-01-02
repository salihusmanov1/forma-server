const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const util = require('node:util');
const { Users } = require("../models")
require('dotenv').config();

const protect = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token)
    return next(new CustomError("Authentication token is missing", 401))
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
  const user = await Users.findOne({ where: { id: decodedToken.userId } })
  if (!user)
    return next(new CustomError("User not found", 404))
  req.user = user
  next()
})

module.exports = protect