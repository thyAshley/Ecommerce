import axios from "axios";
import { Dispatch } from "redux";
import * as actions from "../constants/productConstant";
import { RootState } from "../store/store";
import { ProductProps } from "../types/app_types";

export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/v1/products");
    dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductsDetail = (id: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: actions.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const adminDeleteProduct = (id: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { userInfo } = getState().user;

  try {
    dispatch({ type: actions.PRODUCT_DELETE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo!.token}`,
      },
    };
    await axios.delete(`/api/v1/products/${id}`, config);
    dispatch({ type: actions.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminCreateProduct = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { userInfo } = getState().user;

  try {
    dispatch({ type: actions.PRODUCT_CREATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo!.token}`,
      },
    };
    const { data } = await axios.post(`/api/v1/products`, {}, config);
    dispatch({ type: actions.PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const adminUpdateProduct = (product: ProductProps) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { userInfo } = getState().user;

  try {
    dispatch({ type: actions.PRODUCT_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo!.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/v1/products/${product._id}`,
      product,
      config
    );
    dispatch({ type: actions.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
