import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const DefaultLayout = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center max-w-[2560px] place-self-center">
        <Navbar />
        <div className="flex-1 h-full w-full">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default DefaultLayout;
