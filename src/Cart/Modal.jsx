import { createPortal } from "react-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import classes from "./Modal.module.css";
import * as Icon from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Opacity } from "@mui/icons-material";
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
      }  `}
    >
      {props.children}
    </div>
  );
}
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartItems);
  const totalMoney = useSelector((state) => state.totalAmount);
  const showCart = useSelector((state) => state.showCart); // variabla za animaciju

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
    <motion.div
      className={classes[`cart__container`]}
      initial={{ x: "-100%" }}
      animate={{ x: `${showCart ? 0 : -100}%` }}
      transition={{ type: "Tween", duration: 0.2 }}
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
            dispatch(storeItemsActions.getCheckoutItems());
            dispatch(storeItemsActions.cleareCart());
            dispatch(storeItemsActions.slideCart(false));
            navigate("/checkout");
          }}
        >
          Checkout
        </button>
      )}

      {cart.map((obj, idx) => {
        return (
          <motion.div
            exit={{ opacity: 0 }}
            key={idx}
            className={classes["product__container"]}
          >
            <motion.img src={obj.image} alt="" />
            <motion.div className={classes["cart__data"]}>
              <motion.div className={classes["quantity__container"]}>
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
              </motion.div>
              <h1>Price: ${(obj.price * obj.quantity).toFixed(2)}</h1>
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.05, type: "Tween" }}
                className={classes["delete__btn"]}
                onClick={() => {
                  dispatch(storeItemsActions.deleteItem(obj.id));
                }}
              >
                Delete
              </motion.button>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
function Modal(props) {
  return (
    <Fragment>
      {createPortal(
        <ModalOverlay />,
        document.getElementById("modal__overlay")
      )}
      {createPortal(<Cart />, document.getElementById("modal__cart"))}
    </Fragment>
  );
}
export default Modal;
