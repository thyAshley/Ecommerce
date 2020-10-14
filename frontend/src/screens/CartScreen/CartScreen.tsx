import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import Message from "../../components/Message/Message";
import { RootState } from "../../store/store";
import { addToCart, removeFromCart } from "../../actions/cartActions";

const CartScreen = () => {
  const { id: productId } = useParams<{ id?: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const productQty = location.search && +location.search.split("=")[1];
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
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
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
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItem.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItem
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItem.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
