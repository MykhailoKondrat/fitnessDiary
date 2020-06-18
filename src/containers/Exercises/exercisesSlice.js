import { v1 as uuid } from "uuid";
import { createSlice } from "@reduxjs/toolkit";
import { workoutSlice } from "../Workouts/workoutsSlice";

// list of available exercises
// requires name, type(related body part), ?description,

const exercisesTypes = {
  legs: "legs",
  arms: "arms",
  fullBody: "fullBody",
  chest: "chest",
  back: "back",
  biceps: "biceps",
  triceps: "triceps",
};
// this should be fetched from Firebase
const availableExercises = [
  {
    name: "Squats",
    type: exercisesTypes.legs,
    description: "No pain no gain",
  },
  {
    name: "Pushups",
    type: exercisesTypes.arms,
    description: "",
  },
  {
    name: "Bench press",
    type: exercisesTypes.chest,
    description: "",
  },
];
const exercisesInit = {
  availableExercises,
  selectedExercises: [
    {
      name: "Squats",
      id: 111,
      reps: [],
      weight: [],
    },
  ],
};
export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: exercisesInit,
  reducers: {
    addExercise: (state, { payload }) => {
      const tempExerciseToAdd = {
        name: availableExercises[0].name,
        id: 111,
        reps: [],
        weight: [],
      }; // should be removed, just for testiing purposes here
      state.selectedExercises.push(tempExerciseToAdd);
    },
    removeExercise: (state, { payload }) => {
      const indexToRemove = state.selectedExercises.find(
        (exercise) => exercise.id === exercise.id
      );
      if (indexToRemove) {
        state.selectedExercises.splice(indexToRemove, 1);
      }
    },
    addSet: (state, { payload }) => {
      // id of Current Exercise, weight, reps
      const tempReps = 12;
      const tempWeigh = 10;
      const tempExerciseIndex = 1;
      if (state.selectedExercises[tempExerciseIndex]) {
        state.selectedExercises[tempExerciseIndex].reps.push(tempReps);
        state.selectedExercises[tempExerciseIndex].weight.push(tempWeigh);
      }
    },
  },
});

export const {
  addExercise: addExerciseActionCreator,
  removeExercise: removeExerciseActionCreator,
  addSet: addSetActionCreator,
} = exercisesSlice.actions;

export default exercisesSlice.reducer;
