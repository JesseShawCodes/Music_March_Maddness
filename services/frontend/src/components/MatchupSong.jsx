/*eslint-disable*/
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from './BracketContext';
import findObjectById from '../services/dataService';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';

export default function MatchupSong({ thissong, opponent, matchupId, round, group, winner }) {
  const value = useContext(Context);
  const [state, dispatch] = value;

  const bgColor = thissong.song.attributes.artwork.bgColor;
  /* Next Round Logic Needs to happen here */

  const createNextRoundMatchup = () => {
    console.log("Create Next Round Matchups");
  }

  const calculateGroupProgress = () => {
    console.log("Calculate Group Progress");
  }

  const handleClick = () => {
    const updatedBracket = {
      ...state.bracket,
    }

    let findObject = findObjectById(state.bracket[group][`round${round}`], matchupId);
    
    findObject.attributes.winner = thissong.song.id;
    findObject.attributes.loser = opponent.song.id;
    findObject.attributes.complete = true;

    dispatch({
      type: 'setBracket',
      payload: {
        bracket: updatedBracket
      },
    });
  };

  return (
    <div className="w-50" style={{ 
      color: `#${thissong.song.attributes.artwork.textColor1}`, 
      backgroundColor: `#${bgColor}`,
      textDecoration: winner == thissong.song.id ? 'underline' : null,
    }} aria-hidden="true" data-song-id={thissong.song.id} onClick={handleClick}>
      {thissong.song.attributes.name}
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
