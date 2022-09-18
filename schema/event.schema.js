import { z } from 'zod';

export const createEventSchema = z.object({
	body: z.object({
        title: z.string({ required_error: 'title is required' }),
        agenda: z.string({ required_error: 'agenda is required' }),
        startTime: z.string({ required_error: 'startTime is required' }),
        endTime: z.string({ required_error: 'endTime is required' }),
        guests: z.array(z.string({ required_error: 'guests is required' })),
        organizer: z.string({ required_error: 'organizer is required' }),
    }),
});
