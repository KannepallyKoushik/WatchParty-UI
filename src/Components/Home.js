import React from "react";

import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

import Header from "./Header";
import { Copyright } from "./Footer";
import "../App.css";
import "./HomePage.css";

export default function Home() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="xl" class="hero-container-img">
        <Grid container>
          <Grid
            item
            xs={12}
            container
            spacing={0}
            display="flex"
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            style={{
              paddingLeft: "100px",
              paddingTop: "100px",
              minHeight: "60vh",
            }}
          >
            <h1>Watch Party Application</h1>
            <p class="white-text">Watch movies and videos with your friends!</p>
          </Grid>
        </Grid>
      </Container>
      <Copyright />
    </div>
  );
}
