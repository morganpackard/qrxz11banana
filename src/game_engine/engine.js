import {
  vectorFrom2Points,
  magnitude,
  normalize,
  scale,
  add,
  subtract,
  distance,
} from "./vector_utils";

const updateParticlePositions = ({ particles, deltaT, bounds }) => {
  // todo -remove particles that have moved off screen
  particles.forEach((particle) => particle.move(deltaT));
};

const spawnParticles = () => {
  const pos = { x: Math.random() * 600, y: Math.random() * 600 };
  return new Array(10).fill(1).map((elem) => ({
    _direction: { x: Math.random() - 0.5, y: Math.random() },
    position: pos,
    move(deltaT) {
      this.position = add(this.position, this._direction);
    },
  }));
};

const MovingAverage = () => {
  const arr = [];
  // todo -- actually factor in time
  const WINDOW_SIZE = 50;

  return (num) => {
    arr.push(num);
    if (arr.length > WINDOW_SIZE) {
      arr.shift();
    }
    return arr.reduce((acc, num) => num + acc, 0) / arr.length;
  };
};

const makeEngine = ({ drawMainCircle, drawOuterCircle, drawFood }) => {
  // units / second;
  const MAX_BOUNDARY_SPEED = 100;
  const INNER_CIRCLE_RAD = 30;
  const OUTER_CIRCLE_RAD = 90;
  const PARTICLE_RAD = 10;
  const boundaryVelXFilter = MovingAverage();
  const boundaryVelYFilter = MovingAverage();
  let boundaryPosition;
  let particles = spawnParticles();
  let prevMousePos;

  // MAIN GAME LOOP FUNCTION
  return ({ deltaT, mousePos: { x: mouseX, y: mouseY } }) => {
    const mousePos = { x: mouseX, y: mouseY };
    const mouseVel = prevMousePos ? distance(prevMousePos, mousePos) : 0;
    prevMousePos = mousePos;

    const maxBoundaryDelta = MAX_BOUNDARY_SPEED * deltaT;
    // initialize boundary position
    boundaryPosition = boundaryPosition || mousePos;

    //// the direction the boundary is going to go in.
    const boundaryVector = ((rawVec) => ({
      x: boundaryVelXFilter(rawVec.x),
      y: boundaryVelYFilter(rawVec.y),
    }))(
      scale(normalize(vectorFrom2Points(mousePos, boundaryPosition)), mouseVel)
    );

    //const boundearyVectorLength = magnitude(boundaryVector);
    //const clampedBoudaryVector =
    //  boundearyVectorLength > maxBoundaryDelta
    //    ? scale(normalize(boundaryVector), maxBoundaryDelta)
    //    : boundaryVector;

    boundaryPosition = add(boundaryPosition, boundaryVector);

    const tooFast =
      magnitude(subtract(mousePos, boundaryPosition)) + INNER_CIRCLE_RAD >
      OUTER_CIRCLE_RAD;

    const collisionParticles = particles.filter(
      (particle) =>
        magnitude(subtract(particle.position, mousePos)) <
        PARTICLE_RAD + INNER_CIRCLE_RAD
    );

    if (!tooFast) {
      particles = particles.filter(
        (particle) => !collisionParticles.includes(particle)
      );
    }

    if (particles.length === 0) {
      particles = spawnParticles();
    }

    updateParticlePositions({ particles, deltaT });
    drawOuterCircle({ pos: boundaryPosition, radius: OUTER_CIRCLE_RAD });
    drawMainCircle({ pos: mousePos, radius: INNER_CIRCLE_RAD, tooFast });

    particles.forEach((particle) =>
      drawFood({ pos: particle.position, radius: PARTICLE_RAD })
    );
  };
};

export default makeEngine;
