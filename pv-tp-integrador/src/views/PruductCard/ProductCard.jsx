import "./ProductCard.css";

const ProductCard = ({ product, handleToggleFavorite, isFavorite }) => {
  return (
    <div className="product-container">
      <div className="product.info" key={product.id}>
        <div className="img">
          <img src={product.image} alt="" />
          <div className="favorite-logo">
            <button onClick={handleToggleFavorite}>
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
        <h2>{product.title}</h2>
        <p>$ {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
