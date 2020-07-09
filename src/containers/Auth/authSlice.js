import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authInit = {
  logedIn: false,
  userId: null,
  token: null,
  error: null,
  loading: false,
  async: false,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (authCredential) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_f43NyLR3IrhkHvPGsbiDr0JDpLYD3O8";
    const authData = {
      email: authCredential.email,
      password: authCredential.password,
      returnSecureToken: true,
    };
    return await axios.post(url, authData);
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: authInit,
  reducers: {
    logInStart: (state, action) => {
      state.loadign = true;
    },
    logInFail: (state, action) => {
      state.logedIn = false;
      state.error = "error";
      state.loadign = false;
    },
    logInSuccess: (state, { payload }) => {
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
      state.error = "error";
      state.loadign = false;
    },
    signUpSuccess: (state, action) => {
      state.logedIn = true;
      state.userId = 1;
      state.token = 12345;
      state.error = null;
      state.loadign = false;

      return true;
    },
    logout: (state, action) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.error = null;
      state.loadign = false;
    },
  },
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      state.logedIn = true;
      state.userId = 1;
      state.token = 12345;
      state.error = null;
      state.loadign = false;
    },
    [signUp.rejected]: (state, action) => {
      console.log(action);
      state.logedIn = true;
      state.userId = 1;
      state.token = 12345;
      state.error = action.error.message;
      state.loadign = false;
    },
    [signUp.pending]: (state, action) => {
      state.logedIn = true;
      state.userId = 1;
      state.token = 12345;
      state.error = null;
      state.loadign = false;
    },
  },
});

export const {
  logInStart: logInStartActionCreator,
  logInFail: logInFailActionCreator,
  logInSuccess: logInSuccessActionCreator,
  signUpStart: signUpStartActionCreator,
  signUpFail: signUpFailActionCreator,
  signUpSuccess: signUpSuccessActionCreator,
  logout: logoutActionCreator,
} = authSlice.actions;

export default authSlice.reducer;
