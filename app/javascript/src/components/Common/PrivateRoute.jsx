import React from "react";

import { Redirect, Route } from "react-router-dom";

import { usePreferenceState } from "../../contexts/preferencesContext";

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  path,
  redirectRoute,
  ...props
}) => {
  const { isPassword } = usePreferenceState();

  if (!isLoggedIn && isPassword) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: "/public",
          state: { url: props.location.pathname },
        }}
      />
    );
  }

  return <Route component={Component} path={path} />;
};

export default PrivateRoute;
