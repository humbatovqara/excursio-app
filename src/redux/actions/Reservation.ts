import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";
import API from "../../enums/api";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getReservations = createAsyncThunk(
  "reservations/get",
  async (_, thunkAPI) => {
    try {
      const response = await $api.get(`${API.MAIN_URL}/reservations/`);
      const { data } = response;

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const postReservations = createAsyncThunk(
  "reservations/post",
  async (body: any, thunkAPI) => {
    try {
      const response = await $api.post(`${API.MAIN_URL}/reservations/`, body);
      const { data } = response;
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
