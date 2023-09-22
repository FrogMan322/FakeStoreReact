import classes from "./App.module.css";
import Nav from "./Nav/Nav";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import React, { useState, useEffect } from "react";

function App() {
  const [curData, setCurData] = useState([]);
  function fetchUserData() {
    fetch("https://fakestoreapi.com/products")
      .then((endpoint) => {
        return endpoint.json();
      })
      .then((data) => {
        setCurData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={classes.container}>
      <Nav />
      <ProductsContainer>
        {curData.map((obj, index) => {
          return (
            <Products
              title={obj.title}
              price={obj.price}
              image={obj.image}
              key={obj.id}
            />
          );
        })}
      </ProductsContainer>
    </div>
  );
}

export default App;
