import React, { useState, useEffect, useRef } from 'react';
import { useStartSearchMutation, useLazyGetTaskStatusQuery } from '../services/jsonServerApi';

import Loading from '../components/Loading';

export default function ArtistSearch() {
  const intervalRef = useRef(null);
  const [query, setQuery] = useState('');
  const [taskId, setTaskId] = useState(null);

  const [startSearch, { isLoading: isSubmitting }] = useStartSearchMutation();
  const [triggerStatus, { data: statusData }] = useLazyGetTaskStatusQuery();

  // Submit handler
  const handleSearch = async () => {
    try {
      const result = await startSearch(query).unwrap();
      setTaskId(result.task_id);
    } catch (err) {
      console.error('Failed to start search:', err);
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
    if (statusData?.status === 'SUCCESS' || statusData?.status === 'FAILURE') {
      clearInterval(intervalRef.current);
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
    <div className="my-4 w-90 mx-auto">
      <form>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={isSubmitting} className="btn btn-primary" type="submit">Search</button>
      </form>

      {
        isSubmitting ? <Loading /> : null
      }

      {statusData && (
        <div>
          <p>
            Status:
            {statusData.status}
          </p>
          <div className="grid d-flex flex-wrap justify-content-center">{statusData.status === 'SUCCESS' ? artistList(statusData.result) : <Loading />}</div>
        </div>
      )}
    </div>
  );
}
