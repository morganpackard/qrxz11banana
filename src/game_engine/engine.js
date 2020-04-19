import {
  vectorFrom2Points,
  magnitude,
  normalize,
  scale,
  add,
  subtract,
} from "./vector_utils";

const makeEngine = ({ drawMainCircle, drawOuterCircle }) => {
  // units / second;
  const MAX_BOUNDARY_SPEED = 200;
  const INNER_CIRCLE_RAD = 30;
  const OUTER_CIRCLE_RAD = 60;
  let boundaryPosition;

  // MAIN GAME LOOP FUNCTION
  return ({ deltaT, mousePos: { x: mouseX, y: mouseY } }) => {
    const maxBoundaryDelta = MAX_BOUNDARY_SPEED * deltaT;
    const mousePos = { x: mouseX, y: mouseY };
    // initialize boundary position
    boundaryPosition = boundaryPosition || mousePos;

    // the direction the boundary is going to go in.
    const boundaryVector = vectorFrom2Points(mousePos, boundaryPosition);
    const boundearyVectorLength = magnitude(boundaryVector);
    const clampedBoudaryVector =
      boundearyVectorLength > maxBoundaryDelta
        ? scale(normalize(boundaryVector), maxBoundaryDelta)
        : boundaryVector;

    boundaryPosition = add(boundaryPosition, clampedBoudaryVector);

    const tooFast =
      magnitude(subtract(mousePos, boundaryPosition)) + INNER_CIRCLE_RAD >
      OUTER_CIRCLE_RAD;

    drawOuterCircle({ pos: boundaryPosition, radius: OUTER_CIRCLE_RAD });
    drawMainCircle({ pos: mousePos, radius: INNER_CIRCLE_RAD, tooFast });
  };
};

export default makeEngine;
