import { React } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGetArtistInfoQuery } from '../services/jsonServerApi';

import BackToTop from '../components/BackToTop';
import Song from './Song';

function ArtistPage() {
  const { handle } = useParams();

  const {
    data: musicQuery = [],
    isError,
  } = useGetArtistInfoQuery(handle);

  if (!musicQuery.top_songs_list) {
    return (
      <div className="loading">
        Loading...
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container">
      <BackToTop />
      <p>We have determined these to be the top songs for this artist.</p>
      <ol className="song-list">
        {
        Object.prototype.hasOwnProperty.call(musicQuery, 'top_songs_list')
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
