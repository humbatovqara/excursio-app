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

      return data?.is_success;
    } catch (e: any) {
      // return thunkAPI.rejectWithValue(e?.response?.data?.detail);
    }
  }
);
