import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Exercises.module.scss";
import ExerciseSelect from "../../components/Exercise/ExerciseSelect/ExerciseSelect";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import FloatingConfirmButton from "../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";

const Exercises = (props) => {
  const availableExercises = useSelector(
    (state) => state.exercise.availableExercises
  );
  console.log(availableExercises);
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <>
      <Toolbar declineIcon="GoBack" declineAction={handleGoBack}>
        {" "}
        Select Exersices
{" "}
      </Toolbar>
      <form className={classes.exersiceWrapper}>
        {availableExercises.map((ex) => (
          <ExerciseSelect
            key={ex.name}
            type={ex.type}
            description={ex.description}
          >
            {ex.name}
          </ExerciseSelect>
        ))}
        <FloatingConfirmButton>Add</FloatingConfirmButton>
      </form>
    </>
  );
};

export default Exercises;
