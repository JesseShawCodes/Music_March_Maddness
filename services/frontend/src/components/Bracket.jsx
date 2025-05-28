/* eslint-disable */
import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import p5 from 'p5';

import { Context } from '../context/BracketContext';

function DownloadP5ImageHidden(bracketDetails) {
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
      offScreenCanvas.textSize(fontSize);

      const padding = 10;

      let rectWidth = offScreenCanvas.textWidth(songName) + 2 * padding;

      if (position === "right") {
        let canvasWidth = offScreenCanvas.width || width;
        var endX = (canvasWidth) - 10 - (canvasWidth - rectStart);
        rectStart = endX - rectWidth;
      }

      offScreenCanvas.noStroke();
      offScreenCanvas.fill(`#${bgColor}`);

      let rectY = yStart - 20;
      let actualRectangleHeight = rectangleHeight + 10;
      offScreenCanvas.rect(rectStart, rectY, rectWidth, actualRectangleHeight, 12, 12, 12, 12);

      offScreenCanvas.fill(`#${textColor}`);

      // Calculate the vertical center of the rectangle
      let textY = rectY + actualRectangleHeight / 2;
      
      // Calculate the horizontal center of the rectangle
      let textX = rectStart + rectWidth / 2;

      // Set text alignment to center both horizontally and vertically
      offScreenCanvas.textAlign(offScreenCanvas.CENTER, offScreenCanvas.CENTER);

      offScreenCanvas.text(songName, textX, textY);

      // reset textAlign
      offScreenCanvas.textAlign(offScreenCanvas.LEFT, offScreenCanvas.TOP);
    }

    function getSongAttributes(group, iteration, songKey) {
      return group[iteration].attributes[songKey]?.song?.attributes;
    }

    function round1(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
        const groups = [groupA, groupB]
        for (let i = 0; i < groups.length; i++) {
          for (let r = 0; r < groups[i].length; r++) {
            bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height);
            yStart += matchUpHeight + matchUpSpace;
          }
        }
    }
    function round2(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
      const groups = [groupA, groupB];
      for (let i = 0; i < groups.length; i++) {
        for (let r = 0; r < groups[i].length; r++) {
          bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height);
          yStart += (matchUpHeight * 2) + (matchUpSpace * 2);
        }
      }
    }
    function round3(
      offScreenCanvas,
      yStart,
      color,
      lineStartX,
      lineEndX,
      groupA,
      groupB,
      position,
      height
    ) {
      const groups = [groupA, groupB];
      for (let i = 0; i < groups.length; i++) {
        for (let r = 0; r < groups[i].length; r++) {
          bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height);
          yStart += (matchUpHeight * 4) + (matchUpSpace * 4);
        }
      }
    }  
    
    function round4(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, groupB, position, height, fontSize) {
      const groups = [groupA, groupB];
      for (let i = 0; i < groups.length; i++) {
        for (let r = 0; r < groups[i].length; r++) {
          bracketContent(offScreenCanvas, yStart, groups[i], r, lineStartX, lineEndX, color, position, height, fontSize);
          yStart += (matchUpHeight * 8) + (matchUpSpace * 8);
        }
      }
    }
    function round5(offScreenCanvas, yStart, color, lineStartX, lineEndX, groupA, position, height, iteration, fontSize) {
      bracketContent(offScreenCanvas, yStart, groupA, iteration, lineStartX, lineEndX, color, position, height, fontSize, 70);
    }

    function round6(offScreenCanvas, yStart, xStart, xEnd, color, groupA) {

      bracketContentSong(offScreenCanvas, yStart, xStart, xEnd, groupA[0].attributes.song1.song.attributes.artwork.bgColor, groupA[0].attributes.song1.song.attributes.name, groupA[0].attributes.song1.song.attributes.artwork.textColor2, "left", 56, 100, 40);

      bracketContentSong(offScreenCanvas, yStart, width - xEnd, width - xStart, groupA[1].attributes.song2.song.attributes.artwork.bgColor, groupA[1].attributes.song2.song.attributes.name, groupA[1].attributes.song2.song.attributes.artwork.textColor2, "right", 56, 100, 40);
    }

    if (p5Ref.current) {
        const p = p5Ref.current;

        const offscreenCanvas = p.createGraphics(width, height);
        offscreenCanvasRef.current = offscreenCanvas.canvas; // Store the canvas element for potential later use

        offscreenCanvas.background(255, 255, 255);
        
        offscreenCanvas.strokeWeight(bracketWeight);

        let img; 
        const targetImageWidth = 400;

        function winner(offScreenCanvas, winner) {
          offScreenCanvas.noStroke();
          offScreenCanvas.textSize(50);
          offScreenCanvas.textAlign(p.CENTER);
          offScreenCanvas.fill(`#${winner.song.attributes.artwork.textColor2}`);
          offScreenCanvas.text("Winner:", width - (width * 0.5), height - (height * 0.25));
          offScreenCanvas.text(winner.song.attributes.name, width - (width * 0.5), height - (height * 0.2));
          offScreenCanvas.textAlign(p.LEFT);
        }

        if (state.values.artist_image) {
            img = p.loadImage(state.values.artist_image,
                () => {
                    
                    const imgX = (width / 2) - (targetImageWidth / 2);

                    // Draw the image at the calculated centered position
                    // Example: Image Url, x, y, width, height
                    offscreenCanvas.image(img, imgX, 400, targetImageWidth, 400);

                    // Continue with other drawing operations
                    drawBracketContent(offscreenCanvas);
                    offscreenCanvas.save(`dadgad_${bracketDetails.artistName}_bracket.png`);
                },
                (event) => {
                    console.error('Error loading image:', event);
                    // If image fails to load, still draw the rest of the bracket
                    drawBracketContent(offscreenCanvas);
                    offscreenCanvas.save(`dadgad_${bracketDetails.artistName}_bracket.png`);
                },
            );
        } else {
          console.warn('No header image URL provided.');
          // If no image URL, just draw the bracket content
          drawBracketContent(offscreenCanvas);
          offscreenCanvas.save(`dadgad_${bracketDetails.artistName}_bracket.png`);
        }

      // --- Extracted bracket drawing logic into a new function ---
      function drawBracketContent(offScreenCanvas) {
        const round1Length = 200;

        round1(
          offScreenCanvas,
          55,
          bracketColor,
          bracketXStart,
          round1Length + bracketXStart,
          state.bracket.group1.round1.roundMatchups,
          state.bracket.group2.round1.roundMatchups,
          'left', // Left or Right Side of Bracket
          matchUpHeight,
        );
        round1(
          offScreenCanvas,
          55,
          bracketColor,
          width - bracketXStart,
          width - round1Length,
          state.bracket.group3.round1.roundMatchups,
          state.bracket.group4.round1.roundMatchups,
          'right',
          matchUpHeight,
        );

        round2(
          offScreenCanvas,
          55 + (matchUpHeight / 2),
          bracketColor,
          round1Length,
          200 + 190,
          state.bracket.group1.round2.roundMatchups,
          state.bracket.group2.round2.roundMatchups,
          'left',
          (matchUpHeight * 1.5),
        );
        round2(
          offScreenCanvas,
          55 + (matchUpHeight / 2),
          bracketColor,
          width - (round1Length),
          width - (420),
          state.bracket.group3.round2.roundMatchups,
          state.bracket.group4.round2.roundMatchups,
          'right',
          (matchUpHeight * 1.5),
        );

        round3(
          offScreenCanvas,
          55 + (matchUpHeight * 1.5),
          bracketColor,
          390,
          640,
          state.bracket.group1.round3.roundMatchups,
          state.bracket.group2.round3.roundMatchups,
          'left',
          matchUpHeight * 2.5,
        );

        round3(
          offScreenCanvas,
          55 + (matchUpHeight * 1.5),
          bracketColor,
          width - 390,
          width - 640,
          state.bracket.group3.round3.roundMatchups,
          state.bracket.group4.round3.roundMatchups,
          'right',
          matchUpHeight * 2.5,
        );

        round4(
          offScreenCanvas,
          55 + (matchUpHeight * 3),
          bracketColor,
          640,
          900,
          state.bracket.group1.round4.roundMatchups,
          state.bracket.group2.round4.roundMatchups,
          'left',
          matchUpHeight * 5,
          60,
        );

        round4(
          offScreenCanvas,
          55 + (matchUpHeight * 3),
          bracketColor,
          width - 640,
          width - 900,
          state.bracket.group3.round4.roundMatchups,
          state.bracket.group4.round4.roundMatchups,
          'right',
          matchUpHeight * 5,
          60,
        );

        round5(
          offScreenCanvas,
          55 + (matchUpHeight * 6),
          bracketColor,
          900,
          1300,
          state.championshipBracket.round5.roundMatchups,
          'left',
          matchUpHeight * 10,
          0,
          45,
        );

        round5(
          offScreenCanvas,
          55 + (matchUpHeight * 6),
          bracketColor,
          width - 900,
          width - 1300,
          state.championshipBracket.round5.roundMatchups,
          'right',
          matchUpHeight * 10,
          1,
          45,
        );

        round6(
          offScreenCanvas,
          height - (height * 0.05),
          600,
          600,
          bracketColor,
          state.championshipBracket.round5.roundMatchups,
        );

        winner(offScreenCanvas, state.champion);
      }
    }
  }, [bracketDetails, state.values.artist_image, state]);

  useEffect(() => {
    p5Ref.current = new p5(() => {}, document.createElement('div')); // Create a p5 instance without attaching to DOM

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, []);

  return (
    <button onClick={generateAndDownload} className="btn btn-primary" type="button">Download your Bracket</button>
  );
};

export default DownloadP5ImageHidden;
