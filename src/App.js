import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as styles from "./App.module.scss";
import { completeWorkoutActionCreator } from "./containers/Workouts/workoutsSlice";
import {
  addExerciseActionCreator,
  removeExerciseActionCreator,
  addSetActionCreator,
} from "./containers/Exercises/exercisesSlice";

function App() {
  const dispatch = useDispatch();
  const handleTest = () => {
    dispatch(addExerciseActionCreator());
  };
  return (
    <div>
      <button onClick={handleTest}>test btn</button>
      <h1 className={styles.h1main}>Welcome to Fitness Diary App!</h1>
    </div>
  );
}

export default App;
