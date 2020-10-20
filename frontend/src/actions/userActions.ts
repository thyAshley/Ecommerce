import { Dispatch } from "redux";
import axios from "axios";

import { RootState } from "../store/store";
import * as actions from "../constants/userConstant";
import * as orderActions from "../constants/orderConstant";

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: actions.USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const {
      data: { result },
    } = await axios.post("/api/v1/users/login", { email, password }, config);

    dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: result });

    localStorage.setItem("userInfo", JSON.stringify(result));
  } catch (error) {
    dispatch({
      type: actions.USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: actions.USER_LOGOUT });
  dispatch({ type: actions.USER_DETAILS_RESET });
  dispatch({ type: orderActions.ORDER_RESET });
  dispatch({ type: actions.USER_LIST_RESET });
};

export const register = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  dispatch({ type: actions.USER_LOGIN_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/users",
      { name, email, password },
      config
    );

    dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id: string) => async (
  dispatch: Dispatch,
  state: () => RootState
) => {
  const { userInfo } = state().user;
  dispatch({
    type: actions.USER_DETAILS_REQUEST,
  });
  if (userInfo) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/v1/users/${id}`, config);
      dispatch({ type: actions.USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.USER_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    dispatch({
      type: actions.USER_DETAILS_FAILURE,
      payload: "You must be login",
    });
  }
};

export const userUpdateProfile = (
  name?: string,
  email?: string,
  password?: string
) => async (dispatch: Dispatch, state: () => RootState) => {
  dispatch({ type: actions.USER_UPDATE_REQUEST });
  const { userInfo } = state().user;
  if (userInfo) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        "/api/v1/users/profile",
        {
          name,
          email,
          password,
        },
        config
      );
      dispatch({ type: actions.USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.USER_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    dispatch({
      type: actions.USER_DETAILS_FAILURE,
      payload: "You must be login",
    });
  }
};

export const getUserList = () => async (
  dispatch: Dispatch,
  state: () => RootState
) => {
  dispatch({ type: actions.USER_LIST_REQUEST });
  const { userInfo } = state().user;
  if (userInfo) {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get("/api/v1/users", config);
      dispatch({ type: actions.USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.USER_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    dispatch({
      type: actions.USER_DETAILS_FAILURE,
      payload: "Not authorized to perform this action",
    });
  }
};
