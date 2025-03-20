import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loading() {
  return (
    <div className="loading">
      Loading...
      <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
    </div>
  );
}

export default Loading;
