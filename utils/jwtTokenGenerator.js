const jwt = require("jsonwebtoken");
require('dotenv').config();
const generateAccessToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: 'none',
    maxAge: 3 * 24 * 60 * 60 * 1000
  })
};

const clearToken = (res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
};

module.exports = { generateAccessToken, clearToken }
