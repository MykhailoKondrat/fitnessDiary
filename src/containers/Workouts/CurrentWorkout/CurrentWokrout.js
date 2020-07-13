import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v1 as uuid } from "uuid";
import { unwrapResult } from "@reduxjs/toolkit";
import classes from "./CurrentWokrout.module.scss";
import Workout from "../../../components/Workout/Workout";
import AddNewItemButton from "../../../components/UI/Buttons/AddNewItemButton/AddNewItemButton";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import ExerciseModifySets from "../../../components/Exercise/ExerciseModifySets/ExerciseModifySets";
import Modal from "../../../components/UI/Modal /Modal";
import {
  addSetActionCreator,
  setSelectedExercisesActionCreator,
  addExerciseActionCreator,
} from "../../Exercises/exercisesSlice";
import {
  updateWorkoutHistory,
  completeWorkoutActionCreator,
  closeWorkoutActionCreator,
} from "../workoutsSlice";

const CurrentWokrout = (props) => {
  const dispatch = useDispatch();
  const listOfExercises = useSelector(
    (state) => state.exercise.selectedExercises
  );
  const userId = useSelector((state) => state.auth.userId);
  const [editExerciseMode, setEditExerciseMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [completeWorkout, setcompleteWorkout] = useState(false);

  const history = useHistory();

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

  const handleCompleteWorkout = () => {
    if (listOfExercises.length === 0) {
      setcompleteWorkout(!completeWorkout);
      history.push("/workouts");
    } else if (completeWorkout) {
      const completedWokrout = {
        date: currentDate,
        exercises: listOfExercises,
        id: uuid(),
        userId,
      };
      // unwrapResult - some kind of strange shit is going on here
      // unwrapREsults is not working with response from POST
      // maybe it worth to refactor this code with axios interceptors

      dispatch(updateWorkoutHistory(completedWokrout))
        .then((res) => {
          // if res obj contains error<passed from try/catch block>
          // throw new error
          if (res.error) {
            console.log(res.error);
            throw new Error(res.error.message);
          }
          dispatch(completeWorkoutActionCreator(res.meta.arg));
        })
        .catch((error) => {
          console.log("POST error!: ", error);
        });
      dispatch(setSelectedExercisesActionCreator());
      history.push("/workouts");
    }
  };
  const checkEmptyExercises = () => {
    let hasEmptyExercises = false;
    hasEmptyExercises = listOfExercises.some(
      (exercise) => exercise.reps.length === 0
    );
    return hasEmptyExercises
      ? setShowModal(true)
      : setcompleteWorkout(!completeWorkout);
  };

  const handleContinueAndRemoveEmpty = () => {
    // handleCleanUpEmptyExercises();
    const result = listOfExercises.filter(
      (exercise) => exercise.reps.length !== 0
    );
    dispatch(addExerciseActionCreator(result));
    return setcompleteWorkout(true);
  };

  const handleCloseAndUpdate = (sets) => {
    dispatch(addSetActionCreator({ sets, selectedExercise }));
    setSelectedExercise(null);
    setEditExerciseMode(false);
  };
  const handleChangeWorkout = () => {
    history.push("/add_exersices_to_workout");
  };

  const handleExitWorkout = () => {
    dispatch(closeWorkoutActionCreator());
    dispatch(setSelectedExercisesActionCreator());
    setSelectedExercise(null);
    history.push("/workouts");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    handleCompleteWorkout();
  }, [completeWorkout, handleCompleteWorkout]);

  return (
    <>
      {showModal && (
        <Modal
          headline="Empty exercises spotted!"
          info="All exercises should contain at least one set. Exercises without sets will not be added to Diary"
          cancelAction={handleCloseModal}
          cancelActionLabel="Cancel"
          confirmAction={handleContinueAndRemoveEmpty}
          cofirmActionLabel="Continue"
        />
      )}
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
      <Toolbar confirmIcon="Close" confirmAction={handleExitWorkout}>
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
        <FloatingConfirmButton click={checkEmptyExercises}>
          Complete Workout
        </FloatingConfirmButton>
      </div>
    </>
  );
};

export default CurrentWokrout;
