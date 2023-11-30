import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import AppContext from "./Context/AppContext";
import useGlobalState from "./hooks/useGlobalState";
import routes from "./Routes/routes";
const App = () => {
  const globalState = useGlobalState();


  return (
    <div className="App">
      <AppContext.Provider value={globalState}>
        <BrowserRouter>
          <Routes>
            {routes.map(
              (
                {
                  component: Component,
                  path,
                  isPrivate,
                  exact,
                  accessRequired = false,
                },
                index
              ) =>
                  <Route
                    key={path}
                    path={path}
                    isPrivate={isPrivate}
                    exact={exact}
                    index={index}
                    accessRequired={accessRequired}
                    element={
                    
                        <Component
                          key={path}
                          path={path}
                          isPrivate={isPrivate}
                          exact={exact}
                          index={index}
                          accessRequired={accessRequired}
                        />
                 
                    }
                  />
            )}
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
