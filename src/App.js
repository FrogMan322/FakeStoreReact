import classes from "./App.module.css";
import Nav from "./Nav/Nav";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import React, { useState, useEffect } from "react";
import Modal from "./Cart/Modal";
// const cart = [];
function App() {
  // eslint-disable-next-line
  const [idValue, setIdValue] = useState("");
  const [modalValue, setModalValue] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  // svi proizvodi renderovani na ekran
  const [curData, setCurData] = useState([]);
  // Updating Cart Data
  const [cartData, setCartData] = useState([]);
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
  // Adding item from cart
  function addToCart(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((endpoint) => {
        return endpoint.json();
      })
      .then((data) => {
        const checkCart = cartData.find((obj) => obj.id === id);
        const indexCart = cartData.findIndex((obj) => obj.id === id);
        if (!checkCart) {
          setCartData([...cartData, { ...data, quantity: 1 }]);
        } else {
          cartData[indexCart].quantity += 1;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Deleting item from cart
  function deletingItemFromCart(id) {
    const item = cartData.filter((item) => {
      return item.id !== id;
    });
    setCartData([...item]);
  }

  return (
    <div className={classes.container}>
      {modalValue && (
        <Modal
          onClose={setModalValue}
          cartData={cartData}
          onDeleteItem={deletingItemFromCart}
        />
      )}
      <Nav onFilter={getFilterValue} onClose={setModalValue} cart={cartData} />
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
