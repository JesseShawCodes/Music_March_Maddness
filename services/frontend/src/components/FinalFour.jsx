/*eslint-disable*/
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import Matchup from './Matchup';
import { Context } from './BracketContext';

function FinalFour() {
  const value = useContext(Context);
  const [state] = value;

  return (
    <div className="Final Four" key="Final Four">
      <div>{state.bracket.finalFour.round1.roundMatchups.map((matchup, index) => (
        <Matchup
          song1={matchup.attributes.song1}
          song2={matchup.attributes.song2}
          matchup={matchup}
          key={matchup.matchupId}
          groupName="Final Four"
          index={index}
        />
      ))}</div>
    </div>
  );
}

export default FinalFour;

FinalFour.propTypes = {
  groupName: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  matchups: PropTypes.shape({
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
