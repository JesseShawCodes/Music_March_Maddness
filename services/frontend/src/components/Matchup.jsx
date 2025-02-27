import React from 'react';
import PropTypes from 'prop-types';
import MatchupSong from './MatchupSong';

export default function Matchup({ song1, song2, selectSong }) {
  return (
    <>
      <MatchupSong song={song1} selectSong={selectSong} />
      <div>
        vs.
      </div>
      <MatchupSong song={song2} selectSong={selectSong} />
    </>
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
  selectSong: PropTypes.func.isRequired,
};
