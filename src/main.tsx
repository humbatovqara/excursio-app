import React from "react";
import ReactDOM from "react-dom/client";
// React Router DOM
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import App from "./App";
// Style
import "./index.css";
// Store
const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
