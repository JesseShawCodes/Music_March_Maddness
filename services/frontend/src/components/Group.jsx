/* eslint-disable */
import { React } from 'react';
import Matchup from './Matchup';

function Group({ groupName, matchups }) {
  return (
    <div className={groupName} key={groupName}>
      <h2 className="mt-1">{groupName}</h2>
      <ul className="list-group">
        {matchups.map((matchup, index) => (
          <li className="list-group-item" key={matchup.attributes.song1.groupRank + '_' + matchup.attributes.song2.groupRank}>
            <Matchup
              song1={matchup.attributes.song1}
              song2={matchup.attributes.song2}
              key={matchup.attributes.song1.song.id + '-' + matchup.attributes.song2.song.id}
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
