import React from "react";

import { Redirect, Route } from "react-router-dom";

import { usePreferenceState } from "../../contexts/preferencesContext";
import Eui from "../Eui";

const PrivateRoute = ({ isLoggedIn }) => {
  const { isPassword } = usePreferenceState();

  if (!isLoggedIn && isPassword) {
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
