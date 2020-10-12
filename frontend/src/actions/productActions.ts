import axios from "axios";
import { Dispatch } from "redux";
import * as actions from "../constants/productConstant";

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
