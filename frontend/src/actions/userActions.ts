import * as actions from "../constants/userConstant";
import { Dispatch } from "redux";
import axios from "axios";

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
