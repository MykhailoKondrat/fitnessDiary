import React from "react";
import { useSelector } from "react-redux";
import classes from "./CurrentWokrout.module.scss";
import Workout from "../../../components/Workout/Workout";
import AddNewItemButton from "../../../components/UI/Buttons/AddNewItemButton/AddNewItemButton";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";

const CurrentWokrout = (props) => {
  const selectedExercises = useSelector(
    (state) => state.exercise.selectedExercises
  );
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
      <Toolbar>
        Current Workout,
        {` ${currentDate}`}
      </Toolbar>
      <div className={classes.content}>
        <AddNewItemButton clicked={() => {}}>Add exercise</AddNewItemButton>
        <Workout
          date="Tap on exercise to add Sets"
          exercises={selectedExercises}
        />
        <FloatingConfirmButton>Complete Workout</FloatingConfirmButton>
      </div>
    </>
  );
};

export default CurrentWokrout;
