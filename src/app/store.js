import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "../containers/Workouts/workoutsSlice";
import exerciseReducer from "../containers/Exercises/exercisesSlice";
import authReducer from "../containers/Auth/authSlice";

export default configureStore({
  reducer: {
    workout: workoutReducer,
    exercise: exerciseReducer,
    auth: authReducer,
  },
});
