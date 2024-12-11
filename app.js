const express = require('express');
const app = express();
const cors = require('cors');
const corsConfig = require('./config/cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes')
const db = require('./models')
require('dotenv').config();

app.use(morgan('dev'))
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

app.use('/auth', authRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404;
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.APP_URL}:${process.env.PORT}`);
  });
}) 