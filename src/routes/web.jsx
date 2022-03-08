import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Rentals from "../pages/Rentals";

function web() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/customers" element={<Customers />} />
      <Route path="/admin/Rentals" element={<Rentals />} />
      <Route path="/admin/movies" element={<Movies />} />
    </Routes>
  );
}

export default web;
