import { Router } from 'express';
import {
	signupHandler,
	verifyUserHandler,
} from '../controller/auth.controller.js';
import validateRequest from '../middleware/validateRequest.middleware.js';
import { signupSchema, verifyUserSchema } from '../schema/auth.schema.js';

const authRouter = Router();

authRouter.post('/auth/signup', validateRequest(signupSchema), signupHandler);
authRouter.get(
	'/auth/verify/:email/:verificationCode',
	validateRequest(verifyUserSchema),
	verifyUserHandler
);

export default authRouter;
