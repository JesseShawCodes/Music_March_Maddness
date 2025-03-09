/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import MatchupSong from './MatchupSong';
import { useContext } from 'react';
import { Context } from './BracketContext';

export default function Matchup({ song1, song2, groupName, round, index }) {
  const value = useContext(Context);
  const [state] = value;
  return (
    <>
      <div className='d-flex justify-content-between mb-2 border-bottom'>
      <MatchupSong song={song1.song} opponent={song2.song} />
      <div>
        vs.
      </div>
      <MatchupSong song={song2.song} opponent={song1.song} matchupId={state.bracket[groupName].round1[index].matchupId} />
      </div>
      <div>
        {state.bracket[groupName].round1[index].matchupId}
      </div>
      <div>
        {state.bracket[groupName].round1[0].winner ? <span>Winner picked</span> : <span>No Winner Yet</span>}
      </div>
    </>
  );
}

Matchup.propTypes = {
  song1: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  song2: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

/*
  Disable winner vs. Loser (disabled or enabled)

    import React from 'react';

    function MyComponent({ disabled, children }) {
      const style = {
        opacity: disabled ? 0.6 : 1,
        backgroundColor: disabled ? '#e0e0e0' : '#007bff', // Bootstrap primary color
        color: disabled ? '#9e9e9e' : '#fff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
      };

      return (
        <button style={style} disabled={disabled}>
          {children}
        </button>
      );
    }
*/
