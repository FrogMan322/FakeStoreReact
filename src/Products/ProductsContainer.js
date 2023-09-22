import classes from "./ProductsContainer.module.css";

function ProductsContainer(props) {
  return <div className={classes.wraper}>{props.children}</div>;
}

export default ProductsContainer;
