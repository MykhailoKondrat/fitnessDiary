import React from "react";
import classes from "./Input.module.scss";

const Input = (props) => {
  const inputClasses = [classes.Input];
  const inputElement = (
    <>
      <input
        id={props.name}
        type={props.type}
        className={inputClasses.join(" ")}
        onChange={props.change}
        value={props.value}
        placeholder={props.placeholder}
      />
    </>
  );
  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.errorMessage}>Please enter a valid value!</p>
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
