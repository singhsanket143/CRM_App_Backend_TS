import express from 'express';
import userController from '../../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:id', userController.getUser);
userRouter.get('/', userController.getAllUsers);


export default userRouter;