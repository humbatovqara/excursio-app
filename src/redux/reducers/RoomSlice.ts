import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRoom } from "../actions/Room";
import { toast } from "react-hot-toast";

interface IRoom {
  isLoading: boolean;
}

const initialState: IRoom = {
  isLoading: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // Login
    [createRoom.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      toast.success("Listing created !");
    },
    [createRoom.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [createRoom.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
  },
});

export default roomSlice.reducer;
