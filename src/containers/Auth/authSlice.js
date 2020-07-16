import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authInit = {
  logedIn: false,
  userId: null,
  token: null,
  refreshToken: null,
  expiresIn: null,
  error: null,
  loading: false,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (authCredentials) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_f43NyLR3IrhkHvPGsbiDr0JDpLYD3O8";
    const authData = {
      email: authCredentials.email,
      password: authCredentials.password,
      returnSecureToken: true,
    };
    return await axios.post(url, authData);
  }
);
export const logIn = createAsyncThunk("auth/logIn", async (authCredentials) => {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_f43NyLR3IrhkHvPGsbiDr0JDpLYD3O8";
  const authData = {
    email: authCredentials.email,
    password: authCredentials.password,
    returnSecureToken: true,
  };
  const response = await axios.post(url, authData);
  return response;
});
export const updateToken = createAsyncThunk(
  "auth/exchangeToken",
  async (refreshToken) => {
    const url =
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyA_f43NyLR3IrhkHvPGsbiDr0JDpLYD3O8";
    const data = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    console.log(data);
    const response = await axios.post(url, data);
    return response;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: authInit,
  reducers: {
    logout: (state, action) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.refreshToken = null;
      state.expiresIn = null;
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
    [signUp.pending]: (state) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.error = null;
      state.loading = true;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.logedIn = true;
      state.userId = payload.data.localId;
      state.token = payload.data.idToken;
      state.refreshToken = payload.data.refreshToken;
      state.expiresIn = payload.data.expiresIn;
      state.error = null;
      state.loading = false;
    },
    [logIn.rejected]: (state, action) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.error = action.error.message;
      state.loading = false;
    },
    [logIn.pending]: (state, action) => {
      state.logedIn = false;
      state.userId = null;
      state.token = null;
      state.error = null;
      state.loading = true;
    },
  },
});

export const { logout: logoutActionCreator } = authSlice.actions;

export default authSlice.reducer;
