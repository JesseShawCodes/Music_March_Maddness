import { React, useContext } from 'react';
import { Context } from '../../context/BracketContext';
import WarningMessage from '../WarningMessage';

function InProgressBracket() {
  const value = useContext(Context);
  const [state] = value;

  const showInProgressBracket = () => {
    console.log("SHOW IN PROGRESS BRACKET");
  }

  return (
    <>
      <WarningMessage message="You currently have a bracket in progress for this artist." type="info" />
      <button type="button" className="btn btn-primary" onClick={showInProgressBracket}>
        Show In Progress Bracket
      </button>
    </>
  );
}

export default InProgressBracket;
