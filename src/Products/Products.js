import classes from "./Products.module.css";
import React from "react";
function Products(props) {
  function showImage(id) {
    props.getImage(id);
  }
  //setShowImageModal={setShowImageModal} showImage.bind(null, props.id)
  return (
    <div key={props.value} className={classes.wraper}>
      <div key={props.data} className={classes["product__card"]}>
        <img
          src={props.image}
          alt=""
          onClick={() => {
            props.setShowImageModal(true);
            showImage(props.id);
          }}
        />
        <div className={classes["product__data"]}>
          <h1 className={classes["description"]}>{props.title}</h1>
          <h1 className={classes["price"]}>Price: ${props.price}</h1>
          <button
            className={classes["add_to_cart_btn"]}
            onClick={() => {
              props.onClick(props.id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Products);
