import React from "react";
import Banner from "../components/Banner";
import PreviosProjects from "../components/PreviosProjects";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="my-12 font-bold text-3xl text-center underline">
        Previous Projects
      </div>
      <PreviosProjects></PreviosProjects>
    </div>
  );
};

export default Home;
