import { StatusCodes } from 'http-status-codes';
import {
	createEventService,
	findEventById,
	getAllEventsService,
} from '../services/event.service.js';
import { findUserByIdService } from '../services/user.service.js';
import { sendEmail } from '../utils/email.util.js';
import moment from 'moment';

export async function createEventHandler(req, res) {
	try {
		const { title, agenda, start, end, guests } = req.body;
		const formattedStartTime = moment(start).format('DD-MM-YYYY hh:mm A');
		const formattedEndTime = moment(end).format('DD-MM-YYYY hh:mm A');

		const user = await findUserByIdService(res.locals.user._id);

		const createdEvent = await createEventService({
			title,
			agenda,
			start: new Date(start).toString(),
			end: new Date(end).toString(),
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
				`You have been invited to a new event by ${user.name} from ${formattedStartTime} to ${formattedEndTime}`
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

export async function getEventForUserHandler(req, res) {
	try {
		const user = await findUserByIdService(res.locals.user._id);

		const events = await Promise.all(
			user.events.map(async id => {
				return await findEventById(id).populate('organizer').populate('guests');
			})
		);

		return res.status(StatusCodes.OK).json({
			message: 'Events fetched successfully',
			records: events,
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Internal Server Error',
		});
	}
}
