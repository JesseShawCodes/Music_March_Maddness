/* eslint-disable */
import React, { useRef, useEffect, useCallback, useContext } from 'react';
import { Context } from '../context/BracketContext';
import p5 from 'p5';

const DownloadP5ImageHidden = (bracketDetails) => {
    const p5Ref = useRef(null);
    const offscreenCanvasRef = useRef(null);
    const value = useContext(Context);
    const [state] = value;

    const width = 3200;
    const height = 3800;

    const bracketWeight = 5;
    const bracketColor = "#000"
    const textWeight = 1;
    const matchUpSpace = 60;
    const matchUpHeight = 160;

    const numTeams = 64;

    const generateAndDownload = useCallback(() => {
        function bracketContent(offScreenCanvas, yStart, group, iteration, lineStartX, lineEndX, color, position, height) {
          console.log("bracketContent");
          offScreenCanvas.stroke(color);
          offScreenCanvas.strokeWeight(bracketWeight);
          offScreenCanvas.line(lineStartX, yStart, lineEndX, yStart);
          offScreenCanvas.line(lineEndX, yStart, lineEndX, yStart + height);
          offScreenCanvas.line(lineEndX, yStart + height, lineStartX, yStart + height);
          offScreenCanvas.text("HELLO", 300, 300);
        }

        function round1(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
          console.log("ROUND 1");
            let groups = [groupA, groupB]
            for (let i = 0; i < groups.length; i++) {
              for (let r = 0; r < groups[i].length; r++) {
                console.log("HEllo...")
                bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height);
                yStart += matchUpHeight + matchUpSpace;
              }
            }
        }
        if (p5Ref.current) {
            const p = p5Ref.current;

            const numRounds = Math.log2(numTeams);
            let rounds = [];
            let teams = [];

            const offscreenCanvas = p.createGraphics(width, height);
            offscreenCanvasRef.current = offscreenCanvas.canvas; // Store the canvas element for potential later use

            offscreenCanvas.background(255, 255, 255);
            
            offscreenCanvas.strokeWeight(bracketWeight);
            // round1(offscreenCanvas)
            // console.log(state.bracket.group1.round1.roundMatchups);
            round1(offscreenCanvas, 55, bracketColor, 10, 200, state.bracket.group1.round1.roundMatchups, state.bracket.group2.round1.roundMatchups, "left", matchUpHeight)

            // round1(offscreenCanvas, width, height)
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
            {/* You can optionally add a ref to a div if you want p5 to manage its lifecycle there, */}
            {/* but for a hidden download, it's not strictly necessary for the visual rendering. */}
            {/* <div ref={canvasRef} style={{ display: 'none' }} /> */}
        </div>
    );
};

export default DownloadP5ImageHidden;