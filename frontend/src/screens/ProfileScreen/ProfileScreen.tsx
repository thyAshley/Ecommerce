import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message/Message";
import Loader from "../../components/LoadingSpinner/LoadingSpinner";
import { RootState } from "../../store/store";
import { getUserDetails, userUpdateProfile } from "../../actions/userActions";
import { getUserOrder } from "../../actions/orderActions";

const ProfileScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, success, error, userInfo: user } = useSelector(
    (state: RootState) => state.userProfile
  );

  const { userInfo } = useSelector((state: RootState) => state.user);
  const {
    loading: userOrderLoading,
    error: userOrderError,
    orders: userOrders,
  } = useSelector((state: RootState) => state.userOrder);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
        dispatch(getUserOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [user, userInfo, history, dispatch]);

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      setMessage(null);
      dispatch(userUpdateProfile(name, email, password));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : (
          error && <Message variant="danger">{error}</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {userOrderLoading ? (
          <Loader />
        ) : userOrderError ? (
          <Message variant="danger">{userOrderError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {userOrders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt!.substring(0, 10)}</td>
                  <td>$ {order.totalPrice?.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt!.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt!.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
