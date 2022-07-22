import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./styles.css";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

const ele = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(ele);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
