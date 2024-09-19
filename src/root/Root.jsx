import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="md:px-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
