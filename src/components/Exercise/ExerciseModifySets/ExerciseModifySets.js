import React, { useEffect, useState } from "react";
import classes from "./ExerciseModifySets.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NumberValueInput from "../../UI/Inputs/NumberValueInput/NumberValueInput";
import IconButton from "../../UI/Buttons/IconButton/IconButton";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import SetInstance from "../../UI/SetInstance/SetInstance";
import FloatingConfirmButton from "../../UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";

const ExerciseModifySets = (props) => {
  // this component is 'dumb' because in future it might be used to modify
  // wokrout history state so should receive props from the place it was invoked (current wokrout or wokrout history)

  // that's why handlers for adding & removing set is local
  // but handler for update store is passed from parent component

  const [localSets, setLocalSets] = useState({
    reps: props.reps,
    weight: props.weight,
  });
  const [repsInput, setRepsInput] = useState("");
  const [weightInput, setWeightInput] = useState("");

  const hadnleInput = (event, type) => {
    let { value } = event.target;
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    type === "reps" ? setRepsInput(value) : setWeightInput(value);
  };

  const handleAddSet = (event) => {
    event.preventDefault();
    const updatedReps = localSets.reps.concat(repsInput);
    const updatedWeight = localSets.weight.concat(weightInput);
    const updatedSets = {
      reps: updatedReps,
      weight: updatedWeight,
    };

    setLocalSets(updatedSets);
  };
  // TODO - refactor with .filter
  const handleDeleteSet = (key) => {
    const updatedReps = [...localSets.reps];
    const updatedWeight = [...localSets.weight];
    updatedReps.splice(key, 1);
    updatedWeight.splice(key, 1);
    const updatedSets = {
      reps: updatedReps,
      weight: updatedWeight,
    };
    setLocalSets(updatedSets);
  };

  // clear inputs
  useEffect(() => {
    setRepsInput("");
    setWeightInput("");
  }, [localSets]);

  return (
    <div className={classes.Wrapper}>
      <div className={classes.addSet}>
        <h2>{props.selectedExerciseName}</h2>
        <form action="submit" className={classes.addSetForm}>
          <div className={classes.inputs}>
            <NumberValueInput
              placeholder="REPS"
              value={repsInput}
              change={(event) => hadnleInput(event, "reps")}
            />
            <NumberValueInput
              placeholder="WEIGHT"
              value={weightInput}
              change={(event) => hadnleInput(event, "weight")}
            />
          </div>

          <IconButton
            click={handleAddSet}
            disabled={(repsInput === "") | (weightInput === "")}
          >
            <PlusIcon width="24px" height="24px" />
          </IconButton>
        </form>
      </div>

      <div className={classes.previousSets}>
        <ul className={classes.listOfSets}>
          {localSets.reps.map((rep, id) => (
            <SetInstance
              key={id}
              reps={rep}
              weight={localSets.weight[id]}
              deleteSet={(id) => handleDeleteSet(id)}
            />
          ))}
        </ul>

        <FloatingConfirmButton
          type="submit"
          key="ConfirmModifyWorkout"
          click={() => props.close(localSets)}
        >
          Confirm
        </FloatingConfirmButton>
      </div>
      <Backdrop show click={() => props.close(localSets)} />
    </div>
  );
};

export default ExerciseModifySets;
