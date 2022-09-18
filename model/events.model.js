import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		agenda: { type: String, required: true },
		startTime: { type: Date, required: true },
		endTime: { type: Date, required: true },
		guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

const EventModel = new mongoose.model('Event', eventSchema);

export default EventModel;
