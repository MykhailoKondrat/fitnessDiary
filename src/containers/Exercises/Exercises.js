import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Exercises.module.scss";
import ExerciseSelect from "../../components/Exercise/ExerciseSelect/ExerciseSelect";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Exercises = (props) => {
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
      <div className={classes.exersiceWrapper}>
        <ExerciseSelect />
        <ExerciseSelect />
        <ExerciseSelect />
        <ExerciseSelect />
      </div>
    </>
  );
};

export default Exercises;
