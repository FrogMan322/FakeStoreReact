import ReactDOM from "react-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import classes from "./Modal.module.css";
import * as Icon from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";

function ModalOverlay(props) {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.showCart);
  return (
    <div
      onClick={() => {
        dispatch(storeItemsActions.slideCart(false));
      }}
      className={`${classes[`modal__container`]} ${
        showCart ? classes[`modal__display`] : ""
      }`}
    >
      {props.children}
    </div>
  );
}
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems);
  const totalMoney = useSelector((state) => state.totalAmount);
  const showCart = useSelector((state) => state.showCart);
  const [isVisible, setIsVisible] = useState(false);

  const setValueVisible = useCallback(() => {
    if (cart.length < 1) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [cart]);
  useEffect(() => {
    setValueVisible();
  }, [isVisible, setValueVisible]);

  return (
    <div
      className={`${classes[`cart__container`]} ${
        showCart ? classes[`show`] : ""
      }`}
    >
      <h1 className={classes.total}>
        Total Value: {`$${totalMoney.toFixed(2)}`}
      </h1>

      {isVisible && (
        <button
          className={classes[`clear__cart`]}
          onClick={() => {
            dispatch(storeItemsActions.cleareCart());
          }}
        >
          Clear Cart
        </button>
      )}

      {isVisible && (
        <button
          className={classes[`checkout__cart`]}
          onClick={() => {
            alert("Routes not added. Till next time.");
          }}
        >
          Checkout
        </button>
      )}
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
              <h1>Price: ${(obj.price * obj.quantity).toFixed(2)}</h1>
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
        <ModalOverlay />,
        document.getElementById("modal__overlay")
      )}
      {ReactDOM.createPortal(<Cart />, document.getElementById("modal__cart"))}
    </Fragment>
  );
}
export default Modal;
