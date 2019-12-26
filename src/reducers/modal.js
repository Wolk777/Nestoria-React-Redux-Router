import { OPEN_MODAL, CLOSE_MODAL } from '../constants.js';

const modal = (state = false, { type }) => {
	switch (type) {
		case OPEN_MODAL:
			return true;
		case CLOSE_MODAL:
			return false;
		default:
			return state;
	}
}

export default modal;
