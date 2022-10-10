import React from "react";

import { Redirect, Route } from "react-router";

import Categories from "./Categories";
import General from "./General";
import Sidebar from "./Sidebar";

const Settings = () => (
  <div className="flex">
    <Sidebar />
    <Route exact component={General} path="/settings/general" />
    <Route exact component={Categories} path="/settings/categories" />
    <Redirect from="/settings" to="/settings/general" />
  </div>
);

export default Settings;
