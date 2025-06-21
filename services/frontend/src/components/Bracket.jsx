/* eslint-disable */
import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import p5 from 'p5';

import { Context } from '../context/BracketContext';
import { bracket } from '../services/bracketService';

function DownloadP5ImageHidden() {
  const p5ContainerRef = useRef();
  const p5InstanceRef = useRef();
  // const p5Ref = useRef(null);
  // const offscreenCanvasRef = useRef(null);
  const value = useContext(Context);
  const [state] = value;

  // Image dimensions
  const width = 4200;
  const canvasHeight = 3800;

  // const bracketWeight = 5;
  // const bracketColor = '#000';
  // const matchUpSpace = 60;
  // const matchUpHeight = 160;

  // const bracketXStart = 10;

  const generateAndDownload = useCallback(() => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current;

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (isIOS) {
        const canvas = p.canvas; // Access the canvas element directly from the p5 instance
        if (canvas) {
          const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          const link = document.createElement('a');
          link.download = 'my-p5-image.png';
          link.href = image;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        p.saveCanvas('my-p5-image', 'png');
      }
    }
  }, []);

  const drawBracket = (p) => {
    p.text("It's just what it is", p.width / 2, p.height / 2);
    bracket(state, p);
  }

  // This is your p5.js sketch logic, defined as a function
  // It takes the p5 instance 'p' as an argument, so you can call p.createCanvas, p.background, etc.
  const sketch = useCallback((p) => {
    p.setup = () => {
      // Create the canvas and attach it to the div referenced by p5ContainerRef
      // .parent() places the canvas inside specific React div
      p.createCanvas(width, canvasHeight).parent(p5ContainerRef.current);
      p.background(220);
      p.noLoop(); // Draw once
    };


    p.draw = () => {
      p.fill(p.random(255), p.random(255), p.random(255));
      for (let i = 0; i < 100; i++) {
        p.ellipse(p.random(p.width), p.random(p.height), 200, 200);
      }
      /*
      p.fill(0);
      p.textSize(194);
      p.textAlign(p.CENTER, p.CENTER);
      */
      // p.text("Hello p5.js!", p.width / 2, p.height / 2);
      drawBracket(p);

    }

    // Store the p5 instance in the ref, so it can be accessed outside the sketch
    p5InstanceRef.current = p;

  }, []); // Empty dependency array: this sketch function is stable and won't re-create

  useEffect(() => {
    /* eslint ignore-next-line */
    const myP5 = new p5(sketch, p5ContainerRef.current);

    return () => {
      myP5.remove();
    };
  }, [sketch]);

  return (
    <>
      <div ref={p5ContainerRef} className="bracket-canvas-continer" style={{ border: '1px solid black', display: 'inline-block', width: '90%' }} />
      <button onClick={generateAndDownload} className="btn btn-primary" type="button">Download your Bracket</button>
    </>
  );
}

export default DownloadP5ImageHidden;
