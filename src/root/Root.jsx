import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Toaster />
      <div className="md:px-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
