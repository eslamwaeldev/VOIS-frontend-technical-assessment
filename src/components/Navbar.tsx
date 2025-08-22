import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="min-w-full w-full flex gap-6 items-center border-b-2 border-gray-300 shadow-sm p-6 lg:px-20 lg:py-2 ">
      <NavLink to={"/"} className="col-span-1">
        <img
          src="/VF_Icon_RGB_White.jpg"
          alt="Vodafone logo"
          height={32}
          width={32}
          className="size-12 object-cover"
        />
      </NavLink>
      <NavLink to={"/"} className="h-full flex flex-col justify-center gap-2 group">
        <h4 className="text-gray-700 font-light">Fill another form</h4>
        <span className="block h-1 w-0 group-hover:w-full transition-all duration-300 bg-red-500 rounded-2xl" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
