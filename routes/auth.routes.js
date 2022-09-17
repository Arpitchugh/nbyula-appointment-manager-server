import { Router } from 'express';
import {
	loginHandler,
	signupHandler,
	verifyUserHandler,
} from '../controller/auth.controller.js';
import validateRequest from '../middleware/validateRequest.middleware.js';
import {
	loginSchema,
	signupSchema,
	verifyUserSchema,
} from '../schema/auth.schema.js';

const authRouter = Router();

authRouter.post('/auth/signup', validateRequest(signupSchema), signupHandler);
authRouter.post('/auth/login', validateRequest(loginSchema), loginHandler);
authRouter.get(
	'/auth/verify/:email/:verificationCode',
	validateRequest(verifyUserSchema),
	verifyUserHandler
);

export default authRouter;
