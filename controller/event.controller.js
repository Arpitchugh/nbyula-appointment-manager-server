import { StatusCodes } from 'http-status-codes';
import { createEventService } from '../services/event.service.js';
import { findUserByIdService } from '../services/user.service.js';

export async function createEventHandler(req, res) {
	try {
		const { title, agenda, startTime, endTime, guests } = req.body;

		const user = await findUserByIdService(res.locals.user._id);

		const createdEvent = await createEventService({
			title,
			agenda,
			startTime,
			endTime,
			guests,
			organizer: user._id,
		});

		user.events.push(createdEvent._id);
		await user.save();

		return res.status(StatusCodes.CREATED).json({
			message: 'Event created successfully',
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Internal Server Error',
		});
	}
}
