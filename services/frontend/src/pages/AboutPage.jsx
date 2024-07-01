import React from 'react';
import PropTypes from 'prop-types';

function AboutPage({ aboutHeading = 'This is the About page', aboutPageContent = 'sfsafs' }) {
    return (
        <div className="container app-container">
        <h1>{aboutHeading}</h1>
        {aboutPageContent}
        </div>
    );
}

export default AboutPage;


AboutPage.propTypes = {
  aboutHeading: PropTypes.string,
  aboutPageContent: PropTypes.string,
};

AboutPage.defaultProps = {
  aboutHeading: 'This is the About page',
  aboutPageContent: 'faskjfkh',
};
