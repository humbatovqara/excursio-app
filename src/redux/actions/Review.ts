import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";
import API from "../../enums/api";
import { getUserId } from "./Auth";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getReviews = createAsyncThunk(
  "reservations/get",
  async (id: number, thunkAPI) => {
    try {
      const response = await $api.get(`${API.MAIN_URL}/reviews/${id}`);
      const { data } = response;
      data?.result?.map((user: any) => {
        thunkAPI.dispatch(getUserId(user?.user?.id));
      });
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const postReviews = createAsyncThunk(
  "reviews/post",
  async (body: any, thunkAPI) => {
    try {
      const response = await $api.post(`${API.MAIN_URL}/reviews/`, body);
      const { data } = response;
      thunkAPI.dispatch(getReviews(body?.room_id));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
