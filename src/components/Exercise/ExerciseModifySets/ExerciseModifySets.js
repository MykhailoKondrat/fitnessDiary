import React from "react";
import classes from "./ExerciseModifySets.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NumberValueInput from "../../UI/Inputs/NumberValueInput/NumberValueInput";
import IconButton from "../../UI/Buttons/IconButton/IconButton";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import SetInstance from "../../UI/SetInstance/SetInstance";
import FloatingConfirmButton from "../../UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";

const ExerciseModifySets = (props) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.addSet}>
        <h2>{props.selectedExerciseName}</h2>
        <form action="submit" className={classes.addSetForm}>
          <div className={classes.inputs}>
            <NumberValueInput placeholder="REPS" />
            <NumberValueInput placeholder="WEIGHT" />
          </div>
          <IconButton>
            <PlusIcon width="24px" height="24px" />
          </IconButton>
        </form>
      </div>

      <div className={classes.previousSets}>
        <ul className={classes.listOfSets}>
          <SetInstance weight="10" reps="10" />
        </ul>
        <FloatingConfirmButton
          type="submit"
          key="ConfirmModifyWorkout"
          click={props.close}
        >
          Confirm
        </FloatingConfirmButton>
      </div>
      <Backdrop show click={props.close} />
    </div>
  );
};

export default ExerciseModifySets;
