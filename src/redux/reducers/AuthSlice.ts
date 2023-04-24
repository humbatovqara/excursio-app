import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/Auth";

const initialState: any = {
  isAuth: null,
  isLoading: false,
  isDataLoading: false,
  loginError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // get user info
    [login.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.loginError = false;
      state.isAuth = true;
    },
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.loginError = true;
    },
  },
});

export default authSlice.reducer;
