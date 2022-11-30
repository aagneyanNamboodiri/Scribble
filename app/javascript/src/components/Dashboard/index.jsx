import React from "react";

import { Switch, Redirect, Route } from "react-router";

import Navbar from "../Navbar";
import { DASHBOARD_ROUTES } from "../routeConstants";

const Dashboard = () => (
  <div className="flex flex-col">
    <Navbar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from="/" to="/articles" />
    </Switch>
  </div>
);

export default Dashboard;
