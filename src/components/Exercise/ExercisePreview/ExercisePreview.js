import React from "react";
import classes from "./ExercisePreview.module.scss";
import { ReactComponent as AddIcon } from "../../../assets/icons/plus.svg";

const ExercisePreview = (props) => {
  // total weight lifted during exrecise
  const totalWeight =
    props.weight.length !== 0
      ? props.weight.reduce(
          (acc, curr, index) => acc + curr * props.reps[index],
          0
        )
      : null;

  return (
    <div className={classes.exercise}>
      <div className={classes.headline}>
        <div>
          <p className={classes.exerciseName}>{props.name}</p>
          <p className={classes.totalWeight}>
            <span>
              {totalWeight
                ? `Total Weight ${totalWeight} kg`
                : "No sets addded"}
            </span>
          </p>
        </div>
        {props.editable && (
          <div className={classes.iconWrapper}>
            <AddIcon className={classes.addIcon} onClick={props.edit} />
          </div>
        )}
      </div>
      <ul className={classes.setList}>
        {props.reps.map((rep, id) => {
          return <li key={id}>{`${rep} x ${props.weight[id]}kg`}</li>;
        })}
      </ul>
    </div>
  );
};

export default ExercisePreview;
