import React, { useEffect, useState } from "react";
import classes from "./Modal.module.scss";
import AddNewItemButton from "../Buttons/AddNewItemButton/AddNewItemButton";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const [visibility, setVisibility] = useState();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <div className={classes.modal} hidden={visibility}>
      <div className={classes.modalWrapper}>
        <div className={classes.modalBody}>
          <h2 className={classes.headline}>{props.headline}</h2>
          <p className={classes.info}>{props.info}</p>
          <div className={classes.actionButtonsWrapper}>
            <AddNewItemButton click={props.cancelAction} buttonStyle="nested">
              {props.cancelActionLabel}
            </AddNewItemButton>
            <AddNewItemButton click={props.confirmAction} buttonStyle="nested">
              {props.cofirmActionLabel}
            </AddNewItemButton>
          </div>
        </div>
      </div>
      <Backdrop show click={() => setVisibility(!visibility)} />
    </div>
  );
};

export default Modal;

/// MODAL TEMPLATE
// <Modal
//   headline="Headline"
//   info="Information to display in modal with description of action"
//   cancelAction={console.log("decline Modal")}
//   cancelActionLabel="Cancel"
//   confirmAction={console.log("confirm Modal")}
//   cofirmActionLabel="Confirm"
// />
