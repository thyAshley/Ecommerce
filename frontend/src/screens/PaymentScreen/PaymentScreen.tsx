import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/FormContainer/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { RootState } from "../../store/store";
import { savePaymentMethods } from "../../actions/cartActions";
import { useHistory } from "react-router-dom";

const PaymentScreen: React.FC = () => {
  const history = useHistory();
  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethods(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="Paypal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            />
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          CONTINUE
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
