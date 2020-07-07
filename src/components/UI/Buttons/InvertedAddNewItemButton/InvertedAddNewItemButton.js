import React from "react";
import classes from "./InvertedAddNewItemButton.module.scss";

const InvertedAddNewItemButton = (props) => {
  const style = props.outlined
    ? classes.InvertedOutlinedAddNewItemButton
    : classes.InvertedAddNewItemButton;
  return (
    <button className={style} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default InvertedAddNewItemButton;
