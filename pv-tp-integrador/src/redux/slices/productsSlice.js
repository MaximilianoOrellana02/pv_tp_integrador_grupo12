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
      state.loading = false; 
      state.error = null; 
    },
    setLoading: (state, action) => { 
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => { 
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions; 
export default productsSlice.reducer; 