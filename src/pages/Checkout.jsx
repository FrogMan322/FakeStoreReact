import styled from "styled-components";
import { useSelector } from "react-redux";
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
const ItemContainer = styled.div`
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
const Img = styled.img`
  border-radius: 10px;
  width: 180px;
  height: 100%;
`;
const Quantity = styled.h1`
  font-size: 2rem;
`;
const Description = styled.p`
  font-size: 2rem;
`;
const Price = styled.h2`
  font-size: 2rem;
`;
function Checkout() {
  const checkoutItems = useSelector((props) => props.checkout);
  return (
    <Container>
      <Wrapper>
        {checkoutItems.length >= 0 ? (
          checkoutItems.map((items) => {
            const { id, price, quantity, title, image } = items;
            return (
              <ItemContainer key={id}>
                <Img src={image} alt="" />
                <Description>{title}</Description>
                <Price>Price:{price * quantity}</Price>
                <Quantity>Quantity:{quantity}</Quantity>
              </ItemContainer>
            );
          })
        ) : (
          <h1>No items to checkout</h1>
        )}
      </Wrapper>
    </Container>
  );
}

export default Checkout;
