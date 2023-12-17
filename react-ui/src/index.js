import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css"; // Include your existing stylesheet
import "./index.css";
import DashboardProvider from "./context/dashboard-context";

ReactDOM.render(
  <DashboardProvider>
    <App />
  </DashboardProvider>,
  document.getElementById("root"),
);
