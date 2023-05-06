import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";
import API from "../../enums/api";
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
      const response = await axios.post(`${API.MAIN_URL}/auth/login`, user);
      const { data } = response;
      localStorage.setItem("token", data.result.access_token);
      localStorage.setItem("token_type", data.result.token_type);

      console.log("Login Data: ", data);

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post(`${API.MAIN_URL}/auth/logout`);
    const { data } = response;
    localStorage.removeItem("token");
    localStorage.removeItem("token_type");

    console.log("Logout Data: ", data);

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Error");
  }
});

export const user = createAsyncThunk("users", async (user: any, thunkAPI) => {
  try {
    const response = await axios.post(`${API.MAIN_URL}/users/`, user);
    const { data } = response;

    console.log("Register Data: ", data);

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Error");
  }
});

export const usersMe = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const response = await $api.get(`${API.MAIN_URL}/users/me`);
    const { data } = response;

    console.log("User Me / Refresh Data: ", data);

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Error");
  }
});
