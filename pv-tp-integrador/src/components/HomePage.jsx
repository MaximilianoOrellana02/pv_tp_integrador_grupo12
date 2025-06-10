// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../redux/slices/productsSlice'; // Importamos las acciones

const HomePage = () => {
  const dispatch = useDispatch();
  // Usamos useSelector para obtener los productos del estado global de Redux
  const { data: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true)); // Indicamos que la carga ha comenzado
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) { // Verifica si la respuesta HTTP es exitosa (código 2xx)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(setProducts(data)); // Guardamos los productos en el estado global
      } catch (err) {
        console.error('Error fetching products:', err);
        dispatch(setError(err.message)); // Guardamos el mensaje de error en el estado global
      }
    };

    if (products.length === 0 && !loading && !error) { // Solo si no hay datos, no estamos cargando y no hay error previo
        fetchProducts();
    }
  }, [dispatch, products.length, loading, error]); // Dependencias del useEffect

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
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
              <h3>{product.title}</h3>
              <p>Categoría: {product.category}</p>
              <p>Precio: ${product.price}</p>
              <img src={product.image} alt={product.title} style={{ maxWidth: '100px', height: 'auto', marginBottom: '10px' }} />
              {/* Por ahora no mostramos la descripción completa para mantener las tarjetas compactas */}
              {/* <p>{product.description}</p> */}
              {/* Aquí iría el botón de "Ver más detalles" y el ícono de favorito */}
            </div>
          ))
        ) : (
          <div>No hay productos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;