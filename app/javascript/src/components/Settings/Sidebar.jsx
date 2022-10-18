import React from "react";

import { MenuBar } from "neetoui/layouts";
import { useHistory } from "react-router";

const Sidebar = () => {
  const history = useHistory();

  return (
    <div className="flex">
      <MenuBar showMenu>
        <MenuBar.Item
          active={window.location.pathname === "/settings/general"}
          description="Page Title, Brand Name & Meta Description"
          label="General"
          onClick={() => {
            history.push("/settings/general");
          }}
        />
        <MenuBar.Item
          active={window.location.pathname === "/settings/redirections"}
          description="Create & configure redirection rules"
          label="Redirections"
          onClick={() => {
            history.push("/settings/redirections");
          }}
        />
        <MenuBar.Item
          active={window.location.pathname === "/settings/categories"}
          description="Edit and reorder KB structure"
          label="Manage Categories"
          onClick={() => {
            history.push("/settings/categories");
          }}
        />
      </MenuBar>
    </div>
  );
};

export default Sidebar;
