/*eslint-disable*/
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from './BracketContext';
import { arrayHandler, findNestedObject, findObjectById } from '../services/dataService';

export default function MatchupSong({ song, opponent, matchupId }) {
  const value = useContext(Context);
  const [state, dispatch] = value;

  /* Next Round Logic Needs to happen here */

  const createNextRoundMatchup = () => {
    console.log("Create Next Round Matchups");
  }

  const handleClick = () => {
    const updatedBracket = {
      ...state.bracket,
    }

    // let nestedObject = findNestedObject(state.bracket, "matchupId", matchupId)

    console.log(state.bracket.group1.round1);

    let findObject = findObjectById(state.bracket.group1.round1, matchupId);

    console.log(findObject);


    // const newArray = arrayHandler(song.id, opponent.id, updatedBracket['Group 1']['round1Loser']);
    // console.log(newArray);
    // updatedBracket['Group 1']['round1Loser'] = newArray;
    // console.log(updatedBracket);
    /*
    // console.log("Hello...")
    dispatch({
      type: 'setBracket',
      payload: {
        bracket: updatedBracket
      },
    });
    */
  };

  return (
    <div className="w-50" style={{ color: `#${song.attributes.artwork.textColor1}`, backgroundColor: `#${song.attributes.artwork.bgColor}` }} aria-hidden="true" data-song-id={song.id} onClick={handleClick}>
      {song.attributes.name}
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
