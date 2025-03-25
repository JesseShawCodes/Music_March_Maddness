/*eslint-disable*/
import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import Matchup from './Matchup';
import { Context } from '../context/BracketContext';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Group({ groupName, matchups, round }) {
  const value = useContext(Context);
  const [state] = value;

  let groupMatchups = matchups.roundMatchups;
  return (
    <div className={groupName} key={groupName}>
      <h2 className="mt-1">
        {groupName} {state.bracket[groupName][round].progress == 1 ? <FontAwesomeIcon icon={faCheckCircle} className="text-success" /> : null}
      </h2>
      <div>
        { 
          state.bracket[groupName][round].progress < 1 && state.nonGroupPlay == false ? 
          <ProgressBar value={state.bracket[groupName][round].progress * 100} key={`${groupName}_${round}_progress`}/>
          : null
        }
      </div>
      <ul className="list-group">
        {groupMatchups.map((matchup, index) => (
          <li className="list-group-item" key={matchup.matchupId}>
            <Matchup
              song1={matchup.attributes.song1}
              song2={matchup.attributes.song2}
              matchup={matchup}
              key={matchup.matchupId}
              groupName={groupName}
              index={index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Group;

Group.propTypes = {
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
