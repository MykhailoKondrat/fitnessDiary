import React from "react";
import classes from "./ExerciseSelect.module.scss";
import { ReactComponent as CheckIcon } from "../../../assets/icons/001-check.svg";
import AddNewItemButton from "../../UI/Buttons/AddNewItemButton/AddNewItemButton";

const ExerciseSelect = (props) => {
  // const handleOnChange = (e) => {
  //   console.log(e.target.checked);
  // };
  return (
    <>
      <input
        type="checkbox"
        id={props.children}
        name={props.name}
        className={classes.checkboxInput}
        // onChange={handleOnChange}
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
