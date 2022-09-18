import { z } from 'zod';

export const createEventSchema = z.object({
	body: z.object({
		title: z.string({ required_error: 'title is required' }),
		agenda: z.string({ required_error: 'agenda is required' }),
		start: z.string({ required_error: 'start is required' }),
		end: z.string({ required_error: 'end is required' }),
		guests: z.array(z.string({ required_error: 'guests is required' })),
	}),
});

export const deleteEventSchema = z.object({
	params: z.object({
		id: z.string({ required_error: 'id is required' }),
	}),
});
