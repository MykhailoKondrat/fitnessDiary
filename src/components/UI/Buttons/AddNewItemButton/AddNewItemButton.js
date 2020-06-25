import React from "react";
import classes from "./AddNewItemButton.module.scss";

const AddNewItemButton = (props) => {
  // TODO refactor code to remove useless wrappers
  return (
    <button className={classes.AddNewItemButton} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default AddNewItemButton;
