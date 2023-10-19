import classes from "./Nav.module.css";
import SearchBarFilter from "./SearchBarFilter";

function Nav(props) {
  function getValue(value) {
    props.onFilter(value);
  }

  const quantity = props.cartQuantity.reduce((acc, cv) => {
    return cv.quantity + acc;
  }, 0);

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
        <p className={classes["cart__number"]}>{quantity}</p>
      </div>
    </div>
  );
}

export default Nav;
