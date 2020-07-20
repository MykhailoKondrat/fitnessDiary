import React, {useEffect, useState} from "react";
// import classes from './OnLoading.module.css';
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Modal from "../../../components/UI/Modal /Modal";
import { logoutActionCreator } from "../../Auth/authSlice";
import Transition from "react-transition-group/cjs/Transition";

const OnLoading = React.memo ((props) => {
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
  
      {<Modal
        show ={error}
        headline="Something Went Wrong!"
        info={error}
        confirmAction={handleCloseErrorModal}
        cofirmActionLabel="Okay"
      />}
      
  
      {/*<Transition in={error} timeout={3000} mountOnEnter unmountOnExit>*/}
      {/*  {state =>*/}
      {/*    <Modal*/}
      {/*      headline={state}*/}
      {/*      info={error}*/}
      {/*      confirmAction={handleCloseErrorModal}*/}
      {/*      cofirmActionLabel="Okay"*/}
      {/*      // style={{transition: 'opacity 300ms ease-out',*/}
      {/*      //   opacity: state === 'entering' ? 0 : 1*/}
      {/*      // }}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  */}
      {/*</Transition>*/}
      {props.children}
    </>
  );
});

export default OnLoading;
