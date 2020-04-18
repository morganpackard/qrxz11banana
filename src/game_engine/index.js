export default (theCanvas) => {
  const ctx = theCanvas.getContext("2d");

  const mousePos = { x: 0, y: 0 };
  theCanvas.addEventListener("mousemove", (evt) => {
    mousePos.x = evt.clientX;
    mousePos.y = evt.clientY;
  });

  const drawMainCircle = ({ x, y }) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 150, 100);

    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#003300";
    ctx.stroke();

    ctx.fillStyle = "black";
  };

  let lastRender = 0;
  const updateEngine = makeEngine({ drawMainCircle });

  const loop = (timestamp) => {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    const progress = timestamp - lastRender;
    updateEngine({ progress, mousePos });
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  };

  loop();
};

const makeEngine = ({ drawMainCircle }) => {
  let mainCirclePos = { x: 100, y: 100 };
  return ({ progress, mousePos }) => {
    mainCirclePos.x++;
    drawMainCircle(mousePos);
  };
};
