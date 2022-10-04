import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";
import ArticleForm from "./components/Dashboard/ArticlesForm";
import Navbar from "./components/Navbar";

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
        <Navbar />
        <Switch>
          <Route exact component={Dashboard} path="/" />
          <Route exact component={Dashboard} path="/articles" />
          <Route exact component={ArticleForm} path="/articles/create" />
          <Route exact component={ArticleForm} path="/articles/edit/:slug" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
