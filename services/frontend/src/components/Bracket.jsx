/* eslint-disable */
import React, { useRef, useEffect, useCallback } from 'react';
import p5 from 'p5';

const DownloadP5ImageHidden = (song) => {
    const p5Ref = useRef(null);
    const offscreenCanvasRef = useRef(null);

    const generateAndDownload = useCallback(() => {
        if (p5Ref.current) {
            const p = p5Ref.current;
            const width = 400;
            const height = 300;
            const offscreenCanvas = p.createGraphics(width, height);
            offscreenCanvasRef.current = offscreenCanvas.canvas; // Store the canvas element for potential later use

            // Draw onto the off-screen canvas
            offscreenCanvas.background(255);
            offscreenCanvas.fill(255, 0, 100);
            offscreenCanvas.rect(50, 50, 300, 200);
            offscreenCanvas.fill(0);
            offscreenCanvas.textSize(24);
            offscreenCanvas.textAlign(p.CENTER, p.CENTER);
            console.log(song.song)
            offscreenCanvas.text(song.song, width / 2, height / 2);

            // Trigger the download
            offscreenCanvas.save('hidden_p5_image.png');
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