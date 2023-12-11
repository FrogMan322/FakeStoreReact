import classes from "./Products.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
function Products(props) {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  const isVisible = (value) => {
    dispatch(storeItemsActions.modalVisible(value));
  };
  useEffect(() => {
    const setCart = async () => {
      const endpoint = await fetch("https://fakestoreapi.com/products");
      const data = await endpoint.json();
      setCartItems(data);
    };
    setCart();
  }, [cartItems]);
  const addToCart = (id) => {
    dispatch(storeItemsActions.addToCart({ items: cartItems, id: id }));
  };
  // Geting image data for modal
  const getImage = async (id) => {
    const endpoint = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await endpoint.json();
    dispatch(storeItemsActions.getImageValue(data));
  };
  return (
    <div key={props.value} className={classes.wraper}>
      <div key={props.data} className={classes["product__card"]}>
        <img
          src={props.image}
          alt=""
          onClick={() => {
            getImage(props.id);
            isVisible(true);
          }}
        />

        <div className={classes["product__data"]}>
          <h1 className={classes["description"]}>{props.title}</h1>
          <h1 className={classes["price"]}>Price: ${props.price}</h1>
          <button
            className={classes["add_to_cart_btn"]}
            onClick={() => {
              addToCart(props.id);
            }}
          >
            Add to Cart
          </button>
          <button className={classes["add_to_cart_btn"]}>
            Products Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Products);
