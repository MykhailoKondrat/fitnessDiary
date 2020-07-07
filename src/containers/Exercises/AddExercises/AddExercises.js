import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import classes from "./AddExercises.module.scss";
import ExerciseSelect from "../../../components/Exercise/ExerciseSelect/ExerciseSelect";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import {
  addExerciseActionCreator,
  fetchAvailableExercises,
} from "../exercisesSlice";

const AddExercises = (props) => {
  // ###States
  // 1.Global
  const dispatch = useDispatch();
  const availableExercises = useSelector(
    (state) => state.exercise.availableExercises,
    shallowEqual
  );
  const selectedExercises = useSelector(
    (state) => state.exercise.selectedExercises
  );
  const upToDate = useSelector((state) => state.exercise.upToDate);
  // 2.Local
  const [localSelectedExercises, setLocalSelectedExercises] = useState([]);
  useEffect(() => {
    const updateAvailableExercises = () => {
      if (!upToDate) {
        // if someone is reading this - sorry if this is a shit code, idk how to optimize it
        // in another way \_('')_/
        return dispatch(fetchAvailableExercises());
      }
    };
    updateAvailableExercises();
  }, []);

  // if we come to this screen from workout - get list of prev selected exercises and render them as selected
  useEffect(() => {
    const prevSelectedExercises = [];
    selectedExercises.forEach((ex) => {
      prevSelectedExercises.push(ex.name);
    });
    setLocalSelectedExercises(prevSelectedExercises);
  }, []);

  // Toolbar logic
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  // ## Handlers
  // add exercise name to local state array of selected exercises
  // this local slice might looks like redundant,
  // but I plan to store selected exercises on device/server, so in case
  // user quits app in a middle of workout he can continue from the point he left off

  const handleSelectExercise = (event) => {
    if (localSelectedExercises.includes(event.target.id)) {
      setLocalSelectedExercises(
        localSelectedExercises.filter(
          (exercises) => exercises !== event.target.id
        )
      );
    } else {
      setLocalSelectedExercises(localSelectedExercises.concat(event.target.id));
    }
  };

  // Convert array of exercises names to array of objects to be consistent with workout.history store
  // pushing array from local state to redux store.
  const startWorkoutHandler = (event) => {
    event.preventDefault();
    // check if any of exercises where in previous workout setup
    // to save data about reps and weight
    let localSelectedExercisesListToObject = [];

    localSelectedExercisesListToObject = localSelectedExercises.map(
      (selectedExercise) => {
        const defaultResult = {
          name: selectedExercise,
          reps: [],
          weight: [],
        };
        // just for me a future
        // here we need to check
        // 1. do we have previously selected exercises
        // 2. if yes - compare new list of exercises to old one, to save data about sets(reps/weight)
        // 3. if no/no matches in second if statement - use default object above
        if (selectedExercises.length !== 0) {
          const findMatch = selectedExercises.find(
            (ex) => ex.name === selectedExercise
          );
          if (findMatch) {
            return {
              name: findMatch.name,
              reps: findMatch.reps,
              weight: findMatch.weight,
            };
          }
          return defaultResult;
        }
        return defaultResult;
      }
    );
    console.log(localSelectedExercisesListToObject);
    dispatch(addExerciseActionCreator(localSelectedExercisesListToObject));
    history.push("/wokrout_in_progress");
  };
  // ##logs for testing

  return (
    <>
      <Toolbar declineIcon="GoBack" declineAction={handleGoBack}>
        Select Exersices
      </Toolbar>

      <form className={classes.exersiceWrapper} onSubmit={startWorkoutHandler}>
        {availableExercises.map((ex) => (
          <ExerciseSelect
            key={ex.name}
            type={ex.type}
            description={ex.description}
            change={handleSelectExercise}
            status={localSelectedExercises.includes(ex.name)}
          >
            {ex.name}
          </ExerciseSelect>
        ))}
        <FloatingConfirmButton
          type="submit"
          disable={localSelectedExercises.length === 0}
        >
          Continue
        </FloatingConfirmButton>
      </form>
    </>
  );
};

export default AddExercises;
