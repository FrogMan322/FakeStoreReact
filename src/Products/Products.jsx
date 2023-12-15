import classes from "./Products.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { Link } from "react-router-dom";

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
  const { image, data, id, title, price, value } = props;
  return (
    <div key={value} className={classes.wraper}>
      <div key={data} className={classes["product__card"]}>
        <img
          src={image}
          alt=""
          onClick={() => {
            getImage(id);
            isVisible(true);
          }}
        />

        <div className={classes["product__data"]}>
          <h1 className={classes["description"]}>{title}</h1>
          <h1 className={classes["price"]}>Price: ${price}</h1>
          <button
            className={classes["add_to_cart_btn"]}
            onClick={() => {
              addToCart(id);
            }}
          >
            Add to Cart
          </button>
          <div className={classes["add_to_cart_btn"]}>
            <Link to={`/details/${id}`}>Products Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Products);
