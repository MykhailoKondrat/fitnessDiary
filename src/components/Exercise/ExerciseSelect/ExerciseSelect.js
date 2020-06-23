import React from "react";
import classes from "./ExerciseSelect.module.scss";
import { ReactComponent as CheckIcon } from "../../../assets/icons/001-check.svg";

const ExerciseSelect = (props) => {
  // const handleOnChange = (e) => {
  //   console.log(e.target.checked);
  // };
  return (
    <form>
      <input
        type="checkbox"
        id="test"
        name={props.name}
        className={classes.checkboxInput}
        // onChange={handleOnChange}
      />
      <label className={classes.customCheckbox} htmlFor="test">
        <CheckIcon className={classes.checkIcon} />
        Bench Press
        {props.name}
      </label>
    </form>
  );
};

export default ExerciseSelect;
