import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Layout.module.scss";
import Navbar from "../../../components/Navigation/Navbar/Navbar";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import { logoutActionCreator } from "../../Auth/authSlice";
import { setSelectedExercisesActionCreator } from "../../Exercises/exercisesSlice";
import { clearLocalStorage } from "../../../shared/utility";

const Layout = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    clearLocalStorage();
    dispatch(setSelectedExercisesActionCreator());
    dispatch(logoutActionCreator());
    history.push("/auth");
  };
  return (
    <div className={classes.Wrapper}>
      <Toolbar confirmIcon="Logout" confirmAction={handleLogOut}>
        {history.location.pathname.includes("workouts")
          ? "Workout Diary"
          : "Diet Tracker"}
        {props.username}{" "}
      </Toolbar>
      <main className={classes.Content}>{props.children}</main>
      <Navbar />
    </div>
  );
};

export default Layout;
