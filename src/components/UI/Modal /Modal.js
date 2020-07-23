import React from "react";
import Transition from "react-transition-group/cjs/Transition";
import classes from "./Modal.module.scss";
import AddNewItemButton from "../Buttons/AddNewItemButton/AddNewItemButton";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Transition
      in={props.show}
      timeout={300}
      mountOnEnter
      unmountOnExit
      onEntered={() => {
        document.body.style.overflow = "hidden";
      }}
      onExit={() => {
        document.body.style.overflow = "unset";
      }}
    >
      {(state) => {
        const modalWrapperClasses = [
          classes.modal,
          state === "entering"
            ? classes.ModalOpen
            : state === "exiting"
            ? classes.ModalClosed
            : null,
        ];
        return (
          <>
            <div className={modalWrapperClasses.join(" ")}>
              <div className={classes.modalWrapper}>
                <div className={classes.modalBody}>
                  <h2 className={classes.headline}>{props.headline}</h2>
                  <p className={classes.info}>{props.info}</p>
                  <div className={classes.actionButtonsWrapper}>
                    {props.cancelActionLabel && (
                      <AddNewItemButton
                        click={props.cancelAction}
                        buttonStyle="nested"
                      >
                        {props.cancelActionLabel}
                      </AddNewItemButton>
                    )}
                    <AddNewItemButton
                      click={props.confirmAction}
                      buttonStyle="nested"
                    >
                      {props.cofirmActionLabel}
                    </AddNewItemButton>
                  </div>
                </div>
              </div>
              <Backdrop show click={props.cancelAction} />
            </div>
          </>
        );
      }}
    </Transition>
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
