/*eslint-disable*/
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import Matchup from './Matchup';
import ProgressBar from './ProgressBar';
import { Context } from './BracketContext';

function Championship() {
  const value = useContext(Context);
  const [state] = value;

  return (
    <div className="" key="Championship Round">
      <ProgressBar value={state.championshipBracket.round1.progress * 100} key={`Champion Ship Round Progress`}/>
      <div>{state.championshipBracket.round1.roundMatchups.map((matchup, index) => (
        <Matchup
          song1={matchup.attributes.song1}
          song2={matchup.attributes.song2}
          matchup={matchup}
          key={matchup.matchupId}
          groupName="Championship Round"
          index={index}
        />
      ))}</div>
    </div>
  );
}

export default Championship;

Championship.propTypes = {
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
