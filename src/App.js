import classes from "./App.module.css";
import React, { useCallback, useState, useEffect } from "react";
import Modal from "./Cart/Modal";
import ProductsContainer from "./Products/ProductsContainer";
import Products from "./Products/Products";
import Nav from "./Nav/Nav";

function App() {
  const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cartItem")) || []
  );
  const [modalValue, setModalValue] = useState(false);
  const [filterValue, setFilterValue] = useState("");

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

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);
  function getFilterValue(value) {
    setFilterValue(value);
  }
  // Adding item from cart
  const addToCart = async (id) => {
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
  };

  function deleteItem(id) {
    const updateCart = cartItem.filter((el) => {
      return el.id !== id;
    });
    setCartItem(updateCart);
  }
  // !! FIXING ANIMATION modalValue
  return (
    <div className={classes.container}>
      {
        <Modal
          modalValue={modalValue}
          setModalValue={setModalValue}
          deleteItem={deleteItem}
          cartData={cartItem}
        />
      }
      <Nav
        setModalValue={setModalValue}
        onFilter={getFilterValue}
        onClose={setModalValue}
        cartQuantity={cartItem}
      />

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
                  onClick={addToCart}
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

export default App;
