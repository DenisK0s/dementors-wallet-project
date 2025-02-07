import App from "App";
import "modern-normalize";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "redux/store";
import "./i18n.js";
import "./assets/css/fonts.css";
import "./assets/css/index.css";
import "./assets/css/variables.css";
import "overlayscrollbars/css/OverlayScrollbars.min.css";

const root = document.querySelector("#root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  root
);
