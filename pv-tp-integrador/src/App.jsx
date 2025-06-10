import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import { Provider } from 'react-redux'



function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     {/* Componente de Navegación básico */}
      <nav style={{ padding: '1rem', background: '#333', color: 'white', marginBottom: '20px' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
          </li>
          <li>
            <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>Favoritos</Link>
          </li>
          {/* Aquí podrías añadir enlaces para crear/editar productos en el futuro */}
        </ul>
      </nav>
      {/* Aquí podrías agregar un componente de Navbar o Header */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* Aquí irán otras rutas en el futuro, como /products/:id, /favorites, etc. */}
      </Routes>
    </>
  )
}

export default App;
