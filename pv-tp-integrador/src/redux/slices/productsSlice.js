import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [], // Estado inicial: un array vacío para almacenar los productos
    loading: false, // Opcional: para indicar si se están cargando los datos
    error: null, // Opcional: para manejar errores
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload; // La acción recibe los datos de la API y los guarda en el estado
      state.loading = false; // Opcional
      state.error = null; // Opcional
    },
    setLoading: (state, action) => { // Opcional
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => { // Opcional
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions; // Exportamos las acciones
export default productsSlice.reducer; // Exportamos el reducer para configurarlo en el store