import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import classes from "./Modal.module.css";
import * as Icon from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
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
  const dispatch = useDispatch();
  const cart = useSelector((cart) => cart.cartItems);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const quantity = props.updateCart.reduce((accumulator, currentValue) => {
      const sum = accumulator + currentValue.quantity;
      return sum;
    }, 0);
    const totalValue = props.updateCart.reduce((accumulator, currentValue) => {
      const sum = accumulator + currentValue.price;
      return sum;
    }, 0);
    const sum = totalValue * quantity;
    setTotal(sum);
  }, [total, props.updateCart]);

  return (
    <div
      className={`${classes[`cart__container`]} ${
        props.modalValue ? classes[`show`] : ""
      }`}
    >
      <h1 className={classes.total}>Total Value: {`$${total.toFixed(2)}`}</h1>
      <button
        className={classes[`clear__cart`]}
        onClick={() => {
          dispatch(storeItemsActions.cleareCart());
        }}
      >
        Clear Cart
      </button>
      {cart.map((obj, idx) => {
        return (
          <div key={idx} className={classes["product__container"]}>
            <img src={obj.image} alt="" />
            <div className={classes["cart__data"]}>
              <div className={classes["quantity__container"]}>
                <h1
                  className={classes.numbersCart}
                  onClick={() => {
                    dispatch(storeItemsActions.decriment(obj.id));
                  }}
                >
                  {" "}
                  <Icon.FileMinus />{" "}
                </h1>
                <h1 className={classes.numbersCart}>Quantity:{obj.quantity}</h1>
                <h1
                  className={classes.numbersCart}
                  onClick={() => {
                    dispatch(storeItemsActions.increment(obj.id));
                  }}
                >
                  {" "}
                  <Icon.FilePlus />{" "}
                </h1>
              </div>
              <h1>Price: ${obj.price}</h1>
              <button
                className={classes["delete__btn"]}
                onClick={() => {
                  dispatch(storeItemsActions.deleteItem(obj.id));
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
          setCartIte={props.setCartItem}
          incrementDecriment={props.incrementDecriment}
          clearCart={props.clearCart}
          setModalValue={props.setModalValue}
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
