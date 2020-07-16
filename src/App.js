import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import Auth from "./containers/Auth/Auth";
import Workouts from "./containers/Workouts/Workouts";
import DietTracker from "./containers/DietTracker/DietTracker";
import Layout from "./containers/hoc/Layout/Layout";
import AddExercises from "./containers/Exercises/AddExercises/AddExercises";
import CurrentWokrout from "./containers/Workouts/CurrentWorkout/CurrentWokrout";
import LogIn from "./containers/Auth/LogIn/LogIn";
import SignUp from "./containers/Auth/SignUp/SignUp";
import {
  logoutActionCreator,
  logIn,
  updateToken,
} from "./containers/Auth/authSlice";
import { getUserDataFromStorage, clearLocalStorage } from "./shared/utility";
import { closeWorkoutActionCreator as updateWorkoutHistoryOnReload } from "./containers/Workouts/workoutsSlice";

const App = (props) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checkAuthOnLoad = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const currentTime = new Date();
    if (!token) {
      dispatch(logoutActionCreator());
    } else if (authState.expirationTime) {
    } else {
      const logInData = {
        data: getUserDataFromStorage(),
      };
      dispatch(updateWorkoutHistoryOnReload());
      dispatch(logIn.fulfilled(logInData));
    }
    dispatch(updateToken(refreshToken))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkAuthOnLoad();
  }, []);

  let routes = null;
  if (authState.logedIn) {
    routes = (
      <>
        <Route
          path="/workouts"
          render={(props) => (
            <Layout>
              <Workouts {...props} />
            </Layout>
          )}
        />
        <Route
          path="/diet"
          render={(props) => (
            <Layout>
              <DietTracker {...props} />
            </Layout>
          )}
        />
        <Route
          path="/add_exersices_to_workout"
          render={() => <AddExercises />}
        />
        <Route path="/wokrout_in_progress" render={() => <CurrentWokrout />} />
        <Redirect to="/workouts" />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/log_in" render={() => <LogIn />} />
        <Route path="/sign_up" render={() => <SignUp />} />
        <Redirect to="/auth" />
      </>
    );
  }

  return <Switch>{routes}</Switch>;
};

export default withRouter(App);
