import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";
import API from "../../enums/api";
import axios from "axios";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createRoom = createAsyncThunk(
  "rooms/create",
  async (room: any, thunkAPI) => {
    const formData = new FormData();
    const roomData = {
      price: room.price,
      room_count: room.roomCount,
      bed_count: room.bed_count,
      max_guest_count: room.guestCount,
      title: room.title,
      description: room.description,
      longitude: room.location.latlng[0],
      latitude: room.location.latlng[1],
      address_state: room.location.label,
      address_city: room.location.region,
      address_zip_code: room.location.flag,
      room_type: room.category,
      amenities: room.amenties,
    };
    formData.append("room", JSON.stringify(roomData));
    formData.append("photos", room.imageSrc);
    try {
      const response = await $api.post(`${API.MAIN_URL}/rooms/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data } = response;
      thunkAPI.dispatch(getRooms());
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const getRooms = createAsyncThunk("rooms/get", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API.MAIN_URL}/rooms/`);
    const { data } = response;
    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("Error");
  }
});

export const getAllAmentys = createAsyncThunk(
  "amenties/get",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API.MAIN_URL}/amenties/`);
      const { data } = response;
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

export const getRoomId = createAsyncThunk(
  "roomId/get",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.get(`${API.MAIN_URL}/rooms/${id}`);
      const { data } = response;
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Error");
    }
  }
);
