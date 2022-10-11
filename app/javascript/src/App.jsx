import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";
import Eui from "./components/Eui";

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
          <Route component={Eui} path="/public/:slug" />
          <Route component={Eui} path="/public" />
          <Route component={Dashboard} path="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
