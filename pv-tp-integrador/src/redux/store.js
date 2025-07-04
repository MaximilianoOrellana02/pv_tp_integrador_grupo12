import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import favoritesReducer from "./slices/favoritesSlice";
import useReducer from "./slices/userSlice";

//Funcion para cargar los favoritos desde el localStorage

const cargarFavoritosDesdeLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("favorites");

    if (serializedState === null) {
      return undefined; // Si no hay favoritos guardados, retornamos undefined
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error al cargar los favoritos desde localStorage:", error);
    return undefined; // En caso de error, retornamos undefined
  }
};

// Cargamos el estado inicial de favoritos desde localStorage
const saveFavoritesState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favorites", serializedState);
  } catch (err) {
    console.warn(
      "Error guardando el estado de favoritos en localStorage:",
      err
    );
  }
};

const preloadedFavorites = cargarFavoritosDesdeLocalStorage();

const store = configureStore({
  reducer: {
    products: productsReducer, // Asignamos el reducer del slice de productos
    favorites: favoritesReducer, // Asignamos el reducer del slice de favoritos
    user: useReducer, // Añadimos el reducer
  },

  preloadedState: preloadedFavorites
    ? { favorites: { items: preloadedFavorites } }
    : undefined,
});

store.subscribe(() => {
  // Solo guardamos la parte 'items' del estado de 'favorites'.
  // Es crucial acceder correctamente a la parte del estado que quieres persistir.
  saveFavoritesState(store.getState().favorites.items);
});

export default store;
