import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import classes from "./Modal.module.css";

function ModalOverlay(props) {
  return (
    <div
      onClick={() => {
        props.onClose(false);
      }}
      className={classes.modal__container}
    >
      {props.children}
    </div>
  );
}
function Cart(props) {
  const [cartItemStorage, setCartItemsStorage] = useState([]);
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("cartData"));
    if (storageData) {
      setCartItemsStorage(storageData);
    }
  }, [setCartItemsStorage, cartItemStorage]);
  const totalSumPrice = cartItemStorage.reduce((cv, acc) => {
    return cv + acc.price;
  }, 0);
  const totalSumQuantity = cartItemStorage.reduce((cv, acc) => {
    return cv + acc.quantity;
  }, 0);
  const sumTotalPrice = totalSumPrice * totalSumQuantity;
  return (
    <div className={classes["cart__container"]}>
      <h1 className={classes.total}>
        Total Value: {`$${sumTotalPrice.toFixed(2)}`}
      </h1>
      {/* <h1 className={classes["cart__info"]}>Cart</h1> */}
      {cartItemStorage.map((obj, idx) => {
        return (
          <div key={idx} className={classes["product__container"]}>
            <img src={obj.image} alt="" />
            <div className={classes["cart__data"]}>
              <h1>Quantity:{obj.quantity}</h1>
              <h1>Price:{obj.price}</h1>
              <button
                className={classes["delete__btn"]}
                onClick={() => {
                  props.deleteItem(obj.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} />,
        document.getElementById("modal__overlay")
      )}
      {ReactDOM.createPortal(
        <Cart
          deleteItem={props.deleteItem}
          onClose={props.onClose}
          updateCart={props.cartData}
        />,
        document.getElementById("modal__cart")
      )}
    </Fragment>
  );
}
export default Modal;
