import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.pipersync.tech"
    : "http://localhost:5000";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
