import { z } from 'zod';

export const signupSchema = z.object({
	body: z
		.object({
			name: z
				.string({ required_error: 'Please enter your name' })
				.min(3, 'name must be at least 3 characters long')
				.max(20, 'name can not be longer than 20 characters'),
			email: z
				.string({ required_error: 'email is required' })
				.email('Please enter a valid email'),
			password: z
				.string({ required_error: 'password is required' })
				.min(6, 'Password is too short - should be 6 chars minimum.'),

			cpassword: z
				.string({ required_error: 'cpassword is required' })
				.min(6, 'Password is too short - should be 6 chars minimum.'),
		})
		.refine(data => data.password === data.cpassword, {
			message: 'Password and confirm password do not match',
			path: ['cpassword'],
		}),
});
