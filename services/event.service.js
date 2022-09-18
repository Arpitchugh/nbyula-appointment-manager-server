import EventModel from '../model/events.model.js';

/**
 * create new event in database
 * @param {*} payload - payload to create new event
 */
export function createEventService(payload) {
	return EventModel.create(payload);
}
