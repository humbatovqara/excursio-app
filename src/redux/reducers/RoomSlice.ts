import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRoom,
  getAllAmentys,
  getRoomId,
  getRooms,
} from "../actions/Room";
import { toast } from "react-hot-toast";

interface IRoom {
  isLoading: boolean;
  allRooms: any;
  room: any;
  allAmenties: any;
  rentModal: {
    isOpen: boolean;
    message: string;
  };
}

const initialState: IRoom = {
  isLoading: false,
  allRooms: [],
  room: {},
  allAmenties: [],
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
    // Create Room
    [createRoom.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.rentModal.isOpen = false;
      toast.success("Listing created !");
    },
    [createRoom.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [createRoom.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },

    // Get Rooms
    [getRooms.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.allRooms = action.payload;
    },
    [getRooms.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [getRooms.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },

    // Get Amenties
    [getAllAmentys.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.allAmenties = action.payload;
    },
    [getAllAmentys.pending.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    [getAllAmentys.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    // Get Room Id
    [getRoomId.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.room = action.payload;
    },
    [getRoomId.pending.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    [getRoomId.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
  },
});

export default roomSlice.reducer;
