import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";
import { logoutActionCreator } from "../Auth/authSlice";

const workoutInit = {
  history: [],
  loading: false,
  error: null,
  upToDate: false,
};
export const fetchWorkoutHistory = createAsyncThunk(
  "workout/fetchWorkoutHistory",
  async (queryParams) => {
    const response = await axios.get(
      `/workout/history.json?auth=${queryParams}`
    );
    const listOfWokrouts = Object.values(response.data);
    return listOfWokrouts;
  }
);
export const updateWorkoutHistory = createAsyncThunk(
  "workout/updateWorkoutHistory",
  async (newWorkout) => {
    const response = await axios.post(`/workout/history.json`, {
      ...newWorkout,
    });
    return response;
  }
);
export const workoutSlice = createSlice({
  name: "workout",
  initialState: workoutInit,
  reducers: {
    workoutCompleted: (state, { payload }) => {
      state.history.push(payload);
    },
    wokroutClosed: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.upToDate = false;
    },
  },
  extraReducers: {
    [fetchWorkoutHistory.fulfilled]: (state, { payload }) => {
      state.history = payload;
      state.loading = false;
      state.error = false;
      state.upToDate = true;
    },
    [fetchWorkoutHistory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.upToDate = false;
    },
    [fetchWorkoutHistory.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
    },

    [updateWorkoutHistory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.upToDate = false;
    },
    [updateWorkoutHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [updateWorkoutHistory.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
    },
    [logoutActionCreator]: (state, action) => {
      state.history = [];
      state.loading = false;
      state.error = false;
      state.upToDate = false;
    },
  },
});
export const {
  workoutCompleted: completeWorkoutActionCreator,
  wokroutClosed: closeWorkoutActionCreator,
} = workoutSlice.actions;
export default workoutSlice.reducer;
