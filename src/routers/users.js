const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/users');
const middlewareGetuser = require('../middleware/user');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.addUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.patch('/:id', middlewareGetuser.getUser, userController.updateUser);

module.exports = userRouter;
