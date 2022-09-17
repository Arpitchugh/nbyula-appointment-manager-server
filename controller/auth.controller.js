import { createUserService } from '../services/user.service.js';
import { sendEmail } from '../utils/email.util.js';

export async function signupHandler(req, res) {
	const { name, email, password, cpassword } = req.body;
	try {
		if (password !== cpassword) {
			return res
				.status(401)
				.json({ error: 'Password and Confirm Password must be same' });
		}
		// NOTE: password will be hashed in pre-middleware of user model
		const createdUser = await createUserService({ name, email, password });

		await sendEmail(
			email,
			'Verification code for nbyula appointment manager',
			`Your verification code is ${createdUser.verificationCode}`
		);

		return res.status(200).json({ message: 'User created successfully' });
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			return res
				.status(409)
				.json({ error: 'user with same email already exists' });
		}
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
