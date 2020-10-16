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

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: actions.USER_LOGOUT });
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
