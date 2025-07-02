/* eslint-disable */
"use client";
import React, {
  useContext,
  useEffect,
  useRef,
  useMemo
  // useCallback,
  // useContext,
} from 'react';
import dynamic from 'next/dynamic';

import { Context } from '../context/BracketContext';
import bracket from '../services/bracketService';
import UpdateRef from './UpdateRef';
import P5Sketch from './p5Sketch';

const Sketch = dynamic(() => import('react-p5'), {
  ssr: false,
});

function P5Image({ onSketchReady }) {
  const sketchRef = useRef();
  const bracketContext = useContext(Context);
  const p5Ref = useRef(null); // Ref to hold the p5 instance from the sketch

  const handleSketchReady = (p5Instance) => {
    p5Ref.current = p5Instance;
  };

  const generateAndDownload = () => {
    console.log("generateAndDownload");
  };

  const updateBracket = () => {
    if (p5Ref.current) {
      console.log("p5.js sketch is ready");
      p5Ref.current.saveCanvas('my-p5-image', 'png'); // Save as PNG
    } else {
      console.warn("p5.js sketch not ready yet.");
    }
  }
  /*
  useMemo(() => {
    console.log("USE Memo...");
  }, [bracketContext]);
  */

  const generateBracket =() => {
    console.log("generateBracket");
  }

  return (
    <div className='bracket-canvas-continer'>
      <p>Image may appear smaller on mobile. Click the button below to download to your device.</p>
      <button onClick={generateAndDownload} className="btn btn-primary mb-3" type="button">
        Download your Bracket
      </button>
      <button onClick={updateBracket} className='btn btn-primary mb-3 ms-3'>
        Generate Bracket
      </button>
      <P5Sketch onSketchReady={handleSketchReady}/>
    </div>
  );
}

export default P5Image;