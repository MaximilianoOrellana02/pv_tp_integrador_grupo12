// En un componente React, por ejemplo, Header.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  setError,
} from "../../redux/slices/productsSlice";

import "./Header.css";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function Header() {
  const dispatch = useDispatch();

  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);

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

  const shuffledProductsRow1 =
    products.length > 0
      ? [...shuffleArray(products), ...shuffleArray(products)]
      : [];
  const shuffledProductsRow2 =
    products.length > 0
      ? [...shuffleArray(products), ...shuffleArray(products)]
      : [];
  const shuffledProductsRow3 =
    products.length > 0
      ? [...shuffleArray(products), ...shuffleArray(products)]
      : [];

  return (
    <header>
      <div className="main-header">
        <div className="wrapper">
          {shuffledProductsRow1.map((product) => {
            return (
              <div className="img-item">
                <img src={product.image} alt="" />
              </div>
            );
          })}
        </div>
        <div className="wrapper middle-row-animation">
          {shuffledProductsRow2.map((product) => {
            return (
              <div className="img-item">
                <img src={product.image} alt="" />
              </div>
            );
          })}
        </div>
        <div className="wrapper">
          {products.map((product) => {
            return (
              <div className="img-item">
                <img src={product.image} alt="" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="main-content">
        <div className="title">
          <h1>shop</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
