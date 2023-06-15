import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/AuthSlice";
import room from "./reducers/RoomSlice";
import reservation from "./reducers/ReservationSlice";
import review from "./reducers/ReviewSlice";
import search from "./reducers/SearchSlice";

const rootReducer = combineReducers({
  auth,
  room,
  reservation,
  review,
  search,
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
