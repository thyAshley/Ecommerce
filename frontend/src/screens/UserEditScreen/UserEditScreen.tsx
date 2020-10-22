import React, { useState, useEffect, Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../components/Message/Message";
import Loader from "../../components/LoadingSpinner/LoadingSpinner";
import FormContainer from "../../components/FormContainer/FormContainer";
import { RootState } from "../../store/store";
import { getUserDetails, adminUpdateUser } from "../../actions/userActions";
import * as actions from "../../constants/userConstant";

const UserEditScreen = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, userInfo: user } = useSelector(
    (state: RootState) => state.userProfile
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state: RootState) => state.adminUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: actions.ADMIN_UPDATE_RESET });
      history.push("/admin/userlist");
    }

    if (!user?.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
    // eslint-disable-next-line
  }, [user, userId]);

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(
      adminUpdateUser({ _id: userId, email, name, isAdmin, token: user!.token })
    );
  };

  return (
    <Fragment>
      <Link to="/admin/userlist" className="btn btn-white my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsAdmin(e.target.checked)
                }
              ></Form.Check>
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

export default UserEditScreen;
