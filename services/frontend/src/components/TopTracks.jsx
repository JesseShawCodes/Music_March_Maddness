/*eslint-disable*/
import React, { useContext } from 'react';
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
