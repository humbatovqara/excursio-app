import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/AuthSlice";

const rootReducer = combineReducers({
  auth,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = () => {
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
