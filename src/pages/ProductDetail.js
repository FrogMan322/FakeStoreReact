import { useParams } from "react-router-dom";

function ProductDetail() {
  const { prodId } = useParams();
  return <h1>Url data is {prodId}</h1>;
}

export default ProductDetail;
