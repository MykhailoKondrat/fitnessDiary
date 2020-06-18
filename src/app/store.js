import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import workoutReducer from "../containers/Workouts/workoutsSlice";
import exerciseReducer from "../containers/Exercises/exercisesSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    wokrout: workoutReducer,
    exercise: exerciseReducer,
  },
});
