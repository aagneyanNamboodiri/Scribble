import React from "react";

import { MenuBar } from "neetoui/layouts";

const SideMenu = () => (
  <MenuBar showMenu title="Articles">
    <MenuBar.Block active count={13} label="All" />
    <MenuBar.Block count={2} label="Drafts" />
    <MenuBar.Block count={7} label="Published" />
  </MenuBar>
);

export default SideMenu;
