import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import React from "react";

const Routers = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* main */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
