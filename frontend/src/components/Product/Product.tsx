import React from "react";
import { Card } from "react-bootstrap";
// import { ProductProps } from "../../types/app_types";

interface ProductProps {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}
const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a
        data-testid={`product ${product._id}`}
        href={`/product/${product._id}`}
      >
        <Card.Img
          data-testid="product image"
          src={product.image}
          variant="top"
        />
      </a>
    </Card>
  );
};

export default Product;
