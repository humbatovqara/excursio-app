import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getReviews, postReviews } from "../actions/Review";

interface IReviews {
  isLoading: boolean;
  reviews: any;
}

const initialState: IReviews = {
  isLoading: false,
  reviews: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // Post Reviews
    [postReviews.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    [postReviews.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [postReviews.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    // Get Reviews
    [getReviews.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.reviews = action.payload;
    },
    [getReviews.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [getReviews.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
  },
});

export default reviewSlice.reducer;
