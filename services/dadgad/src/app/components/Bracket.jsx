/* eslint-disable */
"use client";
import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import dynamic from 'next/dynamic';

import { Context } from '../context/BracketContext';
import bracket from '../services/bracketService';

const P5Wrapper = dynamic(
  () => import('./P5Wrapper'),
  { ssr: false }
);

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
  }, [state]);

  const sketch = useCallback((p) => {
    let img;
    const imageUrl = state.values.artist_image;

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
      p.noLoop();
    };

    p.draw = () => {
      bracket(state, p, canvasHeight, img);
    }

    p5InstanceRef.current = p;

  }, [state]);


  return (
    <>
      <p>Image may appear smaller on mobile. Click the button below to download to your device.</p>
      {/* Pass the sketch and container ref to P5Wrapper */}
      <P5Wrapper sketch={sketch} p5ContainerRef={p5ContainerRef} />
      <button onClick={generateAndDownload} className="btn btn-primary" type="button">Download your Bracket</button>
    </>
  );
}

export default P5Image;