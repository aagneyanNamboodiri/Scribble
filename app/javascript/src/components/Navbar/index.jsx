import React from "react";

import { Typography } from "neetoui";

import NavItem from "./NavItem";

const Navbar = () => (
  <div className="border-b flex p-5">
    <Typography className="font-semibold" style="h3">
      Scribble
    </Typography>
    <div className="pl-4">
      <NavItem iconClass="ri-add-fill " name="Articles" path="/articles" />
      <NavItem
        iconClass="ri-file-download-fill"
        name="Settings"
        path="/settings"
      />
    </div>
  </div>
);

export default Navbar;
