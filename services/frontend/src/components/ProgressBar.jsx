import PropTypes from 'prop-types';
import React from 'react';

function ProgressBar({ value, max = 100 }) {
  return (
    <div className="progress w-50 mx-auto my-4" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax={max}>
      <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{ width: `${value}%` }} />
    </div>
  );
}

export default ProgressBar;

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
