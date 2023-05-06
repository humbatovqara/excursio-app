import axios from "axios";

import { store } from "../redux/store";
import { authSlice } from "../redux/reducers/AuthSlice";
import { logout } from "../redux/actions/Auth";
import API from "../enums/api";

const $api = axios.create({
  baseURL: API.MAIN_URL,
});

$api.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem("token");
  const token_type = localStorage.getItem("token_type");
  config.headers.Authorization = `${token_type} ${token}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        store.dispatch(logout());
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    if (error.config._isRetry) {
      localStorage.removeItem("token");
      store.dispatch(logout());
    }
    throw error;
  }
);

export default $api;
