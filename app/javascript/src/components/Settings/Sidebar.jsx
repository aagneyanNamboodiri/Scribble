import React from "react";

import { MenuBar } from "neetoui/layouts";

const Sidebar = () => (
  <div className="flex">
    <MenuBar showMenu>
      <MenuBar.Item
        active={window.location.pathname === "/settings/general"}
        description="Page Title, Brand Name & Meta Description"
        label="General"
        onClick={() => {
          window.location.href = "/settings/general";
        }}
      />
      <MenuBar.Item
        active={window.location.pathname === "/settings/redirections"}
        description="Create & configure redirection rules"
        label="Styling"
        onClick={() => {
          window.location.href = "/settings/redirections";
        }}
      />
      <MenuBar.Item
        active={window.location.pathname === "/settings/categories"}
        description="Edit and reorder KB structure"
        label="Manage Categories"
        onClick={() => {
          window.location.href = "/settings/categories";
        }}
      />
    </MenuBar>
  </div>
);

export default Sidebar;
