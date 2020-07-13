import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authInit = {
  logedIn: false,
  userId: null,
  token: null,
  refreshToken: null,
  error: null,
  loading: false,
  redirect: "/auth",
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
    logout: (state, action) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [signUp.fulfilled]: (state, { payload }) => {
      state.logedIn = true;
      state.userId = payload.data.localId;
      state.token = payload.data.idToken;
      state.refreshToken = payload.data.refreshToken;
      state.error = null;
      state.loading = false;
    },
    [signUp.rejected]: (state, action) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.error = action.error.message;
      state.loading = false;
    },
    [signUp.pending]: (state, action) => {
      state.logedIn = false;
      state.userId = 1;
      state.token = 12345;
      state.error = null;
      state.loading = true;
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
