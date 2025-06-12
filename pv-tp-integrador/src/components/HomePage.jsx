import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  setError,
} from "../redux/slices/productsSlice";
import { addFavorite, removeFavorite } from "../redux/slices/favoritesSlice"; // Importamos las acciones de favoritos

import Header from "../views/Header/Header";
import ProductCard from "../views/PruductCard/ProductCard";

import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  // Obtenemos la lista de productos favoritos del estado global de Redux
  const favoriteProducts = useSelector((state) => state.favorites.items);

  //Estado para el criterio de ordenacion
  const [sortCriteria, setSortCriteria] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (err) {
        console.error("Error fetching products:", err);
        dispatch(setError(err.message));
      }
    };

    // Solo si no hay datos, no estamos cargando y no hay error previo, realizamos el fetch
    if (products.length === 0 && !loading && !error) {
      fetchProducts();
    }
  }, [dispatch, products.length, loading, error]);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  // Lógica para ordenar los productos
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortCriteria) {
      case "priceAsc":
        return a.price - b.price; // Ordenar por precio ascendente
      case "priceDesc":
        return b.price - a.price; // Ordenar por precio descendente
      case "nameAsc":
        return a.title.localeCompare(b.title); // Ordenar por nombre ascendente
      case "nameDesc":
        return b.title.localeCompare(a.title); // Ordenar por nombre descendente
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
