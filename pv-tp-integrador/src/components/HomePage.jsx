// src/components/HomePage.jsx  <-- Nota: El archivo ahora está en 'components'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../redux/slices/productsSlice';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice'; // Importamos las acciones de favoritos

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector((state) => state.products);
  // Obtenemos la lista de productos favoritos del estado global de Redux
  const favoriteProducts = useSelector((state) => state.favorites.items);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (err) {
        console.error('Error fetching products:', err);
        dispatch(setError(err.message));
      }
    };

    // Solo si no hay datos, no estamos cargando y no hay error previo, realizamos el fetch
    if (products.length === 0 && !loading && !error) {
        fetchProducts();
    }
  }, [dispatch, products.length, loading, error]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <div>
      <h1>Listado de Productos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => {
            // Verificar si el producto ya está en favoritos para mostrar el estado correcto del botón
            const isFavorite = favoriteProducts.some(fav => fav.id === product.id);

            const handleToggleFavorite = () => {
              if (isFavorite) {
                dispatch(removeFavorite(product.id)); // Quitamos de favoritos
              } else {
                dispatch(addFavorite(product)); // Añadimos a favoritos
              }
            };

            return (
              <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
                <h3>{product.title}</h3>
                <p>Categoría: {product.category}</p>
                <p>Precio: ${product.price}</p>
                <img src={product.image} alt={product.title} style={{ maxWidth: '100px', height: 'auto', marginBottom: '10px' }} />
                {/* Botón/ícono de favorito */}
                <button
                  onClick={handleToggleFavorite}
                  style={{ background: isFavorite ? 'gold' : '#ccc', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {isFavorite ? '★ Favorito' : '☆ Marcar Favorito'}
                </button>
                {/* Botón para ver más detalles (lo implementaremos en el futuro) */}
                <button style={{ marginLeft: '10px' }}>Ver más detalles</button>
              </div>
            );
          })
        ) : (
          <div>No hay productos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;