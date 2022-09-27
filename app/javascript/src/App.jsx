import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";
import Create from "./components/Dashboard/Create";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact component={Dashboard} path="/" />
          <Route exact component={Dashboard} path="/dashboard" />
          <Route exact component={Create} path="/create" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
