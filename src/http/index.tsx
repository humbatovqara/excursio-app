import axios from "axios";
import { store } from "../redux/store";
import { authSlice } from "../redux/reducers/AuthSlice";
const {} = authSlice.actions;
import API from "../enums/api";

const $api = axios.create({
  baseURL: API.MAIN_URL,
});
$api.interceptors.request.use(async (config: any) => {
  const token = await localStorage.getItem("token");
  store.dispatch(dataLoadingHandle(true));
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    store.dispatch(dataLoadingHandle(false));
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
        const response = await axios.post(``);
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    if (error.config._isRetry) {
      localStorage.removeItem("token");
    }
    store.dispatch(dataLoadingHandle(false));
    throw error;
  }
);

export default $api;
