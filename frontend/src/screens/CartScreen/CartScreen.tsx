import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Router,
  Link,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  FormControlProps,
  FormControl,
} from "react-bootstrap";

import Message from "../../components/Message/Message";
import { RootState } from "../../store";
import { addToCart } from "../../actions/cartActions";

const CartScreen = () => {
  const { id: productId } = useParams<{ id?: string }>();
  const location = useLocation();
  const productQty = location.search && +location.search.split("=")[1];
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (productId && productQty) {
      dispatch(addToCart(productId, productQty));
    }
  }, [dispatch, productId, productQty]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    dispatch(addToCart(id, +e.target.value));
  };

  const removeFromCartHandler = (id: string) => {
    console.log(id);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItem.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Shop Now!</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItem.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        changeHandler(
                          e as React.ChangeEvent<HTMLInputElement>,
                          item.product
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((n) => {
                        return (
                          <option key={n + 1} value={n + 1}>
                            {n + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
