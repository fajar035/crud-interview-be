const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/users');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.addUser);

module.exports = userRouter;
