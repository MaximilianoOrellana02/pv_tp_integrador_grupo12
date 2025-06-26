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
import ProductForm from "./services/ProductForm.jsx";
import Footer from "./views/Footer/Footer.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPages.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <NavBar></NavBar>

      <Routes>
        {/*Rutas Publicas */}
        <Route path="/register" element= {<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        {/*Rutas Privadas */}
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
        <Route path="/productos/:id" element={<PrivateRoute><ProductDetailPage /></PrivateRoute>} />
        <Route path="/create-product" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/edit-product/:productId" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
