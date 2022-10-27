import React, { useState, useEffect } from "react";

import { MenuBar } from "neetoui/layouts";
import queryString from "query-string";

import { getActiveNavLink } from "./utils";

import Navbar from "../Navbar";
import { SETTINGS_ROUTES } from "../routeConstants";

const Settings = ({ history, location }) => {
  const { tab } = queryString.parse(location.search);
  const [activeNavlink, setActiveNavlink] = useState(
    () => getActiveNavLink(tab) || SETTINGS_ROUTES[0]
  );

  useEffect(() => history.push(activeNavlink?.path), [activeNavlink]);

  if (location.state?.resetTab) {
    location.state.resetTab = null;
    setActiveNavlink(() => getActiveNavLink(tab));
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <MenuBar showMenu>
          {SETTINGS_ROUTES.map(navlink => (
            <MenuBar.Item
              active={tab === navlink.key}
              description={navlink.description}
              key={navlink.key}
              label={navlink.label}
              onClick={() => setActiveNavlink(navlink)}
            />
          ))}
        </MenuBar>
        <activeNavlink.component />
      </div>
    </>
  );
};

export default Settings;
