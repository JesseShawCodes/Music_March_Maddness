import React from 'react';
import PropTypes from 'prop-types';

import Song from '../pages/Song';

function TopTracks({ musicQuery, values }) {
  return (

    <ol className="song-list" id="collapseExample">
      {
        Object.prototype.hasOwnProperty.call(values, 'top_songs_list')
          ? (
            musicQuery.top_songs_list.map((song) => (
              <Song song={song} key={song.id} />
            ))
          )
          : null
      }
    </ol>
  );
}

export default TopTracks;

TopTracks.propTypes = {
  musicQuery: PropTypes.shape({
    top_songs_list: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
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
  values: PropTypes.shape({
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
