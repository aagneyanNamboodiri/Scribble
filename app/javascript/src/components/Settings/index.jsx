import React from "react";

import { Route } from "react-router";

import General from "./General";
import Sidebar from "./Sidebar";

const Settings = () => (
  <div className="flex">
    <Sidebar />
    <Route exact component={General} path="/settings/general" />
  </div>
);

export default Settings;
