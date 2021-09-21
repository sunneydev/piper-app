import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import axios from "axios";
import { config as loadEnv } from "dotenv";

loadEnv();

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
