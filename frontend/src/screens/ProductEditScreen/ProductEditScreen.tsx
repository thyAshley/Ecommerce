import React, { useState, useEffect, Fragment, ChangeEvent } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Message from "../../components/Message/Message";
import Loader from "../../components/LoadingSpinner/LoadingSpinner";
import FormContainer from "../../components/FormContainer/FormContainer";
import { RootState } from "../../store/store";
import {
  listProductsDetail,
  adminUpdateProduct,
} from "../../actions/productActions";
import * as actions from "../../constants/productConstant";
import FormFileInput from "react-bootstrap/FormFileInput";

const ProductEditScreen = () => {
  const { id: productId } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state: RootState) => state.productDetail
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state: RootState) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: actions.PRODUCT_UPDATE_RESET });
      dispatch(listProductsDetail(productId));
      history.push("/admin/productlist");
    }
    if (!product?.name || product._id !== productId) {
      dispatch(listProductsDetail(productId));
    } else {
      setName(product?.name);
      setPrice(product?.price);
      setImage(product?.image);
      setBrand(product?.brand);
      setCategory(product?.category);
      setCountInStock(product?.countInStock);
      setDescription(product?.description);
    }
  }, [product, productId, dispatch, history, successUpdate]);

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(
      adminUpdateProduct({
        _id: productId,
        name,
        image,
        description,
        brand,
        price,
        category,
        countInStock,
        rating: product?.rating || 0,
      })
    );
  };

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const formData = new FormData();
    console.log(file);
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/upload", formData, config);
      const result = data.replace("\\", "/");
      console.log(result);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Link to="/admin/productlist" className="btn btn-white my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(+e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default ProductEditScreen;
