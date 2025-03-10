/*eslint-disable*/
import { useContext, useEffect } from "react";
import { Context } from "./BracketContext";
import BracketTable from "./BracketTable";

import { useGetArtistInfoQuery } from '../services/jsonServerApi';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ArtistPageForm = () => {
  const { handle } = useParams();
  const value = useContext(Context);
  const [state, dispatch] = value;

  const generateBracket = () => {
    const matchups = createMatchups(state.values.top_songs_list.slice(0, 64));
    const bracketData = matchups;
    dispatch({ type: 'setBracket', payload: { bracket: bracketData } });
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

  
  const createMatchups = (arr) => {
    const matchups = [];
    const len = arr.length;

    for (let i = 0; i < Math.floor(len / 2); i += 1) {
      matchups.push(
        {
          matchupId: arr[i].id + arr[len - 1 - i].id,
          attributes: {
            complete: false,
            winner: null,
            loser: null,
            song1: {
              song: arr[i], 
              groupRank: i+1
            }, 
            song2: {
              song: arr[len - 1 - i], 
              groupRank: arr[len - 1 - i].rank
            },
          },
        }
      );
    }

    const currentRound = `round${state.round}`

    const groups = {
      group1: {
        [currentRound]: []
      },
      group2: {
        [currentRound]: []
      },
      group3: {
        [currentRound]: []
      },
      group4: {
        [currentRound]: []
      },
    };

    for (let i = 0; i < matchups.length; i += 1) {
      groups[`group${(i % 4) + 1}`][`round${state.round}`].push(matchups[i]);
    }
    return groups;
  };

  return (
    <>
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
            :  <BracketTable />
      }
    </>
  );
};
export default ArtistPageForm;
