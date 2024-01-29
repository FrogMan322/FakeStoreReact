import styled from "styled-components";
import { motion } from "framer-motion";
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 112px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 700px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  & > h1 {
    font-family: "Roboto";
    font-weight: bold;
    font-size: 1.5rem;
  }
`;
const Form = styled.form`
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  & label {
    font-family: "Roboto";
    font-weight: bold;
  }
  & input {
    padding: 0;
    margin: 0;
    width: 220px;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
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
const Label = styled.label``;
const Input = styled.input``;
export { Container, Wrapper, Form, Input, Label, Button };
