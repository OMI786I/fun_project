import { useEffect, useState } from "react";
import Game from "./Game";

const Games = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/gameList.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);

  return (
    <div>
      <Game></Game>
    </div>
  );
};

export default Games;
