"use client";
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Wrapper = () => {
  const sketchRef = useRef();
  const p5InstanceRef = useRef(); // To store the p5 instance

  useEffect(() => {
    // This code will only run on the client-side
    if (sketchRef.current) {
      // Define your p5 sketch
      const sketch = (p) => {
        p.setup = () => {
          p.createCanvas(400, 400);
          p.background(220);
        };

        p.draw = () => {
          p.ellipse(p.mouseX, p.mouseY, 50, 50);
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

  return <div ref={sketchRef}></div>;
};

export default P5Wrapper;
