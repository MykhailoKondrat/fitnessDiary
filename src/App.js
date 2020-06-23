import React, { Fragment, Suspense } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import * as styles from "./App.module.scss";
import Workouts from "./containers/Workouts/Workouts";
import DietTracker from "./containers/DietTracker/DietTracker";
import Layout from "./containers/hoc/Layout/Layout";
import Exercises from "./containers/Exercises/Exercises";
import { completeWorkoutActionCreator } from "./containers/Workouts/workoutsSlice";
import {
  addExerciseActionCreator,
  removeExerciseActionCreator,
  addSetActionCreator,
} from "./containers/Exercises/exercisesSlice";

const App = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Switch>
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
          path="/addExersicesToWorkout"
          render={(props) => <Exercises />}
        />
        <Redirect to="/workouts" />
      </Switch>
      {/* idk which option is best one - first looks too nested, second- too */}
      {/* verbose */}
      {/* -- TODO : add memoiztion to avoid re-rendering workouts on switch to food  tracker */}

      {/* <Switch> */}
      {/*  <Layout path={["/workouts", "/diet"]}> */}
      {/*    <Route path="/workouts" render={(props) => <Workouts {...props} />} /> */}
      {/*    <Route path="/diet" render={(props) => <DietTracker {...props} />} /> */}
      {/*  </Layout> */}
      {/*  <Route path="/test" exact> */}
      {/*    {test} */}
      {/*  </Route> */}
      {/*  <Route path="/test/test" exact> */}
      {/*    <h1>test</h1> */}
      {/*  </Route> */}
      {/*  <Redirect to="/workouts" /> */}
      {/* </Switch> */}
    </>
  );
};

export default withRouter(App);
