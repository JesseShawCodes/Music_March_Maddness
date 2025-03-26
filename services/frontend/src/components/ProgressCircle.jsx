/* eslint-disable */
import React, { useContext } from 'react';
import { Context } from '../context/BracketContext';

function ProgressCircle() {
  const value = useContext(Context);
  const [state] = value;
  const progress = Math.round(state.currentRoundProgres * 100);

  return (
    <>
      <div class="set-size charts-container">
      <div class={`pie-wrapper progress-${progress}`}>
        <span class="label">{progress}<span class="smaller">%</span></span>
        <div class="pie">
          <div class="left-side half-circle"></div>
          <div class="right-side half-circle"></div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ProgressCircle;
