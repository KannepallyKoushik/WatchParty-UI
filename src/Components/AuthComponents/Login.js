import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import qs from "qs";

import axios from "../../axios";
import "../../App.css";
import { Copyright } from "../Footer";
import { AuthContext } from "../../Contexts/AuthContext";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f0f0f5",
    paddingTop: "10px",
    paddingBottom: "40px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  //   const [, setIsAuthenticated] = useContext(AuthContext);

  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const body = { username: email, password };
    const url = "/api/login";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(body),
      url,
    };
    axios(options).then((res) => {
      const parseRes = res.data;
      console.log(parseRes);
      localStorage.setItem("access_token", parseRes.access_token);
      localStorage.setItem("refresh_token", parseRes.refresh_token);
    });
  };
  //     axios
  //       .post("", body, {
  //         headers: {
  //           "content-type": "application/x-www-form-urlencoded",
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //         },
  //       })
  //       .then((res) => {
  //         const parseRes = res.data;
  //         console.log(parseRes);
  //         //     if (parseRes.access_token) {
  //         //       //   localStorage.setItem("token", parseRes.token);
  //         //       //   setIsAuthenticated(true);
  //         //       //   toast.success("LoggedIn Successfully");
  //         //       console.log(parseRes);
  //         //     }
  //         //   })
  //         //   .catch((er) => {
  //         //     // setIsAuthenticated(false);
  //         //     // const status = er.response.status;
  //         //     // const errData = er.response.data;
  //         //     // document.getElementById("signup-failure1").style.visibility = "visible";
  //         //     // console.log("response error code", status);
  //         //     // setError(errData);
  //         //     console.log(er);
  //       });
  //   };

  useEffect(() => {
    document.getElementById("signup-success").style.visibility = "hidden";
    document.getElementById("signup-failure1").style.visibility = "hidden";
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Log In
          </Typography>
          <div id="signup-success">User Registered Successfully!</div>
          <div id="signup-failure1">{error}</div>
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid
              container
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>

        <Box mt={8}></Box>
      </Container>
      <Copyright />
    </div>
  );
}

export default Login;
