import React from 'react';
import PropTypes from 'prop-types';

export default function MatchupSong({ song, selectSong }) {
  const dimensions = {
    '{w}': 70,
    '{h}': 70,
  };

  return (
    <div className="w-50" style={{ color: `#${song.attributes.artwork.textColor1}`, backgroundColor: `#${song.attributes.artwork.bgColor}` }} onClick={selectSong} aria-hidden="true" data-testing={song.id}>
      <img className="album-cover" src={`${song.attributes.artwork.url.replace(/{w}|{h}/g, (match) => dimensions[match])}`} alt={`${song.attributes.albumName} Album Cover`} />
      {song.attributes.name}
    </div>
  );
}

MatchupSong.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
