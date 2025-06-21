/* eslint-disable */
import React, { useRef, useEffect, useCallback } from 'react';
import p5 from 'p5'; // Import p5

const ImageGeneratorWithoutWrapper = () => {
  const p5ContainerRef = useRef(); // Ref for the div where p5 canvas will be
  const p5InstanceRef = useRef();  // Ref to hold the p5 instance itself

  // This is your p5.js sketch logic, defined as a function
  // It takes the p5 instance 'p' as an argument, so you can call p.createCanvas, p.background, etc.
  const sketch = useCallback((p) => {
    p.setup = () => {
      // Create the canvas and attach it to the div referenced by p5ContainerRef
      // .parent() is crucial here to place the canvas inside our specific React div
      p.createCanvas(400, 400).parent(p5ContainerRef.current);
      p.background(220);
      p.noLoop(); // Draw once
    };

    p.draw = () => {
      p.fill(p.random(255), p.random(255), p.random(255));
      for (let i = 0; i < 10; i++) {
        p.ellipse(p.random(p.width), p.random(p.height), 50, 50);
      }
      p.fill(0);
      p.textSize(24);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("Hello p5.js!", p.width / 2, p.height / 2);
    };

    // Store the p5 instance in the ref, so it can be accessed outside the sketch
    p5InstanceRef.current = p;

  }, []); // Empty dependency array: this sketch function is stable and won't re-create

  useEffect(() => {
    // Initialize p5.js instance when the component mounts
    // We pass the sketch function and the DOM element to attach the canvas to
    const myP5 = new p5(sketch, p5ContainerRef.current);

    // Clean up the p5 instance when the component unmounts
    // This is important to prevent memory leaks and conflicts if the component is re-rendered
    return () => {
      myP5.remove(); // Removes the p5 canvas and associated event listeners
    };
  }, [sketch]); // Re-run if sketch function changes (though `useCallback` makes it stable)

  const handleDownload = () => {
    if (p5InstanceRef.current) {
      const p = p5InstanceRef.current; // Get the p5 instance

      // Check for iOS (simplified check)
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      debugger;

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
  };

  return (
    <div>
      <h1>p5.js Image Generator (Direct P5 npm)</h1>
      {/* This div is where the p5 canvas will be rendered */}
      <div ref={p5ContainerRef} style={{ border: '1px solid black', display: 'inline-block', width: '100px' }}>
        {/* The p5 canvas will be inserted here by p5.js */}
      </div>
      <br />
      <button onClick={handleDownload} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>
        Download Image
      </button>
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        (On iOS, you might need to long-press the downloaded image or use the share sheet to save it.)
      </p>
    </div>
  );
};

export default ImageGeneratorWithoutWrapper;
