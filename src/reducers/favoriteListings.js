import { REMOVE_FAVORITE_LISTING, ADD_FAVORITE_LISTING } from '../constants.js';

const initialState = window.localStorage.getItem("favoriteListings") ? 
JSON.parse(window.localStorage.getItem("favoriteListings")) : [];

const favoriteListings = (state=initialState, { type, id, listing }) => {
	switch (type) {
		case ADD_FAVORITE_LISTING:
			return [...state, listing];
		case REMOVE_FAVORITE_LISTING:
			return state.filter(item => item.id !== id);
		default:
			return state;
	}
}

export default favoriteListings;