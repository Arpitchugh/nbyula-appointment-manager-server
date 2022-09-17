import { Router } from 'express';
import {
	forgotPasswordHandler,
	getCurrentUserHandler,
	loginHandler,
	logoutHandler,
	resetPasswordHandler,
	signupHandler,
	verifyUserHandler,
} from '../controller/auth.controller.js';
import validateRequest from '../middleware/validateRequest.middleware.js';
import {
	forgotPasswordSchema,
	loginSchema,
	resetPasswordSchema,
	signupSchema,
	verifyUserSchema,
} from '../schema/auth.schema.js';

const authRouter = Router();

authRouter.post('/auth/signup', validateRequest(signupSchema), signupHandler);
authRouter.post('/auth/login', validateRequest(loginSchema), loginHandler);
authRouter.post(
	'/auth/forgotpassword',
	validateRequest(forgotPasswordSchema),
	forgotPasswordHandler
);
authRouter.get(
	'/auth/verify/:email/:verificationCode',
	validateRequest(verifyUserSchema),
	verifyUserHandler
);
authRouter.get('/auth/logout', logoutHandler);
authRouter.get('/auth/me', getCurrentUserHandler);
authRouter.patch(
	'/auth/resetpassword/:email/:passwordResetCode',
	validateRequest(resetPasswordSchema),
	resetPasswordHandler
);

export default authRouter;
