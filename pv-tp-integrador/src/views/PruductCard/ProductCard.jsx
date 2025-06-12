import "./ProductCard.css";

const ProductCard = ({ product, handleToggleFavorite, isFavorite }) => {
  return (
    <div className="products-container">
      <div className="product.info" key={product.id}>
        <div className="img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="title">
          <div className="name">
            <h3>{product.title}</h3>
          </div>
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
