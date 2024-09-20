import { useEffect, useState } from "react";
import Game from "./Game";
import { Link } from "react-router-dom";

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
      <h1 className="font-bold text-3xl text-center">Games List</h1>
      <div className="md:flex gap-5">
        {data.map((res) => (
          <div key={res.title} className="card bg-base-100 w-80 shadow-xl">
            <figure>
              <img src={res.image} className="w-[50%]" alt="image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{res.title}</h2>
              <Link to={res.link}>
                {" "}
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Play</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
