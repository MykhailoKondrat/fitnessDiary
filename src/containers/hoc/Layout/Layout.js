import React, { useMemo } from "react";
import classes from "./Layout.module.scss";
import Navbar from "../../../components/Navigation/Navbar/Navbar";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import ToolbarButton from "../../../components/UI/Buttons/ToolbarButton/ToolbarButton";

const Layout = (props) => {
  return (
    <div className={classes.Wrapper}>
      <Toolbar confirmIcon="Logout" declineIcon="GoBack">
        Welcome, Mykhailo Kondrat!
        {props.username}{" "}
      </Toolbar>
      <main className={classes.Content}>{props.children}</main>
      <Navbar />
    </div>
  );
};

export default Layout;
