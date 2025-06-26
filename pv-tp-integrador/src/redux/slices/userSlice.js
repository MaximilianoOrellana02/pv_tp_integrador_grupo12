// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Función auxiliar para obtener la sesión del usuario desde localStorage
// Esto permite rehidratar el estado de Redux al recargar la página 
const getSessionUser = () => {
  try {
    const sessionUser = localStorage.getItem('sessionUser'); // 
    return sessionUser ? JSON.parse(sessionUser) : null;
  } catch (error) {
    console.error("Error al leer 'sessionUser' de localStorage:", error);
    return null;
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: getSessionUser(), // Inicializa con el usuario de la sesión guardada en localStorage 
    isAuthenticated: !!getSessionUser(), // true si hay un usuario en sesión, false si no
  },
  reducers: {
    // Acción para iniciar sesión del usuario 
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('sessionUser', JSON.stringify(action.payload)); // Guarda en localStorage 
    },
    // Acción para cerrar sesión del usuario 
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('sessionUser'); // Elimina de localStorage 
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;