import { SAVE_LISTINGS, CHANGE_FAVORITE, CLEAR_LISTINGS, CHANGE_FAVORITE_LISTINGS } from '../constants.js';

const listings = (state=[], { type, result, id }) => {
	switch (type) {
		case CLEAR_LISTINGS:
			return [];
		case SAVE_LISTINGS:
			if (result.length === 0) return [];
			return [...state, ...result.response.listings.map(listing => ({
				id: listing.img_url, 
				isFavorite: false, 
				listing: listing,
			}))];
		case CHANGE_FAVORITE:
			return state.map(listing => {
				if (listing.id === id) {
					listing.isFavorite = !listing.isFavorite
				}
				return listing;
			});
		case CHANGE_FAVORITE_LISTINGS: 
			return state;
		default:
			return state;
	}
}

export default listings;