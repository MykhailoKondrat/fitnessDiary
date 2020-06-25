import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Workout from "../../components/Workout/Workout";
import classes from "./Workouts.module.scss";
import AddNewItemButton from "../../components/UI/Buttons/AddNewItemButton/AddNewItemButton";
import { ReactComponent as Illustration } from "../../assets/icons/dumbells.svg";

const Workouts = (props) => {
  const workoutHistory = useSelector((state) => state.workout.history);
  // workoutHistory = null;
  let content = null;

  const history = useHistory();
  const handleClick = () => {
    history.push("/add_exersices_to_workout");
  };

  if (workoutHistory) {
    content = (
      <>
        <div className={classes.buttonWrapper}>
          <AddNewItemButton clicked={handleClick}>
            Start New Workout
          </AddNewItemButton>
        </div>
        {/* ^^^^^this div is here only to center button :(((( */}
        {workoutHistory &&
          workoutHistory.map((workoutItem) => {
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
        <AddNewItemButton clicked={handleClick}>
          {" "}
          Start First Workout
{" "}
        </AddNewItemButton>
      </div>
    );
  }

  return content;
};

export default Workouts;
