import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css"; // Include your existing stylesheet
import "./index.css";
import DashboardProvider from "./context/dashboard-context";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </Provider>,
  document.getElementById("root")
);
