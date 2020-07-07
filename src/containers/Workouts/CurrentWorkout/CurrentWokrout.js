import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";
import classes from "./CurrentWokrout.module.scss";
import Workout from "../../../components/Workout/Workout";
import AddNewItemButton from "../../../components/UI/Buttons/AddNewItemButton/AddNewItemButton";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import ExerciseModifySets from "../../../components/Exercise/ExerciseModifySets/ExerciseModifySets";
import {
  addSetActionCreator,
  setSelectedExercisesActionCreator,
} from "../../Exercises/exercisesSlice";
import { completeWorkoutActionCreator } from "../workoutsSlice";

const CurrentWokrout = (props) => {
  const dispatch = useDispatch();
  const listOfExercises = useSelector(
    (state) => state.exercise.selectedExercises,
    shallowEqual
  );
  const [editExerciseMode, setEditExerciseMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };
  // getting date
  const getCurrentDate = () => {
    let date = new Date().toDateString();
    date = date.split(" ");
    date = `${date[1]} ${date[2]}`;
    return date;
  };

  const currentDate = getCurrentDate();
  const handleEditExercise = (name, id) => {
    setSelectedExercise(name);
    setEditExerciseMode(true);
  };

  const handleCloseAndUpdate = (sets) => {
    dispatch(addSetActionCreator({ sets, selectedExercise }));
    setSelectedExercise(null);
    setEditExerciseMode(false);
    // console.log(payload);
  };
  const handleChangeWorkout = () => {
    history.push("/add_exersices_to_workout");
  };

  const handleCompleteWorkout = () => {
    const completedWokrout = {
      id: uuid(),
      date: currentDate,
      exercises: listOfExercises,
    };
    console.log(completedWokrout);
    dispatch(completeWorkoutActionCreator(completedWokrout));
    dispatch(setSelectedExercisesActionCreator());
    history.push("/workouts");
  };
  return (
    <>
      {editExerciseMode && (
        <ExerciseModifySets
          selectedExerciseName={selectedExercise}
          close={handleCloseAndUpdate}
          reps={listOfExercises.find((ex) => ex.name === selectedExercise).reps}
          weight={
            listOfExercises.find((ex) => ex.name === selectedExercise).weight
          }
          // pass reps and weight here
        />
      )}
      <Toolbar>
        Current Workout,
        {` ${currentDate}`}
      </Toolbar>
      <div className={classes.content}>
        <AddNewItemButton click={handleChangeWorkout}>
          {listOfExercises.length > 0 ? "Change workout" : "Add exercises"}
        </AddNewItemButton>
        <Workout
          editable
          editExercies={handleEditExercise}
          date="Tap on exercise to add Sets"
          exercises={listOfExercises}
        />
        <FloatingConfirmButton click={handleCompleteWorkout}>
          Complete Workout
        </FloatingConfirmButton>
      </div>
    </>
  );
};

export default CurrentWokrout;
