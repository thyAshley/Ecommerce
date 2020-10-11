import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

import axios from "axios";
import Rating from "../../components/Product/Rating/Rating";
import { ProductProps } from "../../types/app_types";

const ProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps>();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/v1/products/${id}`);
      setProduct(data.result);
    };
    fetchProduct();
  }, [id]);

  return (
    <Fragment>
      <Link data-testid="back-button" className="btn btn-light my-3" to="/">
        Go Back
      </Link>
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
              <ListGroup.Item>
                <Button
                  data-testid="add-button"
                  className="btn-block"
                  type="button"
                  disabled={product?.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductScreen;
