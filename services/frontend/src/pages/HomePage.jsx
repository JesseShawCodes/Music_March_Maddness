import React from 'react';
import PropTypes from 'prop-types';

function HomePage({ homeHeading = 'This is the Home page', homeContent = 'sfsafs' }) {
  return (
    <div className="container app-container">
      <h1>{homeHeading}</h1>
      {homeContent}
    </div>
  );
}

export default HomePage;

HomePage.propTypes = {
  homeHeading: PropTypes.string,
  homeContent: PropTypes.string,
};

HomePage.defaultProps = {
  homeHeading: 'This is the Home page',
  homeContent: 'fff',
};
