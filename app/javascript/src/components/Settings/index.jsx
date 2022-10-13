import React from "react";

import { Route, Redirect, Switch } from "react-router";

import Sidebar from "./Sidebar";

import Navbar from "../Navbar";
import { SETTINGS_ROUTES } from "../routeConstants";

const Settings = () => (
  <>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <Switch>
        {SETTINGS_ROUTES.map(({ path, component }) => (
          <Route component={component} key={path} path={path} />
        ))}
        <Redirect exact from="/settings" to="/settings/general" />
      </Switch>
    </div>
  </>
);

export default Settings;
