// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Usaremos useParams para obtener el ID
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice'; // Para marcar/desmarcar favoritos

const ProductDetailPage = () => {
  const { id } = useParams(); // Obtiene el ID del producto de la URL (ej. de /product/123, id será "123")
  const navigate = useNavigate(); // Hook para la navegación programática, por ejemplo, para el botón "Volver"
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null); // Estado local para guardar los detalles del producto
  const [loading, setLoading] = useState(true); // Estado local para indicar si se están cargando los datos
  const [error, setError] = useState(null);      // Estado local para manejar errores

  // Obtener la lista de favoritos del estado global para saber si el producto actual es favorito
  const favoriteProducts = useSelector((state) => state.favorites.items);
  // Verifica si el producto actual (si ya está cargado) se encuentra en la lista de favoritos
  const isFavorite = product ? favoriteProducts.some(fav => fav.id === product.id) : false;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true); // Se inicia la carga
      setError(null);   // Limpiamos cualquier error previo
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`); // Petición a la API para un producto específico
        if (!response.ok) { // Si la respuesta HTTP no es exitosa
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Convertimos la respuesta a JSON
        setProduct(data); // Guardamos los detalles del producto en el estado local
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message); // Guardamos el mensaje de error
      } finally {
        setLoading(false); // La carga ha terminado (sea exitosa o con error)
      }
    };

    if (id) { // Solo si tenemos un ID válido en la URL, intentamos cargar los detalles
      fetchProductDetails();
    }
  }, [id]); // Este efecto se ejecutará cada vez que el 'id' de la URL cambie

  // Lógica para alternar el estado de favorito (similar a HomePage)
  const handleToggleFavorite = () => {
    if (!product) return; // Asegúrate de que el producto esté cargado antes de intentar marcar/desmarcar
    if (isFavorite) {
      dispatch(removeFavorite(product.id)); // Si es favorito, lo quitamos
    } else {
      dispatch(addFavorite(product)); // Si no es favorito, lo añadimos
    }
  };

  // Renderizado condicional según el estado de carga o error
  if (loading) {
    return <div>Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div>Error al cargar los detalles del producto: {error}</div>;
  }

  if (!product) {
    // Esto podría ocurrir si el ID no es válido o si la API no retorna el producto
    return <div>Producto no encontrado.</div>;
  }

  // Renderizado de los detalles del producto
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ maxWidth: '300px', height: 'auto', marginBottom: '20px', borderRadius: '4px' }} />
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      {/* La API de Fake Store no proporciona 'stock', así que generamos uno aleatorio o usamos un placeholder */}
      <p><strong>Stock disponible:</strong> {Math.floor(Math.random() * 100) + 1} unidades</p>
      <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>

      {/* Botón para marcar/desmarcar como favorito desde la página de detalles */}
      <button
        onClick={handleToggleFavorite}
        style={{ background: isFavorite ? 'gold' : '#ccc', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        {isFavorite ? '★ Desmarcar Favorito' : '☆ Marcar Favorito'}
      </button>

      {/* Botón para volver a la página anterior */}
      <button
        onClick={() => navigate(-1)} // navigate(-1) regresa a la última ubicación en el historial
        style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
      >
        Volver
      </button>
    </div>
  );
};

export default ProductDetailPage;