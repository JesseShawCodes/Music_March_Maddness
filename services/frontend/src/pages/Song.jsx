import React from 'react';
import PropTypes from 'prop-types';

export default function Song({ song }) {
  return (
    <li style={{ color: `#${song.attributes.artwork.textColor1}`, backgroundColor: `#${song.attributes.artwork.bgColor}` }}>
      {song.attributes.name }
      -
      {song.attributes.albumName}
    </li>
  );
}

Song.propTypes = {
  song: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
