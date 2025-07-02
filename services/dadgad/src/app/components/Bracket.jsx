/* eslint-disable */
"use client";
import React, {
  useContext,
  useRef,
} from 'react';

import { Context } from '../context/BracketContext';
import P5Sketch from './p5Sketch';

function P5Image() {
  const [bracketContext] = useContext(Context);
  const p5Ref = useRef(null);

  const handleSketchReady = (p5Instance) => {
    p5Ref.current = p5Instance;
  };

  const downloadBracket = () => {
    if (p5Ref.current) {
      p5Ref.current.saveCanvas(`dadgad_${bracketContext.values.artist_name}_bracket`, 'png'); // Save as PNG
    } else {
      console.warn("p5.js sketch not ready yet.");
    }
  }

  return (
    <div className='bracket-canvas-continer'>
      <p>Image may appear smaller on mobile. Click the button below to download to your device.</p>
      <button onClick={downloadBracket} className='btn btn-primary mb-3 ms-3'>
        Download Bracket
      </button>
      <P5Sketch onSketchReady={handleSketchReady}/>
    </div>
  );
}

export default P5Image;
