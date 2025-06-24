"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useStartSearchMutation, useLazyGetTaskStatusQuery } from '../services/jsonServerApi';

import Loading from '../components/Loading';
import { ReduxProvider } from '../ReduxProvider';
import store from '../store';

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

  // Initiate Polling
  useEffect(() => {
    if (!taskId) return undefined;
    intervalRef.current = setInterval(() => {
      triggerStatus(taskId);
    }, 2000);

    return () => {
      // "Clearing polling interval"
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [taskId, triggerStatus]);

  // Turn off Polling
  useEffect(() => {
    if (statusData?.status === 'SUCCESS') {
      setResults(statusData.result);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else if (statusData?.status === 'FAILURE') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [statusData]);

  const artistList = (res) => res.results.artists.data.map((artistResult) => (
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
          <button onClick={handleSearch} disabled={isSubmitting} className="btn btn-primary" type="submit">Search</button>
        </form>
        </div>
  
        {error && <p>{error.message}</p>}
  
        {(isSubmitting || isPolling) && <Loading message="Submitting Search..." />}
  
        {statusData && statusData.status === 'PENDING' && (
          <Loading message="Queued... waiting for results." />
        )}
  
        {results && (
          <div className="grid d-flex flex-wrap justify-content-center">
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
