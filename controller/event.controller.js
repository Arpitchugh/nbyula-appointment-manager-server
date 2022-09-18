import { StatusCodes } from 'http-status-codes';
import { createEventService } from '../services/event.service.js';
import { findUserByIdService } from '../services/user.service.js';
import { sendEmail } from '../utils/email.util.js';
import moment from 'moment';

export async function createEventHandler(req, res) {
	try {
		const { title, agenda, startTime, endTime, guests } = req.body;
		const formattedStartTime = moment(startTime).format('DD-MM-YYYY hh:mm A');

		const user = await findUserByIdService(res.locals.user._id);

		const createdEvent = await createEventService({
			title,
			agenda,
			startTime: new Date(startTime).toISOString(),
			endTime: new Date(endTime).toISOString(),
			guests,
			organizer: user._id,
		});

		user.events.push(createdEvent._id);
		await user.save();

		guests.forEach(async guest => {
			const guestUser = await findUserByIdService(guest);
			guestUser.events.push(createdEvent._id);
			await guestUser.save();
			sendEmail(
				guestUser.email,
				`New Event with ${user.name}`,
				`You have been invited to a new event by ${user.name} at ${formattedStartTime}`
			);
		});

		return res.status(StatusCodes.CREATED).json({
			message: 'Event created successfully',
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Internal Server Error',
		});
	}
}
