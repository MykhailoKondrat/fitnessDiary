import React from "react";
import { Link } from "react-router-dom";
import classes from "./SignUp.module.scss";
import Input from "../../../components/UI/Inputs/Input/Input";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";

const SignUp = (props) => {
  // despite currently this page looks same as login I want to keep it separate to
  // add more sign up inputs later and test out something like Formik
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
      <FloatingConfirmButton>Sign Up</FloatingConfirmButton>
    </div>
  );
};

export default SignUp;
