"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useStartSearchMutation, useLazyGetTaskStatusQuery } from '../services/jsonServerApi';

import Loading from '../components/Loading';
import { ReduxProvider } from '../ReduxProvider';
import store from '../store';
import ArtistCardSkeleton from '../components/skeleton_loaders/ArtistCardSkeleton';

import { usePollingTask } from '../hooks/usePollingTask';

function SearchPage() {
  const intervalRef = useRef(null);
  const [query, setQuery] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  
  const [startSearch, { isLoading: isSubmitting }] = useStartSearchMutation();
  const [triggerStatus, { data: statusData }] = useLazyGetTaskStatusQuery();

  const isPolling = taskId && (!statusData || (statusData.status !== 'SUCCESS' && statusData.status !== 'FAILURE'));


  // Submit handler
  const handleSearch = async () => {
    setTaskId(null);
    setError(null);
    setResults(null);
    try {
      const result = await startSearch(query).unwrap();
      setTaskId(result.task_id);
    } catch (err) {
      setError(err);
    }
  };

  usePollingTask(
    taskId, 
    triggerStatus, 
    statusData, 
    clearInterval,
    setResults,
    2000
  );

  const artistList = (res) => res.results.artists.data.map((artistResult) => (
    <div className="mt-4 mx-4 card artist-search-card g-col-6 g-col-md-4" key={artistResult.id}>
      {
        Object.prototype.hasOwnProperty.call(artistResult.attributes, 'artwork') ? <img src={artistResult.attributes.artwork.url} className="card-img-top" alt={`${artistResult.attributes.name} promo`} /> : <p> No Image Available</p>
      }
      <h2 className='text-center'>
        {artistResult.attributes.name}
      </h2>
      <a href={`artist/${artistResult.id}`} className="btn btn-primary" id={artistResult.id}>
        Choose this artist
      </a>
    </div>
  ));

  return (
    <ReduxProvider store={store}>
      <div className="my-4 w-90 mx-auto">
        <div className='d-flex justify-content-center'>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button disabled={isSubmitting} className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
  
        {error && <p>{error.message}</p>}
  
        {(isSubmitting || isPolling) && 
          <div className="container grid d-flex flex-wrap justify-content-center">
            <Loading message="Submitting Search..." />
          </div>
        }
  
        {statusData && statusData.status === 'PENDING' && (
          <div className="container grid d-flex flex-wrap justify-content-center">
            <ArtistCardSkeleton />
          </div>
        )}
  
        {results && (
          <div className="container grid d-flex flex-wrap justify-content-center">
            {artistList(results)}
          </div>
        )}
  
        {statusData && statusData.status === 'FAILURE' && (
          <p className="text-danger">There was an error processing your search. Please try again.</p>
        )}
      </div>
    </ReduxProvider>
  );
}

export default SearchPage;
