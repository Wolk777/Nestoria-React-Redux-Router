import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './windowDetail.css';

const WindowDetail = ({ detailListing, history, onFavorite }) => {
  if (!detailListing) {
		history.push('/');
		return null;
	}
	
  let strBedroom;
  let strBathroom;
  let listing = detailListing.listing;
  let id = detailListing.id;
  let separator = " * ";
  let classHeart = detailListing.isFavorite ? "fas" : "far";
  let strKeywords = separator + listing.keywords.split(", ").join(separator);
  let strSize = !listing.size ? "" : separator + listing.size + " sq.ft";

  if (!listing.bedroom_number) {
    strBedroom = "";
  }
  const bedroomTitle = listing.bedroom_number === 1 ? " Bedroom " : " Bedrooms";
  strBedroom = `${separator} ${listing.bedroom_number} ${bedroomTitle}`;

  if (!listing.bathroom_number) {
    strBathroom = "";
  }
  const bathroomTitle = listing.bathroom_number === 1 ? " Bath" : " Baths";
  strBathroom = `${separator} ${listing.bathroom_number} ${bathroomTitle}`;

  return (
    <div className="listingModal">
      <div className="photo">
        <img src={listing.img_url} alt={listing.property_type}/>
        <i className={`${classHeart} fa-heart`} id="heartFullInfo" onClick={() => onFavorite(id)}></i>
      </div>        
      <div className="listingContent">
        <div className="titleListing"><h2>{listing.title}</h2></div>
        <div>
          <p>
            <strong>{listing.property_type[0].toUpperCase() + listing.property_type.slice(1)}</strong>
            {strKeywords}
            {strSize}
            {strBedroom}
            {strBathroom}
          </p>
          <p>{listing.summary}</p>
          <p><span className="updated">{listing.updated_in_days_formatted}</span> on {listing.datasource_name.toUpperCase()}</p>
        </div>
        <div className="priceListing"><p>{listing.price_formatted}pm</p></div>
      </div>
    </div>
  );
};

WindowDetail.propTypes = {
  detailListing: PropTypes.object,
  history: PropTypes.object,
  onFavorite: PropTypes.func,
};

export default withRouter(WindowDetail);