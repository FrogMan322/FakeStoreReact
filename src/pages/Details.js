import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Details.module.css";
function Details() {
  const [detail, setDetail] = useState({});
  const params = useParams();
  const getProduct = useCallback(async () => {
    const id = params.prodId;
    const endpoint = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await endpoint.json();
    setDetail({ ...data });
  }, [params]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  const { image, description, price, title } = detail;
  return (
    <div className={classes.container}>
      <div className={classes.product}>
        <h1>{title}</h1>
        <div className={classes["imgContainer"]}>
          <img src={image} alt="" />
        </div>
        <h1>{description}</h1>
        <h1>${price}</h1>
        <button>
          <Link to="/">Go Back</Link>
        </button>
      </div>
    </div>
  );
}

export default Details;
