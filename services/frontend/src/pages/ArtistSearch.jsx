/* eslint-disable */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetArtistsQuery } from '../services/jsonServerApi';

import Loading from '../components/Loading';

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
    error,
    isLoading,
    isError,
  } = useGetArtistsQuery(artist, { skip });

  const handleChange = (event) => {
    // navigate(`${location.pathname}?q=${event.target.value}`)
    console.log(musicQuery);
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
        isError ? <div className="text-danger">{error.error}</div> : null
      }

      {
        isLoading ? <Loading /> : null
      }

      <div className="grid d-flex flex-wrap justify-content-center">
        
      </div>

    </div>
  );
}
