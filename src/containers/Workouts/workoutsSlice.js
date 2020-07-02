import { v1 as uuid } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const workoutInit = {
  history: [
    // {
    //   id: uuid(),
    //   date: "12 Oct 2020",
    //   exercises: [
    //     {
    //       name: "Bench press",
    //       reps: [10, 100, 10, 100, 10, 100, 10],
    //       weight: [50, 50, 20, 50, 20, 100, 10],
    //     },
    //     { name: "Pushups", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    //     { name: "Squats", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    //   ],
    // },
    // {
    //   id: uuid(),
    //   date: "13 Oct 2020",
    //   exercises: [
    //     {
    //       name: "Bench press",
    //       reps: [1],
    //       weight: [1],
    //     },
    //     { name: "Pushups", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    //     { name: "Squats", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    //   ],
    // },
    // {
    //   id: uuid(),
    //   date: "14 Oct 2020",
    //   exercises: [
    //     {
    //       name: "Bench press",
    //       reps: [10, 10, 20, 10],
    //       weight: [50, 50, 20, 50],
    //     },
    //     { name: "Pushups", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    //     { name: "Squats", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    //   ],
    // },
  ],
  loading: false,
  error: false,
};

const newWorkout = {
  id: uuid(),
  date: "THIS IS NEW ONE",
  exercises: [
    { name: "Bench press", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    { name: "Pushups", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
    { name: "Squats", reps: [10, 10, 20, 10], weight: [50, 50, 20, 50] },
  ],
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState: workoutInit,
  reducers: {
    workoutCompleted: (state, { payload }) => {
      // const payloadKeys = Object.keys(payload);
      // console.log(payloadKeys[0]);
      // console.log(payloadKeys[1]);
      // console.log(this);
      state.history.push(payload);
    },
  },
});
export const {
  workoutCompleted: completeWorkoutActionCreator,
} = workoutSlice.actions;
export default workoutSlice.reducer;
