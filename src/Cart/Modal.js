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
      <div className={classes["cart__wraper"]}></div>
      <button
        onClick={() => {
          props.onClose(false);
        }}
      >
        Close
      </button>
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
