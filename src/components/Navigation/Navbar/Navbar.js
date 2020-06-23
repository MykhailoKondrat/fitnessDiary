import React from "react";
import NavbarTab from "../../UI/Tabs/NavbarTab/NavbarTab";
import classes from "./Navbar.module.scss";
import { ReactComponent as DumbellIcon } from "../../../assets/icons/001-dumbbell.svg";
import { ReactComponent as FoodIcon } from "../../../assets/icons/002-dinner.svg";

const Navbar = (props) => {
  return (
    <div className={classes.navbar}>
      <NavbarTab link="/workouts" className={classes.NavbarTab}>
        <DumbellIcon width="100%" height="32px" />
      </NavbarTab>
      <NavbarTab link="/diet">
        <FoodIcon width="100%" height="32px" />
      </NavbarTab>
    </div>
  );
};

export default Navbar;
