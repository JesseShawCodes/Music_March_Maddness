/* eslint-disable */
import React from 'react';

import Matchup from './Matchup';

function BracketTable({ bracket, selectSong, round }) {
  return (
    <>
      {
        Object.entries(bracket[round]).map(([groupName, matchups]) => (
          <div className={groupName} key={groupName}>
            <h2 className="mt-1">{groupName}</h2>
            <ul className="list-group">
              {matchups.map((matchup) => (
                <li className="list-group-item d-flex justify-content-between mb-2 border-bottom" key={matchup.song1.groupRank + '_' + matchup.song2.groupRank}>
                  <Matchup
                    song1={matchup.song1}
                    song2={matchup.song2}
                    key={matchup.song1.song.id + '-' + matchup.song2.song.id}
                    selectSong={selectSong}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))
      }
    </>
  );
}

export default BracketTable;
