/* eslint-disable */
// components/SearchComponent.js
import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; // No longer strictly needed for this pattern
// import { setSearchTerm, clearSearchTerm } from '../features/search/searchSlice'; // No longer needed
import { useStartSearchMutation, useLazyGetTaskStatusQuery, useLazyGetArtistsQuery } from '../services/jsonServerApi'; // Import the lazy query hook

import Loading from '../components/Loading';

export default function ArtistSearch() {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const intervalRef = useRef(null);
  const [query, setQuery] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [results, setResults] = useState(null);

  const [startSearch, { isLoading: isSubmitting }] = useStartSearchMutation();
  const [triggerStatus, { data: statusData }] = useLazyGetTaskStatusQuery();

  const isPolling = taskId && (!statusData || (statusData.status !== 'SUCCESS' && statusData.status !== 'FAILURE'));



  // useLazyGetArtistsQuery returns a tuple:
  // 1. A "trigger" function to initiate the query.
  // 2. An object containing the query's state (data, isLoading, isError, error, isSuccess).
  const [triggerSearch, { data: artists, isLoading, isError, error, isSuccess }] = useLazyGetArtistsQuery();

  const handleChange = (event) => {
    console.log("handleChange")
    setLocalSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit")
    setTaskId(null);
    setResults(null);
    event.preventDefault();
    if (localSearchTerm.trim()) {
      try {
        const result = await triggerSearch(localSearchTerm.trim()); // Trigger the API call with the search term
        console.log(result.data.task_id);
        setTaskId(result.data.task_id);
      } catch (err) {
        console.error(err);
      }
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
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '800px', margin: '20px auto' }}>
      <h2>Artist Search</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search"
          value={localSearchTerm}
          onChange={handleChange}
          style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button
          type="submit"
          disabled={isLoading} // Disable button while loading
          className='btn btn-primary'
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {isLoading && <p style={{ marginTop: '15px', color: '#007bff' }}>Loading artists...</p>}
      {isError && <p style={{ marginTop: '15px', color: '#dc3545' }}>Error: {error?.message || 'Something went wrong.'}</p>}

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
  );
}
