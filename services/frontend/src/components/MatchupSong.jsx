/*eslint-disable*/
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from './BracketContext';
import { findObjectById, generateNextRound } from '../services/dataService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function MatchupSong({ thissong, opponent, matchupId, round, group, winner }) {
  const value = useContext(Context);
  const [state, dispatch] = value;

  const bgColor = thissong.song.attributes.artwork.bgColor;
  /* Next Round Logic Needs to happen here */

  const nextRound = () => {
    var len = Object.keys(state.bracket).length;
    var groupProg = 0;
    for (const key in state.bracket) {
      if (typeof state.bracket[key][`round${state.round}`].progress != undefined) {
        groupProg += state.bracket[key][`round${state.round}`].progress;
      }
    }
    var currentRoundProgres = groupProg/len;
    
    dispatch(
      { type: 'setCurrentRoundProgres', payload: {currentRoundProgres: currentRoundProgres}},
    )
    if (groupProg/len == 1) {
      dispatch({ type: 'setRound', payload: { round: state.round + 1 } });
      let nextRound = generateNextRound(state);
      const updatedBracket = {
        ...state.bracket
      }

      let nextRoundNumber = `round${state.round + 1}`;
      updatedBracket[`group1`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group1`]}
      updatedBracket[`group2`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group2`]}
      updatedBracket[`group3`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group3`]}
      updatedBracket[`group4`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group4`]}

      return "Round Completed! Click to load next round"
    }
  }

  const handleClick = () => {
    const updatedBracket = {
      ...state.bracket,
    }

    let findObject = findObjectById(state.bracket[group][`round${round}`], matchupId);
    
    findObject.attributes.winner = thissong.song;
    findObject.attributes.loser = opponent.song;
    findObject.attributes.complete = true;

    let roundGroup = updatedBracket[group][`round${round}`].roundMatchups;

    let completedProgress = 0;
    for (let i = 0; i < roundGroup.length; i += 1 ) {
      roundGroup[i].attributes.complete ? completedProgress += 1 : null;
    }

    updatedBracket[group][`round${round}`].progress = completedProgress/roundGroup.length;
    dispatch({
      type: 'setBracket',
      payload: {
        bracket: updatedBracket
      },
    });

    nextRound();
  };

  winner = typeof (winner) !== "undefined" ? winner.id : null

  return (
    <div className="w-50 user-select-none" style={{ 
      color: `#${thissong.song.attributes.artwork.textColor1}`, 
      backgroundColor: `#${bgColor}`,
    }} aria-hidden="true" data-song-id={thissong.song.id} onClick={handleClick}>
      {thissong.song.attributes.name} { winner == thissong.song.id ? <FontAwesomeIcon icon={faCheckCircle} className='text-success' /> : null }
    </div>
  );
}

MatchupSong.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artistName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  opponent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      albumName: PropTypes.string.isRequired,
      artistName: PropTypes.string.isRequired,
      artwork: PropTypes.shape({
        textColor1: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,};

/*
<img
  className="album-cover"
  src={`${song.attributes.artwork.url.replace(/{w}|{h}/g, (match) => dimensions[match])}`}
  alt={`${song.attributes.albumName} Album Cover`}
/>
*/
