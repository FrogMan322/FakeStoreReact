import classes from "./App.module.css";
import Nav from "./Nav/Nav";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import React, { useState, useEffect } from "react";

function App() {
  // const [cartValue, setCartValue] = useState([]);
  const [filterValue, setFilterValue] = useState("");
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
  function getFilterValue(value) {
    setFilterValue(value);
  }

  return (
    <div className={classes.container}>
      <Nav onFilter={getFilterValue} />
      <ProductsContainer>
        {curData // eslint-disable-next-line
          .filter((obj, index) => {
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
              />
            );
          })}
      </ProductsContainer>
    </div>
  );
}

export default App;
