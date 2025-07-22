import React, { useState } from 'react';
import P5SketchGenerator from './P5Generator';

function Testp5Sketch() {
  const [loading, setLoading] = useState(false);

  const generateAndOpenP5Image = async () => {
    setLoading(true);
    try {
      const mySketchDrawingLogic = (s) => {
        s.background(255, 100, 100); // Red background
        s.fill(0, 0, 255); // Blue color
        s.ellipse(s.width / 2, s.height / 2, 100, 100); // Draw a circle
        s.textSize(24);
        s.textAlign(s.CENTER, s.CENTER);
        s.fill(255);
        s.text("Hello p5.js!", s.width / 2, s.height / 4);
      };

      const imageDataUrl = await P5SketchGenerator(400, 300, mySketchDrawingLogic);

      // --- MODIFIED PART ---
      const link = document.createElement('a');
      link.href = imageDataUrl;
      link.target = '_blank'; // Open in a new tab
      link.download = 'p5js_sketch.png'; // Suggests a filename for download
      document.body.appendChild(link); // Append to body (necessary for Firefox)
      link.click(); // Programmatically click the link
      document.body.removeChild(link); // Clean up the temporary link
      // --- END MODIFIED PART ---

    } catch (error) {
      console.error("Error generating p5.js image:", error);
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>P5.js Image Generator</h1>
      <button onClick={generateAndOpenP5Image} disabled={loading}>
        {loading ? 'Generating...' : 'Generate and Open p5.js Image'}
      </button>
      <p>Click the button to generate a p5.js sketch and open it in a new tab.</p>
    </div>
  );
}

export default Testp5Sketch;
