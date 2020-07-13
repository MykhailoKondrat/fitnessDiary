import React from "react";
// import classes from './OnLoading.module.css';
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal /Modal";
import { logoutActionCreator } from "../../Auth/authSlice";

const OnLoading = (props) => {
  const dispatch = useDispatch();

  const loadingWorkout = useSelector((state) => state.workout.loading);
  const loadingAuth = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const handleCloseErrorModal = () => {
    dispatch(logoutActionCreator());
  };
  return (
    <>
      {(loadingWorkout || loadingAuth) && <Spinner />}
      {error && (
        <Modal
          headline="Something Went Wrong!"
          info={error}
          confirmAction={handleCloseErrorModal}
          cofirmActionLabel="Okay"
        />
      )}
      {props.children}
    </>
  );
};

export default OnLoading;
