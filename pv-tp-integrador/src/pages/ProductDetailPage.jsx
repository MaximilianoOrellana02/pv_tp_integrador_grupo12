import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./ProductDetailPage.css";

import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/favoritesSlice";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const favoriteItems = useSelector((state) => state.favorites.items);

  const isCurrentProductFavorite = favoriteItems.some(
    (fav) => String(fav.id) === String(id)
  );

  const handleToggleFavorite = () => {
    if (product) {
      // Asegúrate de que product esté cargado antes de añadir/quitar
      if (isCurrentProductFavorite) {
        dispatch(removeFavorite(product.id));
      } else {
        // Al añadir, pasamos el objeto completo del producto
        dispatch(addFavorite(product));
      }
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      // Limpia estados al inicio de la carga
      setLoading(true);
      setError(null);
      setProduct(null); // Borra el producto anterior

      if (!id) {
        setLoading(false);
        setError("No se proporcionó un ID de producto en la URL.");
        return;
      }

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Producto no encontrado.");
          } else {
            throw new Error(
              `Error al cargar los datos: ${response.statusText}`
            );
          }
        }

        const data = await response.json();
        setProduct(data); // Guarda el producto real cargado de la API
      } catch (err) {
        console.error(
          "Hubo un error al obtener los detalles del producto:",
          err
        );
        setError(err.message || "No se pudo cargar el producto.");
      } finally {
        setLoading(false); // La carga ha terminado
      }
    };

    fetchProductDetails(); // Llama a la función de carga
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Cargando nombre del producto real...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Producto no encontrado.
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="imagen">
        <div className="product-button">
          <Link to={"/"} className="button-link">
            <button>
              <i class="fa-solid fa-arrow-left"></i>
            </button>
          </Link>
        </div>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="nombre">
          <h2>{product.title}</h2>
          <button
            onClick={handleToggleFavorite}
            className={`favorite-toggle-button ${
              isCurrentProductFavorite ? "is-favorite" : ""
            }`}
          >
            {isCurrentProductFavorite ? (
              <i class="fa-solid fa-heart"></i>
            ) : (
              <i class="fa-regular fa-heart"></i>
            )}
          </button>
        </div>
        <div className="product-details-container">
          <div className="prices">
            <p className="current-price">USD 8.00</p>
          </div>
          <div className="product-description-section">
            <p className="label-text">Descripción</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
