import { React, useContext } from 'react';
import { Context } from './BracketContext';

function ArtistName() {
  const value = useContext(Context);
  const [state] = value;

  return (
    <>
      <h1>{state.values.artist_name}</h1>
      <h2>
        Round
        {state.round}
      </h2>
    </>
  );
}

export default ArtistName;
