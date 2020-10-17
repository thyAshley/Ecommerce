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
