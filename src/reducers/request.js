import { REQUEST_LISTINGS, SAVE_RESPONSE, SET_RESPONSE_STATUS, CHANGE_PAGE } from '../constants.js';

const initialState = {
	location: '',
	page: 1,
	isFetching: false,
	responseStatus: 'validResponse',
	errorMessage:'',
	response: {},
};

const request = (state=initialState, { type, location, response, status, message, page }) => {
	switch (type) {
		case REQUEST_LISTINGS:
			return {...state, 
				location,
        isFetching: true,
        responseStatus: 'validResponse',
        errorMessage:'',
      };
    case CHANGE_PAGE:
			return {...state,
				page: page,
			};
		case SAVE_RESPONSE:
			return {...state, 
				isFetching: false,
				response: response,
			};
		case SET_RESPONSE_STATUS:
			return {...state,
				responseStatus: status,
				errorMessage:message,
			};
		default:
			return state;
	}
};

export default request;
