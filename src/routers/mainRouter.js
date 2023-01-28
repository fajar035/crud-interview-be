const express = require('express');
const userRouter = require('./users');

const mainRouter = express.Router();

mainRouter.use('/api/users', userRouter);

module.exports = mainRouter;
