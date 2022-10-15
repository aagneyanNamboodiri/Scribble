import React from "react";

import { Redirect, Route } from "react-router-dom";

import Eui from "../Eui";

const PrivateRoute = () => {
  const condition = document.cookie.length;
  if (!condition) {
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
