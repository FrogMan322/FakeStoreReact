import { motion } from "framer-motion";
import styled from "styled-components";
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
  appearance: none;
  backface-visibility: hidden;
  background-color: #27ae60;
  border-radius: 5px;
  border-style: none;
  box-shadow: rgba(39, 174, 96, 0.15) 0 4px 9px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: normal;
  outline: none;
  overflow: hidden;
  padding: 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all 0.1s;
  user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  margin: 3px;

  &:hover {
    background-color: #14d966;
  }
  & a {
    color: white;
  }
  & a:visited {
    color: white;
  }
`;
const ContainerNoItems = styled.div`
  width: 100%;
  height: calc(100vh - 7rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WrapperNoItems = styled.div`
  border-radius: 10%;
  border: 1px solid black;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  font-family: "Roboto";
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
export {
  Container,
  Wrapper,
  ItemContainer,
  Img,
  Quantity,
  Description,
  Price,
  ActionsContainer,
  Button,
  ContainerNoItems,
  WrapperNoItems,
};
