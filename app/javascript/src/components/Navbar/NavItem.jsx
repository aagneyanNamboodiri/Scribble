import React from "react";

import { NavLink } from "react-router-dom";

const NavItem = ({ iconClass, name, path }) => (
  <NavLink
    activeClassName="text-indigo-500"
    to={path}
    className="mr-6 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5
      text-gray-400"
  >
    {iconClass && <i className={`${iconClass} text-bb-purple`} />}
    {name}
  </NavLink>
);

export default NavItem;
