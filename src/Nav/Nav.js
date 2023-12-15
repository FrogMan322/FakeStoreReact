import { useCallback, useEffect } from "react";
import classes from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { NavLink } from "react-router-dom";

function Nav(props) {
  const dispatch = useDispatch();
  const setCartValue = (value) => {
    dispatch(storeItemsActions.slideCart(value));
  };

  const cartItems = useSelector((cart) => cart.cartItems);
  const totalQuantity = useSelector((cart) => cart.quantity);

  const numbers = useCallback(() => {
    dispatch(storeItemsActions.amount(cartItems)); // eslint-disable-next-line
  }, [totalQuantity, cartItems, dispatch]);

  useEffect(() => {
    numbers();
  }, [numbers, cartItems, totalQuantity]);
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
      <h1 className={classes["store__name"]}>SignIn</h1>
      <div
        onClick={() => {
          setCartValue(true);
        }}
        className={classes["cart"]}
      >
        <i className="bi bi-cart"></i>
        <p className={classes["cart__number"]}>{totalQuantity}</p>
      </div>
    </div>
  );
}

export default Nav;
