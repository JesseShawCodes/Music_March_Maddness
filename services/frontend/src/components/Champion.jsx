import { React, useContext } from 'react';
import { Context } from '../context/BracketContext';
import P5Image from './Bracket';

function Champion() {
  const value = useContext(Context);
  const [state] = value;

  return (
    <div className="mt-4">
      <h2>{state.champion.song.attributes.name}</h2>
      <P5Image
        song={state.champion.song.attributes.name}
        artistName={state.values.artist_name}
      />
    </div>
  );
}

export default Champion;
