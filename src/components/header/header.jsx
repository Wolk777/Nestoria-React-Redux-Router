import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './header.css';

const Header = ({ value, onHandleLocation, onSearch}) => {
	return (
	<header className="header">
		<div className="container">
			<span>
				<img src={require("../../image/logo.png")} alt="Nestoria logo" className="logo"/> 
				<em>Nestoria</em>
			</span>
			<div>
				<input type="text" id="inputSearch" value={value} onChange={onHandleLocation}/>
				<button id="btnSearch" onClick={onSearch}>Search</button>
			</div>
			<Link to="/favorite"><i className="fas fa-heart" id="heartFavorite"></i></Link>
		</div>
	</header>
	);
};

Header.propTypes = {
  value: PropTypes.string,
  onHandleLocation:PropTypes.func,
  onSearch:PropTypes.func,
};

export default Header;
