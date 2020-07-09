import React from "react";
import classes from "./AddNewItemButton.module.scss";

const AddNewItemButton = (props) => {
  // TODO refactor code to remove useless wrappers
  const style = props.buttonStyle
    ? [classes[props.buttonStyle], classes.AddNewItemButton].join(" ")
    : classes.AddNewItemButton;
  return (
    <button className={style} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default AddNewItemButton;
