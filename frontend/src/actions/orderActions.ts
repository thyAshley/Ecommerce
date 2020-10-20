import axios from "axios";
import { Dispatch } from "redux";

import { RootState } from "../store/store";
import * as actions from "../constants/orderConstant";

export const createOrder = (order: {}) => async (
  dispatch: Dispatch,
  state: () => RootState
) => {
  dispatch({ type: actions.ORDER_CREATE_REQUEST });
  const { userInfo } = state().user;
  if (userInfo) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.post("/api/v1/orders", order, config);
      dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.ORDER_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    dispatch({
      type: actions.ORDER_CREATE_FAILURE,
      payload: "You must be login",
    });
  }
};

export const getOrderDetails = (id: string) => async (
  dispatch: Dispatch,
  state: () => RootState
) => {
  dispatch({ type: actions.ORDER_DETAILS_REQUEST });
  const { userInfo } = state().user;
  if (userInfo) {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/v1/orders/${id}`, config);
      dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.ORDER_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    dispatch({
      type: actions.ORDER_DETAILS_FAILURE,
      payload: "You must be login",
    });
  }
};

export const orderPayment = (id: string, paymentResult: {}) => async (
  dispatch: Dispatch,
  state: () => RootState
) => {
  dispatch({ type: actions.ORDER_PAY_REQUEST });

  const { userInfo } = state().user;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `/api/v1/orders/${id}/pay`,
      paymentResult,
      config
    );
    dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.ORDER_PAY_FAILURE,
      payload: "Unexpected error occur",
    });
  }
};

export const getUserOrder = () => async (
  dispatch: Dispatch,
  state: () => RootState
) => {
  dispatch({ type: actions.ORDER_MYREQUEST_REQUEST });

  const { userInfo } = state().user;

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/v1/orders/myorders`, config);
    dispatch({ type: actions.ORDER_MYREQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.ORDER_MYREQUEST_FAILURE,
      payload: "Unexpected error occur",
    });
  }
};
