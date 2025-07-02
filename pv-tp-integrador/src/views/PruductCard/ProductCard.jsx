import "./ProductCard.css";

import { Link } from "react-router-dom";

const ProductCard = ({ product, handleToggleFavorite, isFavorite }) => {
  return (
    <div className="products-container">
      <div className="product-info" key={product.id}>
        <Link
          to={`/productos/${product.id}`}
          state={{
            productIsFavorite: isFavorite,
          }}
        >
          <div className="img">
            <img src={product.image} alt={product.title} />
          </div>
        </Link>
        <div className="title">
          <Link to={`/productos/${product.id}`} className="product-link">
            <div className="name">
              <h3>{product.title}</h3>
            </div>
          </Link>
          <div className="favorite-logo">
            <p>${product.price}</p>
            <button
              id="botonFavorito"
              className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
              onClick={handleToggleFavorite}
            >
              <i
                className={
                  isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
