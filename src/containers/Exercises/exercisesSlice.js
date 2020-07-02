import { v1 as uuid } from "uuid";
import { createSlice } from "@reduxjs/toolkit";
import { workoutSlice } from "../Workouts/workoutsSlice";

// list of available exercises
// requires name, type(related body part), ?description,
// Thats why we need TS :)

const exercisesTypes = {
  legs: "Legs",
  arms: "Arms",
  fullBody: "FullBody",
  chest: "Chest",
  back: "Back",
  biceps: "Biceps",
  triceps: "Triceps",
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
    description: "Easy peasy",
  },
  {
    name: "Bench press",
    type: exercisesTypes.chest,
    description: "Best & only way to gain chest mussles!",
  },
  {
    name: "Declined Bench press",
    type: exercisesTypes.chest,
    description: "Best & only way to gain chest mussles!",
  },
];
const exercisesInit = {
  availableExercises,
  selectedExercises: [],
};
export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: exercisesInit,
  reducers: {
    addExercise: (state, { payload }) => {
      state.selectedExercises = payload;
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
      // name of Current Exercise, weight, rep
      const { sets, selectedExercise } = payload;
      state.selectedExercises.forEach((ex) => {
        if (ex.name === selectedExercise) {
          ex.reps = sets.reps;
          ex.weight = sets.weight;
        }
      });
    },
    setSelectedExercises: (state, { paylaod }) => {
      state.selectedExercises = [];
    },
  },
});

export const {
  addExercise: addExerciseActionCreator,
  removeExercise: removeExerciseActionCreator,
  addSet: addSetActionCreator,
  setSelectedExercises: setSelectedExercisesActionCreator,
} = exercisesSlice.actions;

export default exercisesSlice.reducer;
