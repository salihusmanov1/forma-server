const jsforce = require('jsforce');
require('dotenv').config();
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const conn = new jsforce.Connection({
  loginUrl: 'https://login.salesforce.com',
});

const sfLogin = asyncErrorHandler(async (req, res, next) => {
  await conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
  req.conn = conn
  next()
})
module.exports = { sfLogin };