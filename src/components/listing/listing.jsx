import React from 'react';
import PropTypes from 'prop-types';
import './listing.css';

const Listing = ({ value, onFavorite, onHandleDetailed }) => {
	const isFavorite = value.isFavorite;
	const listing = value.listing;
	const classHeart = isFavorite ? "fas" : "far";
	return (
		<div className="listing" >
			<figure className="thumb">
				<img src={listing.thumb_url} alt={listing.property_type} />
				<i className={`${classHeart} fa-heart`} onClick={onFavorite}></i>
			</figure>
			<div>
				<div className="titleListings">
				<h3 onClick={onHandleDetailed}>{listing.title}</h3>
				</div>
				<p>
					<span className="highlight">{listing.property_type[0].toUpperCase() + listing.property_type.slice(1)}</span> 
					{` *  Keywords: ${listing.keywords} * ${listing.summary} `}
					<span className="highlight">{listing.price_formatted}pm</span>
				</p>
			</div>		
		</div>	
	);
};

Listing.propTypes = {
  value: PropTypes.object,
  onFavorite:PropTypes.func,
  onHandleDetailed:PropTypes.func,
};

export default Listing;