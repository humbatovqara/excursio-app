import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearch {
  isLoading: boolean;
  searchModal: {
    isOpen: boolean;
    message: string;
  };
}

const initialState: ISearch = {
  isLoading: false,
  searchModal: {
    isOpen: false,
    message: "",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    onOpen: (state) => {
      state.searchModal.isOpen = true;
    },
    onClose: (state) => {
      state.searchModal.isOpen = false;
    },
  },
  extraReducers: {},
});

export default searchSlice.reducer;
