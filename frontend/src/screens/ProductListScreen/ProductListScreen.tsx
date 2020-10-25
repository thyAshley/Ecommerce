import React, { useEffect, Fragment } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

import Message from "../../components/Message/Message";
import { RootState } from "../../store/store";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  adminDeleteProduct,
  adminCreateProduct,
  listProducts,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstant";

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

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = useSelector((state: RootState) => state.productCreate);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo && !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct?._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id: string) => {
    if (window.confirm("are you sure?")) {
      dispatch(adminDeleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(adminCreateProduct());
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
      {loadingCreate && <LoadingSpinner />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
