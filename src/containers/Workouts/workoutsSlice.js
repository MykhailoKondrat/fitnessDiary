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
    console.log(response);
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
  },
  extraReducers: {
    [fetchWorkoutHistory.fulfilled]: (state, { payload }) => {
      state.history = payload.data;
      state.loading = false;
      state.error = false;
    },
    [fetchWorkoutHistory.rejected]: (state, { payload }) => {
      state.error = true;
      state.loading = false;
    },
    [fetchWorkoutHistory.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
    },
  },
});
export const {
  workoutCompleted: completeWorkoutActionCreator,
} = workoutSlice.actions;
export default workoutSlice.reducer;
