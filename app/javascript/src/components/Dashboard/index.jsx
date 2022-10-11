import React from "react";

import { Switch, Redirect, Route } from "react-router";

import Navbar from "../Navbar";
import { DASHBOARD_ROUTES } from "../routeConstants";
import Settings from "../Settings";

const Dashboard = () => (
  <div className="flex flex-col">
    <Navbar />
    <Switch>
      <Route component={Settings} path="/settings" />
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from="/" to="/articles" />
    </Switch>
  </div>
);

export default Dashboard;
