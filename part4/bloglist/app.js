const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');

const app = express();

logger.info('connecting to mongodb');
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('connected to mongodb'))
  .catch((error) =>
    logger.error(`error connecting to mongodb: ${error.message}`),
  );

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
