import ReactDOM from "react-dom";
import React, { Fragment } from "react";
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
  return (
    <div className={classes["cart__container"]}>
      {/* <h1 className={classes["cart__info"]}>Cart</h1> */}
      {props.updateCart.map((obj, idx) => {
        return (
          <div key={idx} className={classes["product__container"]}>
            <img src={obj.image} alt="" />
            <div className={classes["cart__data"]}>
              <h1>Quantity:{obj.quantity}</h1>
              <h1>Price:{obj.price}</h1>
              <button>Delete</button>
            </div>
          </div>
        );
      })}
      {/* <div className={classes["product__container"]}>
        <img
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt=""
        />
        <div className={classes["cart__data"]}>
          <h1>Quantity:0</h1>
          <h1>Price:0</h1>
          <button>Delete</button>
        </div>
      </div> */}
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
        <Cart onClose={props.onClose} updateCart={props.cartData} />,
        document.getElementById("modal__cart")
      )}
    </Fragment>
  );
}
export default Modal;
