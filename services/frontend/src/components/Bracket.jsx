/* eslint-disable */
import React, { useRef, useEffect, useCallback } from 'react';
import p5 from 'p5';

function DownloadP5ImageHidden(bracketDetails) {
    const p5Ref = useRef(null);
    const offscreenCanvasRef = useRef(null);

    const bracketWeight = 5;
    const bracketColor = "#000"
    const textWeight = 1;
    const matchUpSpace = 60;
    const matchUpHeight = 160;
    const numTeams = 64;
    const numRounds = Math.log2(numTeams);
    let rounds = [];
    let teams = [];

    // Song boxes
    let padding = 30;

    const generateAndDownload = useCallback(() => {
        if (p5Ref.current) {
            const p = p5Ref.current;
            const width = 3200;
            const height = 3800;
            const offscreenCanvas = p.createGraphics(width, height);
            offscreenCanvasRef.current = offscreenCanvas.canvas; // Store the canvas element for potential later use

            // Draw onto the off-screen canvas
            offscreenCanvas.background(255, 250, 255);
            offscreenCanvas.fill(255, 0, 100);
            offscreenCanvas.textAlign(p.CENTER, p.CENTER);
            offscreenCanvas.rect(width / 2, height / 2, 300, 200);
            offscreenCanvas.fill(0);
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
          <button onClick={handleDownloadClick} className="btn btn-primary">Download your Bracket</button>
        </div>
    );
};

export default DownloadP5ImageHidden;