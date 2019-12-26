import { REQUEST_LISTINGS, SAVE_RESPONSE, SAVE_LISTINGS, SET_RESPONSE_STATUS,
	CHANGE_FAVORITE, CHANGE_PAGE, CLEAR_LISTINGS, OPEN_MODAL, CLOSE_MODAL, 
	REMOVE_FAVORITE_LISTING, ADD_FAVORITE_LISTING, CHANGE_FAVORITE_LISTINGS } from '../constants.js';

export const requestListings = location => ({
	type: REQUEST_LISTINGS,
	location
});

export const saveListings = result => ({
	type: SAVE_LISTINGS,
	result
});

export const setResponseStatus = (status, message) => ({
	type: SET_RESPONSE_STATUS,
	status,
	message,
});

export const saveResponse = response => ({
	type: SAVE_RESPONSE,
	response,
});

export const changePage = (page) => ({
	type: CHANGE_PAGE,
	page,
});

export const clearListings = () => ({
	type: CLEAR_LISTINGS,
});

export const changeFavorite = (id) => ({
	type: CHANGE_FAVORITE,
	id,
});

export const openModal = () => ({
	type: OPEN_MODAL,
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
});

export const removeFavoriteListing = (id) => ({
	type: REMOVE_FAVORITE_LISTING,
	id,
});

export const addFavoriteListing = (listing) => ({
	type: ADD_FAVORITE_LISTING,
	listing,
});

export const changeFavoriteListings = () => ({
	type: CHANGE_FAVORITE_LISTINGS,
});
 
export const fetchListings = (location, page) => dispatch => {
	dispatch(requestListings(location));

	fetch(`https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1
		&action=search_listings&country=uk&listing_type=rent&page=${page}&place_name=${location}`)
		.then(
			response => response.json(), 
			error => {
				dispatch(setResponseStatus('invalidRequest', 
				'An error occurred while loading data. Please try the search again. We apologize.'));
				dispatch(openModal());
			}
		)
		.then(result => {
			dispatch(saveResponse(result));
			return result;
		})
		.then(result => dispatch(saveListings(result))
		)
		.then(() => dispatch(changeFavoriteListings())
		)
};
