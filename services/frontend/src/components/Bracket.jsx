/* eslint-disable */
import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import p5 from 'p5';

import { Context } from '../context/BracketContext';
import bracket from '../services/bracketService';

function P5Image() {
  const p5ContainerRef = useRef();
  const p5InstanceRef = useRef();
  const value = useContext(Context);
  const [state] = value;

  // Image dimensions
  const width = 4200;
  const canvasHeight = 3800;


  const generateAndDownload = useCallback(() => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current;

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      console.log(isIOS);
      if (isIOS) {
        const canvas = p.canvas;
        if (canvas) {
          const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          const link = document.createElement('a');
          link.download = `Dadgad_${state.values.artist_name}_bracket`;
          link.href = image;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        p.saveCanvas(`Dadgad_${state.values.artist_name}_bracket`, 'png');
      }
    }
  }, []);

  const sketch = useCallback((p) => {
    let img; // Declare img here so it's accessible within the sketch scope
    const imageUrl = state.values.artist_image; // Keep imageUrl for loading

    p.preload = () => {
      console.log("Preload");

      if (imageUrl) {
        img = p.loadImage(imageUrl,
          () => console.log('Image loaded successfully!'),
          (event) => console.error('Error loading image:', event)
        );
      }
    }
    p.setup = () => {
      p.createCanvas(width, canvasHeight).parent(p5ContainerRef.current);
      p.background(220);
      p.noLoop(); // Draw once
    };


    p.draw = () => {
      bracket(state, p, canvasHeight, img); // <--- CHANGE IS HERE: Passing 'img' instead of 'imageUrl'
    }

    // Store the p5 instance in the ref, so it can be accessed outside the sketch
    p5InstanceRef.current = p;

  }, [state]);

  useEffect(() => {
    const myP5 = new p5(sketch, p5ContainerRef.current);

    return () => {
      myP5.remove();
    };
  }, [sketch]);

  return (
    <>
      <p>Image may appear smaller on mobile. Click the button below to download to your device.</p>
      <div ref={p5ContainerRef} className="bracket-canvas-continer" style={{ border: '1px solid black', display: 'inline-block', width: '90%' }} />
      <button onClick={generateAndDownload} className="btn btn-primary" type="button">Download your Bracket</button>
    </>
  );
}

export default P5Image;
