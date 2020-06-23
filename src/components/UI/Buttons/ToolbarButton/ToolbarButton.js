import React from "react";
import classes from "./ToolbarButton.module.scss";

const ToolbarButton = (props) => {
  return (
    <button onClick={props.click} className={classes.toolbarButton}>
      {props.children}
    </button>
  );
};

export default ToolbarButton;
