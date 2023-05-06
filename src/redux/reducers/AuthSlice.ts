import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, user, usersMe } from "../actions/Auth";
import { toast } from "react-hot-toast";

interface IAuth {
  loginUser: any;
  isLoading: boolean;
  loginModal: {
    isOpen: boolean;
    message: string;
  };
  registerModal: {
    isOpen: boolean;
    message: string;
  };
  rentModal: {
    isOpen: boolean;
    message: string;
  };
}

const initialState: IAuth = {
  loginUser: null,
  isLoading: false,
  loginModal: {
    isOpen: false,
    message: "",
  },
  registerModal: {
    isOpen: false,
    message: "",
  },
  rentModal: {
    isOpen: false,
    message: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.loginModal.isOpen = true;
    },
    onClose: (state) => {
      state.loginModal.isOpen = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    onRegisterOpen: (state) => {
      state.registerModal.isOpen = true;
    },
    onRegisterClose: (state) => {
      state.registerModal.isOpen = false;
    },
    onRentModalOpen: (state) => {
      state.rentModal.isOpen = true;
    },
    onRentModalClose: (state) => {
      state.rentModal.isOpen = false;
    },
    logOut(state) {
      state.loginUser = null;
    },
  },
  extraReducers: {
    // Login
    [login.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loginUser = action.payload;
      state.loginModal.isOpen = false;
      state.isLoading = false;
      toast.success(action.payload?.msg);
    },
    [login.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    [login.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    // Logout
    [logout.fulfilled.type]: (state, action: PayloadAction<any>) => {
      // toast.success(action.payload?.msg);
    },
    // Register
    [user.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.registerModal.isOpen = false;
      state.isLoading = false;
      toast.success(action.payload?.msg);
    },
    [user.pending.type]: (state) => {
      state.isLoading = true;
    },
    [user.rejected.type]: (state) => {
      state.isLoading = true;
    },
    // Users Me
    [usersMe.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loginUser = action.payload;
    },
    [usersMe.pending.type]: (state) => {},
    [usersMe.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loginUser = action.payload;
    },
  },
});

export default authSlice.reducer;
