import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetArtistsQuery } from '../services/jsonServerApi';

export default function ArtistSearch() {
  const location = useLocation();
  const [artist, setArtist] = useState();

  let skipParam = true;
  if (location.search) {
    skipParam = false;
  }

  const [skip, setSkip] = React.useState(skipParam);
  const {
    data: musicQuery = [],
    isLoading,
    isError,
  } = useGetArtistsQuery(artist, { skip });

  const handleChange = (event) => {
    // navigate(`${location.pathname}?q=${event.target.value}`)
    if (event.target.value.length > 0) {
      setArtist(event.target.value);
      setSkip(false);
    } else {
      setArtist('');
      setSkip(true);
    }
  };

  return (
    <div className="my-4 w-90 mx-auto">
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />

      {
        isError ? <div>Error</div> : null
      }

      {
        isLoading ? <div>Loading</div> : null
      }

      <div className="grid d-flex flex-wrap justify-content-center">
        {musicQuery.length !== 0 ? musicQuery.results.artists.data.map((artistResult) => (
          <div className="mt-4 mx-4 card border-secondary artist-search-card g-col-6 g-col-md-4" key={artistResult.id}>
            {
              Object.prototype.hasOwnProperty.call(artistResult.attributes, 'artwork') ? <img src={artistResult.attributes.artwork.url} className="card-img-top" alt={`${artistResult.attributes.name} promo`} /> : <p> No Image Available</p>
            }
            <h2>
              {artistResult.attributes.name}
            </h2>
            <a href={`artist/${artistResult.id}`} className="btn btn-primary" id={artistResult.id}>
              Choose this artist
            </a>
          </div>
        )) : null}
      </div>

    </div>
  );
}
