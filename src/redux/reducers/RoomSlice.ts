import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRoom } from "../actions/Room";
import { toast } from "react-hot-toast";

interface IRoom {
  isLoading: boolean;
  rentModal: {
    isOpen: boolean;
    message: string;
  };
}

const initialState: IRoom = {
  isLoading: false,
  rentModal: {
    isOpen: false,
    message: "",
  },
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    onRentModalOpen: (state) => {
      state.rentModal.isOpen = true;
    },
    onRentModalClose: (state) => {
      state.rentModal.isOpen = false;
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
