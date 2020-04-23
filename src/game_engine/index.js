import makeEngine from "./engine";

export default (theCanvas) => {
  const ctx = theCanvas.getContext("2d");

  const mousePos = { x: 0, y: 0 };
  theCanvas.addEventListener("mousemove", (evt) => {
    mousePos.x = evt.clientX;
    mousePos.y = evt.clientY;
  });

  const drawMainCircle = ({ pos: { x, y }, radius, tooFast }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = tooFast ? "red" : "green";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#003300";
    ctx.stroke();
    ctx.fillStyle = "black";
  };

  const drawOuterCircle = ({ pos: { x, y }, radius }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgb(0.1, 0.1, 0.1)`;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#003300";
    ctx.stroke();
    ctx.fillStyle = "black";
  };

  const drawFood = ({ pos: { x, y }, radius }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgb(0.1, 0.1, 0.1)`;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#003300";
    ctx.stroke();
    ctx.fillStyle = "black";
  };

  let lastRender = 0;
  const updateEngine = makeEngine({
    drawMainCircle,
    drawOuterCircle,
    drawFood,
  });

  const loop = (timestamp) => {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    const progress = timestamp - lastRender;
    updateEngine({ deltaT: progress / 1000, mousePos });
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  };

  loop();
};
