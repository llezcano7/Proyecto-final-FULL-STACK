import { Router } from 'express';
import tokenAndCookie from '../utils/jwt.js';
import authenticator from '../utils/authenticator.js';
import { UserController } from '../controller/user.js';

export const userRouter = Router();

userRouter.get('/user', async (req, res) => {
    const responseObj = await UserController.getAllUsers();
    res.status(responseObj.status).json(responseObj);
});

userRouter.post('/register', async (req, res) => {
    const responseObj = await UserController.register(req.body);
    if (responseObj.success) {
        tokenAndCookie(res, responseObj.data);
    }
    res.status(responseObj.status).json(responseObj);
});

userRouter.post('/login', async (req, res) => {
    const responseObj = await UserController.login(req.body);
    if (responseObj.success) {
        tokenAndCookie(res, responseObj.data);
    }
    res.status(responseObj.status).json(responseObj);
});

userRouter.get('/profile', authenticator, async (req, res) => {
  const responseObj = await UserController.findUserById(req.user.id);
  res.status(responseObj.status).json(responseObj);
});