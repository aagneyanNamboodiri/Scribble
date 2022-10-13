import React from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Button } from "neetoui";

import NavItem from "./NavItem";

const Navbar = () => (
  <div className="border-b flex justify-between p-5">
    <div className="flex">
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
    <Button
      icon={() => <ExternalLink size={17} />}
      label="Preview"
      style="secondary"
      to="/public"
    />
  </div>
);

export default Navbar;
