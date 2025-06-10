// src/pages/FavoritesPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/slices/favoritesSlice'; // Importamos la acción para remover

const FavoritesPage = () => {
  // Obtenemos la lista de productos favoritos del estado global de Redux
  const favoriteProducts = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  // Función para desmarcar un producto como favorito
  const handleRemoveFavorite = (productId) => {
    dispatch(removeFavorite(productId));
  };

  return (
    <div>
      <h1>Mis Productos Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p>No tienes productos marcados como favoritos aún.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {favoriteProducts.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
              <h3>{product.title}</h3>
              <p>Categoría: {product.category}</p>
              <p>Precio: ${product.price}</p>
              <img src={product.image} alt={product.title} style={{ maxWidth: '100px', height: 'auto', marginBottom: '10px' }} />
              <button onClick={() => handleRemoveFavorite(product.id)}>
                Desmarcar como Favorito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;