import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./Auth.module.scss";
import InvertedAddNewItemButton from "../../components/UI/Buttons/InvertedAddNewItemButton/InvertedAddNewItemButton";
import {
  logInStartActionCreator,
  logInFailActionCreator,
  logInSuccessActionCreator,
  signUpStartActionCreator,
  signUpFailActionCreator,
  signUpSuccessActionCreator,
  logoutActionCreator,
  testAsync,
} from "./authSlice";

const Auth = (props) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogIn = () => {
    history.push("/log_in");
    dispatch(logInSuccessActionCreator());
  };
  const testAsyncHandler = () => {
    // dispatch(logInStartActionCreator());
    dispatch(testAsync())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.headline}>Welcome to FitnessDiaryApp!</h2>
      <p>Let your path to healthy life begins</p>
      <InvertedAddNewItemButton click={handleLogIn} className={classes.button}>
        Log In
      </InvertedAddNewItemButton>
      <InvertedAddNewItemButton outlined>Sign Up</InvertedAddNewItemButton>
    </div>
  );
};

export default Auth;
