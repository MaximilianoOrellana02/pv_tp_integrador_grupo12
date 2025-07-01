import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import favoritesReducer from "./slices/favoritesSlice";
import useReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer, // Asignamos el reducer del slice de productos
    favorites: favoritesReducer, // Asignamos el reducer del slice de favoritos
    user: useReducer, // Añadimos el reducer
  },
});

export default store;
