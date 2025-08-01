"use client";
import { useRef, useContext } from 'react';
// import { Context } from '../context/BracketContext';
import dynamic from "next/dynamic";
import CheckIsIos from '../services/CheckIsIos';
import p5 from 'p5';
// import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";

// Dynamic import p5 to ensure it's loaded client-side
const Sketch = dynamic(() => import('react-p5'), {
  ssr: false, // This is crucial for p5.js as it needs the browser environment
});

const P5Sketch = () => {
  // const value = useContext(Context);
  const p5InstanceRef = useRef(null);
  const setup = (p5, canvasParentRef) => {
    console.log(p5);
    p5InstanceRef.current = p5;
    p5.createCanvas(3000, 400).parent(canvasParentRef);
    p5.background(220);
  }

  const draw = (p5) => {
    p5.fill(255);
  }
  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  )
}

export default function page() {
  const p5Ref = useRef(null);
  const isIOS = CheckIsIos();

  const handleSketchReady = (p5Instance) => {
    p5Ref.current = p5Instance;
  };
  const downloadBracket = () => {
    console.log(p5Ref.current);
    if (p5Ref.current) {
      const filename = `dadgad_${bracketContext.values.artist_name}_bracket.png`;
      const canvas = p5Ref.current.canvas; // Get the raw canvas element

      if (isIOS) {
        // For iOS, open the image in a new tab
        const imgData = canvas.toDataURL('image/png'); // Get data URL of the canvas
        const newWindow = window.open(); // Open a new blank window
        if (newWindow) {
          newWindow.document.write(`<img src="${imgData}" style="max-width: 100%; height: auto;">`); // Write the image into the new window
          newWindow.document.title = filename; // Set the title of the new tab
          newWindow.document.close(); // Close the document stream
        } else {
          // Fallback if window.open is blocked (e.g., by a popup blocker)
          console.warn("Could not open new window. Popup blocker might be active.");
          // As a fallback, you could still try a direct download or alert the user
          // For simplicity, we'll just log a warning here.
        }
      } else {
        // For non-iOS devices (desktop, Android), use p5.js's saveCanvas for direct download
        p5Ref.current.saveCanvas(`dadgad_${bracketContext.values.artist_name}_bracket`, 'png');
      }

    } else {
      console.warn("p5.js sketch not ready yet.");
    }
  }
  return (
    <div className='container'>
      <button onClick={downloadBracket} className='btn btn-primary'>
        Download Image
      </button>
      <P5Sketch onSketchReady={handleSketchReady}/>
    </div>
  )
}
