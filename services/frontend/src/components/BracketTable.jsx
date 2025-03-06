/*eslint-disable*/
import React from 'react';

import Matchup from './Matchup';

import data from './test.json';

function BracketTable({bracket, selectSong}) {
  return (
    <>
      {
        Object.entries(bracket).map(([groupName, matchups]) => (
          <div className={groupName} key={groupName}>
            <h2 className='mt-1'>{groupName}</h2>
            <ul className='list-group'>
              {matchups.map((matchup) => (
                  <li className="list-group-item d-flex justify-content-between mb-2 border-bottom" key={matchup[0].id + '_' + matchup[1].id}>
                    <Matchup
                      song1={matchup[0]}
                      song2={matchup[1]}
                      key={matchup[0].id + '_' + matchup[1].id}
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

// BracketTable.defaultProps = data;

export default BracketTable;
