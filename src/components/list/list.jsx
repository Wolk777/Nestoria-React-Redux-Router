import React from 'react';
import Listing from '../listing/listing.jsx';
import PropTypes from 'prop-types';
import './list.css';

const List = ({ listings, onFavorite, onHandleDetailed }) => {
	return(
		listings.map((item) => (
			<Listing 
			key={item.listing.img_url} 
			id={item.listing.img_url}
			value={item}
			onHandleDetailed={() => onHandleDetailed(item.listing.img_url)}
			onFavorite={() => onFavorite(item.listing.img_url)}/>
		))
	);
};

List.propTypes = {
  listings: PropTypes.array,
  onFavorite:PropTypes.func,
  onHandleDetailed:PropTypes.func,
};

export default List;