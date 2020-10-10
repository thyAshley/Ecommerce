import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

import Product from "../../components/Product/Product";
import { ProductProps } from "../../types/app_types";
const HomeScreen: React.FC<{ products: ProductProps[] }> = ({ products }) => {
  return (
    <Fragment>
      <h1 data-testid="title">Latest Products</h1>
      <Row>
        {products.map((product, idx) => (
          <Col
            data-testid={`product-info-${idx}`}
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
