import { Router } from 'express';
import authenticator from '../utils/authenticator.js';
import { userController } from '../controller/user.js';

export const userRouter = Router();

userRouter.get('/user', userController.getUser);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/profile', authenticator, userController.profile);




