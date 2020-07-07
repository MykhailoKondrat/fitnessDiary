import { v1 as uuid } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const workoutInit = {
  history: [],
  loading: false,
  error: null,
};

export const fetchWorkoutHistory = createAsyncThunk(
  "workout/fetchWorkoutHistory",
  async () => {
    const response = await axios.get("/workout/history.json");
    const listOfWokrouts = Object.values(response.data);
    return listOfWokrouts;
  }
);
export const updateWorkoutHistory = createAsyncThunk(
  "workout/updateWorkoutHistory",
  async (newWorkout) => {
    await axios.post("/workout/history.json", { ...newWorkout });
  }
);
export const workoutSlice = createSlice({
  name: "workout",
  initialState: workoutInit,
  reducers: {
    workoutCompleted: (state, { payload }) => {
      state.history.push(payload);
    },
  },
  extraReducers: {
    [fetchWorkoutHistory.fulfilled]: (state, { payload }) => {
      state.history = payload;
      state.loading = false;
      state.error = false;
    },
    [fetchWorkoutHistory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
    },
    [fetchWorkoutHistory.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
    },
    [updateWorkoutHistory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
    },
    [updateWorkoutHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      console.log(action);
    },
    [updateWorkoutHistory.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
    },
  },
});
export const {
  workoutCompleted: completeWorkoutActionCreator,
} = workoutSlice.actions;
export default workoutSlice.reducer;
