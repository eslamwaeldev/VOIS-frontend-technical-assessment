import { NavLink } from "react-router";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  return (
    <nav
      className={`bg-white text-gray-900  dark:bg-gray-950 dark:text-gray-50
       min-w-full w-full flex justify-between items-center border-b-2 border-gray-300 dark:border-gray-700 shadow-sm p-6 lg:px-20 lg:py-2 `}
    >
      <div className="flex gap-8 h-full">
        <NavLink to={"/"} className="col-span-1">
          <img
            src="/vodafone-icon.svg"
            alt="Vodafone logo"
            height={32}
            width={32}
            className="size-12 object-cover"
          />
        </NavLink>
        <NavLink
          to={"/"}
          className="flex flex-col items-center justify-center gap-2 group relative"
        >
          <h4 className={` text-gray-700 dark:text-gray-300 font-light`}>Fill another form</h4>
          <span className="absolute bottom-0 group-hover:block h-1 w-0 group-hover:w-full transition-all duration-300 bg-red-500 rounded-2xl" />
        </NavLink>
      </div>
      <ThemeButton />
    </nav>
  );
};

export default Navbar;
