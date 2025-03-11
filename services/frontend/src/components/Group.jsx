/* eslint-disable */
import { React } from 'react';
import Matchup from './Matchup';

function Group({ groupName, matchups }) {
  return (
    <div className={groupName.name} key={groupName.name}>
      <h2 className="mt-1">Group {groupName.id}</h2>
      <ul className="list-group">
        {matchups.map((matchup, index) => (
          <li className="list-group-item" key={matchup.attributes.song1.groupRank + '_' + matchup.attributes.song2.groupRank}>
            <Matchup
              song1={matchup.attributes.song1}
              song2={matchup.attributes.song2}
              matchup={matchup}
              key={matchup.matchupId}
              groupName={groupName.name}
              index={index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Group;
