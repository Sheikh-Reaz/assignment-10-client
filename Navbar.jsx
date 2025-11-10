import React, { use } from "react";

import { Link, NavLink } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../provider/AuthProvider";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logOut().then(() => {});
  };
  const Links = (
    <>
      <li>
        <NavLink className={"text-xl text-color "} to={"/"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={"text-xl text-color"} to={"/allProducts"}>
          All Products
        </NavLink>
      </li>

{user && (
  <li>
    <NavLink className="text-xl text-color" to="/myImport">
      My Import
    </NavLink>
  </li>
)}
{user && (
  <li>
    <NavLink className="text-xl text-color" to="/myExport">
      My Export
    </NavLink>
  </li>
)}
{user && (
  <li>
    <NavLink className="text-xl text-color" to="/export">
     Add Export
    </NavLink>
  </li>
)}
      
    </>
  );
  return (
    <div>
      <div className="     ">
        <div className="navbar container mx-auto ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content  rounded-box  mt-3 w-52 p-2 shadow"
              >
                <li>{Links}</li>
                <li>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="btn  btn-secondary text-2xl md:text-3xl font-bold "
                    >
                      Logout
                    </button>
                  )}
                </li>
              </ul>
            </div>

            <Link
              to={"/"}
              className={
                "text-2xl flex items-center  text-color  font-semibold gap-4 hover: "
              }
            >
              <h1 className="text-color ">
                Import <span className=" text-primary ">Export</span> Hub
              </h1>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Links}</ul>
          </div>
          {/**Right section  */}
          <div className="navbar-end">
            {user && (
              <div
                className="relative group inline-block mr-4"
                tabIndex={0}
                aria-label={
                  user?.displayName ? `User: ${user.displayName}` : ""
                }
              >
                <img
                  className="w-14 h-14 rounded-full border-2 border-white/30 object-cover cursor-pointer shadow-sm"
                  src={user?.photoURL || ""}
                  alt={user?.displayName || "User avatar"}
                  title={user?.displayName || user?.email || ""}
                />
              </div>
            )}
            <div>
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* moon icon for dark mode */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 21a9 9 0 009-8.21z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* sun icon for light mode */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m8.485-8.485l.707.707M4.808 4.808l.707.707M21 12h1M2 12H1m15.364 6.364l.707.707M6.343 6.343l.707.707"
                    />
                  </svg>
                )}
              </button>
            </div>

                  <div className=" flex gap-2" >
                               {user ? (
              <button
                onClick={handleLogout}
                className="btn hidden md:block btn-secondary text-2xl md:text-3xl font-bold "
              >
                Logout
              </button>
            ) : (
              <NavLink
                to={"/login"}
                className="btn btn-outline btn-primary text-xl md:text-3xl  "
              >
                Login
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/register"
                className="btn btn-outline btn-primary text-xl md:text-3xl"
              >
                Register
              </NavLink>
            )}
                  </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
