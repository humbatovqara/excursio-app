import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteReservations,
  getReservations,
  postReservations,
} from "../actions/Reservation";
import { toast } from "react-hot-toast";

interface IReservation {
  isLoading: boolean;
  reservations: any;
}

const initialState: IReservation = {
  isLoading: false,
  reservations: [],
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // Get Reservations
    [getReservations.fulfilled.type]: (state, action: PayloadAction<any>) => {
      toast.success("Listing reserved!");
      state.isLoading = false;
      state.reservations = action.payload;
    },
    [getReservations.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [getReservations.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    // Post Reservations
    [postReservations.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    [postReservations.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [postReservations.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    // Delete Reservations
    [deleteReservations.fulfilled.type]: (
      state,
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
      toast.success("Reservation cancelled!");
    },
    [deleteReservations.pending.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = true;
    },
    [deleteReservations.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      toast.success("Error Deleting!");
    },
  },
});

export default reservationSlice.reducer;
