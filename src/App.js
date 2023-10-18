import classes from "./App.module.css";
import React, { useCallback, useState, useEffect } from "react";
import Modal from "./Cart/Modal";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import Nav from "./Nav/Nav";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [modalValue, setModalValue] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  // Rendering on screen
  const [curData, setCurData] = useState([]);

  const fetchUserData = useCallback(async () => {
    try {
      const endpoint = await fetch("https://fakestoreapi.com/products");
      const data = await endpoint.json();
      setCurData(data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  function getFilterValue(value) {
    setFilterValue(value);
  }
  // Adding item from cart
  async function addToCart(id) {
    try {
      const itemIndex = cartItem.findIndex((cartItem) => cartItem.id === id);
      const endpoint = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await endpoint.json();
      if (itemIndex === -1) {
        const updatedCart = [...cartItem, { ...data, quantity: 1 }];
        setCartItem(updatedCart);
      } else {
        const updatedCart = [...cartItem];
        updatedCart[itemIndex].quantity += 1;
        setCartItem(updatedCart);
      }
    } catch (err) {
      throw new Error(err);
    }
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
          deleteItem={deleteItem}
          cartData={cartItem}
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
