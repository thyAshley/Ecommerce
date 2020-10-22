import React, { useEffect, Fragment } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

import { listProducts } from "../../actions/productActions";
import Message from "../../components/Message/Message";
import { RootState } from "../../store/store";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { adminDeleteProduct } from "../../actions/productActions";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, products, error } = useSelector(
    (state: RootState) => state.productList
  );
  const { userInfo } = useSelector((state: RootState) => state.user);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = useSelector((state: RootState) => state.productDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, listProducts, history, userInfo, successDelete]);

  const deleteHandler = (id: string) => {
    if (window.confirm("are you sure?")) {
      dispatch(adminDeleteProduct(id));
    }
  };
  const createProductHandler = () => {
    console.log("create");
  };
  return (
    <Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <LoadingSpinner />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product?._id}>
                <td>{product!._id}</td>
                <td>{product!.name}</td>
                <td>{product!.price}</td>
                <td>{product!.category}</td>
                <td>{product!.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id as string)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default ProductListScreen;
