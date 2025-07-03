import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error desconocido al cargar productos"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    favorites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      // Asegúrate de generar un ID único que no colisione con los de la API (1-20)
      const newProduct = { ...action.payload, id: Date.now() }; // Date.now() es un buen generador de ID grandes
      state.data.push(newProduct);
      // Asegúrate de que el producto añadido tenga rating por defecto si no viene del formulario
      if (!newProduct.rating) {
        newProduct.rating = { rate: 0, count: 0 };
      }
    },
    editProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.data.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedProduct };
      }
      const favIndex = state.favorites.findIndex((fav) => fav.id === id);
      if (favIndex !== -1) {
        state.favorites[favIndex] = {
          ...state.favorites[favIndex],
          ...updatedProduct,
        };
      }
    }, 
    deleteProduct: (state, action) => {
      const productIdToDelete = action.payload;
      state.data = state.data.filter(
        (product) => product.id !== productIdToDelete
      );
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== productIdToDelete
      );
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const isFavorite = state.favorites.some((fav) => fav.id === productId);

      if (isFavorite) {
        state.favorites = state.favorites.filter((fav) => fav.id !== productId);
      } else {
        const productToAdd = state.data.find(
          (product) => product.id === productId
        );
        if (productToAdd) {
          state.favorites.push(productToAdd);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Esto significa que los productos añadidos localmente DESAPARECERÁN si la página se recarga
        // y la API sobrescribe el estado.
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addProduct, editProduct, deleteProduct, toggleFavorite } =
  productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.data;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductById = (state, productId) =>
  state.products.data.find((product) => product.id === productId);
