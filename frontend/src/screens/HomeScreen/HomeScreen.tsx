import React, { Fragment, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { listProducts } from "../../actions/productActions";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";
import Product from "../../components/Product/Product";
import { ProductProps } from "../../types/app_types";

interface productState {
  productList: {
    error: string;
    products: ProductProps[];
    loading: boolean;
  };
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: productState) => state.productList);
  const { loading, error, products } = productList;
  const params = useParams();
  console.log(params);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <h1 data-testid="title">Latest Products</h1>
      {products &&
        (loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Message variant="danger">Cannot connect to the server</Message>
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
