import { StatusCodes } from 'http-status-codes';
import { findAllUsersService } from '../services/user.service.js';

export async function getAllUsersHandler(req, res) {
	try {
		const users = await findAllUsersService();

		return res.status(StatusCodes.OK).json({
			message: 'Users fetched successfully',
			records: users,
		});
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Internal Server Error',
		});
	}
}
