import { Router } from 'express';
import { getAllUsersHandler } from '../controller/user.controller.js';

const userRouter = Router();

userRouter.get('/users', getAllUsersHandler);

export default userRouter;
