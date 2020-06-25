import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import classes from "./Exercises.module.scss";
import ExerciseSelect from "../../components/Exercise/ExerciseSelect/ExerciseSelect";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import { addExerciseActionCreator } from "./exercisesSlice";

const AddExercises = (props) => {
  // ###States
  // 1.Global
  const dispatch = useDispatch();
  const availableExercises = useSelector(
    (state) => state.exercise.availableExercises,
    shallowEqual
  );
  // 2.Local
  const [selectedExercises, setSelectedExercises] = useState([]);

  // Toolbar logic
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  // ## Handlers
  // add exercise name to local state array of selected exercises
  // this logical "slice" might be redundant if no use cases where it can be usefull found  - remove
  const handleSelectExercise = (event) => {
    if (selectedExercises.includes(event.target.id)) {
      setSelectedExercises(
        selectedExercises.filter((exercises) => exercises !== event.target.id)
      );
    } else {
      setSelectedExercises(selectedExercises.concat(event.target.id));
    }
  };
  // Convert array of exercises names to array of objects to be consistent with workout.history store
  // pushing array from local state to redux store.

  const startExerciseHandler = (event) => {
    event.preventDefault();
    const selectedExercisesListToObject = selectedExercises.map((ex) => {
      return {
        name: ex,
        reps: [0],
        weight: [0],
      };
    });

    dispatch(addExerciseActionCreator(selectedExercisesListToObject));
    history.push("/wokrout_in_progress");
  };
  // ##logs for testing
  console.log("handler in action", selectedExercises);

  return (
    <>
      <Toolbar declineIcon="GoBack" declineAction={handleGoBack}>
        Select Exersices
      </Toolbar>

      <form className={classes.exersiceWrapper} onSubmit={startExerciseHandler}>
        {availableExercises.map((ex) => (
          <ExerciseSelect
            key={ex.name}
            type={ex.type}
            description={ex.description}
            change={handleSelectExercise}
          >
            {ex.name}
          </ExerciseSelect>
        ))}
        <FloatingConfirmButton type="submit">Add</FloatingConfirmButton>
      </form>
    </>
  );
};

export default AddExercises;
