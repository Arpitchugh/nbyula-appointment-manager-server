import { Router } from 'express';
import { signupHandler } from '../controller/auth.controller.js';
import validateRequest from '../middleware/validateRequest.middleware.js';
import { signupSchema } from '../schema/auth.schema.js';

const authRouter = Router();

authRouter.post('/auth/signup', validateRequest(signupSchema), signupHandler);

export default authRouter;
