import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { storeItemsActions } from "../Store/store";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const ItemContainer = styled(motion.div)`
  padding: 0 20px;
  border-radius: 10px;
  background-color: orange;
  border: 1px solid orange;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const Img = styled(motion.img)`
  border-radius: 10px;
  width: 180px;
  height: 100%;
`;
const Quantity = styled(motion.h1)`
  font-size: 2rem;
`;
const Description = styled(motion.p)`
  font-size: 2rem;
`;
const Price = styled.h2`
  font-size: 2rem;
`;
const ActionsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 2rem;
`;
const Button = styled(motion.button)`
  background-color: green;
  border-radius: 10px;
  border: none;
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
`;
function Checkout() {
  const checkoutItems = useSelector((props) => props.checkout);
  const dispatch = useDispatch()
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
        <ActionsContainer>
          <Button>complete checkout</Button>
          <h1>total price: {totalPrice * totalQuantity}$</h1>
          <h1>
            total items:
            {totalQuantity}
          </h1>
        </ActionsContainer>
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
