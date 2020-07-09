import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import classes from "./SignUp.module.scss";
import Input from "../../../components/UI/Inputs/Input/Input";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import { signUp } from "../authSlice";

const SignUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // despite currently this page looks same as login I want to keep it separate to
  // add more sign up inputs later and test out something like Formik
  const testData = {
    email: "test2@test.com",
    password: "111111",
  };
  console.log(unwrapResult);
  const handleSignUp = () => {
    dispatch(signUp(testData))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("rere");
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.headline}>Sign Up</h1>
      <Input
        placeholder="e-mail"
        name="email"
        type="email"
        change={props.changed}
        invalid={!props.validity}
        touched={props.touched}
      />
      <Input
        placeholder="password"
        name="password"
        type="password"
        change={props.changed}
        invalid={!props.validity}
        touched={props.touched}
      />

      <Link to="/log_in">Switch to Log In</Link>
      <FloatingConfirmButton click={handleSignUp}>
        Sign Up
      </FloatingConfirmButton>
    </div>
  );
};

export default SignUp;
