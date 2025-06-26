// src/components/PrivateRoute.jsx (o src/utils/PrivateRoute.jsx)
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Obtenemos el estado de autenticación del usuario desde Redux
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Si el usuario no está autenticado, redirigimos a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // 'replace' asegura que el usuario no pueda volver a la página protegida con el botón de atrás
  }

  // Si el usuario está autenticado, renderizamos los componentes hijos (las rutas protegidas)
  // 'Outlet' se usa si PrivateRoute se usa como un layout para un grupo de rutas anidadas.
  // Si se usa directamente como elemento en la ruta, 'children' es más explícito para pasar JSX.
  return children ? children : <Outlet />;
};

export default PrivateRoute;