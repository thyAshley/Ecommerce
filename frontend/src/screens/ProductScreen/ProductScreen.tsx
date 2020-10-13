import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listProductsDetail } from "../../actions/productActions";
import Rating from "../../components/Product/Rating/Rating";
import { ProductProps } from "../../types/app_types";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";

interface productState {
  productDetail: {
    error: string;
    product: ProductProps;
    loading: boolean;
  };
}

const ProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [qty, setQty] = useState(0);
  let history = useHistory();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: productState) => state.productDetail
  );

  useEffect(() => {
    dispatch(listProductsDetail(id));
  }, [id, dispatch]);

  const submitHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(+e.target.value);
  };

  return (
    <Fragment>
      <Link data-testid="back-button" className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product?.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {product && (
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item data-testid="product-price">
                Price: {product?.price}
              </ListGroup.Item>
              <ListGroup.Item data-testid="product-description">
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col data-testid="stock-availability">
                      {product && product?.countInStock > 0
                        ? "In Stock"
                        : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={onchange}
                        >
                          {[...Array(product.countInStock).keys()].map((n) => {
                            return (
                              <option key={n + 1} value={n + 1}>
                                {n + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    data-testid="add-button"
                    className="btn-block"
                    type="button"
                    disabled={product?.countInStock === 0}
                    onClick={submitHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default ProductScreen;
