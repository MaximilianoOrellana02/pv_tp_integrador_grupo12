import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
// Importa aquí otros reducers si tienes más slices

const store = configureStore({
  reducer: {
    products: productsReducer, // Asignamos el reducer del slice de productos
    // Añade aquí otros reducers si tienes más slices (ej. favorites: favoritesReducer)
  },
});

export default store;