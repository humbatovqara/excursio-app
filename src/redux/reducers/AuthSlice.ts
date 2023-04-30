import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/Auth";

const initialState: any = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    [login.pending.type]: (state, action: PayloadAction<string>) => {},
    [login.rejected.type]: (state, action: PayloadAction<string>) => {},
  },
});

export default authSlice.reducer;
