import styled from "styled-components";

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
const Label = styled.label``;
const Input = styled.input``;
export { Container, Wrapper, Form, Input, Label };
