"use client";
import React, { useRef, useEffect, useContext } from 'react';
import p5 from 'p5';
import bracket from '../services/bracketService';
import { Context } from '../context/BracketContext';

const P5Wrapper = ({ containerRef }) => {
  // debugger;
  const sketchRef = useRef();
  const p5InstanceRef = useRef(); // To store the p5 instance
  const value = useContext(Context);
  const [state] = value;

  // Image dimensions
  const width = 4200;
  const canvasHeight = 3800;

  useEffect(() => {
    let p5Instance;

    const img = state.values.artist_image;
    // debugger;

    const sketch = (p) => {
      console.log("sketch...");

      p.preload = () => {
        if (true) {
            /*
            img = p.loadImage(imageUrl,
              () => console.log('Image loaded successfully!'),
              (event) => console.error('Error loading image:', event)
            );
            */
        }
      }

      p.setup = () => {
        console.log("p.setup");
        p.createCanvas(4000, 4000);
        p.background(200);
      }

      p.draw = () => {
        console.log("p.er");
        bracket(state, p, canvasHeight, img);
        p.noLoop();
      }
    }

    // initialize p5js instance mode
    import('p5').then(p5Module => {
      p5Instance = new p5Module.default(sketch);
    })

    return () => {
      if (p5Instance) {
        <h1>TESTING</h1>
        p5Instance.remove();
      }
    }
  }, [containerRef])

  return null;
};

export default P5Wrapper;
