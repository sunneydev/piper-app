import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./lib/contexts/User.context";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Room from "./pages/Room";
import axios from "axios";
import React from "react";
import "./index.css";

axios.defaults.baseURL = import.meta.env.PROD
  ? import.meta.env.API_URL
  : "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
