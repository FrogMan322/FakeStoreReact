import classes from "./App.module.css";
import Nav from "./Nav/Nav";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import React, { useState, useEffect, useReducer } from "react";
import Modal from "./Cart/Modal";
function reducerFunction(state, action) {}
function App() {
  const [cartState, setCartState] = useReducer(reducerFunction, []);
  // eslint-disable-next-line
  const [idValue, setIdValue] = useState("");
  const [modalValue, setModalValue] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  console.log(cartState);
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
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((endpoint) => {
        return endpoint.json();
      })
      .then((data) => {
        setCartState({
          type: "ADD_TO_CART",
          items: { ...data, quantity: 1 },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={classes.container}>
      {modalValue && <Modal onClose={setModalValue} cartData={cartState} />}
      <Nav onFilter={getFilterValue} onClose={setModalValue} />
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
