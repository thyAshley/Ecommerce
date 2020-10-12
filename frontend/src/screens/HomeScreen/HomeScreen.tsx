import React, { Fragment, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../../actions/productActions";
import Product from "../../components/Product/Product";
import { ProductProps } from "../../types/app_types";

interface rootState {
  productList: {
    error: string;
    products: ProductProps[];
    loading: boolean;
  };
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: rootState) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <h1 data-testid="title">Latest Products</h1>
      {products &&
        (loading ? (
          <h2>Loading</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
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
        ))}
    </Fragment>
  );
};

export default HomeScreen;
