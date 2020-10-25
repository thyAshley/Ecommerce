import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ProductProps } from "../../types/app_types";
import Rating from "./Rating/Rating";

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link
        data-testid={`product ${product._id}`}
        to={`/product/${product._id}`}
      >
        <Card.Img
          data-testid="product image"
          src={product.image}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating ? product.rating : 0}
            text={` (${product.numReviews} reviews)`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
