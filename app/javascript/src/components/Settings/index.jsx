import React from "react";

import { Route } from "react-router";

import Categories from "./Categories";
import General from "./General";
import Sidebar from "./Sidebar";

const Settings = () => (
  <div className="flex">
    <Sidebar />
    <Route exact component={General} path="/settings/general" />
    <Route exact component={Categories} path="/settings/categories" />
  </div>
);

export default Settings;
