import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import PrivateRoute from "./components/Common/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Eui from "./components/Eui";
import Login from "./components/Eui/Login";
import Settings from "./components/Settings";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Router>
        <ToastContainer />
        <Switch>
          <Route component={Settings} path="/settings" />
          <Route component={Dashboard} path="/articles" />
          <Redirect exact from="/" to="/articles" />
          <Route exact component={Login} path="/login" />
          <PrivateRoute />
          <Route component={Eui} path="/public" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
