import classes from "./Home.module.css";
import React, { useCallback, useState, useEffect } from "react";
import ProductsContainer from "../Products/ProductsContainer";
import Products from "../Products/Products";

import { useSelector } from "react-redux";
// Image Modal
import ImageBackdrop from "../ImageModal/ImageModal";

function HomePage() {
  // Image Modal
  const modalIsVisible = useSelector((state) => state.modalVisible);

  const filterValue = useSelector((state) => state.searchValue);

  // Rendering on screen
  const [curData, setCurData] = useState([]);
  // error handlig states
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(false);
      setError(null);
      const endpoint = await fetch("https://fakestoreapi.com/products");
      if (!endpoint.ok) {
        throw new Error("FAILD TO LOAD PRODUCTS TRY LATER");
      }
      const data = await endpoint.json();
      setCurData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className={classes.container}>
      {modalIsVisible && <ImageBackdrop />}

      <ProductsContainer>
        {!isLoading && <h1 className={classes.loding}>Loading...</h1>}
        {isLoading &&
          curData.length > 0 &&
          curData // eslint-disable-next-line
            .filter((obj) => {
              const value = filterValue.toLowerCase();
              if (value === "") {
                return obj;
              } else if (
                obj.title.toLowerCase().includes(value) ||
                obj.category.toLowerCase().includes(value) ||
                obj.description.toLowerCase().includes(value)
              ) {
                return obj;
              }
            })
            .map((obj) => {
              return (
                <Products
                  title={obj.title}
                  price={obj.price}
                  image={obj.image}
                  key={obj.id}
                  id={obj.id}
                />
              );
            })}
        {isLoading && curData.length < 1 && (
          <h1 className={classes["error-status"]}>{error}</h1>
        )}
      </ProductsContainer>
    </div>
  );
}

export default HomePage;
