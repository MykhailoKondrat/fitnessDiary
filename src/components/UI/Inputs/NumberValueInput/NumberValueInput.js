import React from "react";
import classes from "./NumberValueInput.module.scss";

const NumberValueInput = (props) => {
  return (
    <input
      min="0"
      type="number"
      placeholder={props.placeholder}
      className={classes.valueInput}
      value={props.value}
    />
  );
};

export default NumberValueInput;
