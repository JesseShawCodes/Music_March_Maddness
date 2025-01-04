import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetArtistsQuery } from '../services/jsonServerApi';

export default function ArtistSearch() {
  const location = useLocation();
  const [artist, setArtist] = useState();
  const [searchTerm, setSearchTerm] = useState('');

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
      setSearchTerm(event.target.value);
      setArtist(event.target.value);
      setSkip(false);
    } else {
      setSearchTerm('');
      setArtist('');
      setSkip(true);
    }
  };

  return (
    <div className="my-4 w-90 mx-auto">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />

      {
        isError ? `${<div>Error</div>}` : ''
      }

      {
        isLoading ? `${<div>Loading</div>}` : ''
      }

      <div className="card-deck">
        {musicQuery.length !== 0 ? musicQuery.results.artists.data.map((artistResult) => (
          <div className="mt-4 mx-4 card border-secondary artist-search-card" key={artistResult.id}>
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
        )) : 'No Data Available'}
      </div>

    </div>
  );
}
