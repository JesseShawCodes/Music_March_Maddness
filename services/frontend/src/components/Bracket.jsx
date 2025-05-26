/* eslint-disable */
import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import p5 from 'p5';

import { Context } from '../context/BracketContext';

const DownloadP5ImageHidden = (bracketDetails) => {
  const p5Ref = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const value = useContext(Context);
  const [state] = value;

  const width = 4200;
  const height = 3800;

  const bracketWeight = 5;
  const bracketColor = '#000';
  const matchUpSpace = 60;
  const matchUpHeight = 160;

  const bracketXStart = 10;

  // Song boxes
  const padding = 30;

  const generateAndDownload = useCallback(() => {
    function bracketContent(
      offScreenCanvas,
      yStart,
      group,
      iteration,
      lineStartX,
      lineEndX,
      color,
      position,
      height,
      fontSize = 45,
      rectangleHeight = 40,
    ) {
      var songAttrs = getSongAttributes(group, iteration, 'song1');
      offScreenCanvas.stroke(color);
      offScreenCanvas.strokeWeight(bracketWeight);
      offScreenCanvas.line(lineStartX, yStart, lineEndX, yStart);
      offScreenCanvas.line(lineEndX, yStart, lineEndX, yStart + height);
      offScreenCanvas.line(lineEndX, yStart + height, lineStartX, yStart + height);
      offScreenCanvas.textSize(fontSize);
      bracketContentSong(
        offScreenCanvas,
        yStart,
        lineStartX,
        lineEndX,
        songAttrs.artwork.bgColor,
        songAttrs.name,
        songAttrs.artwork.textColor2,
        position,
        fontSize,
        rectangleHeight,
      );
      songAttrs = getSongAttributes(group, iteration, 'song2');
      bracketContentSong(
        offScreenCanvas,
        yStart + height,
        lineStartX,
        lineEndX,
        songAttrs.artwork.bgColor,
        songAttrs.name,
        songAttrs.artwork.textColor2,
        position,
        fontSize,
        rectangleHeight,
      );
    }

    function bracketContentSong(
      offScreenCanvas,
      yStart,
      rectStart,
      rectEnd,
      bgColor,
      songName,
      textColor,
      position,
      fontSize = 18,
      rectangleHeight = 40,
      yStartSong = 10
    ) {
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
          bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height);
          yStart += (matchUpHeight * 2) + (matchUpSpace * 2);
        }
      }
    }
    function round3(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
      let groups = [groupA, groupB];
      for (let i = 0; i < groups.length; i++) {
        for (let r = 0; r < groups[i].length; r++) {
          bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height);
          yStart += (matchUpHeight * 4) + (matchUpSpace * 4);
        }
      }
    }  
    
    function round4(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height, fontSize) {
      let groups = [groupA, groupB];
      for (let i = 0; i < groups.length; i++) {
        for (let r = 0; r < groups[i].length; r++) {
          bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height, fontSize);
          yStart += (matchUpHeight * 8) + (matchUpSpace * 8);
        }
      }
    }
    function round5(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, position, height, iteration, fontSize) {
      bracketContent(offScreenCanvas, yStart, groupA, iteration, lineStartX, lineEndX, color, position, height, fontSize, 50);
    }

    function round6(offScreenCanvas, yStart, xStart, xEnd, color, groupA) {
      // stroke(color);

      bracketContentSong(offScreenCanvas, yStart, xStart, xEnd, groupA[0].attributes.song1.song.attributes.artwork.bgColor, groupA[0].attributes.song1.song.attributes.name, groupA[0].attributes.song1.song.attributes.artwork.textColor2, "left", 56, 100, 40);

      bracketContentSong(offScreenCanvas, yStart, width - xEnd, width - xStart, groupA[1].attributes.song2.song.attributes.artwork.bgColor, groupA[1].attributes.song2.song.attributes.name, groupA[1].attributes.song2.song.attributes.artwork.textColor2, "right", 56, 100, 40);
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

        let round1Length = 200;
        let round2length;
        let round3length;
        let round4length;

        round1(
          offscreenCanvas, 
          55, 
          bracketColor, 
          bracketXStart, 
          round1Length + bracketXStart, 
          state.bracket.group1.round1.roundMatchups, 
          state.bracket.group2.round1.roundMatchups, 
          "left", // Left or Right Side of Bracket
          matchUpHeight
        )
        round1(
          offscreenCanvas, 
          55, 
          bracketColor, 
          width - bracketXStart, 
          width - round1Length, 
          state.bracket.group3.round1.roundMatchups, 
          state.bracket.group4.round1.roundMatchups, 
          "right", 
          matchUpHeight
        )

        round2(
          offscreenCanvas,
          55 + (matchUpHeight / 2),
          bracketColor,
          round1Length,
          200 + 190,
          state.bracket.group1.round2.roundMatchups,
          state.bracket.group2.round2.roundMatchups, 
          "left",
          (matchUpHeight * 1.5)
        )
        round2(
          offscreenCanvas,
          55 + (matchUpHeight / 2),
          bracketColor,
          width - (round1Length),
          width - (420),
          state.bracket.group3.round2.roundMatchups,
          state.bracket.group4.round2.roundMatchups,
          "right",
          (matchUpHeight * 1.5)
        );

        round3(
          offscreenCanvas,
          55 + (matchUpHeight * 1.5),
          bracketColor,
          390,
          640,
          state.bracket.group1.round3.roundMatchups,
          state.bracket.group2.round3.roundMatchups,
          "left",
          matchUpHeight * 2.5
        );

        round3(
          offscreenCanvas,
          55 + (matchUpHeight * 1.5),
          bracketColor,
          width - 390,
          width - 640,
          state.bracket.group3.round3.roundMatchups,
          state.bracket.group4.round3.roundMatchups, 
          "right",
          matchUpHeight * 2.5
        );

        round4(
          offscreenCanvas,
          55 + (matchUpHeight * 3), 
          bracketColor, 
          640, 
          900,
          state.bracket.group1.round4.roundMatchups,
          state.bracket.group2.round4.roundMatchups,
          "left",
          matchUpHeight * 5,
          60
        );

        round4(
          offscreenCanvas,
          55 + (matchUpHeight * 3), 
          bracketColor, 
          width - 640, 
          width - 900,
          state.bracket.group3.round4.roundMatchups,
          state.bracket.group4.round4.roundMatchups,
          "right",
          matchUpHeight * 5,
          60
        );


        round5(
          offscreenCanvas,
          55 + (matchUpHeight * 6),
          bracketColor,
          900,
          1300,
          state.championshipBracket.round5.roundMatchups,
          "left",
          matchUpHeight * 10,
          0,
          45
        )

        round5(
          offscreenCanvas,
          55 + (matchUpHeight * 6), 
          bracketColor, 
          width - 900, 
          width - 1300,
          state.championshipBracket.round5.roundMatchups,
          "right",
          matchUpHeight * 10,
          1,
          45
        );

        round6(offscreenCanvas, height - (height * 0.05), 600, 600, bracketColor, state.championshipBracket.round5.roundMatchups);


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
      <button onClick={handleDownloadClick} className="btn btn-primary" type="button">Download your Bracket</button>
      {/* You can optionally add a ref to a div if you want p5 to manage its lifecycle there, */}
      {/* but for a hidden download, it's not strictly necessary for the visual rendering. */}
      {/* <div ref={canvasRef} style={{ display: 'none' }} /> */}
    </div>
  );
};

export default DownloadP5ImageHidden;
