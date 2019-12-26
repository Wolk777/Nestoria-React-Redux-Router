import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './wrapperContent.css';

const WrapperContent = ({ children }) => {
  return (
    <div className='wrapperContent'>
      <header>
        <Link to='/'>
          <i className='fa fa-times'></i>
        </Link>
      </header>
      <div className='wrapperMain'>
        {children}
      </div>
    </div>
  );
};

WrapperContent.propTypes = {
  children: PropTypes.object,
};

export default WrapperContent;