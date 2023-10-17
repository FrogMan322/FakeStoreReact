import classes from "./App.module.css";
import Nav from "./Nav/Nav";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import React, { useState, useEffect } from "react";
import Modal from "./Cart/Modal";

function App() {
  // eslint-disable-next-line
  const [cartItem, setCartItem] = useState([]);
  // eslint-disable-next-line
  const [idValue, setIdValue] = useState("");
  const [modalValue, setModalValue] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  // svi proizvodi iz koji su renderovani na ekran
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
  // Adding item from cart
  function addToCart(id) {
    const itemIndex = cartItem.findIndex((cartItem) => cartItem.id === id);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((endpoint) => {
        return endpoint.json();
      })
      .then((data) => {
        if (itemIndex === -1) {
          const updatedCart = [...cartItem, { ...data, quantity: 1 }];
          setCartItem(updatedCart);
        } else {
          const updatedCart = [...cartItem];
          updatedCart[itemIndex].quantity += 1;
          setCartItem(updatedCart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteItem(id) {
    const updateCart = cartItem.filter((el) => {
      return el.id !== id;
    });

    setCartItem(updateCart);
  }
  return (
    <div className={classes.container}>
      {modalValue && (
        <Modal
          onClose={setModalValue}
          cartData={cartItem}
          deleteItem={deleteItem}
        />
      )}
      <Nav
        onFilter={getFilterValue}
        onClose={setModalValue}
        cartQuantity={cartItem}
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
