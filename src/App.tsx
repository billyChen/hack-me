import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DrawerList from "./Components/DrawerList/index";
import Desks from "./Components/Desks";
import Employees from "./Components/Employees";
import Calendar from "./Components/Calendar/";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <DrawerList />
        <Switch>
          <Route path="/desks">
            <Desks />
          </Route>

          <Route path="/employees">
            <Employees />
          </Route>

          <Route path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
