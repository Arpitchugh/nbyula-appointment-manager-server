import { Router } from 'express';
import {
	getAllUsersHandler,
	patchUserName,
} from '../controller/user.controller.js';

const userRouter = Router();

userRouter.route('/users').get(getAllUsersHandler).patch(patchUserName);

export default userRouter;
