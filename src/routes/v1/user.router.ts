import express from 'express';
import userController from '../../controllers/user.controller';
import { createUserValidator } from '../../validators/user.validators';

const userRouter = express.Router();

userRouter.get('/:id', userController.getUser);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/signup', createUserValidator, userController.createUser);
userRouter.post('/signin', userController.signin);

export default userRouter;