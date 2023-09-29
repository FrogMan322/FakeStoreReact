import classes from "./Nav.module.css";
import SearchBarFilter from "./SearchBarFilter";

function Nav(props) {
  function getValue(value) {
    props.onFilter(value);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes["store__name"]}>Random Store</h1>
      <SearchBarFilter onSubmit={getValue} />
      <div
        onClick={() => {
          props.onClose(true);
        }}
        className={classes["cart"]}
      >
        <i className="bi bi-cart"></i>
        <p className={classes["cart__number"]}>{0}</p>
      </div>
    </div>
  );
}

export default Nav;
