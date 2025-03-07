/*eslint-disable*/
import {
  React, useEffect, useReducer, useContext,
} from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGetArtistInfoQuery } from '../services/jsonServerApi';

import BackToTop from '../components/BackToTop';
import TopTracks from '../components/TopTracks';
import BracketContext, { bracketReducer, Context, initialState } from '../components/BracketContext';
import ArtistPageForm from '../components/ArtistPageForm';
import ArtistName from '../components/ArtistName';

function ArtistPage() {
  const { handle } = useParams();
  const value = useContext(Context);
  const [state, dispatch] = useReducer(bracketReducer, initialState);
  /*
  const {
    data: musicQuery = {},
  } = useGetArtistInfoQuery(handle);

  useEffect(() => {
    if (Object.keys(musicQuery).length > 0) {
      dispatch({ type: 'setValues', payload: { values: musicQuery } });
    }
  }, [musicQuery]);

  useEffect(() => {
    console.log("Use Effect 2...")
    dispatch({ type: 'setValues', payload: { values: "TESTING!!" } })
  }, [])
  */
  const selectSong = (song) => {
    console.log(song);
  };

  return (
    <BracketContext>
      <div className="container-lg">
        <BackToTop />
        <ArtistName />
        <ArtistPageForm />
        <TopTracks />
      </div>
    </BracketContext>
  );
}

export default ArtistPage;
