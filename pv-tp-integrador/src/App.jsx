import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
   <>
      {/* Aquí podrías agregar un componente de Navbar o Header */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Aquí irán otras rutas en el futuro, como /products/:id, /favorites, etc. */}
      </Routes>
    </>
  )
}

export default App;
