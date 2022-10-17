import React from "react";

import { ExternalLink } from "neetoicons";
import { Button } from "neetoui";

import NavItem from "./NavItem";

const Navbar = () => (
  <div className="border-b flex justify-between p-5">
    <div className="flex">
      <div className="pl-4">
        <NavItem iconClass="ri-add-fill " name="Scribble" path="/articles" />
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
      onClick={() => window.open("/public", "_blank")}
    />
  </div>
);

export default Navbar;
