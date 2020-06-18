import { createSlice } from "@reduxjs/toolkit";
import {exercisesSlice} from "../Exercises/exercisesSlice";

const authInit = {
  logedIn:false,
  userId: null,
  token:null,
  error: null,
  loadign: false
}
export const authSlice = createSlice({
  name: "auth",
  initialState: authInit,
  reducers: {
    logInStart: (state, action) => {
      state.loadign = true;
    }
    logInFail: (state, action) => {
      state.logedIn = false;
      state.error = 'error';
      state.loadign = false;
    },
    logInSuccess: (state, action) => {
      state.logedIn = true;
      state.userId = 1;
      state.token = 12345;
      state.error = null;
      state.loadign = false;
    },
    signUpStart: (state, action) => {
      state.loadign = true;
    },
    signUpFail: (state, action) => {
      state.error = 'error'
      state.loadign = false;
    },
    signUpSuccess: (state, action) => {
      state.error = null;
      state.loadign = false;
      return true;
    },
    logout: (state,action) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.error = null;
      state.loadign = false;
    }
  }
});

export const {
  logInStart: logInStartActionCreator,
  logInFail:logInFailActionCreator,
  logInSuccess: logInSuccessActionCreator,
  signUpStart:signUpStartActionCreator,
  signUpFail: signUpFailActionCreator,
  signUpSuccess: signUpSuccessActionCreator,
  logout: logoutActionCreator,
} = exercisesSlice.actions;

export default authSlice.reducer