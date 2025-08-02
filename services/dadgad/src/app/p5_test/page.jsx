"use client";
import { useRef, useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import CheckIsIos from '../services/CheckIsIos';

// Dynamically import react-p5 to ensure it's loaded client-side
const Sketch = dynamic(() => import('react-p5'), {
  ssr: false, // This is crucial for p5.js as it needs the browser environment
});

const P5Sketch = ({ onSketchReady }) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(4200, 3000).parent(canvasParentRef);
    p5.background(0, 255, 0);
    onSketchReady(p5);
  };

  const draw = (p5) => {
    p5.fill(0, 255, 0);
    p5.text('Hello, p5.js!', 10, 50);
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default function Page() {
  const p5Ref = useRef(null);
  const isIOS = CheckIsIos();
  const [bracketContext, setBracketContext] = useState({ values: { artist_name: 'default_artist' } });

  const handleSketchReady = (p5Instance) => {
    p5Ref.current = p5Instance;
  };
  const downloadBracket = () => {
    if (p5Ref.current) {
      const filename = `dadgad_${bracketContext.values.artist_name}_bracket`;
      const canvas = p5Ref.current.canvas;

      if (isIOS) {
        console.log("It is IOS!!");
        const imgData = canvas.toDataURL('image/png');
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<img src="${imgData}" style="max-width: 100%; height: auto;">`);
          newWindow.document.title = filename;
          newWindow.document.close();
        } else {
          console.warn("Could not open new window. Popup blocker might be active.");
        }
      } else {
        p5Ref.current.saveCanvas(filename, 'png');
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
