import { React, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Context } from './BracketContext';
import BracketTable from './BracketTable';
import { useGetArtistInfoQuery } from '../services/jsonServerApi';

function ArtistPageForm() {
  const { handle } = useParams();
  const value = useContext(Context);
  const [state, dispatch] = value;

  // createMatchups runs each round
  const createMatchups = (arr, matchupRound) => {
    const matchups = [];
    const len = arr.length;

    for (let i = 0; i < Math.floor(len / 2); i += 1) {
      matchups.push(
        {
          matchupId: arr[i].id + arr[len - 1 - i].id,
          round: matchupRound,
          attributes: {
            complete: false,
            song1: {
              song: arr[i],
              groupRank: i + 1,
              winner: null,
            },
            song2: {
              song: arr[len - 1 - i],
              groupRank: arr[len - 1 - i].rank,
              winner: null,
            },
          },
        },
      );
    }

    const currentRound = `round${state.round}`;

    const groups = {
      group1: {
        [currentRound]: {
          roundMatchups: [],
          progress: null,
        },
      },
      group2: {
        [currentRound]: {
          roundMatchups: [],
          progress: null,
        },
      },
      group3: {
        [currentRound]: {
          roundMatchups: [],
          progress: null,
        },
      },
      group4: {
        [currentRound]: {
          roundMatchups: [],
          progress: null,
        },
      },
    };

    for (let i = 0; i < matchups.length; i += 1) {
      groups[`group${(i % 4) + 1}`][`${currentRound}`].roundMatchups.push(matchups[i]);
    }

    return groups;
  };

  // generateBracket only runs on initial build of a bracket.
  const generateBracket = () => {
    const matchups = createMatchups(state.values.top_songs_list.slice(0, 64), 1);
    dispatch({ type: 'setBracket', payload: { bracket: matchups } });
  };

  const {
    data: musicQuery = {},
  } = useGetArtistInfoQuery(handle);

  useEffect(() => {
    if (Object.keys(musicQuery).length > 0) {
      dispatch({ type: 'setValues', payload: { values: musicQuery } });
    }
  }, [musicQuery]);

  if (!musicQuery.top_songs_list) {
    return (
      <div className="loading">
        Loading...
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </div>
    );
  }

  return (
    <div>
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
          : <BracketTable />
      }
    </div>
  );
}

export default ArtistPageForm;
