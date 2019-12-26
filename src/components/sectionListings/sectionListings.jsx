import React, { Fragment } from 'react';
import List from '../list/list.jsx';
import PropTypes from 'prop-types';
import './sectionListings.css';

const SectionListings = ({ listings, onFavorite, onHandleLoad, onHandleDetailed }) => {
	return (
		<Fragment>
			<List 
				listings={listings}
				onHandleDetailed={onHandleDetailed}
				onFavorite={onFavorite} />
			{listings.length > 0 && 			
				<div className="btnLoad" id="btnLoad" onClick={onHandleLoad}>
					<button>Load more...</button>
				</div>
			}
		</Fragment>
	);
};

SectionListings.propTypes = {
  listings: PropTypes.array,
  onFavorite:PropTypes.func,
  onHandleLoad:PropTypes.func,
  onHandleDetailed:PropTypes.func,
};

export default SectionListings;

