import React from "react";
import classes from "./FloatingConfirmButton.module.scss";

const FloatingConfirmButton = (props) => {
  return (
    <button
      key={props.key}
      type={props.type}
      onClick={props.click}
      className={classes.FloatingButton}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
};

export default FloatingConfirmButton;
