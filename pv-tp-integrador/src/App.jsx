import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import { Provider } from "react-redux";
import Header from "./views/Header/Header.jsx";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/productos/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
