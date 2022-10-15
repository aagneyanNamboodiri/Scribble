import React, { useState, useEffect } from "react";

import { Redirect, Route } from "react-router-dom";

import preferencesApi from "apis/preferences";

import Eui from "../Eui";

const PrivateRoute = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data } = await preferencesApi.list();
      setIsPasswordProtected(data.is_password);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  if (loading) {
    return <div />;
  }

  if (!isLoggedIn && isPasswordProtected) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          from: "/public",
        }}
      />
    );
  }

  return <Route component={Eui} path="/public" />;
};

export default PrivateRoute;
