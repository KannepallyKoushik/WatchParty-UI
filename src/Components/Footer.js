import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import "./HomePage.css";

export function Report() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Report an Issue with the Website "}
      <Link color="inherit" to="/report">
        Here
      </Link>{" "}
    </Typography>
  );
}

export function Copyright() {
  return (
    <Typography
      className="footer"
      variant="body2"
      color="textPrimary"
      align="center"
    >
      {"Copyright © Jesse Korolainen & Koushik Kannepally " +
        new Date().getFullYear()}
    </Typography>
  );
}
