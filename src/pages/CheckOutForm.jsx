import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Wrapper,
  Form,
  Input,
  Label,
  Button,
} from "./CheckOutForm.styled";

function CheckOutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    dispatch(storeItemsActions.checkoutComplete({ name, city, postal }));
    setName("");
    setCity("");
    setPostal("");
    navigate("/complete");
  }
  function onChageName(e) {
    setName(e.target.value);
  }
  function onChageCity(e) {
    setCity(e.target.value);
  }
  function onChagePostal(e) {
    setPostal(e.target.value);
  }

  return (
    <Container>
      <Wrapper>
        <h1>Please Enter your personal Data</h1>
        <Form onSubmit={submitHandler}>
          <div>
            <Label>First Name OR Last Name:</Label>
            <Input
              required
              value={name}
              onChange={onChageName}
              type="text"
              id="name"
            />
          </div>
          <div>
            <Label>City:</Label>
            <Input
              required
              value={city}
              onChange={onChageCity}
              type="text"
              id="city"
            />
          </div>
          <div>
            <Label>Postal Code:</Label>
            <Input
              required
              value={postal}
              onChange={onChagePostal}
              type="number"
              id="postal"
            />
          </div>
          <Button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1 }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default CheckOutForm;
