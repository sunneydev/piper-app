import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./lib/contexts/User.context";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Room from "./pages/Room";
import axios from "axios";
import React from "react";
import "./index.css";

axios.defaults.baseURL = "https://piper-api-production-b2c0.up.railway.app";

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
