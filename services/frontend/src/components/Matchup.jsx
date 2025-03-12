/* eslint-disable */
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import MatchupSong from './MatchupSong';
import { Context } from './BracketContext';

export default function Matchup({
  song1, song2, matchup, groupName, index,
}) {
  const value = useContext(Context);
  const [state] = value;

  const matchupAttributes = state.bracket[`${groupName}`][`round${matchup.round}`].roundMatchups[index].attributes;

  return (
    <>
      <div className="d-flex justify-content-between mb-2 border-bottom">
      <MatchupSong
        thissong={song1}
        opponent={song2}
        matchupId={matchup.matchupId}
        round={matchup.round}
        group={groupName}
        winner={matchupAttributes.winner}
      />
        <div>
          vs.
        </div>
      <MatchupSong
        thissong={song2}
        opponent={song1}
        matchupId={matchup.matchupId}
        round={matchup.round}
        group={groupName}
        winner={matchupAttributes.winner}
      />
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
