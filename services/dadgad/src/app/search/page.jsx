"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useStartSearchMutation, useLazyGetTaskStatusQuery } from '../services/jsonServerApi';

import Loading from '../components/Loading';
import { ReduxProvider } from '../ReduxProvider';
import store from '../store';
import ArtistCardSkeleton from '../components/skeleton_loaders/ArtistCardSkeleton';

import { usePollingTask } from '../hooks/usePollingTask';
import ArtistSearchCard from '../components/ArtistSearchCard';

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

  const artistList = (res) => res.results.artists.data.map((artistResult) => (<ArtistSearchCard key={artistResult.id} artistResult={artistResult}/>));

  return (
    <ReduxProvider store={store}>
      <div className="my-4 w-90 mx-auto">
        <div className='container d-flex justify-content-center'>
          <div className=''>
            <h1>Search for Artist</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className='d-flex justify-content-center'>
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button disabled={isSubmitting} className="btn btn-primary" type="submit">Search</button>
            </form>
          </div>
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
          <div className="container grid d-flex flex-wrap justify-content-center">
            <p className="text-danger">There was an error processing your search. Please try again.</p>
            <p>{JSON.stringify(statusData)}</p>
          </div>
        )}
      </div>
    </ReduxProvider>
  );
}

export default SearchPage;
