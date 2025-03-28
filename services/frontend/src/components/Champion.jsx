import { React, useContext } from 'react';
import { Context } from '../context/BracketContext';

function Champion() {
  const value = useContext(Context);
  const [state] = value;

  return (
    <div className="mt-4">
      <h2>{state.champion.song.attributes.name}</h2>
      <button type="button" className="btn btn-primary">
        Generate Bracket Image
      </button>
    </div>
  );
}

export default Champion;
