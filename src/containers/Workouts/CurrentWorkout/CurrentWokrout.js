import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./CurrentWokrout.module.scss";
import Workout from "../../../components/Workout/Workout";
import AddNewItemButton from "../../../components/UI/Buttons/AddNewItemButton/AddNewItemButton";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import ExerciseModifySets from "../../../components/Exercise/ExerciseModifySets/ExerciseModifySets";

const CurrentWokrout = (props) => {
  const selectedExercises = useSelector(
    (state) => state.exercise.selectedExercises
  );
  const [editExerciseMode, setEditExerciseMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const handleEditExercise = (name) => {
    console.log(name);
    setSelectedExercise(name);
    setEditExerciseMode(true);
  };
  const handleClose = () => {
    setSelectedExercise(null);
    setEditExerciseMode(false);
  };
  console.log(selectedExercises);
  // getting date
  const getCurrentDate = () => {
    let date = new Date().toDateString();
    date = date.split(" ");
    date = `${date[1]} ${date[2]}`;
    return date;
  };
  const currentDate = getCurrentDate();
  console.log(currentDate);
  return (
    <>
      {editExerciseMode && (
        <ExerciseModifySets
          selectedExerciseName={selectedExercise}
          close={handleClose}
        />
      )}
      {/* <Backdrop show={editExercise} /> */}
      <Toolbar>
        Current Workout,
        {` ${currentDate}`}
      </Toolbar>
      <div className={classes.content}>
        <AddNewItemButton clicked={() => {}}>Add exercise</AddNewItemButton>
        <Workout
          editable
          editExercies={handleEditExercise}
          date="Tap on exercise to add Sets"
          exercises={selectedExercises}
        />
        <FloatingConfirmButton key="CompleteWorkout">
          Complete Workout
        </FloatingConfirmButton>
      </div>
    </>
  );
};

export default CurrentWokrout;
