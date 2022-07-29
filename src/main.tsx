import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "./lib/contexts/User.context";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Room from "./pages/Room";
import axios from "axios";
import React from "react";
import Create from "./pages/Create";
import Join from "./pages/Join";
import CenterLayout from "./components/CenterLayout";
import "./index.css";

const myDarkTheme = createTheme({
  type: "dark",
});

axios.defaults.baseURL = "https://piper.koba.pvt.ge";

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
