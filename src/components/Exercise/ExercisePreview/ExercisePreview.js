import React from "react";
import classes from "./ExercisePreview.module.scss";
import { ReactComponent as AddIcon } from "../../../assets/icons/plus.svg";

const ExercisePreview = (props) => {
  // total weight lifted during exrecise
  const totalWeight = props.weight
    ? props.weight.reduce((acc, curr) => acc + curr) *
      props.reps.reduce((acc, curr) => acc + curr)
    : "no weights lifted";

  return (
    <div className={classes.exercise}>
      <div className={classes.headline}>
        <div>
          <p className={classes.exerciseName}>{props.name}</p>
          <p className={classes.totalWeight}>
            Total Weight:&nbsp;
            <span>{`${totalWeight} kg`}</span>
          </p>
        </div>
        {props.editable ? (
          <div className={classes.iconWrapper}>
            <AddIcon className={classes.addIcon} onClick={props.edit} />
          </div>
        ) : null}
      </div>
      <ul className={classes.setList}>
        {props.reps.map((rep, id) => {
          return (
            <li key={id}>
              {rep}
              &nbsp; x &nbsp;
              {props.weight[id]}
              kg
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExercisePreview;
