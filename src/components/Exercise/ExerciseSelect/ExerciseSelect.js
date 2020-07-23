import React from "react";
import classes from "./ExerciseSelect.module.scss";
import { ReactComponent as CheckIcon } from "../../../assets/icons/001-check.svg";

const ExerciseSelect = (props) => {
  return (
    <>
      <input
        type="checkbox"
        id={props.children}
        name={props.name}
        className={classes.checkboxInput}
        onChange={props.change}
        checked={props.status}
      />
      <label className={classes.customCheckboxLabel} htmlFor={props.children}>
        <CheckIcon className={classes.checkIcon} />
        <div>
          <p className={classes.exName}>
            {props.children}
{" "}
            <span className={classes.exType}>{props.type}</span>
          </p>
          <p className={classes.exDesc}>{props.description}</p>
        </div>
      </label>
    </>
  );
};

export default ExerciseSelect;
