import { Container, Wrapper, Form, Input, Label } from "./CheckOutForm.styled";

function CheckOutForm() {
  return (
    <Container>
      <Wrapper>
        <h1>Please Enter your personal Data</h1>
        <Form>
          <div>
            <Label>First Name OR Last Name:</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>City:</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>Postal Code:</Label>
            <Input type="text" />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default CheckOutForm;
