import React from "react";
import classes from "./FloatingConfirmButton.module.scss";

const FloatingConfirmButton = (props) => {
  return (
    <button onClick={props.click} className={classes.FloatingButton}>
      {props.children}
{" "}
    </button>
  );
};

export default FloatingConfirmButton;
