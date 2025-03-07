/*eslint-disable*/
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Song from '../pages/Song';
import { Context } from './BracketContext';

function TopTracks() {
  const value = useContext(Context);
  const [state, dispatch] = value;

  return (
    <ol className="song-list" id="collapseExample">
      {
        Object.prototype.hasOwnProperty.call(state.values, 'top_songs_list')
          ? (
            state.values.top_songs_list.map((song) => (
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
  values: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
