import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../enums/api";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: any, thunkAPI) => {
    try {
      const response = await axios.post(`${API.MAIN_URL}/auth/login`, user);
      const { data } = response;

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const user = createAsyncThunk("users", async (user: any, thunkAPI) => {
  try {
    const response = await axios.post(`${API.MAIN_URL}/users/`, user);
    const { data } = response;

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Error");
  }
});

export const usersMe = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API.MAIN_URL}/users/me`);
    const { data } = response;

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Error");
  }
});
