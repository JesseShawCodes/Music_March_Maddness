/* eslint-disable */
import React, { useRef, useEffect, useCallback } from 'react';
import p5 from 'p5';

const DownloadP5ImageHidden = (bracketDetails) => {
    const p5Ref = useRef(null);
    const offscreenCanvasRef = useRef(null);

    const generateAndDownload = useCallback(() => {
        function round1(p, width, height) {
          console.log("ROUND 1");
          p.fill(0, 0, 100);
          p.rect(30, 30, 300, 200);
          p.fill(255);
          p.text("HEllo", width/3, height/3);
        }
        if (p5Ref.current) {
            const p = p5Ref.current;
            const width = 3200;
            const height = 3800;
            const offscreenCanvas = p.createGraphics(width, height);
            offscreenCanvasRef.current = offscreenCanvas.canvas; // Store the canvas element for potential later use

            // Draw onto the off-screen canvas
            offscreenCanvas.textSize(36);
            offscreenCanvas.background(255);
            offscreenCanvas.fill(0, 0, 1);
            // offscreenCanvas.rect(50, 50, 300, 200);
            offscreenCanvas.fill(0);
            offscreenCanvas.textSize(74);
            offscreenCanvas.textAlign(p.CENTER, p.CENTER);
            round1(offscreenCanvas, width, height)
            offscreenCanvas.fill(0);
            offscreenCanvas.textStyle(p.BOLD);
            offscreenCanvas.textSize(24);
            offscreenCanvas.text(bracketDetails.song, width / 2, height / 2);

            // Trigger the download
            offscreenCanvas.save(`dadgad_${bracketDetails.artistName}_bracket.png`);
        }
    }, []);

    useEffect(() => {
        p5Ref.current = new p5(() => {}, document.createElement('div')); // Create a p5 instance without attaching to DOM

        return () => {
            if (p5Ref.current) {
                p5Ref.current.remove();
                p5Ref.current = null;
            }
        };
    }, []);

    const handleDownloadClick = () => {
        generateAndDownload();
    };

    return (
        <div>
            <button onClick={handleDownloadClick} class="btn btn-primary">Download your Bracket</button>
            {/* You can optionally add a ref to a div if you want p5 to manage its lifecycle there, */}
            {/* but for a hidden download, it's not strictly necessary for the visual rendering. */}
            {/* <div ref={canvasRef} style={{ display: 'none' }} /> */}
        </div>
    );
};

export default DownloadP5ImageHidden;