import { useCallback, useEffect } from "react";
import classes from "./Nav.module.css";
import SearchBarFilter from "./SearchBarFilter";
import { useSelector, useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";

function Nav(props) {
  function getValue(value) {
    props.onFilter(value);
  }
  const cartItems = useSelector((cart) => cart.cartItems);
  const totalQuantity = useSelector((cart) => cart.quantity);
  const dispatch = useDispatch();
  const numbers = useCallback(() => {
    dispatch(storeItemsActions.amount(cartItems)); // eslint-disable-next-line
  }, [totalQuantity, cartItems, dispatch, totalQuantity]);

  useEffect(() => {
    numbers();
  }, [numbers, cartItems, totalQuantity]);
  return (
    <div className={classes.container}>
      <h1 className={classes["store__name"]}>Random Store</h1>
      <SearchBarFilter onSubmit={getValue} />
      <div
        onClick={() => {
          props.setModalValue((prev) => !prev);
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
