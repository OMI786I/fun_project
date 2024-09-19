import React, { useState } from "react";
import Game from "./Game";

const Games = () => {
  const [play, setPlay] = useState("");
  const play1 = (id) => {
    console.log(id);
    setPlay(id);
  };
  return (
    <div>
      <Game></Game>
    </div>
  );
};

export default Games;
