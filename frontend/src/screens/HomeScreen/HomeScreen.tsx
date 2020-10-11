import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../../components/Product/Product";
import { ProductProps } from "../../types/app_types";

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/api/v1/products");
      setProducts(data.result);
    };
    fetchProduct();
  }, []);

  return (
    <Fragment>
      <h1 data-testid="title">Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col
            data-testid={`product-info`}
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
