import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavbarTab.module.scss";

const NavbarTab = (props) => {
  return (
    <NavLink
      to={props.link}
      exact={props.exact}
      className={classes.navBarTab}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  );
};

export default NavbarTab;
