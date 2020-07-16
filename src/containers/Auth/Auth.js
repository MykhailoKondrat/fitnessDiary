import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./Auth.module.scss";
import InvertedAddNewItemButton from "../../components/UI/Buttons/InvertedAddNewItemButton/InvertedAddNewItemButton";

const Auth = (props) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const goToLogIn = () => {
    history.push("/log_in");
  };
  const goToSignUp = () => {
    history.push("/sign_up");
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.headline}>Welcome to FitnessDiaryApp!</h2>
      <p>Let your path to healthy life begins</p>
      <InvertedAddNewItemButton click={goToLogIn} className={classes.button}>
        Log In
      </InvertedAddNewItemButton>
      <InvertedAddNewItemButton outlined click={goToSignUp}>
        Sign Up
      </InvertedAddNewItemButton>
    </div>
  );
};

export default Auth;
