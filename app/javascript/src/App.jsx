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
import ErrorPage from "./components/ErrorPage";
import Eui from "./components/Eui";
import Login from "./components/Eui/Login";
import Settings from "./components/Settings";
import { PreferenceProvider } from "./contexts/preferences";

const App = ({ isLoggedIn }) => {
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
    <PreferenceProvider>
      <Router>
        <ToastContainer />
        <Switch>
          <Redirect exact from="/" to="/articles" />
          <Route component={Dashboard} path="/articles" />
          <Route component={Settings} path="/settings" />
          <Route exact component={Login} path="/login" />
          <PrivateRoute
            component={Eui}
            isLoggedIn={isLoggedIn}
            path={["/public", "/public/:slug"]}
            redirectRoute="/login"
          />
          <Route component={Eui} path="/public" />
          <Route component={ErrorPage} path="/" />
        </Switch>
      </Router>
    </PreferenceProvider>
  );
};

export default App;
