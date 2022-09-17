import { StatusCodes } from 'http-status-codes';
import {
	createUserService,
	findUserByEmailService,
} from '../services/user.service.js';
import { sendEmail } from '../utils/email.util.js';

export async function signupHandler(req, res) {
	const { name, email, password } = req.body;
	try {
		// NOTE: password will be hashed in pre-middleware of user model
		const createdUser = await createUserService({ name, email, password });

		sendEmail(
			email,
			'Verification code for nbyula appointment manager',
			`Your verification code is ${createdUser.verificationCode}`
		);

		return res.status(StatusCodes.CREATED).json({
			message: 'User created and email sent successfully',
		});
	} catch (err) {
		if (err.code === 11000) {
			return res
				.status(StatusCodes.CONFLICT)
				.json({ error: 'user with same email already exists' });
		}
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: 'Internal Server Error' });
	}
}

export async function verifyUserHandler(req, res) {
	const { email, verificationCode } = req.params;

	try {
		const user = await findUserByEmailService(email);

		if (!user) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: 'user with given email not found' });
		}

		if (user.verified) {
			return res.status(StatusCodes.OK).json({
				message: 'User already verified',
			});
		}

		if (user.verificationCode !== verificationCode) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				error: 'Invalid verification code',
			});
		}

		user.verified = true;
		await user.save();

		return res.status(StatusCodes.OK).json({
			message: 'User verified successfully',
		});
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Internal Server Error',
		});
	}
}
