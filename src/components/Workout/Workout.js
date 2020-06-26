import React from "react";
import classes from "./Workout.module.scss";
import ExercisePreview from "../Exercise/ExercisePreview/ExercisePreview";

const Workout = (props) => {
  const exercises = props.exercises.map((exercise, id) => {
    return (
      <ExercisePreview
        key={id}
        edit={() => props.editExercies(exercise.name)}
        name={exercise.name}
        reps={exercise.reps}
        weight={exercise.weight}
        editable={props.editable}
      />
    );
  });
  return (
    <div className={classes.WorkoutWrap}>
      <div className={classes.WorkoutHeader}>
        <p className={classes.date}>{props.date}</p>
      </div>
      <div className={classes.ExercisesWrap}>{exercises}</div>
    </div>
  );
};

export default Workout;
