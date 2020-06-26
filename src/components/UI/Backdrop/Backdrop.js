import React from "react";
import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.click} />
  ) : null;
};

export default Backdrop;
