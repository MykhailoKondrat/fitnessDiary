import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./CurrentWokrout.module.scss";
import Workout from "../../../components/Workout/Workout";
import AddNewItemButton from "../../../components/UI/Buttons/AddNewItemButton/AddNewItemButton";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";

const CurrentWokrout = (props) => {
  const selectedExercises = useSelector(
    (state) => state.exercise.selectedExercises
  );
  const [editExercise, setEditExercise] = useState(false);
  const handleEditExercise = (name) => {
    setEditExercise(true);
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
        <FloatingConfirmButton>Complete Workout</FloatingConfirmButton>
      </div>
    </>
  );
};

export default CurrentWokrout;
