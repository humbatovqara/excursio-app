import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/AuthSlice";
import room from "./reducers/RoomSlice";
import reservation from "./reducers/ReservationSlice";

const rootReducer = combineReducers({
  auth,
  room,
  reservation,
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
