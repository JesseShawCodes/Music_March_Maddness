"use client";
import React, { useRef, useEffect, useContext } from 'react';
import p5 from 'p5';
import bracket from '../services/bracketService';
import { Context } from '../context/BracketContext';

const P5Wrapper = () => {
  // debugger;
  const sketchRef = useRef();
  const p5InstanceRef = useRef(); // To store the p5 instance
  const value = useContext(Context);
  const [state] = value;

  // Image dimensions
  const width = 4200;
  const canvasHeight = 3800;

  useEffect(() => {
    // This code will only run on the client-side
    if (sketchRef.current) {
      // Define your p5 sketch
      let img;
      const imageUrl = state.values.artist_image;
      console.log(imageUrl);
      const sketch = (p) => {
        p.preload = () => {
          if (imageUrl) {
            /*
            img = p.loadImage(imageUrl,
              () => console.log('Image loaded successfully!'),
              (event) => console.error('Error loading image:', event)
            );
            */
          }
        }
        p.setup = () => {
          p.createCanvas(4000, 400);
          p.background(220);
          p.noLoop();
        };

        p.draw = () => {
          // p.ellipse(p.mouseX, p.mouseY, 40, 40);
          bracket(state, p, canvasHeight, img);
        };
      };

      // Create a new p5 instance and attach it to the ref
      p5InstanceRef.current = new p5(sketch, sketchRef.current);
    }

    // Cleanup function to remove the p5 canvas when the component unmounts
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div ref={sketchRef}></div>
  );
};

export default P5Wrapper;
