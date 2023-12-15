import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Details.module.css";
function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [error, setError] = useState(null);
  const params = useParams();
  const getProduct = useCallback(async () => {
    try {
      setIsLoading(false);
      setError(null);
      const id = params.prodId;
      const endpoint = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!endpoint.ok) {
        throw new Error("Failed to load details try later");
      }
      const data = await endpoint.json();
      setDetail(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(true);
  }, [params]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  const { image, description, price, title } = detail;
  const detailsData = (
    <div className={classes.container}>
      <div className={classes.product}>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes["imgContainer"]}>
          <img src={image} alt="" />
        </div>
        <h1 className={classes.description}>{description}</h1>
        <h1 className={classes.price}>${price}</h1>
        <button>
          <Link to="/">Go Back</Link>
        </button>
      </div>
    </div>
  );
  return (
    <>
      {!isLoading && <h1 className={classes["loading"]}>Loading...</h1>}
      {detailsData}
    </>
  );
}

export default Details;
