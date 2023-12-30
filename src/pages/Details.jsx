import { json, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import classes from "./Details.module.css";
function Details() {
  const event = useLoaderData();

  const { image, description, price, title } = event;
  const detailsData = (
    <div className={`${classes.container}`}>
      <div className={classes.product}>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes["imgContainer"]}>
          <img src={image} alt="" />
        </div>
        <h1 className={classes.description}>{description}</h1>
        <h1 className={classes.price}>${price}</h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.05, type: "Tween" }}
          className={classes.product__details}
        >
          <Link to="/">Go Back</Link>
        </motion.div>
      </div>
    </div>
  );

  return detailsData;
}
export default Details;

export async function getProduct({ params }) {
  const id = params.prodId;
  const endpoint = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!endpoint.ok) {
    throw json({ message: "Could not fetch product" }, { status: 500 });
  } else {
    return endpoint;
  }
}
