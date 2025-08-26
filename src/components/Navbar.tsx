import { NavLink, useLocation } from "react-router";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1];
  return (
    <nav
      className={`bg-white text-gray-900  dark:bg-vodafone-gray dark:text-gray-50
       min-w-full w-full flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700 p-6 lg:px-20 lg:py-2 `}
    >
      <NavLink to={"/"} className="col-span-1">
        <img
          src="/vodafone-icon.svg"
          alt="Vodafone logo"
          height={32}
          width={32}
          className="size-12 object-cover"
        />
      </NavLink>
      <div className="flex gap-8 h-full">
        {pageName === "thanks" && (
          <NavLink
            to={`/`}
            className="flex flex-col items-center justify-center gap-2 group relative"
          >
            <h4 className={` text-gray-700 dark:text-gray-300 font-light`}>Fill another form</h4>
            <span className="absolute bottom-0 group-hover:block h-1 w-0 group-hover:w-full transition-all duration-300 bg-red-500 rounded-2xl" />
          </NavLink>
        )}
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;
