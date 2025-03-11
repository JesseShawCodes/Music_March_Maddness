/*eslint-disable*/
import { React } from 'react';
import PropTypes from 'prop-types';
import Matchup from './Matchup';

function Group({ groupName, matchups }) {
  return (
    <div className={groupName} key={groupName}>
      <h2 className="mt-1">
        {groupName} 
      </h2>
      <ul className="list-group">
        {matchups.map((matchup, index) => (
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
