import { useSelector, useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { Link } from "react-router-dom";
// Syles
import {
  Container,
  Wrapper,
  ItemContainer,
  Img,
  Quantity,
  Description,
  Price,
  ActionsContainer,
  Button,
} from "./Checkout.styled";

function Checkout() {
  const checkoutItems = useSelector((props) => props.checkout);

  const dispatch = useDispatch();
  const totalPrice = checkoutItems
    .map((item) => item.price)
    .reduce((cv, ac) => {
      return cv + ac;
    }, 0);
  const totalQuantity = checkoutItems
    .map((item) => item.quantity)
    .reduce((cv, ac) => {
      return cv + ac;
    }, 0);
  return (
    <Container>
      <Wrapper>
        {checkoutItems.length > 0 && (
          <ActionsContainer>
            <Link to="/order-data">
              <Button
                whileHover={{
                  scale: 1.1,
                }}
              >
                complete checkout
              </Button>
            </Link>
            <h1>total price: {(totalPrice * totalQuantity).toFixed(2)}$</h1>
            <h1>
              total items:
              {totalQuantity}
            </h1>
          </ActionsContainer>
        )}

        {checkoutItems.map((items) => {
          const { id, price, quantity, title, image } = items;
          return (
            <ItemContainer
              initial={{ x: "-150%" }}
              animate={{ x: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.4,
                type: "spring",
                stiffness: 120,
              }}
              key={id}
            >
              <Img src={image} alt="" />
              <Description>{title}</Description>
              <Price>Price:{price * quantity}</Price>
              <Quantity>Quantity:{quantity}</Quantity>
              <Button
                whileHover={{
                  scale: 1.1,
                }}
                onClick={() => {
                  dispatch(storeItemsActions.deleteCheckoutItem(id));
                }}
              >
                Delete item
              </Button>
            </ItemContainer>
          );
        })}
      </Wrapper>
    </Container>
  );
}

export default Checkout;
