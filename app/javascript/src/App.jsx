import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Analytics from "./components/Analytics";
import PrivateRoute from "./components/Common/PrivateRoute";
import Dashboard from "./components/Dashboard";
import DownloadReport from "./components/DownloadReport";
import ErrorPage from "./components/ErrorPage";
import Eui from "./components/Eui";
import Login from "./components/Eui/Login";
import Settings from "./components/Settings";
import { ArticleStatusProvider } from "./contexts/articleStatus";
import { OrganizationProvider } from "./contexts/organization";

const queryClient = new QueryClient();

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
    <OrganizationProvider>
      <ArticleStatusProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ToastContainer />
            <Switch>
              <Redirect exact from="/" to="/articles" />
              <Route component={Dashboard} path="/articles" />
              <Route exact component={Settings} path="/settings" />
              <Route exact component={Login} path="/login" />
              <Route exact component={Analytics} path="/analytics" />
              <Route exact component={DownloadReport} path="/download" />
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
        </QueryClientProvider>
      </ArticleStatusProvider>
    </OrganizationProvider>
  );
};

export default App;
