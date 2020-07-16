import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from "./SignUp.module.scss";
import Input from "../../../components/UI/Inputs/Input/Input";
import FloatingConfirmButton from "../../../components/UI/Buttons/FloatingConfirmButton/FloatingConfirmButton";
import { signUp } from "../authSlice";
import { checkValidity, updateObject } from "../../../shared/utility";

const SignUp = (props) => {
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
  const [enableSignup, setEnableSignup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setEnableSignup(true);
    for (const key in formState) {
      if (!formState[key].valid) {
        setEnableSignup(false);
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

  // despite currently this page looks same as login I want to keep it separate to
  // add more sign up inputs later and test out something like Formik

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

  const handleSignUp = (event) => {
    event.preventDefault();
    dispatch(
      signUp({
        email: formState.email.value,
        password: formState.password.value,
      })
    );
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.headline}>Sign Up</h1>
      <form onSubmit={(event) => handleSignUp(event)} className={classes.form}>
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

        <Link to="/log_in">Switch to Log In</Link>
        <FloatingConfirmButton type="submit" disable={!enableSignup}>
          Sign Up
        </FloatingConfirmButton>
      </form>
    </div>
  );
};

export default SignUp;
