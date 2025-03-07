/*eslint-disable*/
import { React, useEffect, useReducer, createContext, useContext } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGetArtistInfoQuery } from '../services/jsonServerApi';

import BackToTop from '../components/BackToTop';
import TopTracks from '../components/TopTracks';
import BracketTable from '../components/BracketTable';
import BracketContext from '../components/BracketContext';

const initialState = {
  values: [],
  bracket: {},
  round: 1,
  nextRound: 2,
};

function bracketReducer(state, action) {
  switch (action.type) {
    case 'setValues': {
      return {
        ...state,
        values: action.payload.values,
      };
    }
    case 'setBracket':
      return {
        ...state,
        bracket: action.payload.bracket,
      };
    case 'setRound':
      return {
        ...state,
        round: action.payload.round,
      };
    case 'setNextRound':
      return {
        ...state,
        nextRound: action.payload.nextRound,
      };
    default:
      return state;
  }
}

function ArtistPage() {
  const { handle } = useParams();
  const [state, dispatch] = useReducer(bracketReducer, initialState);
  const bracket = useContext(BracketContext);

  const {
    data: musicQuery = {},
  } = useGetArtistInfoQuery(handle);

  useEffect(() => {
    if (Object.keys(musicQuery).length > 0) {
      dispatch({ type: 'setValues', payload: { values: musicQuery } });
    }
  }, [musicQuery]);

  const createMatchups = (arr) => {
    const matchups = [];
    const len = arr.length;

    for (let i = 0; i < Math.floor(len / 2); i += 1) {
      // matchups.push([arr[i], arr[len - 1 - i]]);
      matchups.push({song1: {song: arr[i], groupRank: i+1}, song2: {song: arr[len - 1 - i], groupRank: arr[len - 1 - i].rank}});
    }

    const groups = {
      'Group 1': [],
      'Group 2': [],
      'Group 3': [],
      'Group 4': [],
    };

    for (let i = 0; i < matchups.length; i += 1) {
      console.log(matchups[i][0]);
      console.log(matchups[i][1]);
      console.log(i);

      groups[`Group ${(i % 4) + 1}`].push(matchups[i]);
    }
    return groups;
  };

  const generateBracket = () => {
    const matchups = createMatchups(state.values.top_songs_list.slice(0, 64));
    const bracketData = {};
    bracketData[`round${state.round}`] = matchups;
    dispatch({ type: 'setBracket', payload: { bracket: bracketData } });
  };

  const selectSong = (song) => {
    console.log(song);
  };

  if (!musicQuery.top_songs_list) {
    return (
      <div className="loading">
        Loading...
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </div>
    );
  }

  return (
    <BracketContext>
      <div className="container-lg">
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

        <h2>
          Round
          {state.round}
        </h2>
        <button type="button" className="btn btn-primary" onClick={generateBracket}>
          Temporary Generate Bracket
        </button>
        {
          Object.keys(state.bracket).length === 0
            ? (
              <>
                <p>
                  We have determined these to be the top songs for this artist.
                </p>
                <button type="button" className="btn btn-primary" onClick={generateBracket}>
                  Generate Bracket
                </button>
              </>
            )
            : <BracketTable bracket={state.bracket} selectSong={selectSong} round={"round" + state.round} />
        }

        <TopTracks musicQuery={musicQuery} values={state.values} />

      </div>
    </BracketContext>
  );
}

export default ArtistPage;
