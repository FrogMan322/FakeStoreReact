import classes from "./Products.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useHttp from "../customHook/useHttp";
import { type } from "@testing-library/user-event/dist/type";
function Products(props) {
  const { items } = useHttp("https://fakestoreapi.com/products");

  const dispatch = useDispatch();

  const isVisible = (value) => {
    dispatch(storeItemsActions.modalVisible(value));
  };

  const addToCart = (id) => {
    dispatch(storeItemsActions.addToCart({ items: items, id: id }));
  };
  // Geting image data for modal
  const getImage = async (id) => {
    const endpoint = await fetch(`https://fakestoreapi.com/products/`);
    const data = await endpoint.json();
    dispatch(storeItemsActions.getImageValue({ data, id }));
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1, type: "Tween", stiffness: 10 }}
            className={classes["add_to_cart_btn"]}
            onClick={() => {
              addToCart(id);
            }}
          >
            Add to Cart
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1, type: "Tween", stiffness: 10 }}
            className={classes["add_to_cart_btn"]}
          >
            <Link to={`/details/${id}`}>Products Details</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Products);
