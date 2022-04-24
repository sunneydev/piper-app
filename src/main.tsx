import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./lib/contexts/User.context";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Room from "./pages/Room";
import axios from "axios";
import React from "react";
import "./index.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import Center from "./components/Center";
import Create from "./pages/Create";
import Join from "./pages/Join";
import CenterLayout from "./components/CenterLayout";

const myDarkTheme = createTheme({
  type: "dark",
});

axios.defaults.baseURL = import.meta.env.PROD
  ? import.meta.env.API_URL
  : "http://188.129.204.225:5000";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider theme={myDarkTheme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="room" element={<CenterLayout />}>
              <Route path="new" element={<Create />} />
              <Route path="join" element={<Join />} />
            </Route>
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </NextUIProvider>
  </React.StrictMode>
);
