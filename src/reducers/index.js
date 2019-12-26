import { combineReducers } from 'redux';
import request from './request.js';
import listings from './listings.js';
import modal from './modal.js';
import favoriteListings from './favoriteListings.js';

const rootReducer = combineReducers ({request, listings, favoriteListings, modal});

export default rootReducer;