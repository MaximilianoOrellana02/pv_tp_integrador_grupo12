import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import favoritesReducer from './slices/favoritesSlice'; // Importa el reducer del slice de favoritos
import useReducer from './slices/userSlice';

// Importa aquí otros reducers 

const store = configureStore({
  reducer: {
    products: productsReducer, // Asignamos el reducer del slice de productos
    favorites: favoritesReducer, // Asignamos el reducer del slice de favoritos
    user: useReducer, // Añadimos el reducer de usuario aqui
    
    // Añade aquí otros reducers si tienes más slices
  },
});

export default store;