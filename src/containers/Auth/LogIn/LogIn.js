import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { logIn } from "../authSlice";
import classes from "./LogIn.module.scss";
import Input from "../../../components/UI/Inputs/Input/Input";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import {
  checkValidity,
  updateObject,
  saveUserDataToLocalStorage,
} from "../../../shared/utility";

const LogIn = (props) => {
  const formConfig = {
    email: {
      elementType: "input", // not used for now, later could be added more types like textareaselect etc.
      configuration: {
        placeholder: "email@mail.com",
        type: "email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      errorMessage: null,
    },
    password: {
      elementType: "input",
      configuration: {
        placeholder: "password, min 6 chars",
        type: "password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      errorMessage: null,
    },
  };
  const [formState, setFormState] = useState(formConfig);
  const [enableLogIn, setEnableLogIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setEnableLogIn(true);
    for (const key in formState) {
      if (!formState[key].valid) {
        setEnableLogIn(false);
      }
    }
  }, [formState]);

  const formElements = [];
  for (const key in formState) {
    formElements.push({
      id: key,
      config: formState[key],
    });
  }

  const touchedHandler = (event, id) => {
    let updatedState = {};
    const userInput = event.target.value;
    const rules = formState[id].validation;
    const { isValid, errorMessage } = checkValidity(userInput, rules);
    updatedState = updateObject(formState, {
      [id]: updateObject(formState[id], {
        touched: true,
        valid: isValid,
        errorMessage,
      }),
    });
    setFormState(updatedState);
  };

  const inputChangeHandler = (event, id) => {
    const userInput = event.target.value;
    const rules = formState[id].validation;
    let updatedState = {};
    const { isValid, errorMessage } = checkValidity(userInput, rules);
    updatedState = updateObject(formState, {
      [id]: updateObject(formState[id], {
        value: userInput,
        valid: isValid,
        errorMessage,
        touched: true,
      }),
    });
    setFormState(updatedState);
  };
  const handleLogIn = (event) => {
    event.preventDefault();
    dispatch(
      logIn({
        email: formState.email.value,
        password: formState.password.value,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        saveUserDataToLocalStorage(
          res.data.localId,
          res.data.idToken,
          res.data.refreshToken,
          res.data.expiresIn
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.headline}>Log In</h1>
      <p>try test@test.com / 111111</p>
      <form onSubmit={(event) => handleLogIn(event)} className={classes.form}>
        {formElements.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              placeholder={formElement.config.configuration.placeholder}
              type={formElement.config.configuration.type}
              change={(event) => inputChangeHandler(event, formElement.id)}
              valid={formElement.config.valid}
              touched={formElement.config.touched}
              errorMessage={formElement.config.errorMessage}
              blur={(event) => touchedHandler(event, formElement.id)}
            />
          );
        })}

        <Link to="/sign_up">Switch to Sign Up</Link>
        <FloatingConfirmButton type="submit" disable={!enableLogIn}>
          Log In
        </FloatingConfirmButton>
      </form>
    </div>
  );
};

export default LogIn;
