import { Router } from 'express';
import {
	createEventHandler,
	deleteEventHandler,
	getEventForUserHandler,
} from '../controller/event.controller.js';
import validateRequest from '../middleware/validateRequest.middleware.js';
import { createEventSchema } from '../schema/event.schema.js';

const eventRouter = Router();

eventRouter.post(
	'/events',
	validateRequest(createEventSchema),
	createEventHandler
);
eventRouter.get('/events', getEventForUserHandler);
eventRouter.delete('/events/:id', deleteEventHandler);

export default eventRouter;
