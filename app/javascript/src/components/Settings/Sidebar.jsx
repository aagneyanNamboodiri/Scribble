import React from "react";

import { Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const Sidebar = () => (
  <div className="flex">
    <MenuBar showMenu>
      <div className="space-y-4 px-4">
        <Button
          label="General Settings"
          style="secondary"
          to="/settings/general"
        />
        <Button
          label="Redirections"
          style="secondary"
          to="/settings/redirections"
        />
        <Button
          label="Manage categories"
          style="secondary"
          to="/settings/categories"
        />
      </div>
    </MenuBar>
  </div>
);

export default Sidebar;
