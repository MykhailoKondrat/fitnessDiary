import React, { useState } from "react";
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
  const userData = useSelector((state) => state.auth);
  const [editExerciseMode, setEditExerciseMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  // getting date
  const getCurrentDate = () => {
    let date = new Date().toDateString();
    date = date.split(" ");
    date = `${date[1]} ${date[2]}`;
    return date;
  };

  const currentDate = getCurrentDate();

  const handleEditExercise = (name) => {
    setSelectedExercise(name);
    setEditExerciseMode(true);
  };

  const handleCompleteWorkout = () => {
    // if (listOfExercises.length === 0) {
    //   history.push("/workouts");
    // } else {
    const filteredListOfExercises = listOfExercises.filter(
      (exercise) => exercise.reps.length !== 0
    );
    if (filteredListOfExercises.length === 0) {
      history.push("/workouts");
      console.log("0 000");
    } else {
      // if result length!=0
      const completedWokrout = {
        exactDate: new Date(),
        date: currentDate,
        exercises: filteredListOfExercises,
        id: uuid(),
        userId: userData.userId,
      };
      const token = `${userData.token}`;
      dispatch(updateWorkoutHistory(completedWokrout, token))
        .then(unwrapResult)
        .then(() => {
          dispatch(completeWorkoutActionCreator(completedWokrout));
        })
        .catch((error) => {
          alert("POST error!: ", error);
          console.log("POST error!: ", error);
        });
      dispatch(setSelectedExercisesActionCreator());
      setShowModal(false);
      document.body.style.overflow = "unset";
      history.push("/workouts");
    }
    // }
  };

  const checkEmptyExercises = () => {
    let hasEmptyExercises = false;
    hasEmptyExercises = listOfExercises.some(
      (exercise) => exercise.reps.length === 0
    );
    return hasEmptyExercises ? setShowModal(true) : handleCompleteWorkout();
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

  return (
    <>
      <Modal
        show={showModal}
        headline="Empty exercises spotted!"
        info="All exercises should contain at least one set. Exercises without sets will not be added to Diary"
        cancelAction={handleCloseModal}
        cancelActionLabel="Cancel"
        confirmAction={handleCompleteWorkout}
        cofirmActionLabel="Continue"
      />

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
