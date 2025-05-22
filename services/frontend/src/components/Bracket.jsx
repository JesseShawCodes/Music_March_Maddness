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

    // Song boxes
    let padding = 30;

    const generateAndDownload = useCallback(() => {
        function bracketContent(offScreenCanvas, yStart, group, iteration, lineStartX, lineEndX, color, position, height) {
          offScreenCanvas.stroke(color);
          offScreenCanvas.strokeWeight(bracketWeight);
          offScreenCanvas.line(lineStartX, yStart, lineEndX, yStart);
          offScreenCanvas.line(lineEndX, yStart, lineEndX, yStart + height);
          offScreenCanvas.line(lineEndX, yStart + height, lineStartX, yStart + height);
          offScreenCanvas.textSize(45)

          var songAttrs = getSongAttributes(group, iteration, 'song1');
          bracketContentSong(
            offScreenCanvas,
            yStart, 
            lineStartX, 
            lineEndX,
            songAttrs.artwork.bgColor, 
            songAttrs.name, 
            songAttrs.artwork.textColor2, 
            position
          );
          var songAttrs = getSongAttributes(group, iteration, 'song2');
          bracketContentSong(
            offScreenCanvas,
            yStart + height, 
            lineStartX, 
            lineEndX,
            songAttrs.artwork.bgColor, 
            songAttrs.name, 
            songAttrs.artwork.textColor2, 
            position
          );
        }

        function bracketContentSong(offScreenCanvas, yStart, rectStart, rectEnd, bgColor, songName, textColor, position, fontSize = 36, rectangleHeight = 40, yStartSong = 10) {
          offScreenCanvas.textSize(fontSize)
          let rectWidth = offScreenCanvas.textWidth(songName) + 2 * padding;
          if (position === "right") {
            var endX = (width) - 10 - (width - rectStart);
            rectStart = endX - rectWidth;
          }
          offScreenCanvas.noStroke();
          offScreenCanvas.fill(`#${bgColor}`);
          offScreenCanvas.rect(rectStart, yStart - 20, rectWidth, rectangleHeight + 10, 12, 12, 12, 12);

          offScreenCanvas.fill(`#${textColor}`)

          offScreenCanvas.text(songName, rectStart + (padding * 0.4), yStart + yStartSong);
        }

        function getSongAttributes(group, iteration, songKey) {
          return group[iteration].attributes[songKey]?.song?.attributes;
        }

        function round1(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
            let groups = [groupA, groupB]
            for (let i = 0; i < groups.length; i++) {
              for (let r = 0; r < groups[i].length; r++) {
                bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height);
                yStart += matchUpHeight + matchUpSpace;
              }
            }
        }
        function round2(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
          let groups = [groupA, groupB];
          for (let i = 0; i < groups.length; i++) {
            for (let r = 0; r < groups[i].length; r++) {
              bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, yStart, color, position, height);
              yStart += (matchUpHeight * 2) + (matchUpSpace * 2);
            }
          }
        }        
        if (p5Ref.current) {
            const p = p5Ref.current;

            // const numRounds = Math.log2(numTeams);
            // let rounds = [];
            // let teams = [];

            const offscreenCanvas = p.createGraphics(width, height);
            offscreenCanvasRef.current = offscreenCanvas.canvas; // Store the canvas element for potential later use

            offscreenCanvas.background(255, 255, 255);
            
            offscreenCanvas.strokeWeight(bracketWeight);
            round1(offscreenCanvas, 55, bracketColor, 10, 200, state.bracket.group1.round1.roundMatchups, state.bracket.group2.round1.roundMatchups, "left", matchUpHeight)
            round1(offscreenCanvas, 55, bracketColor, width - 10, width - 200, state.bracket.group3.round1.roundMatchups, state.bracket.group4.round1.roundMatchups, "right", matchUpHeight)

            round2(
              offscreenCanvas,
              55 + (matchUpHeight / 2), 
              bracketColor, 
              200, 
              200 + 190, 
              state.bracket.group1.round2.roundMatchups, 
              state.bracket.group2.round2.roundMatchups, 
              "left",
              matchUpHeight
            )
            /*
            round2(
              offscreenCanvas,
              55 + (matchUpHeight / 2), 
              bracketColor, 
              width - (200), 
              width - (420), 
              state.bracket.group3.round2.roundMatchups, 
              state.bracket.group4.round2.roundMatchups, 
              "right",
              (matchUpHeight * 1.5)
            )
            */
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