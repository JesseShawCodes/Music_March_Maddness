import p5 from 'p5';

const P5SketchGenerator = (width, height, sketchFunction) => {
  return new Promise((resolve) => {
    const p5Instance = new p5(s => {
      s.setup = () => {
        s.createCanvas(width, height);
        s.background(220); // A default background
        s.noLoop(); // We only need to draw once

        // Call the user-defined sketch function
        if (sketchFunction && typeof sketchFunction === 'function') {
          sketchFunction(s);
        }

        // Get the image data URL after drawing
        const imageDataUrl = s.canvas.toDataURL('image/png');
        resolve(imageDataUrl); // Resolve the promise with the image data URL
      };
    }, document.createElement('div')); // Create a detached div so it doesn't render to DOM
  });
};

export default P5SketchGenerator;
