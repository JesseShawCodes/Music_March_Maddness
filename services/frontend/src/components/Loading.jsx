import { React } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loading({ message }) {
  return (
    <div className="loading">
      {message}
      <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
    </div>
  );
}

export default Loading;

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: 'Loading...',
};
