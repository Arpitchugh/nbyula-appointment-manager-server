import { Router } from 'express';
import { signupHandler } from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post('/auth/signup', signupHandler);

export default authRouter;
