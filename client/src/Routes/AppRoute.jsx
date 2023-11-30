import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import AppContext from "../Context/AppContext";

const AppRoute = ({
  component: Component,
  path,
  isPrivate,
  exact,
  accessRequired = false,
  ...rest
}) => {
  const { checkUserSession } = useContext(AppContext);
  
  return (
    <>
      {isPrivate ? (
        <div className="private__container">
          <Route
            exact={exact}
            path={path}
            render={(props) =>
              checkUserSession(accessRequired).bearer_token ? (
                <Component {...props} />
              ) : (
                <Link to={{ pathname: "/" }} />
              )
            }
            {...rest}
          />
        </div>
      ) : (
        <>
          <Link
            exact={exact}
            path={path}
            render={(props) => <Component {...props} />}
            {...rest}
          />
        </>
      )}
    </>
  );
};

export default AppRoute;
