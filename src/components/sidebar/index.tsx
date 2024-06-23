import { Link, useLocation } from "react-router-dom";
import { mainLogo } from "../../assets";
import { NAVLINKS } from "./data";

function Sidebar() {
  const location = useLocation();
  return (
    <nav className="w-60 h-full bg-white">
      <div className="flex flex-col ">
        {/* Main logo */}
        <div className="p-5">
          <img src={mainLogo} alt="main-logo" className="" />
        </div>
        {/* Sidebar links */}
        <div className="pt-8">
          <ul className="flex flex-col gap-4 w-full">
            {NAVLINKS.map((navlink) => (
              <li
                key={navlink.id}
                className={`p-2 flex items-center gap-5 cursor-pointer ${
                  location.pathname === navlink.route
                    ? "bg-primary-foreground"
                    : ""
                }`}
              >
                <img src={navlink.icon} alt={navlink.title} className="" />
                <Link
                  to={navlink.route}
                  className={`text-gray-800 text-lg hover:text-blue-500 ${
                    location.pathname === navlink.route ? "text-blue-500" : ""
                  }`}
                >
                  {navlink.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
