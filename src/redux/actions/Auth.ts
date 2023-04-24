import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: any, thunkAPI) => {
    try {
      const response = await axios.post("", user);
      const { data } = response.data;
      localStorage.setItem("token", data.accessToken);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.detail);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("token");
  } catch (e) {
    return thunkAPI.rejectWithValue("Regust rejected");
  }
});
