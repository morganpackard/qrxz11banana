import React, { useRef, useEffect } from "react";
import "./App.css";
import runGame from "./game_engine";

function App() {
  const theCanvas = useRef(null);
  useEffect(() => {
    runGame(theCanvas.current);
  }, [theCanvas]);
  return <canvas ref={theCanvas} width={2640} height={2425} />;
}

export default App;
