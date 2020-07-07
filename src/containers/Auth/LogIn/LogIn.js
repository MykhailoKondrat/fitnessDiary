import React from "react";
import { Link } from "react-router-dom";
import classes from "./LogIn.module.scss";
import Input from "../../../components/UI/Inputs/Input/Input";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";

const LogIn = (props) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.headline}>Log In</h1>
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

      <Link to="/sign_up">Switch to Sign Up</Link>
      <FloatingConfirmButton>Log In</FloatingConfirmButton>
    </div>
  );
};

export default LogIn;
