import React from "react";

// eslint-disable-next-line unused-imports/no-unused-imports, no-unused-vars
import { Redirect, Route } from "react-router";

import Categories from "./Categories";
import General from "./General";
import Redirections from "./Redirections";
import Sidebar from "./Sidebar";

const Settings = () => (
  <div className="flex">
    <Sidebar />
    <Route component={General} path="/settings/general" />
    <Route component={Categories} path="/settings/categories" />
    <Route component={Redirections} path="/settings/redirections" />
    {/* <Redirect from="/settings" to="/settings/general" /> */}
  </div>
);

export default Settings;
