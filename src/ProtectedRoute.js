import { React, useState, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  const [userInfo, setUserInfo] = useState(null);

  const value = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo, setUserInfo]
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // Replace this with a check to see if the user is authenticated
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
