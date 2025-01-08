const express = require('express');
const app = express();
const cors = require('cors');
const corsConfig = require('./config/cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes')
const templateRoutes = require('./routes/templateRoutes')
const formRoutes = require('./routes/formRoutes')
const topicsRoutes = require('./routes/topicsRoutes')
const tagsRoutes = require('./routes/tagsRoutes')
const responseRoutes = require('./routes/responseRoutes')
const db = require('./models');
const CustomError = require('./utils/customError');
const globalErrorController = require('./controller/errorController');
require('dotenv').config();

app.use(morgan('dev'))
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

app.use('/auth', authRoutes)
app.use('/api', templateRoutes)
app.use('/api', formRoutes)
app.use('/api', topicsRoutes)
app.use('/api', tagsRoutes)
app.use('/api', responseRoutes)

app.use((req, res, next) => {
  const error = new CustomError('Not Found', 404)
  next(error)
})

app.use(globalErrorController)

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.APP_URL}:${process.env.PORT}`);
  });
}) 