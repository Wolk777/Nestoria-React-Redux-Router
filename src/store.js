import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { setResponseStatus, saveListings, openModal, changeFavorite } from './actions/actionCreator.js'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production'
&& typeof window === 'object'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const checkCodeError = (code, text) => {
	const codes = ["200", "201", "202", "210", "500", "900", "901", "902", "910", "911"];
	let errorMessage = codes.includes(code) ? text[0].toUpperCase() + text.slice(1) : 
	'Error loading data. Check the entered data and repeat the search.';
	
	store.dispatch(openModal());
	return setResponseStatus('invalidResponse', errorMessage);
}

const checkResponse = store => next => action => {
	if (action.type === 'SAVE_LISTINGS' && store.getState().request.responseStatus === "validResponse") {
		const codeResponse = store.getState().request.response.response.application_response_code;
		const textResponse = store.getState().request.response.response.application_response_text;

		if (codeResponse < 100 || codeResponse > 199) {
			store.dispatch(checkCodeError(codeResponse, textResponse));
			store.dispatch(saveListings([]));
			return;
		}
	}
	return next(action);
}

const changeFavoriteListing = store => next => action => {
	if (action.type === 'CHANGE_FAVORITE_LISTINGS') {
		let listings = store.getState().listings;
		let favoriteListings = store.getState().favoriteListings;

		listings.forEach(listing => {
			if (favoriteListings.find(favoriteListing => favoriteListing.id === listing.id)) {
				store.dispatch(changeFavorite(listing.id));
			}
		})
	}
	return next(action);
}

const configureStore = (preloadedState) => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, checkResponse, changeFavoriteListing, logger)),
  )
);

const store = configureStore({});

store.subscribe(() => {
	window.localStorage.setItem("favoriteListings", JSON.stringify(store.getState().favoriteListings))
});

export default store;
