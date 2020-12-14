import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AlertMsg from "./components/AlertMsg";
import PrivateRoute from "./routes/PrivateRoute";
import AdminLayout from "./routes/AdminLayout";
import PublicLayout from "./routes/PublicLayout";

import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";
import authActions from "./redux/actions/auth.actions";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated === null ? (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
      ) : (
        <Router>
          <AlertMsg />
          <Switch>
            <PrivateRoute path="/admin" component={AdminLayout} />
            <Route path="/" component={PublicLayout} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
