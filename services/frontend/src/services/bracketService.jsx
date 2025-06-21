const bracketWeight = 5;
const bracketColor = '#000';
const matchUpSpace = 60;
const matchUpHeight = 160;

const round1Length = 200;

const bracketXStart = 10;

const width = 4200;

function getSongAttributes(group, iteration, songKey) {
  return group[iteration].attributes[songKey]?.song?.attributes;
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
) {
  offScreenCanvas.textSize(fontSize);

  const padding = 10;

  const rectWidth = offScreenCanvas.textWidth(songName) + 2 * padding;

  let finalRectStart = rectStart;

  if (position === 'right') {
    const canvasWidth = offScreenCanvas.width || width;
    const endX = (canvasWidth) - 10 - (canvasWidth - rectStart);
    finalRectStart = endX - rectWidth;
  }

  offScreenCanvas.noStroke();
  offScreenCanvas.fill(`#${bgColor}`);

  const rectY = yStart - 20;
  const actualRectangleHeight = rectangleHeight + 10;
  offScreenCanvas.rect(finalRectStart, rectY, rectWidth, actualRectangleHeight, 12, 12, 12, 12);

  offScreenCanvas.fill(`#${textColor}`);

  // Calculate the vertical center of the rectangle
  const textY = rectY + actualRectangleHeight / 2;

  // Calculate the horizontal center of the rectangle
  const textX = finalRectStart + rectWidth / 2;

  // Set text alignment to center both horizontally and vertically
  offScreenCanvas.textAlign(offScreenCanvas.CENTER, offScreenCanvas.CENTER);

  offScreenCanvas.text(songName, textX, textY);

  // reset textAlign
  offScreenCanvas.textAlign(offScreenCanvas.LEFT, offScreenCanvas.TOP);
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

export const round = (
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
) => {
  const groups = [groupA, groupB];
  let yStartAdjusted = yStart;
  for (let i = 0; i < groups.length; i += 1) {
    for (let r = 0; r < groups[i].length; r += 1) {
      bracketContent(
        offScreenCanvas,
        yStartAdjusted,
        groups[i],
        r,
        lineStartX,
        lineEndX,
        color,
        position,
        height,
        fontSize,
      );
      yStartAdjusted += (matchUpHeight * heightRatio) + (matchUpSpace * heightRatio);
    }
  }
};

export const bracket = (state, offScreenCanvas) => {
  console.log(state);
  console.log(offScreenCanvas);

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
};
