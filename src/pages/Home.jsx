import classes from "./Home.module.css";
import React from "react";
import ProductsContainer from "../Products/ProductsContainer";
import Products from "../Products/Products";
import SearchBarFilter from "../Nav/SearchBarFilter";
import { useSelector } from "react-redux";
import useHttp from "../customHook/useHttp";
import ImageBackdrop from "../ImageModal/ImageModal";
import { AnimatePresence } from "framer-motion";

function HomePage() {
  const modalIsVisible = useSelector((state) => state.modalVisible);
  const filterValue = useSelector((state) => state.searchValue);
  const { error, items, isLoading } = useHttp(
    "https://fakestoreapi.com/products"
  );

  return (
    <>
      <SearchBarFilter />
      <div className={classes.container}>
        <AnimatePresence>{modalIsVisible && <ImageBackdrop />}</AnimatePresence>
        <ProductsContainer>
          {!isLoading && <h1 className={classes.loding}>Loading...</h1>}
          {isLoading &&
            items.length > 0 &&
            items // eslint-disable-next-line
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
                const { title, price, image, id } = obj;
                return (
                  <Products
                    title={title}
                    price={price}
                    image={image}
                    key={id}
                    id={id}
                  />
                );
              })}
          {!isLoading && items.length > 0 && (
            <h1 className={classes["error-status"]}>{error}</h1>
          )}
        </ProductsContainer>
      </div>
    </>
  );
}

export default HomePage;
