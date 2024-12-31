/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable brace-style */
/* eslint-disable jsx-quotes */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable  no-multiple-empty-lines */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prefer-template */

import React, { useState } from 'react';
import { useGetArtistsQuery } from "../services/jsonServerApi";
import { useNavigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';

export default function ArtistSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [artist, setArtist] = useState();
  const [searchTerm, setSearchTerm] = useState("");
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
    navigate(`${location.pathname}?q=${event.target.value}`)
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
                          artist.attributes.hasOwnProperty("artwork") ? <img src={artist.attributes.artwork.url} class="card-img-top"/> : <p> No Image Available</p>
                        }
                              <h2>
                            {artist.attributes.name}
                              </h2>
                        </div>
                        )) : "_No Data Available"
                    }
                  </div>
        </div>
    )
}
