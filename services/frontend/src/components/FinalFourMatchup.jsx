/*eslint-disable*/
import { React, useContext } from 'react';
import Matchup from './Matchup';
import { Context } from './BracketContext';
import MatchupSong from './MatchupSong';

function FinalFourMatchup({ song1, song2, matchup, index, groupName }) {
  const value = useContext(Context);
  const [state] = value;

  return (
    <div className="d-flex justify-content-between mb-2 border-bottom" key="Final Four">
      <MatchupSong
        thissong={song1}
        opponent={song2}
        matchupId={matchup.matchupId}
        round={matchup.round}
        group={groupName}
        key={`matchup_song_${song1.song.id}`}
      />
      vs. 
      <MatchupSong
        thissong={song2}
        opponent={song1}
        matchupId={matchup.matchupId}
        round={matchup.round}
        group={groupName}
        key={`matchup_song_${song2.song.id}`}
      />
    </div>
  );
}

export default FinalFourMatchup;
