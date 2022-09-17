import UserModel from '../model/user.model.js';

/**
 * create new user in database
 * @param {*} payload - payload to create user
 */
export function createUserService(payload) {
	return UserModel.create(payload);
}
