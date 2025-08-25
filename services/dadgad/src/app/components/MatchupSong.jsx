"use client";
import { React, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../context/BracketContext';
import { findObjectById, generateNextRound } from '../services/dataService';

export default function MatchupSong({
  thissong, opponent, matchupId, round, group, winner,
}) {
  const value = useContext(Context);
  const [state, dispatch] = value;
  const championship = Object.keys(state.championshipBracket).length !== 0;
  const [boxShadow, setBoxShadow] = useState('none');
  let finalTwo;

  if (championship) {
    if (state.championshipBracket.round6) {
      finalTwo = state.championshipBracket.round6.roundMatchups ? true : null;
    }
  } 
  let currentPositionBracket;

  if (championship) {
    currentPositionBracket = state.championshipBracket;
  } else {
    currentPositionBracket = state.bracket;
  }

  const bgColor = thissong.song.attributes.artwork.bgColor;

  const nextRound = () => {
    var len = Object.keys(currentPositionBracket).length;
    var groupProg = 0;

    if (!championship) {
      for (const key in state.bracket) {
        if (typeof state.bracket[key][`round${state.round}`].progress != undefined) {
          groupProg += state.bracket[key][`round${state.round}`].progress;
        }
      }
      var currentRoundProgres = groupProg/len;
    } else {
      for (const key in state.championshipBracket) {
        groupProg += state.championshipBracket[key].progress;
      }
      var currentRoundProgres = groupProg;
    }
    
    dispatch(
      { type: 'setCurrentRoundProgres', payload: {currentRoundProgres: currentRoundProgres}},
    )
    if (currentRoundProgres === 1) {
      dispatch({ type: 'setRound', payload: { round: state.round + 1 } });
      let nextRound;
      nextRound = generateNextRound(state);
      let updatedBracket = {
        ...state.bracket
      }
      // Final Four needs to be handled here
      // nextRound is an array of 2 for Final Four
      // nextRound is a object for prior rounds
      // If Down to the final 4 songs (Championship Round)
      if (Array.isArray(nextRound)) {
        updatedBracket = {...state.championshipBracket}

        if (nextRound.length == 2) {
          updatedBracket = {
            round5: {
              progress: 0,
              roundMatchups: nextRound,
            },
            round6: {
              progress: null,
              roundMatchups: null,
            },
          }
        }
        if (nextRound.length == 1) {
          updatedBracket.round6 = {
            progress: 0,
            roundMatchups: [nextRound[0]],
          }
        }
        dispatch({
          type: 'setChampionshipBracket',
          payload: {
            championshipBracket: updatedBracket,
          }
        })

      } else {
        let nextRoundNumber = `round${state.round + 1}`;
        updatedBracket[`group1`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group1`]}
        updatedBracket[`group2`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group2`]}
        updatedBracket[`group3`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group3`]}
        updatedBracket[`group4`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group4`]}
      }
    }
  }

  // This function runs when winner is selected. Initial handling of selection and state editing
  const selectWinner = () => {
    if (finalTwo) {
      dispatch({
        type: 'setChampion',
        payload: {
          champion: thissong,
        },
      });
      return;
    }
    let bracketObject;
    if (championship) {
      bracketObject = state.championshipBracket;
    } else {
      bracketObject = state.bracket;
    }
    let updatedBracket = {
      ...bracketObject,
    }

    let objectToSearch;
    if (championship) {
      objectToSearch = state.championshipBracket[`round${state.round}`];
    } else {
      objectToSearch = state.bracket[group][`round${round}`]
    }

    let findObject = findObjectById(objectToSearch, matchupId);
    findObject.attributes.winner = thissong.song;
    findObject.attributes.loser = opponent.song;
    findObject.attributes.matchupComplete = true;

    // Round group is a list of matchups for the current round and the selected group
    let roundGroup;

    if (championship) {
      updatedBracket = {
        ...state.championshipBracket,
      }
      roundGroup = updatedBracket[`round${state.round}`].roundMatchups;
    } else {
      roundGroup = updatedBracket[group][`round${round}`].roundMatchups;
    }

    let completedProgress = 0;
    for (let i = 0; i < roundGroup.length; i += 1 ) {
      roundGroup[i].attributes.matchupComplete ? completedProgress += 1 : null;
    }

    if (!championship) {
      updatedBracket[group][`round${round}`].progress = completedProgress/roundGroup.length;
      dispatch({
        type: 'setBracket',
        payload: {
          bracket: updatedBracket
        },
      });
    } else {
      updatedBracket[`round${state.round}`].progress = completedProgress/roundGroup.length;
    }


    nextRound();
  };

  winner = typeof (winner) !== "undefined" ? winner.id : null

  return (
    <button className="w-50 user-select-none btn" 
      style={{ 
        color: `#${thissong.song.attributes.artwork.textColor1}`, 
        backgroundColor: `#${bgColor}`,
        boxShadow: boxShadow,
      }}
      onFocus={() =>
        setBoxShadow(`0 0 10px #${bgColor}, 0 0 10px #${thissong.song.attributes.artwork.textColor1}`)
      }
      onBlur={() => setBoxShadow('none')}
    data-song-id={thissong.song.id} onClick={selectWinner}>
      {thissong.song.attributes.name} { winner == thissong.song.id ? <FontAwesomeIcon icon={faCheckCircle} className='text-success' /> : null }
    </button>
  );
}

MatchupSong.propTypes = {
  thissong: PropTypes.shape({
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
  }).isRequired,
};
