// components/P5Sketch.js
import { useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import { Context } from '../context/BracketContext';
import bracket from '../services/bracketService';

// Dynamic import p5 to ensure it's loaded client-side
const Sketch = dynamic(() => import('react-p5'), {
  ssr: false, // This is crucial for p5.js as it needs the browser environment
});

const P5Sketch = ({ onSketchReady }) => {
  // debugger;
  const value = useContext(Context);
  const [state] = value;
  const p5InstanceRef = useRef(null); // Ref to store the p5 instance

  const setup = (p5, canvasParentRef) => {
    p5InstanceRef.current = p5; // Store the p5 instance
    p5.createCanvas(4200, 4000).parent(canvasParentRef);
    p5.background(0, 120, 0);
    p5.noLoop();
    
    // Call the callback to pass the p5 instance to the parent component
    if (onSketchReady) {
      onSketchReady(p5);
    }
  };

  const draw = (p5) => {
    // bracket(state, p5, 4000, state.values.artist_image);
    p5.fill(255); 
  };

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </> 
  );
};

export default P5Sketch;
