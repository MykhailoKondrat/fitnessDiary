import React from "react";
import classes from "./SetInstance.module.scss";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";

const SetInstance = (props) => {
  return (
    <li key={props.id} className={classes.set}>
      <span>
        <strong>{props.id}</strong>
        {`${props.reps} x ${props.weight}kg`}
      </span>
      <DeleteIcon className={classes.deleteIcon} onClick={props.clicked} />
    </li>
  );
};

export default SetInstance;
