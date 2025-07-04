// src/redux/slices/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // Un array para almacenar los productos marcados como favoritos
  },
  reducers: {
    // Acción para añadir un producto a favoritos
    addFavorite: (state, action) => {
      const productToAdd = action.payload;
      // Evitar duplicados: Si el producto no está ya en la lista, lo añade
      if (!state.items.some((item) => item.id === productToAdd.id)) {
        state.items.push(productToAdd);
      }
    },
    // Acción para quitar un producto de favoritos
    removeFavorite: (state, action) => {
      const productIdToRemove = action.payload; // Aquí esperamos solo el ID del producto
      state.items = state.items.filter((item) => item.id !== productIdToRemove);
    },
    // Opcional: para establecer la lista completa de favoritos (útil si los cargas de algún almacenamiento local)
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Exportamos las acciones
export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;
// Exportamos el reducer
export default favoritesSlice.reducer;
