import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isUserLoggedIn = useSelector(state => state.userProfile.isLoggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        isUserLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
