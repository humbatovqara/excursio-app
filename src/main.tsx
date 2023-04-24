import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Style
import "./index.css";
// React Router DOM
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
// Store
const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
