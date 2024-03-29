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
    <>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ type: "Tween" }}
        className={classes.container}
      >
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
            to={"/checkout"}
            className={({ isActive }) => {
              return isActive ? classes.isVisiting : undefined;
            }}
          >
            Checkout
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
          <motion.p
            key={totalQuantity}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.2 }}
            className={classes["cart__number"]}
          >
            {totalQuantity}
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Nav;
