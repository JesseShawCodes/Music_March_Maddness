/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetArtistsQuery, useStartSearchMutation, useLazyGetTaskStatusQuery } from '../services/jsonServerApi';

import Loading from '../components/Loading';

export default function ArtistSearch() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [artist, setArtist] = useState();
  const [taskId, setTaskId] = useState(null);
  const [results, setResults] = useState();

  const [startSearch, { isLoading: isSubmitting }] = useStartSearchMutation();
  const [triggerStatus, { data: statusData }] = useLazyGetTaskStatusQuery();

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
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length > 0) {
      try {
        console.log("...")
        setArtist(query);
        setSkip(false);
        const result = await startSearch(query).unwrap();
        setTaskId(result.task_id);
      } catch (err) {
        console.error('Failed to start search:', err);
      }

    } else {
      setArtist('');
      setSkip(true);
    }
  };

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(() => {
      console.log(taskId);
      triggerStatus(taskId);
    }, 2000); // poll every 2 seconds

    return () => clearInterval(interval);
  }, [taskId, triggerStatus]); 

  const artistList = () => {
    return musicQuery.results.artists.data.map((artistResult) => (
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
    ))
  }

  return (
    <div className="my-4 w-90 mx-auto">
      <form>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary" type="submit">Search</button>
      </form>

      {
        isError ? <div className="text-danger">{error.error}</div> : null
      }

      {
        isLoading ? <Loading /> : null
      }

      <div className="grid d-flex flex-wrap justify-content-center">
        {
          musicQuery.status === 'success' ? artistList() : (<div><div>`Your search is {musicQuery.status}.</div><div> task: {musicQuery.task_id}`</div></div>)
        }
      </div>

    </div>
  );
}
