import ReactDOM from "react-dom";
import React, { Fragment } from "react";
import classes from "./Modal.module.css";

function ModalOverlay(props) {
  return (
    <div
      onClick={() => {
        props.setModalValue((prev) => !prev);
      }}
      className={`${classes[`modal__container`]} ${
        props.modalValue ? classes[`modal__display`] : ""
      }`}
    >
      {props.children}
    </div>
  );
}
function Cart(props) {
  const totalSumPrice = props.updateCart.reduce((cv, acc) => {
    return cv + acc.price;
  }, 0);
  const totalSumQuantity = props.updateCart.reduce((cv, acc) => {
    return cv + acc.quantity;
  }, 0);
  const sumTotalPrice = totalSumPrice * totalSumQuantity;
  // modalValue
  return (
    <div
      className={`${classes[`cart__container`]} ${
        props.modalValue ? classes[`show`] : ""
      }`}
    >
      <h1 className={classes.total}>
        Total Value: {`$${sumTotalPrice.toFixed(2)}`}
      </h1>
      {/* <h1 className={classes["cart__info"]}>Cart</h1> */}
      {props.updateCart.map((obj, idx) => {
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
        <ModalOverlay
          setModalValue={props.setModalValue}
          modalValue={props.modalValue}
          onClose={props.onClose}
          showModal={props.showBar}
        />,
        document.getElementById("modal__overlay")
      )}
      {ReactDOM.createPortal(
        <Cart
          modalValue={props.modalValue}
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
