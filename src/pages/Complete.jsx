import styled from "styled-components";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 7rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  border-radius: 10%;
  border: 3px solid orange;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  font-family: "Roboto";
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-size: 2rem;
  background-color: #e08c0d75;
  font-weight: bold;
`;
function Complete() {
  const data = useSelector((data) => data.checkoutFinal);
  const { city, name, postal } = data;
  return (
    <Container>
      <Wrapper>
        <h1>Thank You for Ordering!!!</h1>
        <h1>Name: {name}</h1>
        <h1>City: {city}</h1>
        <h1>Postal Code: {postal}</h1>
      </Wrapper>
    </Container>
  );
}

export default Complete;
