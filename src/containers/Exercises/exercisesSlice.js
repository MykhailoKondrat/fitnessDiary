import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

// list of available exercises
// requires name, type(related body part), ?description,
// Thats why we need TS :)

// const exercisesTypes = {
//   legs: "Legs",
//   arms: "Arms",
//   fullBody: "FullBody",
//   chest: "Chest",
//   back: "Back",
//   biceps: "Biceps",
//   triceps: "Triceps",
// };
export const fetchAvailableExercises = createAsyncThunk(
  "exercises/fetchAvailableExercises",
  async () => {
    return await axios.get("/exercise/availableExercises.json");
  }
);

const exercisesInit = {
  availableExercises: [],
  selectedExercises: [],
  loading: false,
  error: null,
  upToDate: false,
};
export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: exercisesInit,
  reducers: {
    addExercise: (state, { payload }) => {
      state.selectedExercises = payload;
    },
    removeExercise: (state, { payload }) => {
      const indexToRemove = state.selectedExercises
        .find
        // (exercise) => exercise.id === exercise.id
        ();
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
    // this action can be used to:
    // 1.by default - clear list of selected exercices.
    // 2.in future - set selected execrcises to some pre-defined value

    setSelectedExercises: (state, { paylaod }) => {
      state.selectedExercises = [];
    },
  },
  extraReducers: {
    [fetchAvailableExercises.fulfilled]: (state, { payload }) => {
      state.availableExercises = payload.data;
      state.loading = false;
      state.error = false;
      state.upToDate = true;
    },
    [fetchAvailableExercises.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
    },
    [fetchAvailableExercises.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
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
