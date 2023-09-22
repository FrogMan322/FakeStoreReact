import classes from "./Nav.module.css";

function Nav() {
  return (
    <div className={classes.container}>
      <h1 className={classes["store__name"]}>Random Store</h1>
      <div className={classes["cart"]}>
        <i className="bi bi-cart"></i>
        <p className={classes["cart__number"]}>0</p>
      </div>
    </div>
  );
}

export default Nav;
