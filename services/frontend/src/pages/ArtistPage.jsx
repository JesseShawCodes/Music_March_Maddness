import { React, useState, useEffect } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGetArtistInfoQuery } from '../services/jsonServerApi';

import BackToTop from '../components/BackToTop';
import Song from './Song';

function ArtistPage() {
  const { handle } = useParams();

  // State
  const [values, setValues] = useState([]);

  const {
    data: musicQuery = {},
  } = useGetArtistInfoQuery(handle);

  useEffect(() => {
    if (Object.keys(musicQuery).length > 0) {
      setValues(musicQuery);
    }
  }, [musicQuery]);

  if (!musicQuery.top_songs_list) {
    return (
      <div className="loading">
        Loading...
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </div>
    );
  }

  return (
    <div className="container">
      <BackToTop />
      <h1>
        {
          Object.prototype.hasOwnProperty.call(musicQuery, 'artist_name')
            ? (
              `${musicQuery.artist_name}`
            )
            : 'null'
        }
      </h1>
      <p>We have determined these to be the top songs for this artist.</p>
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
    </div>
  );
}

export default ArtistPage;
