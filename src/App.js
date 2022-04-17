import React, { Fragment, useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import qs from "qs";

import { AuthContext } from "./Contexts/AuthContext";
import axios from "./axios";
import "./App.css";

import Home from "./Components/Home";
import Theatre from "./Components/TheatreComponents/Theatre";
import Login from "./Components/AuthComponents/Login";
import SignUp from "./Components/AuthComponents/SignUp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const body = { username: "ronnie", password: "1234" };
    const url = "/api/login";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      data: qs.stringify(body),
      url,
    };
    axios(options).then((res) => {
      const parseRes = res.data;
      console.log(parseRes);
      localStorage.setItem("admin_access_token", parseRes.access_token);
      localStorage.setItem("admin_refresh_token", parseRes.refresh_token);
    });
  }, []);

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />

          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? <Login {...props} /> : <Redirect to="/" />
            }
          />

          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? <SignUp {...props} /> : <Redirect to="/" />
            }
          />

          <Route
            exact
            path="/createRoom"
            render={(props) =>
              isAuthenticated ? (
                <Theatre {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
