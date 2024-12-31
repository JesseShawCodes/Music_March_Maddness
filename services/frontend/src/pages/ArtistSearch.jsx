import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetArtistsQuery } from '../services/jsonServerApi';
import useUser from '../hooks/useUser';

export default function ArtistSearch() {
  const location = useLocation();
  const [artist, setArtist] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUser();

  let skipParam = true;
  if (location.search) {
    skipParam = false;
  }

  const [skip, setSkip] = React.useState(skipParam);
  const {
    data: musicQuery = [],
    isLoading,
    isError,
    error,
  } = useGetArtistsQuery( artist, {skip});

  const handleChange = event => {
    // navigate(`${location.pathname}?q=${event.target.value}`)
    if (event.target.value.length > 0) {
      setSearchTerm(event.target.value);
      setArtist(event.target.value);
      setSkip(false);
    }
    else {
      setSearchTerm("");
      setArtist("");
      setSkip(true);
    }
  };

    return (
        <div className='w-90 mx-auto'>
            {
                user ?
                <input
                    type='text'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleChange}
                />
                :
                <section>You must be logged in to view this page.</section>

            }

            {
                isError ? `${<div>Error</div>}` : ""
            }
            {
                isLoading ? `${<div>Loading</div>}` : ""
            }
            <div>{isError}</div>
                  <div className="card-deck">
                    {musicQuery.length !== 0 ? musicQuery.results.artists.data.map((artist) => (
                      <div className="mt-4 mx-4 card border-secondary" style={{width: 18 + "rem"}} key={artist.id} >
                        {
                          artist.attributes.hasOwnProperty("artwork") ? <img src={artist.attributes.artwork.url} className="card-img-top" alt={artist.attributes.name + "Image"}/> : <p> No Image Available</p>
                        }
                              <h2>
                            {artist.attributes.name}
                              </h2>
                              <a href={"artist/" + artist.id} className='btn btn-primary' id={artist.id} >Choose this artist</a>
                        </div>
                        )) : "_No Data Available"
                    }
                  </div>
        </div>
    )
}
