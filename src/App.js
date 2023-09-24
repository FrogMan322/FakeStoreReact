import classes from "./App.module.css";
import Nav from "./Nav/Nav";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import React, { useState, useEffect } from "react";
import Modal from "./Cart/Modal";
// const cart = [];
function App() {
  // eslint-disable-next-line
  const [cartValue, setCartValue] = useState([]);
  // eslint-disable-next-line
  const [idValue, setIdValue] = useState("");
  const [modalValue, setModalValue] = useState(false);
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
    setIdValue(value);
  }
  function addToCart(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((endpoint) => {
        return endpoint.json();
      })
      .then((data) => {
        // TODO ovde mora logica za updejtovanje korpe
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={classes.container}>
      {modalValue && <Modal onClose={setModalValue} cartData={cartValue} />}
      <Nav
        onFilter={getFilterValue}
        onClose={setModalValue}
        quantity={cartValue}
      />
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
                onClick={addToCart}
                title={obj.title}
                price={obj.price}
                image={obj.image}
                key={obj.id}
                id={obj.id}
              />
            );
          })}
      </ProductsContainer>
    </div>
  );
}

export default App;
