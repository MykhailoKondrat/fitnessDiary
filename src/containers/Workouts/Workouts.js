import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Workout from "../../components/Workout/Workout";
import classes from "./Workouts.module.scss";
import AddNewItemButton from "../../components/UI/Buttons/AddNewItemButton/AddNewItemButton";
import { ReactComponent as Illustration } from "../../assets/icons/dumbells.svg";
import { fetchWorkoutHistory } from "./workoutsSlice";

const Workouts = (props) => {
  const workoutHistory = useSelector((state) => state.workout.history);
  const userData = useSelector((state) => state.auth);
  const upToDate = useSelector((state) => state.workout.upToDate);
  let content = null;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    history.push("/add_exersices_to_workout");
  };
  const updateWorkoutHistory = useCallback(() => {
    const queryParams = `${userData.token}&orderBy="userId"&equalTo="${userData.userId}"`;
    if (!upToDate) {
      return dispatch(fetchWorkoutHistory(queryParams));
    }
  }, [upToDate, userData.token, userData.userId, dispatch]);

  useEffect(() => {
    // to avoid re-fetching data if it was actually not changed and is up to date
    updateWorkoutHistory();
  }, [workoutHistory, updateWorkoutHistory]);

  if (workoutHistory.length !== 0) {
    content = (
      <>
        <div className={classes.buttonWrapper}>
          <AddNewItemButton click={handleClick}>
            Start New Workout
          </AddNewItemButton>
        </div>
        {/* ^^^^^this div is here only to center button :(((( */}
        {workoutHistory &&
          workoutHistory
            .slice() // because array is frozen in strict mode
            .reverse()
            .map((workoutItem) => {
              return (
                <Workout
                  key={workoutItem.id}
                  date={workoutItem.date}
                  exercises={workoutItem.exercises}
                />
              );
            })}
      </>
    );
  } else {
    content = (
      <div className={classes.EmptyHistoryPlaceholderWrapper}>
        <div className={classes.illustrationWrap}>
          <Illustration className={classes.illustration} />
        </div>
        <p>Start your first workout!</p>
        <AddNewItemButton click={handleClick}>
          Start First Workout
        </AddNewItemButton>
      </div>
    );
  }

  return <>{content}</>;
};

export default Workouts;
