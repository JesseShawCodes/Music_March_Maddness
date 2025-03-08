/*eslint-disable*/
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from './BracketContext';

export default function MatchupSong({ song }) {
  const value = useContext(Context);
  const [state, dispatch] = value;

  /* Next Round Logic Needs to happen here */

  const handleClick = () => {
    dispatch({
      type: 'setBracket',
      payload: {
        bracket: {
          round1: state.bracket.round1,
          round2: {},
        },
      },
    });
  };

  return (
    <div className="w-50" style={{ color: `#${song.attributes.artwork.textColor1}`, backgroundColor: `#${song.attributes.artwork.bgColor}` }} aria-hidden="true" data-song-id={song.id} onClick={handleClick}>
      {song.attributes.name}
    </div>
  );
}

MatchupSong.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artistName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

/*
<img
  className="album-cover"
  src={`${song.attributes.artwork.url.replace(/{w}|{h}/g, (match) => dimensions[match])}`}
  alt={`${song.attributes.albumName} Album Cover`}
/>
*/
