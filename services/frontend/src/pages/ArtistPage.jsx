import { React } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGetArtistInfoQuery } from '../services/jsonServerApi';

import Albums from '../components/AlbumDetails';
import TopTracks from '../components/TopTracks';
import BackToTop from '../components/BackToTop';

function ArtistPage() {
  const { handle } = useParams();

  const {
    data: musicQuery = [],
    isError,
  } = useGetArtistInfoQuery(handle);

  if (!musicQuery.artist) {
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
      {
        !musicQuery.length !== 0
          ? (
            <div>
              <h1>
                {musicQuery.artist.name}
              </h1>
              <div className="container-sm">
                <img
                  src={musicQuery.artist.images[1].url}
                  className="img-fluid img-thumbnail"
                  alt={musicQuery.artist.name}
                />
              </div>
              <TopTracks listItems={musicQuery.tracks.tracks} />
              <h2>Albums</h2>
              <Albums listItems={musicQuery.albums.items} />
            </div>
          )
          : null
        }
    </div>
  );
}

export default ArtistPage;
