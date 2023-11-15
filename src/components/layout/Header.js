import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header flex items-center justify-center gap-x-5 text-white py-5 text-xl">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-pink-500" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/Movies"
        className={({ isActive }) => (isActive ? "text-pink-500" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
