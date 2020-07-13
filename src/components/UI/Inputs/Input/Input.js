import React from "react";
import classes from "./Input.module.scss";

const Input = (props) => {
  let inputClasses = [classes.Input];
  if (!props.valid && props.touched) {
    inputClasses = [classes.Input, classes.Invalid];
  }
  const inputElement = (
    <>
      <input
        id={props.name}
        type={props.type}
        className={inputClasses.join(" ")}
        onChange={props.change}
        value={props.value}
        placeholder={props.placeholder}
        onBlur={props.blur}
      />
    </>
  );
  let validationError = null;
  if (!props.valid && props.touched) {
    validationError = (
      <p className={classes.errorMessage}>{props.errorMessage}</p>
    );
  }
  return (
    <>
      {inputElement}
      {validationError}
    </>
  );
};

export default Input;
