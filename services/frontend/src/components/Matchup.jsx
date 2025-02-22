import React from 'react';
import PropTypes from 'prop-types';
import MatchupSong from './MatchupSong';

export default function Matchup({ song1, song2 }) {
  return (
    <li className="d-flex justify-content-between mb-2 border-bottom">
      <MatchupSong song={song1} />
      <div>
        vs.
      </div>
      <MatchupSong song={song2} />
    </li>
  );
}

Matchup.propTypes = {
  song1: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  song2: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
