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

    if (!state.finalFour && !state.finalTwo) {
      for (const key in state.bracket) {
        if (typeof state.bracket[key][`round${state.round}`].progress != undefined) {
          groupProg += state.bracket[key][`round${state.round}`].progress;
        }
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

      if (state.nonGroupPlay) {
        updatedBracket[`finalFour`] = {progress: 0, roundMatchups: []};
        dispatch( {type: 'setFinalFour', payload: { finalFour: true }});
        
        updatedBracket.finalFour = {round1: {progress: 0, roundMatchups: nextRound}}

        dispatch({
          type: 'setBracket',
          payload: {
            bracket: updatedBracket
          },
        });
        dispatch({
          type: 'setChampionshipBracket',
          payload: {
            championshipBracket: updatedBracket.finalFour,
          }
        })
      } else {
        let nextRoundNumber = `round${state.round + 1}`;
        updatedBracket[`group1`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group1`]}
        updatedBracket[`group2`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group2`]}
        updatedBracket[`group3`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group3`]}
        updatedBracket[`group4`][nextRoundNumber] = {progress: 0, roundMatchups: nextRound[`group4`]}
  
        if ("roundMatchups" in updatedBracket[`group1`][nextRoundNumber]) {
          updatedBracket[`group1`][nextRoundNumber].roundMatchups.length == 1 ? dispatch({ type: 'setNonGroupPlay', payload: { nonGroupPlay: true } }) : null
        }
      }
    }
  }

  const handleClick = () => {
    const updatedBracket = {
      ...state.bracket,
    }
    let objectToSearch;
    if (state.finalFour || state.finalTwo) {
      objectToSearch = state.bracket.finalFour.round1;
    } else {
      objectToSearch = state.bracket[group][`round${round}`]
    }

    let findObject = findObjectById(objectToSearch, matchupId);

    findObject.attributes.winner = thissong.song;
    findObject.attributes.loser = opponent.song;
    findObject.attributes.complete = true;

    let roundGroup;

    if (state.finalFour || state.finalTwo) {
      roundGroup = updatedBracket.finalFour.round1.roundMatchups;
    } else {
      roundGroup = updatedBracket[group][`round${round}`].roundMatchups;
    }

    let completedProgress = 0;
    for (let i = 0; i < roundGroup.length; i += 1 ) {
      roundGroup[i].attributes.complete ? completedProgress += 1 : null;
    }

    if (!state.finalFour && !state.finalTwo) {
      updatedBracket[group][`round${round}`].progress = completedProgress/roundGroup.length;
    }
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
  }).isRequired,
};
