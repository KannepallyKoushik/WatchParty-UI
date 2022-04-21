import React from "react";

import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
});

const navLinks = [{}];

const homeLink = [{ title: `Home`, path: `/` }];

const Theatreheader = () => {
  const classes = useStyles();

  const logout = async (e) => {
    try {
      localStorage.removeItem("token");
      // history.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="xl" className={classes.navbarDisplayFlex}>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {homeLink.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button fontWeight="fontWeightBold">
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
            <a href={`/`} key={`Log out`} className={classes.linkText}>
              <ListItem button onClick={logout()}>
                <ListItemText primary={"Log out"} />
              </ListItem>
            </a>
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Theatreheader;
