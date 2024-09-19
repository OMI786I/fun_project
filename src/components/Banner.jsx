import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./groovyWalk.json";

const Banner = () => {
  return (
    <div>
      <div className="hero animated-gradient min-h-screen">
        {/* Flex container for side-by-side layout */}
        <div className="hero-content flex flex-col md:flex-row items-center justify-center text-center md:text-left">
          {/* Left side: Text content */}
          <div className="max-w-md md:mr-8">
            <h1 className="text-5xl font-bold text-white">Hello there</h1>
            <p className="py-6 text-white">
              This is my simple MERN Stack application Fun Project. Here you can
              see my other projects from below and also you can play some basic
              games made with JavaScript. Enjoy!
            </p>
            <Link to={"/game"}>
              <button className="btn btn-neutral">Play Games!</button>
            </Link>
          </div>

          {/* Right side: Animation */}
          <div className="w-52 mt-6 md:mt-0">
            <Lottie animationData={groovyWalkAnimation} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
