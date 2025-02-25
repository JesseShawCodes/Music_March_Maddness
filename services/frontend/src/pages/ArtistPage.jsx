/* eslint-disable */
import { React, useState, useEffect } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGetArtistInfoQuery } from '../services/jsonServerApi';

import BackToTop from '../components/BackToTop';
import Song from './Song';
import Matchup from '../components/Matchup';

function ArtistPage() {
  const { handle } = useParams();

  // State
  const [values, setValues] = useState([]);
  const [bracket, setBracket] = useState([]);

  const {
    data: musicQuery = {},
  } = useGetArtistInfoQuery(handle);

  useEffect(() => {
    if (Object.keys(musicQuery).length > 0) {
      setValues(musicQuery);
    }
  }, [musicQuery]);

  const createMatchups = (arr) => {
    const matchups = [];
    const len = arr.length;

    for (let i = 0; i < Math.floor(len / 2); i += 1) {
      matchups.push([arr[i], arr[len - 1 - i]]);
    }

    return matchups;
  };

  const generateBracket = () => {
    const matchups = createMatchups(values.top_songs_list.slice(0, 64));
    setBracket({ 'rounds': [matchups] });
  };

  const selectSong = (song) => {
    console.log(song.target.dataset.testing);
  }

  if (!musicQuery.top_songs_list) {
    return (
      <div className="loading">
        Loading...
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </div>
    );
  }

  return (
    <div className="container">
      <BackToTop />
      <h1>
        {
          Object.prototype.hasOwnProperty.call(musicQuery, 'artist_name')
            ? (
              `${musicQuery.artist_name}`
            )
            : 'null'
        }
      </h1>
      <p>We have determined these to be the top songs for this artist.</p>
      <button type="button" className="btn btn-primary" onClick={generateBracket}>
        Generate Bracket
      </button>

      <h2>Bracket</h2>
      <ul>
        {
          Object.prototype.hasOwnProperty.call(bracket, 'rounds') ? (

            bracket.rounds[0].map((matchup) => (
              <Matchup 
                song1={matchup[0]} 
                song2={matchup[1]}
                key={matchup[0].id + '_' + matchup[1].id}
                selectSong={selectSong}
              />
            ))
          )
            : null
        }
      </ul>
      <ol className="song-list" id="collapseExample">
        {
        Object.prototype.hasOwnProperty.call(values, 'top_songs_list')
          ? (
            musicQuery.top_songs_list.map((song) => (
              <Song song={song} key={song.id} />
            ))
          )
          : null
        }
      </ol>
    </div>
  );
}

export default ArtistPage;
