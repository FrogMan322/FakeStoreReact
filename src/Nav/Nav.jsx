import { useCallback, useEffect } from "react";
import classes from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
function Nav() {
  const cartItems = useSelector((cart) => cart.cartItems);
  const totalQuantity = useSelector((cart) => cart.quantity);
  const dispatch = useDispatch();

  const numbers = useCallback(() => {
    dispatch(storeItemsActions.amount(cartItems)); // eslint-disable-next-line
  }, [totalQuantity, cartItems, dispatch]);

  useEffect(() => {
    numbers();
  }, [numbers, totalQuantity]);
  function setCartValue(value) {
    dispatch(storeItemsActions.slideCart(value));
  }
  return (
    <div className={classes.container}>
      <h1 className={classes["store__name"]}>
        <NavLink
          to={"/"}
          className={({ isActive }) => {
            return isActive ? classes.isVisiting : undefined;
          }}
        >
          Random Store
        </NavLink>
      </h1>

      <h1 className={classes["store__name"]}>
        <NavLink
          to={"/comments"}
          className={({ isActive }) => {
            return isActive ? classes.isVisiting : undefined;
          }}
        >
          Comments
        </NavLink>
      </h1>
      <h1 className={classes["store__name"]}>
        <NavLink
          to={"/signup"}
          className={({ isActive }) => {
            return isActive ? classes.isVisiting : undefined;
          }}
        >
          SignUp
        </NavLink>
      </h1>
      <motion.div
        whileHover={{
          scale: 1.4,
          rotate: -10,
        }}
        transition={{ type: "spring", duration: 0.4 }}
        onClick={() => {
          setCartValue(true);
        }}
        className={classes["cart"]}
      >
        <i className="bi bi-cart"></i>
        <p className={classes["cart__number"]}>{totalQuantity}</p>
      </motion.div>
    </div>
  );
}

export default Nav;
