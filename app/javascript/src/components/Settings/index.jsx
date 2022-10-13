import React from "react";

import { Route } from "react-router";

import Sidebar from "./Sidebar";

import { SETTINGS_ROUTES } from "../routeConstants";

const Settings = () => (
  <div className="flex">
    <Sidebar />
    {SETTINGS_ROUTES.map(({ path, component }) => (
      <Route component={component} key={path} path={path} />
    ))}
  </div>
);

export default Settings;
