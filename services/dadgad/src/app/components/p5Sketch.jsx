// components/P5Sketch.js
import { useRef, useEffect, useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Context } from '../context/BracketContext';

// Dynamic import p5 to ensure it's loaded client-side
const Sketch = dynamic(() => import('react-p5'), {
  ssr: false, // This is crucial for p5.js as it needs the browser environment
});

const P5Sketch = ({ onSketchReady }) => {
  // debugger;
  const value = useContext(Context);
  const [state, dispatch] = value;
  const p5InstanceRef = useRef(null); // Ref to store the p5 instance

  useMemo(() => {
    console.log("USE MEMO - p5 ---")
    return <h1>USE MEMO!</h1>
  }, [value]);

  const setup = (p5, canvasParentRef) => {
    console.log("setup");
    console.log(state);
    p5InstanceRef.current = p5; // Store the p5 instance
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(220);
    p5.noLoop();
    
    // Call the callback to pass the p5 instance to the parent component
    if (onSketchReady) {
      onSketchReady(p5);
    }
  };

  const draw = (p5) => {
    // This draw function will run continuously if noLoop() is not called
    // or if you call loop() later.
    // For a static image, you might just draw once in setup.
    // Example: Draw a circle
    console.log("DRAW...")
    p5.fill(255, 0, 0);
    p5.text(state.champion.song.attributes.name, 10, 10);
    p5.ellipse(p5.width / 2, p5.height / 2, 100, 100);

  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Sketch;
