import React from "react";
import classes from "./NumberValueInput.module.scss";

const NumberValueInput = (props) => {
  return (
    <input
      type="number"
      min="0"
      placeholder={props.placeholder}
      className={classes.valueInput}
      value={props.value}
      onChange={props.change}
    />
  );
};

export default NumberValueInput;
