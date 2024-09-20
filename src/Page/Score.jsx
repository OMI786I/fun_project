import React, { useState } from "react";

const Score = () => {
  const [asc, setAsc] = useState(true);

  return (
    <div>
      <h1 className="text-center font-bold underline text-3xl">Score</h1>
      <div className="flex justify-center">
        {" "}
        <div className="flex flex-col w-[30%] ">
          <h1 className="font-bold">sort scores</h1>
          <button className="btn btn-warning" onClick={() => setAsc(!asc)}>
            {asc ? "Low to High" : "High to Low"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Score;
