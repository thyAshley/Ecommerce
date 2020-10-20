import React, { useEffect, Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

import { getUserList, deleteUserList } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import { RootState } from "../../store/store";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, users } = useSelector(
    (state: RootState) => state.userList
  );
  const { userInfo } = useSelector((state: RootState) => state.user);

  const { success: successDelete } = useSelector(
    (state: RootState) => state.userDelete
  );

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push("/login");
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUserList(id));
    }
  };
  return (
    <Fragment>
      <h1>Users</h1>
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
              <th>Email</th>
              <th>ADMIN</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id}>
                <td>{user!._id}</td>
                <td>{user!.name}</td>
                <td>
                  <a href={`mailto:${user!.email}`}>{user!.email}</a>
                </td>
                <td>
                  {user!.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user?._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user?._id as string)}
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

export default UserListScreen;
