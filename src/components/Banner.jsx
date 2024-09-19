import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="hero animated-gradient min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">Hello there</h1>
            <p className="py-6 text-white">
              This is my simple MERN Stack application Fun Project. Here you can
              see my other projects from below and also you can also play some
              basic games made with javascript. Enjoy!
            </p>
            <button className="btn btn-neutral">Play Games!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
