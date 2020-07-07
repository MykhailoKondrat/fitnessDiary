import React from "react";
// import classes from './OnLoading.module.css';
import { useSelector } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";

const OnLoading = (props) => {
  const loading = useSelector((state) => state.workout.loading);
  const error = useSelector((state) => state.workout.error);
  return (
    <>
      {loading && <Spinner />}
      {/* {//error && add error modal } */}
      {props.children}
    </>
  );
};

export default OnLoading;
