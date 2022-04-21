import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import qs from "qs";

import axios from "../../axios";
import "../../App.css";
import { Copyright } from "../Footer";

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

function SignUp() {
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(email, password, name);
    const body = { username: email, password, name };
    const bearerToken = "Bearer " + localStorage.admin_access_token;
    const url = "/api/user/save";
    axios
      .post(url, body, {
        headers: {
          "Content-type": "application/json",
          Authorization: bearerToken,
        },
      })
      .then((res) => {
        const parseRes = res.data;
        console.log(parseRes);
        localStorage.setItem("access_token", parseRes.access_token);
        localStorage.setItem("refresh_token", parseRes.refresh_token);
      });
  };

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
            Sign Up
          </Typography>
          <div id="signup-success">User Registered Successfully!</div>
          <div id="signup-failure1">{error}</div>
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="User name"
              name="name"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={(e) => onChange(e)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="off"
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
              Sign Up
            </Button>
            <Grid
              container
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Link to="/login">{"Already have an account? Login"}</Link>
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

export default SignUp;
