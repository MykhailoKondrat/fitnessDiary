import React from "react";
import classes from "./IconButton.module.scss";

const IconButton = (props) => {
  return (
    <button
      type="submit"
      className={classes.iconButton}
      onClick={props.click}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
