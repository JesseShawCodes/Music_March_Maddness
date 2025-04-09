/* eslint-disable */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetTaskStatusQuery, useGetAristsMutation } from '../services/jsonServerApi';
import { useDispatch, useSelector } from 'react-redux';
import { startTask } from '../services/taskStatus';

import Loading from '../components/Loading';

export default function ArtistSearch() {
  const location = useLocation();
  const [startSearch] = useGetAristsMutation();
  const [artist, setArtist] = useState();
  const [taskId, setTaskId] = useState(null);
  const [triggerStatus, { data: taskStatus }] = useLazyGetTaskStatusQuery();
  
  let skipParam = true;
  const [skip, setSkip] = React.useState(skipParam);


  if (location.search) {
    skipParam = false;
  }
  /*
  const {
    data: musicQuery = [],
    error,
    isLoading,
    isError,
  } = useGetArtistsQuery(artist, { skip });


  const handleChange = (event) => {
    // navigate(`${location.pathname}?q=${event.target.value}`)
    if (event.target.value.length > 0) {
      setArtist(event.target.value);
      setSkip(false);
      if (musicQuery['status'] == 'queued') {
        setTaskId(musicQuery['task_id'])
        pollTaskStatus(taskId);
      }
    } else {
      setArtist('');
      setSkip(true);
    }
  };
  */

  const handleChange = async (event) => {
    // console.log(event.target.value);
    if (event.target.value.length > 0) {
      const { task_id } = await startSearch(event.target.value).unwrap();
      setTaskId(task_id);
      pollTaskStatus(task_id);
      setArtist(event.target.value);
      setSkip(false);
    } else {
      setArtist('');
      setSkip(true);
    }
  }

  const pollTaskStatus = async (taskId) => {
    console.log(taskId);
    const interval = setInterval(async () => {
      const data = await triggerStatus(taskId).unwrap();
      if (data.status === 'SUCCESS') {
        console.log('TASK RESULT')
      } else if (data.status === "FAILURE") {
        console.log("FAILURE")
      } else {
        console.log(data)
      }
    }, 3000) // poll every 10 seconds
  }

  return (
    <div className="my-4 w-90 mx-auto">
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />



      <div className="grid d-flex flex-wrap justify-content-center">
        
      </div>

    </div>
  );
}
