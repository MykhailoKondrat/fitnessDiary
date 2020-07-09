import React from "react";
import classes from "./Layout.module.scss";
import Navbar from "../../../components/Navigation/Navbar/Navbar";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";

const Layout = (props) => {
  return (
    <div className={classes.Wrapper}>
      <Toolbar confirmIcon="Logout">
        Welcome, Mykhailo Kondrat!
        {props.username}{" "}
      </Toolbar>
      <main className={classes.Content}>{props.children}</main>
      <Navbar />
    </div>
  );
};

export default Layout;
