import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts, // Esto es el thunk creado con createAsyncThunk
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
} from "../redux/slices/productsSlice";
import { addFavorite, removeFavorite } from "../redux/slices/favoritesSlice"; // Importamos las acciones de favoritos

import Header from "../views/Header/Header";
import ProductCard from "../views/PruductCard/ProductCard";

import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const productsError = useSelector(selectProductsError);

  const loading = productsStatus === "loading";
  const error = productsError;

  const favoriteProducts = useSelector((state) => state.favorites.items);

  //Estado para el criterio de ordenacion
  const [sortCriteria, setSortCriteria] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Despachar el thunk fetchProducts directamente
    // La lógica de setLoading, setProducts, setError ahora está en el extraReducers del productsSlice
    if (productsStatus === "idle") {
      // Solo carga si el estado es 'idle'
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  // Lógica para ordenar los productos
// Primero filtramos los productos según el término de búsqueda
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

// Luego los ordenamos según el criterio seleccionado
const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortCriteria) {
    case "priceAsc":
      return a.price - b.price;
    case "priceDesc":
      return b.price - a.price;
    case "nameAsc":
      return a.title.localeCompare(b.title);
    case "nameDesc":
      return b.title.localeCompare(a.title);
    default:
      return 0;
  }
});

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <div className="header-container">
      <Header></Header>

      <div className="products-container">
        <div className="products-header">
          <h1>Productos</h1>
              <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-busqueda"
                  />
               </div>
          <div className="sort-controls">
            <label htmlFor="sort-select">Ordenar por:</label>
            <select
              id="sort-select"
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option value="default">Por defecto</option>
              <option value="priceAsc">Precio: Menor a Mayor</option>
              <option value="priceDesc">Precio: Mayor a Menor</option>
              <option value="nameAsc">Nombre: A - Z</option>
              <option value="nameDesc">Nombre: Z - A</option>
            </select>
            <Link to="/create-product" className="btn-agregar-link">
              <button
                disabled={productsStatus === "loading"}
                className="btn-agregar"
              >
                <i class="fa-solid fa-plus"></i> Agregar
              </button>
            </Link>
          </div>
        </div>
        <div className="contenedor">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => {
              // Verificar si el producto ya está en favoritos para mostrar el estado correcto del botón
              const isFavorite = favoriteProducts.some(
                (fav) => fav.id === product.id
              );

              const handleToggleFavorite = () => {
                if (isFavorite) {
                  dispatch(removeFavorite(product.id)); // Quitamos de favoritos
                } else {
                  dispatch(addFavorite(product)); // Añadimos a favoritos
                }
              };

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite}
                />
              );
            })
          ) : (
            <div>No hay productos disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
