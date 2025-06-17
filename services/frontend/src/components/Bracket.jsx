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

  // Image dimensions
  const width = 4200;
  const canvasHeight = 3800;

  const bracketWeight = 5;
  const bracketColor = '#000';
  const matchUpSpace = 60;
  const matchUpHeight = 160;

  const bracketXStart = 10;

  const generateAndDownload = useCallback(() => {
    const p = p5Ref.current;
    const offscreenCanvas = p.createGraphics(width, canvasHeight);

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
    ) {
      offScreenCanvas.textSize(fontSize);

      const padding = 10;

      const rectWidth = offScreenCanvas.textWidth(songName) + 2 * padding;

      if (position === 'right') {
        const canvasWidth = offScreenCanvas.width || width;
        const endX = (canvasWidth) - 10 - (canvasWidth - rectStart);
        rectStart = endX - rectWidth;
      }

      offScreenCanvas.noStroke();
      offScreenCanvas.fill(`#${bgColor}`);

      const rectY = yStart - 20;
      const actualRectangleHeight = rectangleHeight + 10;
      offScreenCanvas.rect(rectStart, rectY, rectWidth, actualRectangleHeight, 12, 12, 12, 12);

      offScreenCanvas.fill(`#${textColor}`);

      // Calculate the vertical center of the rectangle
      const textY = rectY + actualRectangleHeight / 2;

      // Calculate the horizontal center of the rectangle
      const textX = rectStart + rectWidth / 2;

      // Set text alignment to center both horizontally and vertically
      offScreenCanvas.textAlign(offScreenCanvas.CENTER, offScreenCanvas.CENTER);

      offScreenCanvas.text(songName, textX, textY);

      // reset textAlign
      offScreenCanvas.textAlign(offScreenCanvas.LEFT, offScreenCanvas.TOP);
    }

    function getSongAttributes(group, iteration, songKey) {
      return group[iteration].attributes[songKey]?.song?.attributes;
    }

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
      let songAttrs = getSongAttributes(group, iteration, 'song1');
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

    function round(
      offScreenCanvas,
      yStart,
      color,
      lineStartX,
      lineEndX,
      groupA,
      groupB,
      position,
      height,
      heightRatio = 1,
      fontSize = 24,
    ) {
      const groups = [groupA, groupB];
      for (let i = 0; i < groups.length; i++) {
        for (let r = 0; r < groups[i].length; r++) {
          bracketContent(
            offScreenCanvas,
            yStart,
            groups[i],
            r,
            lineStartX,
            lineEndX,
            color,
            position,
            height,
            fontSize,
          );
          yStart += (matchUpHeight * heightRatio) + (matchUpSpace * heightRatio);
        }
      }
    }

    // Add artist image
    function newImageTab(board, artistName) {
      const imageDataUrl = board.canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imageDataUrl;
      link.download = `dadgad_${artistName}_bracket.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // --- Extracted bracket drawing logic into a new function ---
    function drawBracketContent(offScreenCanvas) {
      const round1Length = 200;

      round(
        offScreenCanvas,
        55,
        bracketColor,
        bracketXStart,
        round1Length + bracketXStart,
        state.bracket.group1.round1.roundMatchups,
        state.bracket.group2.round1.roundMatchups,
        'left',
        matchUpHeight,
      );
      round(
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

      round(
        offScreenCanvas,
        55 + (matchUpHeight / 2),
        bracketColor,
        round1Length,
        200 + 190,
        state.bracket.group1.round2.roundMatchups,
        state.bracket.group2.round2.roundMatchups,
        'left',
        (matchUpHeight * 1.5),
        2,
      );
      round(
        offScreenCanvas,
        55 + (matchUpHeight / 2),
        bracketColor,
        width - (round1Length),
        width - (420),
        state.bracket.group3.round2.roundMatchups,
        state.bracket.group4.round2.roundMatchups,
        'right',
        (matchUpHeight * 1.5),
        2,
      );

      round(
        offScreenCanvas,
        55 + (matchUpHeight * 1.5),
        bracketColor,
        390,
        640,
        state.bracket.group1.round3.roundMatchups,
        state.bracket.group2.round3.roundMatchups,
        'left',
        matchUpHeight * 2.5,
        4,
      );

      round(
        offScreenCanvas,
        55 + (matchUpHeight * 1.5),
        bracketColor,
        width - 390,
        width - 640,
        state.bracket.group3.round3.roundMatchups,
        state.bracket.group4.round3.roundMatchups,
        'right',
        matchUpHeight * 2.5,
        4,
      );

      round(
        offScreenCanvas,
        55 + (matchUpHeight * 3),
        bracketColor,
        640,
        900,
        state.bracket.group1.round4.roundMatchups,
        state.bracket.group2.round4.roundMatchups,
        'left',
        matchUpHeight * 5,
        8,
        60,
      );

      round(
        offScreenCanvas,
        55 + (matchUpHeight * 3),
        bracketColor,
        width - 640,
        width - 900,
        state.bracket.group3.round4.roundMatchups,
        state.bracket.group4.round4.roundMatchups,
        'right',
        matchUpHeight * 5,
        8,
        60,
      );

      bracketContent(
        offScreenCanvas,
        55 + (matchUpHeight * 6),
        state.championshipBracket.round5.roundMatchups,
        0,
        900,
        1300,
        bracketColor,
        'left',
        matchUpHeight * 10,
        45,
      );

      bracketContent(
        offScreenCanvas,
        55 + (matchUpHeight * 6),
        state.championshipBracket.round5.roundMatchups,
        1,
        width - 900,
        width - 1300,
        bracketColor,
        'right',
        matchUpHeight * 10,
        45
      );

      bracketContentSong(
        offScreenCanvas,
        canvasHeight - (canvasHeight * 0.05),
        600,
        600,
        state.championshipBracket.round5.roundMatchups[0].attributes.song1.song.attributes.artwork.bgColor,
        state.championshipBracket.round5.roundMatchups[0].attributes.song1.song.attributes.name,
        state.championshipBracket.round5.roundMatchups[0].attributes.song1.song.attributes.artwork.textColor2,
        'left',
        56,
        100,
        40
      );

      bracketContentSong(
        offScreenCanvas,
        canvasHeight - (canvasHeight * 0.05),
        width - 600,
        width - 600,
        state.championshipBracket.round5.roundMatchups[1].attributes.song1.song.attributes.artwork.bgColor,
        state.championshipBracket.round5.roundMatchups[1].attributes.song1.song.attributes.name,
        state.championshipBracket.round5.roundMatchups[1].attributes.song1.song.attributes.artwork.textColor2,
        "right",
        56,
        100,
        40
      );

      // winner(offScreenCanvas, state.champion);
      bracketContentSong(
        offScreenCanvas,
        1000,
        width/2,
        3000,
        state.champion.song.attributes.artwork.textColor3,
        state.champion.song.attributes.name,
        state.champion.song.attributes.artwork.bgColor,
        "right", 
        60,
        100,
      );
    }

    function placeArtistImage(artistImage, artistName) {
      const targetImageWidth = 400;
      const img = p.loadImage(
        artistImage,
        () => {
          const imgX = (width / 2) - (targetImageWidth / 2);
          // Draw the image at the calculated centered position
          // Example: Image Url, x, y, width, height
          offscreenCanvas.image(img, imgX, 400, targetImageWidth, 400);
          // Continue with other drawing operations
          drawBracketContent(offscreenCanvas);
          newImageTab(offscreenCanvas, artistName);
          /// offscreenCanvas.save(`dadgad_${bracketDetails.artistName}_bracket.png`);
        },
        (event) => {
          console.error('Error loading image:', event);
          // If image fails to load, still draw the rest of the bracket
          drawBracketContent(offscreenCanvas);
          // offscreenCanvas.save(`dadgad_${bracketDetails.artistName}_bracket.png`);
          newImageTab(offscreenCanvas, artistName);
        },
      );
    }

    offscreenCanvasRef.current = offscreenCanvas.canvas; // Store the canvas element for potential later use

    offscreenCanvas.background(255, 255, 255);
    
    offscreenCanvas.strokeWeight(bracketWeight);

    if (state.values.artist_image) {
      placeArtistImage(state.values.artist_image, state.values.artist_name);
    } else {
      console.warn('No header image URL provided.');
      // If no image URL, just draw the bracket content
      drawBracketContent(offscreenCanvas);
      // offscreenCanvas.save(`dadgad_${bracketDetails.artistName}_bracket.png`);
      newImageTab(offscreenCanvas, bracketDetails.artistName);
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
}

export default DownloadP5ImageHidden;
